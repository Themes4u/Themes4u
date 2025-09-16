// State
const state = {
  seller: {
    companyName: "",
    address: "",
    taxId: "",
    phone: "",
    email: "",
  },
  client: {
    companyName: "",
    address: "",
    taxId: "",
    phone: "",
    email: "",
  },
  meta: {
    invoiceNumber: "",
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().slice(0, 10),
  },
  items: [createEmptyItem()],
  notes: "",
};

function createEmptyItem() {
  return { description: "", quantity: 1, netPrice: 0, vatRate: 23 };
}

// Utils
function toNumber(value) {
  const n = parseFloat(String(value).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(n) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(n);
}

function calcItem(item) {
  const qty = toNumber(item.quantity);
  const net = toNumber(item.netPrice);
  const vat = toNumber(item.vatRate);
  const totalNet = qty * net;
  const vatAmt = totalNet * (vat / 100);
  const totalGross = totalNet + vatAmt;
  return { totalNet, vatAmt, totalGross };
}

function calcTotals(items) {
  return items.reduce(
    (acc, it) => {
      const c = calcItem(it);
      acc.net += c.totalNet;
      acc.vat += c.vatAmt;
      acc.gross += c.totalGross;
      return acc;
    },
    { net: 0, vat: 0, gross: 0 }
  );
}

// Rendering
const previewEl = document.getElementById("invoicePreview");
const itemsFormList = document.getElementById("itemsFormList");
const addItemBtn = document.getElementById("addItemBtn");
const exportBtn = document.getElementById("exportPdfBtn");

function render() {
  renderItemsForm();
  renderPreview();
}

function renderItemsForm() {
  itemsFormList.innerHTML = "";
  state.items.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "item-row";
    row.innerHTML = `
      <label class="field">
        <span class="label">Product / Service</span>
        <input type="text" class="input" data-item="description" data-index="${idx}" placeholder="Consulting services" value="${item.description || ""}">
      </label>
      <label class="field">
        <span class="label">Qty</span>
        <input type="number" step="0.01" min="0" class="input" data-item="quantity" data-index="${idx}" value="${item.quantity}">
      </label>
      <label class="field">
        <span class="label">Net price</span>
        <input type="number" step="0.01" min="0" class="input" data-item="netPrice" data-index="${idx}" value="${item.netPrice}">
      </label>
      <label class="field">
        <span class="label">VAT %</span>
        <input type="number" step="1" min="0" class="input" data-item="vatRate" data-index="${idx}" value="${item.vatRate}">
      </label>
      <button type="button" class="btn btn-danger" data-action="remove" data-index="${idx}">Remove</button>
    `;
    itemsFormList.appendChild(row);
  });
}

function renderPreview() {
  const seller = state.seller;
  const client = state.client;
  const meta = state.meta;
  const totals = calcTotals(state.items);

  const safe = (v, ph) => (String(v || "").trim().length ? v : `{{${ph}}}`);

  const rows = state.items
    .map((it, i) => {
      const c = calcItem(it);
      return `
        <tr>
          <td>${i + 1}</td>
          <td>${safe(it.description, "itemDescription")}</td>
          <td class="right">${toNumber(it.quantity)}</td>
          <td class="right">${formatMoney(toNumber(it.netPrice))}</td>
          <td class="right">${toNumber(it.vatRate)}%</td>
          <td class="right">${formatMoney(c.totalNet)}</td>
          <td class="right">${formatMoney(c.vatAmt)}</td>
          <td class="right">${formatMoney(c.totalGross)}</td>
        </tr>`;
    })
    .join("");

  previewEl.innerHTML = `
    <div class="invoice">
      <div class="invoice-header">
        <div class="brand">${safe(seller.companyName, "companyName")}</div>
        <div class="inv-meta">
          <div><strong>Invoice</strong> ${safe(meta.invoiceNumber, "invoiceNumber")}</div>
          <div>Issue: ${safe(meta.issueDate, "issueDate")}</div>
          <div>Due: ${safe(meta.dueDate, "dueDate")}</div>
        </div>
      </div>
      <div class="cols">
        <div class="col-card">
          <div class="col-title">Seller</div>
          <div class="kv">
            <div>${safe(seller.companyName, "companyName")}</div>
            <div>${safe(seller.address, "companyAddress")}</div>
            <div>${safe(seller.taxId, "taxId")}</div>
            <div>${safe(seller.phone, "phone")}</div>
            <div>${safe(seller.email, "email")}</div>
          </div>
        </div>
        <div class="col-card">
          <div class="col-title">Client</div>
          <div class="kv">
            <div>${safe(client.companyName, "clientName")}</div>
            <div>${safe(client.address, "clientAddress")}</div>
            <div>${safe(client.taxId, "clientTaxId")}</div>
            <div>${safe(client.phone, "clientPhone")}</div>
            <div>${safe(client.email, "clientEmail")}</div>
          </div>
        </div>
      </div>

      <div>
        <table class="inv-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th class="right">Qty</th>
              <th class="right">Net</th>
              <th class="right">VAT</th>
              <th class="right">Net total</th>
              <th class="right">VAT amt</th>
              <th class="right">Gross</th>
            </tr>
          </thead>
          <tbody>
            ${rows || '<tr><td colspan="8" class="muted">{{items}}</td></tr>'}
          </tbody>
        </table>
      </div>

      <div class="totals">
        <div></div>
        <div class="totals-card">
          <div class="totals-row"><span>Net total</span><span>${formatMoney(totals.net)}</span></div>
          <div class="totals-row"><span>VAT total</span><span>${formatMoney(totals.vat)}</span></div>
          <div class="totals-row total"><span>Amount due</span><span>${formatMoney(totals.gross)}</span></div>
        </div>
      </div>

      <div>
        <div class="col-title" style="margin-top:8px">Notes</div>
        <div class="kv">${safe(state.notes, "notes")}</div>
      </div>

      <div class="signatures">
        <div class="sig-box">Seller signature</div>
        <div class="sig-box">Client signature</div>
      </div>
    </div>
  `;
}

// Bind inputs
function bindForm() {
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const path = el.getAttribute("data-bind");
    const [top, key] = path.split(".");
    const update = () => {
      const value = el.value;
      if (key) {
        state[top][key] = value;
      } else {
        state[top] = value;
      }
      renderPreview();
    };
    el.addEventListener("input", update);
    // initialize value from state
    const initial = key ? state[top][key] : state[top];
    if (el.type === "date" && !initial) return; // keep empty if missing
    if (typeof initial !== "undefined") el.value = initial;
  });

  itemsFormList.addEventListener("input", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    const idx = Number(target.getAttribute("data-index"));
    const field = target.getAttribute("data-item");
    if (!Number.isFinite(idx) || !field) return;
    const val = target.value;
    if (["quantity", "netPrice", "vatRate"].includes(field)) {
      state.items[idx][field] = toNumber(val);
    } else {
      state.items[idx][field] = val;
    }
    renderPreview();
  });

  itemsFormList.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action=remove]");
    if (!btn) return;
    const idx = Number(btn.getAttribute("data-index"));
    state.items.splice(idx, 1);
    if (state.items.length === 0) state.items.push(createEmptyItem());
    render();
  });

  addItemBtn.addEventListener("click", () => {
    state.items.push(createEmptyItem());
    render();
  });

  exportBtn.addEventListener("click", () => {
    exportToPdf();
  });
}

function exportToPdf() {
  const element = document.getElementById("invoicePreview");
  const opt = {
    margin:       [10, 10, 10, 10],
    filename:     `invoice-${(state.meta.invoiceNumber || "draft").replace(/\s+/g, "-")}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  window.html2pdf().set(opt).from(element).save();
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  bindForm();
  render();
});

