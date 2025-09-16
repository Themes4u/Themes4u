## Invoice Generator (Browser-only)

Minimal, modern invoice generator with live preview and 1-click PDF export.

### Features
- Interactive sidebar form for Seller, Client, Dates, Items, and Notes
- Add/remove items; automatic net, VAT, and gross totals
- Live A4 preview with dynamic placeholders (e.g., `{{companyName}}`, `{{invoiceNumber}}`)
- Export the preview to PDF (A4 portrait)
- Clean, responsive layout using CSS grid and cards; Inter/Roboto fonts

### Getting Started
1. Open `index.html` in any modern browser.
2. Fill in the sidebar form. The preview updates in real time.
3. Use “Add Item” to insert new rows; “Remove” to delete.
4. Click “Export to PDF” to download the rendered invoice.

No build step required. All logic is client-side.

### Implementation Notes
- A4 preview: `div.invoice-a4` approximates 210×297mm using a fixed px canvas and pdf export in A4.
- Totals are computed in `app.js` with `calcItem` and `calcTotals`.
- PDF export uses `html2pdf.js` via CDN.
- Atomic pieces: `btn`, `input`, `card`, table styles; reusable section and grid classes.

### Customization
- Currency: change the Intl NumberFormat currency in `formatMoney` (default EUR).
- VAT defaults to 23%. Adjust `createEmptyItem()`.
- Branding: Replace brand text with your logo in the preview header.

### License
MIT

