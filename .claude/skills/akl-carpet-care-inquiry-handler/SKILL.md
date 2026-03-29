---
name: akl-carpet-care-inquiry-handler
description: Process customer carpet cleaning inquiries, extract job details, calculate dynamic quotes, generate branded PDFs via Claude Code, and email back to customer automatically.
version: 1.0.0
emoji: 🧹
metadata:
  openclaw:
    requires:
      env:
        - XERO_API_KEY
        - SMTP_USERNAME
        - SMTP_PASSWORD
        - CLAUDE_API_KEY
      bins:
        - python3
        - curl
---

# Auckland Carpet Care — Customer Inquiry Handler

## Purpose

When a customer submits a carpet cleaning inquiry (via website contact form, email, or phone),
this skill processes it end-to-end:

1. **Extracts** customer details and service requirements
2. **Calculates** a dynamic price quote (GST-inclusive, NZD)
3. **Generates** a branded PDF quote (saved to `quotes/`)
4. **Emails** the PDF quote back to the customer automatically
5. **Creates** a draft invoice in Xero for confirmed jobs
6. **Logs** the inquiry to `data/inquiries.csv`

---

## Trigger Phrases

- `/inquiry` — Start an interactive inquiry
- "process inquiry for [name]"
- "generate a quote for [customer]"
- "create a quote PDF for [name]"
- "handle a new carpet cleaning job"

---

## Usage

### Interactive (Claude prompts for details)
```
/inquiry
```

### Inline with arguments
```
/inquiry name="Jane Smith" phone="021 111 2222" email="jane@example.com" service="Steam Carpet Cleaning" rooms=3
```

---

## Scripts

| Script | Purpose |
|---|---|
| `scripts/process_inquiry.py` | Validates input, calculates quote, logs to CSV, orchestrates PDF + email |
| `scripts/generate_quote_pdf.py` | Renders Jinja2 HTML template and exports branded PDF via WeasyPrint |
| `scripts/send_email.py` | Sends the PDF quote to the customer via SMTP (Gmail or any SMTP server) |
| `scripts/xero_invoice.py` | Creates a draft invoice in Xero via the Xero API |

## Assets

| File | Purpose |
|---|---|
| `assets/quote_template.html` | Branded Jinja2 HTML template for PDF quote generation |

---

## Pricing Table

| Service | Base (1 room) | Extra Room |
|---|---|---|
| Steam Carpet Cleaning | $89 | $69 |
| Dry Carpet Cleaning | $89 | $69 |
| Stain & Odour Removal | $99 | $79 |
| Upholstery Cleaning | $119 | $99 |
| Tile & Grout Cleaning | $129 | $99 |
| Commercial Cleaning | $199 | $149 |

All prices are GST-inclusive (15% NZ GST).

---

## Environment Variables

Set these before running. Add them to your `.env` file or shell profile:

```bash
export SMTP_USERNAME="your-gmail@gmail.com"
export SMTP_PASSWORD="your-app-password"      # Gmail App Password (not your login password)
export XERO_API_KEY="your-xero-bearer-token"
export XERO_TENANT_ID="your-xero-tenant-id"
export CLAUDE_API_KEY="your-claude-api-key"   # For future AI-powered inquiry parsing
```

---

## Setup & Dependencies

```bash
pip install jinja2 weasyprint
```

For Xero integration:
- Go to [developer.xero.com](https://developer.xero.com) → My Apps → New App
- Use OAuth 2.0 and copy your Bearer token into `XERO_API_KEY`
- Copy your Tenant ID into `XERO_TENANT_ID`

For Gmail SMTP:
- Enable 2FA on your Google account
- Go to Google Account → Security → App Passwords → generate one
- Use that as `SMTP_PASSWORD`

---

## Output

- PDF saved to `quotes/Quote_<CustomerName>_<Date>.pdf`
- Quote number auto-incremented (e.g. `ACC-0001`, `ACC-0002`, …)
- Inquiry row appended to `data/inquiries.csv`
- Draft invoice created in Xero (if `XERO_API_KEY` is set)
- Email with PDF attachment sent to customer (if email provided)

---

## Example Run

```bash
python scripts/process_inquiry.py \
  --name "Sarah Mitchell" \
  --phone "021 555 6789" \
  --email "sarah@example.com" \
  --service "Steam Carpet Cleaning" \
  --rooms 3 \
  --message "Has a red wine stain in the lounge"
```

Output:
```
[OK] Inquiry logged → data/inquiries.csv
── Quote Summary ──────────────────────────────
  Customer : Sarah Mitchell | 021 555 6789
  Email    : sarah@example.com
  Service  : Steam Carpet Cleaning (3 rooms)
  Subtotal : $227.00
  GST (15%): $34.05
  TOTAL    : $261.05
────────────────────────────────────────────────
[OK] PDF quote generated → quotes/Quote_Sarah_Mitchell_2026-03-29.pdf
[OK] Quote email sent → sarah@example.com
```
