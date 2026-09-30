const rupiah = n => "Rp" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const pad = n => String(n).padStart(2, "0") + ".00";

// Menu
document.getElementById("menuPanel").innerHTML = MENU.map(g => `
  <div class="menu-group">
    <h3>${g.group}</h3>
    ${g.items.map(i => `
      <div class="menu-item">
        <div class="item-head">
          <span class="item-name">${i.name}${i.signature ? '<span class="badge">Andalan</span>' : ""}</span>
          <span class="item-dots" aria-hidden="true"></span>
          <span class="item-price">${rupiah(i.price)}</span>
        </div>
        ${i.desc ? `<p class="item-desc">${i.desc}</p>` : ""}
      </div>`).join("")}
  </div>`).join("");

// Jam operasional
document.getElementById("hoursList").innerHTML = ["weekday", "weekend"].map(k => {
  const h = SITE.hours[k];
  return `<div><dt>${h.label}</dt><dd>${pad(h.open)}–${pad(h.close)}</dd></div>`;
}).join("");

// Tautan
const waUrl = "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(SITE.whatsappMessage);
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(SITE.mapsQuery);
const dirUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(SITE.mapsQuery);
const igUrl = "https://instagram.com/" + SITE.instagram;
document.querySelectorAll("[data-wa]").forEach(a => a.href = waUrl);
document.querySelectorAll("[data-maps]").forEach(a => a.href = mapsUrl);
document.querySelectorAll("[data-directions]").forEach(a => a.href = dirUrl);
document.querySelectorAll("[data-ig]").forEach(a => a.href = igUrl);
document.getElementById("waNumber").textContent = SITE.whatsappDisplay;
document.body.classList.toggle("no-notes", !SITE.showPhotoNotes);

// Status buka/tutup (zona waktu Jakarta)
(function () {
  try {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jakarta", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
    const get = t => parts.find(p => p.type === t).value;
    const day = get("weekday");
    const t = (+get("hour") % 24) + (+get("minute")) / 60;
    const sched = d => (d === "Sat" || d === "Sun") ? SITE.hours.weekend : SITE.hours.weekday;
    const next = { Mon: "Tue", Tue: "Wed", Wed: "Thu", Thu: "Fri", Fri: "Sat", Sat: "Sun", Sun: "Mon" };
    const s = sched(day);
    const el = document.getElementById("openStatus");
    let text, open = false;
    if (t >= s.open && t < s.close) { text = "Buka sekarang, sampai " + pad(s.close); open = true; }
    else if (t < s.open) { text = "Buka hari ini pukul " + pad(s.open); }
    else { text = "Tutup sekarang, buka besok pukul " + pad(sched(next[day]).open); }
    el.querySelector("span").textContent = text;
    el.classList.toggle("is-open", open);
    el.hidden = false;
  } catch (e) { /* status tidak ditampilkan jika gagal */ }
})();

// Menu navigasi mobile
(function () {
  const btn = document.getElementById("menuBtn");
  const links = document.getElementById("navLinks");
  const set = open => {
    links.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
  };
  btn.addEventListener("click", () => set(btn.getAttribute("aria-expanded") !== "true"));
  links.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
})();

// Foto asli: dipasang otomatis kalau file-nya ada di folder images/
(function () {
  const slots = document.querySelectorAll("[data-photo]");
  const checkAll = () => {
    if (document.querySelectorAll("[data-photo]:not(.has-photo)").length === 0) document.body.classList.add("no-notes");
  };
  slots.forEach(slot => {
    const src = SITE.photos && SITE.photos[slot.dataset.photo];
    if (!src) return;
    const img = new Image();
    img.className = "photo";
    img.alt = slot.dataset.alt || "";
    img.decoding = "async";
    if (slot.dataset.photo === "hero") img.fetchPriority = "high"; else img.loading = "lazy";
    img.addEventListener("load", () => {
      img.classList.add("loaded");
      slot.classList.add("has-photo");
      slot.removeAttribute("role");
      slot.removeAttribute("aria-label");
      checkAll();
    });
    img.addEventListener("error", () => img.remove());
    slot.prepend(img);
    img.src = src;
  });
})();

// Peta Google
(function () {
  if (!SITE.mapEmbed) return;
  const card = document.getElementById("mapCard");
  if (!card) return;
  const q = encodeURIComponent(SITE.mapEmbedQuery || SITE.mapsQuery);
  const f = document.createElement("iframe");
  f.title = "Peta lokasi Kopi Senja";
  f.loading = "lazy";
  f.referrerPolicy = "no-referrer-when-downgrade";
  f.allowFullscreen = true;
  f.src = "https://www.google.com/maps?q=" + q + "&output=embed";
  card.appendChild(f);   // ilustrasi peta tetap ada di belakangnya sebagai cadangan
})();

// Tahun di footer
(function () {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
