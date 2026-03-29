#!/usr/bin/env python3
"""
Auckland Carpet Care — Inquiry Processor
Validates customer inquiry data, calculates a price quote,
logs to CSV, and triggers PDF quote generation.

Usage:
    python process_inquiry.py \
        --name "Jane Smith" \
        --phone "021 111 2222" \
        --email "jane@example.com" \
        --service "Steam Carpet Cleaning" \
        --rooms 3
"""

import argparse
import csv
import os
import sys
from datetime import datetime
from pathlib import Path

# ── Pricing table ──────────────────────────────────────────────────────────────
PRICING = {
    "Steam Carpet Cleaning": {"base": 89,  "extra_room": 69},
    "Dry Carpet Cleaning":   {"base": 89,  "extra_room": 69},
    "Stain & Odour Removal": {"base": 99,  "extra_room": 79},
    "Upholstery Cleaning":   {"base": 119, "extra_room": 99},
    "Tile & Grout Cleaning": {"base": 129, "extra_room": 99},
    "Commercial Cleaning":   {"base": 199, "extra_room": 149},
}

VALID_SERVICES = list(PRICING.keys())

DATA_DIR   = Path(__file__).resolve().parents[2] / "data"
QUOTES_DIR = Path(__file__).resolve().parents[2] / "quotes"


def calculate_quote(service: str, rooms: int) -> dict:
    """Return itemised quote breakdown for a given service and room count."""
    if service not in PRICING:
        raise ValueError(f"Unknown service: '{service}'. Valid options: {VALID_SERVICES}")
    if rooms < 1:
        raise ValueError("Rooms must be at least 1.")

    pricing  = PRICING[service]
    subtotal = pricing["base"] + max(0, rooms - 1) * pricing["extra_room"]
    gst      = round(subtotal * 0.15, 2)
    total    = round(subtotal + gst, 2)

    return {
        "service":      service,
        "rooms":        rooms,
        "base_price":   pricing["base"],
        "extra_rooms":  max(0, rooms - 1),
        "extra_cost":   max(0, rooms - 1) * pricing["extra_room"],
        "subtotal":     subtotal,
        "gst":          gst,
        "total":        total,
    }


def log_inquiry(data: dict) -> Path:
    """Append inquiry to data/inquiries.csv, creating it if needed."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    csv_path   = DATA_DIR / "inquiries.csv"
    fieldnames = [
        "date", "name", "phone", "email",
        "service", "rooms", "subtotal", "gst", "total", "status",
    ]

    file_exists = csv_path.exists()
    with open(csv_path, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()
        writer.writerow({
            "date":     data["date"],
            "name":     data["name"],
            "phone":    data["phone"],
            "email":    data["email"],
            "service":  data["service"],
            "rooms":    data["rooms"],
            "subtotal": data["subtotal"],
            "gst":      data["gst"],
            "total":    data["total"],
            "status":   "pending",
        })

    return csv_path


def build_inquiry(args) -> dict:
    quote = calculate_quote(args.service, args.rooms)
    return {
        "date":        datetime.now().strftime("%Y-%m-%d"),
        "time":        datetime.now().strftime("%H:%M"),
        "name":        args.name.strip(),
        "phone":       args.phone.strip(),
        "email":       args.email.strip() if args.email else "",
        "message":     args.message.strip() if args.message else "",
        **quote,
    }


def main():
    parser = argparse.ArgumentParser(description="Process a carpet care inquiry.")
    parser.add_argument("--name",    required=True,  help="Customer full name")
    parser.add_argument("--phone",   required=True,  help="Customer phone number")
    parser.add_argument("--email",   default="",     help="Customer email (optional)")
    parser.add_argument("--service", required=True,
                        choices=VALID_SERVICES, metavar="SERVICE",
                        help=f"One of: {', '.join(VALID_SERVICES)}")
    parser.add_argument("--rooms",   required=True,  type=int, help="Number of rooms")
    parser.add_argument("--message", default="",     help="Additional notes")
    parser.add_argument("--no-pdf",  action="store_true",
                        help="Skip PDF generation (log to CSV only)")
    args = parser.parse_args()

    # Build and validate
    try:
        inquiry = build_inquiry(args)
    except ValueError as e:
        print(f"[ERROR] {e}", file=sys.stderr)
        sys.exit(1)

    # Log to CSV
    csv_path = log_inquiry(inquiry)
    print(f"[OK] Inquiry logged → {csv_path}")

    # Print quote summary
    print("\n── Quote Summary ──────────────────────────────")
    print(f"  Customer : {inquiry['name']} | {inquiry['phone']}")
    if inquiry["email"]:
        print(f"  Email    : {inquiry['email']}")
    print(f"  Service  : {inquiry['service']} ({inquiry['rooms']} room(s))")
    print(f"  Subtotal : ${inquiry['subtotal']:.2f}")
    print(f"  GST (15%): ${inquiry['gst']:.2f}")
    print(f"  TOTAL    : ${inquiry['total']:.2f}")
    print("────────────────────────────────────────────────\n")

    # Generate PDF
    if not args.no_pdf:
        script = Path(__file__).parent / "generate_quote_pdf.py"
        import subprocess
        result = subprocess.run(
            [sys.executable, str(script)] +
            [f"--{k}={v}" for k, v in {
                "name":    inquiry["name"],
                "phone":   inquiry["phone"],
                "email":   inquiry["email"],
                "service": inquiry["service"],
                "rooms":   inquiry["rooms"],
                "date":    inquiry["date"],
                "total":   inquiry["total"],
                "subtotal": inquiry["subtotal"],
                "gst":     inquiry["gst"],
                "message": inquiry["message"],
            }.items()],
            capture_output=True, text=True
        )
        if result.returncode == 0:
            print(result.stdout)
        else:
            print(f"[WARN] PDF generation failed:\n{result.stderr}", file=sys.stderr)


if __name__ == "__main__":
    main()
