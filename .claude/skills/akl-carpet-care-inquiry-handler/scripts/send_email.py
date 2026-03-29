#!/usr/bin/env python3
"""
Auckland Carpet Care — Email Sender
Sends the generated quote PDF to the customer via SMTP.
Reads SMTP_USERNAME and SMTP_PASSWORD from environment variables.

Usage:
    python send_email.py \
        --to "jane@example.com" \
        --customer-name "Jane Smith" \
        --quote-number "ACC-0001" \
        --pdf-path "quotes/Quote_Jane_Smith_2026-03-29.pdf"
"""

import argparse
import os
import smtplib
import sys
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path


SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587

FROM_NAME    = "Auckland Carpet Care"
FROM_ADDRESS = os.environ.get("SMTP_USERNAME", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")


EMAIL_BODY_HTML = """\
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <div style="background: linear-gradient(135deg, #0f2d5e, #1a56db); padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
      <h1 style="color: white; margin: 0; font-size: 22px;">Auckland Carpet Care</h1>
      <p style="color: #bfdbfe; margin: 6px 0 0;">Professional Cleaning Services</p>
    </div>

    <p>Hi {customer_name},</p>

    <p>Thank you for your enquiry! Please find your personalised quote attached (<strong>{quote_number}</strong>).</p>

    <div style="background: #f0f7ff; border-left: 4px solid #1a56db; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <strong>What happens next?</strong>
      <ul style="margin: 8px 0 0; padding-left: 20px;">
        <li>We&rsquo;ll hold this quote for 30 days</li>
        <li>Call us on <strong>(09) 234 5678</strong> to confirm your booking</li>
        <li>Or reply to this email and we&rsquo;ll get in touch</li>
      </ul>
    </div>

    <p>If you have any questions, don&rsquo;t hesitate to reach out.</p>

    <p>Kind regards,<br>
    <strong>The Auckland Carpet Care Team</strong><br>
    📞 (09) 234 5678<br>
    🌐 www.aucklandcarpetcare.co.nz</p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
    <p style="font-size: 12px; color: #9ca3af;">
      Auckland Carpet Care | Auckland, New Zealand<br>
      You received this email because you submitted an enquiry on our website.
    </p>
  </div>
</body>
</html>
"""


def send_quote_email(to_address: str, customer_name: str, quote_number: str, pdf_path: Path):
    if not FROM_ADDRESS or not SMTP_PASSWORD:
        print("[ERROR] SMTP_USERNAME and SMTP_PASSWORD environment variables must be set.", file=sys.stderr)
        sys.exit(1)

    if not pdf_path.exists():
        print(f"[ERROR] PDF not found: {pdf_path}", file=sys.stderr)
        sys.exit(1)

    msg = MIMEMultipart("mixed")
    msg["From"]    = f"{FROM_NAME} <{FROM_ADDRESS}>"
    msg["To"]      = to_address
    msg["Subject"] = f"Your Carpet Cleaning Quote — {quote_number} | Auckland Carpet Care"

    body = EMAIL_BODY_HTML.format(
        customer_name=customer_name,
        quote_number=quote_number,
    )
    msg.attach(MIMEText(body, "html"))

    with open(pdf_path, "rb") as f:
        attachment = MIMEApplication(f.read(), _subtype="pdf")
        attachment.add_header(
            "Content-Disposition", "attachment",
            filename=pdf_path.name
        )
        msg.attach(attachment)

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.ehlo()
        server.starttls()
        server.login(FROM_ADDRESS, SMTP_PASSWORD)
        server.sendmail(FROM_ADDRESS, to_address, msg.as_string())

    print(f"[OK] Quote email sent → {to_address}")


def main():
    parser = argparse.ArgumentParser(description="Email a quote PDF to a customer.")
    parser.add_argument("--to",            required=True, help="Customer email address")
    parser.add_argument("--customer-name", required=True, help="Customer full name")
    parser.add_argument("--quote-number",  required=True, help="Quote reference e.g. ACC-0001")
    parser.add_argument("--pdf-path",      required=True, help="Path to the generated PDF")
    args = parser.parse_args()

    send_quote_email(
        to_address=args.to,
        customer_name=args.customer_name,
        quote_number=args.quote_number,
        pdf_path=Path(args.pdf_path),
    )


if __name__ == "__main__":
    main()
