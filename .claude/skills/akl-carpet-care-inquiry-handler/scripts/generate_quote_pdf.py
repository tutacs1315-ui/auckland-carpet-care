#!/usr/bin/env python3
"""
Auckland Carpet Care — PDF Quote Generator
Renders a branded HTML quote via Jinja2 and exports it to PDF using WeasyPrint.

Usage (called automatically by process_inquiry.py, or standalone):
    python generate_quote_pdf.py \
        --name "Jane Smith" --phone "021 111 2222" \
        --service "Steam Carpet Cleaning" --rooms 3 \
        --date "2026-03-29" --subtotal 227 --gst 34.05 --total 261.05
"""

import argparse
import os
import sys
from datetime import datetime
from pathlib import Path


QUOTES_DIR = Path(__file__).resolve().parents[2] / "quotes"
TEMPLATE_PATH = Path(__file__).resolve().parents[1] / "assets" / "quote_template.html"

QUOTE_NUMBER_FILE = Path(__file__).resolve().parents[2] / "data" / ".quote_counter"


def next_quote_number() -> str:
    """Return the next sequential quote number like ACC-0042."""
    QUOTE_NUMBER_FILE.parent.mkdir(parents=True, exist_ok=True)
    if QUOTE_NUMBER_FILE.exists():
        current = int(QUOTE_NUMBER_FILE.read_text().strip())
    else:
        current = 0
    next_num = current + 1
    QUOTE_NUMBER_FILE.write_text(str(next_num))
    return f"ACC-{next_num:04d}"


def render_pdf(context: dict) -> Path:
    try:
        from jinja2 import Environment, FileSystemLoader
    except ImportError:
        print("[ERROR] jinja2 not installed. Run: pip install jinja2 weasyprint", file=sys.stderr)
        sys.exit(1)

    try:
        from weasyprint import HTML
    except ImportError:
        print("[ERROR] weasyprint not installed. Run: pip install weasyprint", file=sys.stderr)
        sys.exit(1)

    # Render HTML template
    env = Environment(loader=FileSystemLoader(str(TEMPLATE_PATH.parent)))
    template = env.get_template(TEMPLATE_PATH.name)
    html_content = template.render(**context)

    # Output path
    QUOTES_DIR.mkdir(parents=True, exist_ok=True)
    safe_name = context["name"].replace(" ", "_")
    filename  = f"Quote_{safe_name}_{context['date']}.pdf"
    out_path  = QUOTES_DIR / filename

    HTML(string=html_content).write_pdf(str(out_path))
    return out_path


def main():
    parser = argparse.ArgumentParser(description="Generate a PDF quote.")
    parser.add_argument("--name",     required=True)
    parser.add_argument("--phone",    required=True)
    parser.add_argument("--email",    default="")
    parser.add_argument("--service",  required=True)
    parser.add_argument("--rooms",    required=True, type=int)
    parser.add_argument("--date",     default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--subtotal", required=True, type=float)
    parser.add_argument("--gst",      required=True, type=float)
    parser.add_argument("--total",    required=True, type=float)
    parser.add_argument("--message",  default="")
    args = parser.parse_args()

    quote_number = next_quote_number()

    context = {
        "quote_number": quote_number,
        "date":         args.date,
        "valid_until":  "30 days from issue",
        # Customer
        "name":         args.name,
        "phone":        args.phone,
        "email":        args.email,
        "message":      args.message,
        # Job
        "service":      args.service,
        "rooms":        args.rooms,
        # Pricing
        "subtotal":     f"{args.subtotal:.2f}",
        "gst":          f"{args.gst:.2f}",
        "total":        f"{args.total:.2f}",
        # Business
        "business_name":  "Auckland Carpet Care",
        "business_phone": "(09) 234 5678",
        "business_email": "info@aucklandcarpetcare.co.nz",
        "business_addr":  "Auckland, New Zealand",
        "website":        "www.aucklandcarpetcare.co.nz",
    }

    out_path = render_pdf(context)
    print(f"[OK] PDF quote generated → {out_path}")


if __name__ == "__main__":
    main()
