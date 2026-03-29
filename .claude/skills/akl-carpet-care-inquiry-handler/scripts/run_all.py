#!/usr/bin/env python3
"""
Auckland Carpet Care — Full Pipeline Runner
Runs the complete inquiry → quote → PDF → email → Xero pipeline in one command.

Usage:
    python run_all.py \
        --name "Jane Smith" \
        --phone "021 111 2222" \
        --email "jane@example.com" \
        --service "Steam Carpet Cleaning" \
        --rooms 3

Flags:
    --skip-email    Skip sending email (useful for testing)
    --skip-xero     Skip Xero invoice creation
"""

import argparse
import sys
from pathlib import Path

# Add scripts dir to path for direct imports
scripts_dir = Path(__file__).parent
sys.path.insert(0, str(scripts_dir))

from process_inquiry import build_inquiry, log_inquiry, calculate_quote, VALID_SERVICES
from generate_quote_pdf import render_pdf, next_quote_number
from send_email import send_quote_email
from xero_invoice import create_xero_invoice
from datetime import datetime


def main():
    parser = argparse.ArgumentParser(description="Run the full inquiry pipeline.")
    parser.add_argument("--name",       required=True)
    parser.add_argument("--phone",      required=True)
    parser.add_argument("--email",      default="")
    parser.add_argument("--service",    required=True, choices=VALID_SERVICES, metavar="SERVICE")
    parser.add_argument("--rooms",      required=True, type=int)
    parser.add_argument("--message",    default="")
    parser.add_argument("--skip-email", action="store_true")
    parser.add_argument("--skip-xero",  action="store_true")
    args = parser.parse_args()

    print(f"\n🧹 Auckland Carpet Care — Inquiry Pipeline")
    print(f"   Customer : {args.name}")
    print(f"   Service  : {args.service} × {args.rooms} room(s)\n")

    # 1. Calculate quote
    try:
        quote = calculate_quote(args.service, args.rooms)
    except ValueError as e:
        print(f"[ERROR] {e}", file=sys.stderr)
        sys.exit(1)

    # 2. Build inquiry record
    inquiry = {
        "date":    datetime.now().strftime("%Y-%m-%d"),
        "time":    datetime.now().strftime("%H:%M"),
        "name":    args.name.strip(),
        "phone":   args.phone.strip(),
        "email":   args.email.strip(),
        "message": args.message.strip(),
        **quote,
    }

    # 3. Log to CSV
    csv_path = log_inquiry(inquiry)
    print(f"[1/4] ✅ Inquiry logged         → {csv_path.name}")

    # 4. Generate PDF
    quote_number = next_quote_number()
    pdf_context = {
        "quote_number":   quote_number,
        "date":           inquiry["date"],
        "valid_until":    "30 days from issue",
        "name":           inquiry["name"],
        "phone":          inquiry["phone"],
        "email":          inquiry["email"],
        "message":        inquiry["message"],
        "service":        inquiry["service"],
        "rooms":          inquiry["rooms"],
        "subtotal":       f"{inquiry['subtotal']:.2f}",
        "gst":            f"{inquiry['gst']:.2f}",
        "total":          f"{inquiry['total']:.2f}",
        "business_name":  "Auckland Carpet Care",
        "business_phone": "(09) 234 5678",
        "business_email": "info@aucklandcarpetcare.co.nz",
        "business_addr":  "Auckland, New Zealand",
        "website":        "www.aucklandcarpetcare.co.nz",
    }
    pdf_path = render_pdf(pdf_context)
    print(f"[2/4] ✅ PDF quote generated    → {pdf_path.name}")

    # 5. Send email
    if not args.skip_email and inquiry["email"]:
        try:
            send_quote_email(
                to_address=inquiry["email"],
                customer_name=inquiry["name"],
                quote_number=quote_number,
                pdf_path=pdf_path,
            )
            print(f"[3/4] ✅ Email sent            → {inquiry['email']}")
        except Exception as e:
            print(f"[3/4] ⚠️  Email failed: {e}", file=sys.stderr)
    elif args.skip_email:
        print(f"[3/4] ⏭️  Email skipped (--skip-email)")
    else:
        print(f"[3/4] ⏭️  Email skipped (no email address provided)")

    # 6. Xero invoice
    if not args.skip_xero:
        try:
            create_xero_invoice(
                name=inquiry["name"],
                email=inquiry["email"],
                service=inquiry["service"],
                total=inquiry["total"],
                quote_number=quote_number,
            )
            print(f"[4/4] ✅ Xero draft invoice created")
        except Exception as e:
            print(f"[4/4] ⚠️  Xero failed: {e}", file=sys.stderr)
    else:
        print(f"[4/4] ⏭️  Xero skipped (--skip-xero)")

    print(f"\n── Summary ────────────────────────────────────")
    print(f"   Quote Ref : {quote_number}")
    print(f"   Total     : ${inquiry['total']:.2f} NZD (incl. GST)")
    print(f"   PDF       : {pdf_path}")
    print(f"────────────────────────────────────────────────\n")


if __name__ == "__main__":
    main()
