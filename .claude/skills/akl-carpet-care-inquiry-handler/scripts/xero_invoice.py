#!/usr/bin/env python3
"""
Auckland Carpet Care — Xero Invoice Creator
Creates a draft invoice in Xero for a confirmed job.
Reads XERO_API_KEY from environment variables.

Usage:
    python xero_invoice.py \
        --name "Jane Smith" \
        --email "jane@example.com" \
        --service "Steam Carpet Cleaning" \
        --total 261.05 \
        --quote-number "ACC-0001"
"""

import argparse
import json
import os
import sys
from datetime import datetime, timedelta

try:
    import urllib.request
    import urllib.error
except ImportError:
    pass

XERO_API_KEY  = os.environ.get("XERO_API_KEY", "")
XERO_BASE_URL = "https://api.xero.com/api.xro/2.0"

ACCOUNT_CODE  = "200"   # Sales account — update to match your Xero chart of accounts
TAX_TYPE      = "OUTPUT2"  # 15% GST (NZ)


def create_xero_invoice(name: str, email: str, service: str, total: float, quote_number: str) -> dict:
    if not XERO_API_KEY:
        print("[ERROR] XERO_API_KEY environment variable must be set.", file=sys.stderr)
        sys.exit(1)

    due_date = (datetime.now() + timedelta(days=14)).strftime("%Y-%m-%d")

    # Xero stores amounts exclusive of tax; back-calculate from GST-inclusive total
    subtotal_excl = round(total / 1.15, 2)
    gst           = round(total - subtotal_excl, 2)

    invoice_payload = {
        "Type":          "ACCREC",
        "Status":        "DRAFT",
        "Reference":     quote_number,
        "DueDate":       f"/Date({int(datetime.strptime(due_date, '%Y-%m-%d').timestamp() * 1000)}+0000)/",
        "Contact": {
            "Name":         name,
            "EmailAddress": email,
        },
        "LineItems": [
            {
                "Description": f"{service} — {quote_number}",
                "Quantity":    1.0,
                "UnitAmount":  subtotal_excl,
                "AccountCode": ACCOUNT_CODE,
                "TaxType":     TAX_TYPE,
            }
        ],
        "CurrencyCode": "NZD",
    }

    data = json.dumps({"Invoices": [invoice_payload]}).encode("utf-8")

    req = urllib.request.Request(
        f"{XERO_BASE_URL}/Invoices",
        data=data,
        headers={
            "Authorization": f"Bearer {XERO_API_KEY}",
            "Content-Type":  "application/json",
            "Accept":        "application/json",
            "Xero-Tenant-Id": os.environ.get("XERO_TENANT_ID", ""),
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read().decode())
            invoice = result["Invoices"][0]
            invoice_id = invoice.get("InvoiceID", "unknown")
            invoice_number = invoice.get("InvoiceNumber", quote_number)
            print(f"[OK] Xero draft invoice created → ID: {invoice_id} | Number: {invoice_number}")
            return invoice
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"[ERROR] Xero API error {e.code}: {body}", file=sys.stderr)
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="Create a Xero draft invoice.")
    parser.add_argument("--name",         required=True,  help="Customer full name")
    parser.add_argument("--email",        default="",     help="Customer email")
    parser.add_argument("--service",      required=True,  help="Service description")
    parser.add_argument("--total",        required=True,  type=float, help="GST-inclusive total (NZD)")
    parser.add_argument("--quote-number", required=True,  help="Quote reference e.g. ACC-0001")
    args = parser.parse_args()

    create_xero_invoice(
        name=args.name,
        email=args.email,
        service=args.service,
        total=args.total,
        quote_number=args.quote_number,
    )


if __name__ == "__main__":
    main()
