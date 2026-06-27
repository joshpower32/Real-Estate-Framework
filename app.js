/* =====================================================================
   Sarah Coleman Real Estate — Real Estate Agent framework
   ---------------------------------------------------------------------
   Personalise for a client:
   • Brand/colours: :root tokens in styles.css + agent name/brokerage in
     index.html (header, hero, about, footer).
   • Listings: edit the LISTINGS array below.
   • Real photos: give a listing an `image:` path (e.g. "assets/123-maple.jpg")
     and set the agent headshot via ABOUT_PORTRAIT — real listing photos sell.
   • Forms: valuation + contact handlers below — wire to Formspree or Firebase.
   ===================================================================== */

const CONFIG = {
  pexelsKey: "4SuTxTJkprUsJAP1CZoSkd412wKx4EuXt7xfK5HzZf9DreiCe8Wv0twm",
  heroQuery: "luxury house exterior",
  agentPortraitQuery: "real estate agent woman portrait",
};

// id, price, address, area, type, beds, baths, sqft, year, garage, lot, badge, features, query
const LISTINGS = [
  { id: "p1", price: 749900, address: "123 Maple Ave", area: "Westdale, Hamilton", type: "House", beds: 4, baths: 3, sqft: 2400, year: 2008, garage: 2, lot: "45 × 110 ft", badge: "New", features: ["Renovated kitchen", "Finished basement", "Fenced backyard", "Hardwood floors"], query: "house exterior" },
  { id: "p2", price: 429000, address: "45 Locke St S #302", area: "Kirkendall, Hamilton", type: "Condo", beds: 2, baths: 2, sqft: 980, year: 2018, garage: 1, lot: "—", badge: "Open House", badgeAlt: true, features: ["In-suite laundry", "Balcony", "Underground parking", "Gym & rooftop"], query: "modern condo building" },
  { id: "p3", price: 589000, address: "78 Stinson St", area: "Stinson, Hamilton", type: "Townhouse", beds: 3, baths: 2, sqft: 1650, year: 2015, garage: 1, lot: "20 × 90 ft", features: ["End unit", "Open concept", "Private patio", "Walk to GO"], query: "townhouse exterior" },
  { id: "p4", price: 1150000, address: "12 Aberdeen Ave", area: "Durand, Hamilton", type: "House", beds: 5, baths: 4, sqft: 3200, year: 1925, garage: 2, lot: "50 × 130 ft", badge: "Just Listed", features: ["Century charm", "Chef’s kitchen", "Primary ensuite", "Detached garage"], query: "luxury home exterior" },
  { id: "p5", price: 539000, address: "200 Bay St N #1505", area: "Downtown, Hamilton", type: "Condo", beds: 2, baths: 2, sqft: 1100, year: 2020, garage: 1, lot: "—", features: ["Lake views", "Floor-to-ceiling windows", "Concierge", "Parking + locker"], query: "condo interior living room" },
  { id: "p6", price: 679000, address: "33 Concession St", area: "Hamilton Mountain", type: "House", beds: 3, baths: 2, sqft: 1500, year: 1962, garage: 1, lot: "40 × 120 ft", features: ["Bungalow", "Updated roof", "Large lot", "Quiet street"], query: "bungalow house" },
  { id: "p7", price: 625000, address: "99 Dundurn St", area: "Strathcona, Hamilton", type: "House", beds: 3, baths: 2, sqft: 1400, year: 1940, garage: 0, lot: "25 × 100 ft", features: ["Semi-detached", "Original trim", "Deep lot", "Transit nearby"], query: "house front porch" },
  { id: "p8", price: 899000, address: "5 Ravine Dr", area: "Ancaster", type: "House", beds: 4, baths: 3, sqft: 2800, year: 2012, garage: 2, lot: "55 × 140 ft", badge: "New", features: ["Backs onto ravine", "Open concept", "Walkout basement", "Double garage"], query: "modern house exterior" },
  { id: "p9", price: 389000, address: "150 Main St W #710", area: "Central, Hamilton", type: "Condo", beds: 1, baths: 1, sqft: 650, year: 2017, garage: 0, lot: "—", features: ["Great starter", "Balcony", "Walk score 95", "Pet friendly"], query: "apartment building modern" },
  { id: "p10", price: 815000, address: "22 Sunset Blvd", area: "Stoney Creek", type: "House", beds: 4, baths: 3, sqft: 2600, year: 2016, garage: 2, lot: "48 × 115 ft", badge: "Sold", badgeSold: true, features: ["Sold over asking", "Family room", "Landscaped yard", "Near schools"], query: "suburban house" },
  { id: "p11", price: 565000, address: "61 Hunter St E", area: "Corktown, Hamilton", type: "Townhouse", beds: 3, baths: 3, sqft: 1700, year: 2019, garage: 1, lot: "18 × 85 ft", features: ["Rooftop terrace", "Modern finishes", "Garage", "Steps to St. Joe’s"], query: "townhouse modern" },
  { id: "p12", price: 1450000, address: "8 Scenic Dr", area: "Mountain Brow, Hamilton", type: "House", beds: 5, baths: 4, sqft: 3800, year: 2021, garage: 3, lot: "60 × 150 ft", badge: "Just Listed", features: ["Escarpment views", "Custom build", "Heated floors", "Triple garage"], query: "luxury modern house" },
];

const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = (id) => document.getElementById(id);
const money = (n) => "$" + Math.round(n).toLocaleString("en-CA");
const sqftFmt = (n) => n.toLocaleString("en-CA") + " sqft";

// --- SVG fallback (house silhouette) -----------------------------------
function houseSVG(seed = 0) {
  const h = (seed * 37 + 30) % 360;
  return `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Property photo placeholder">
    <rect width="320" height="220" fill="hsl(${h},14%,88%)"/>
    <g fill="hsl(${h},12%,64%)">
      <path d="M60 120 L160 56 L260 120 Z"/><rect x="84" y="118" width="152" height="78"/>
    </g>
    <rect x="146" y="150" width="28" height="46" fill="hsl(${h},14%,45%)"/>
    <rect x="104" y="132" width="26" height="24" fill="hsl(${h},20%,80%)"/><rect x="190" y="132" width="26" height="24" fill="hsl(${h},20%,80%)"/>
  </svg>`;
}

// --- Pexels image cache ------------------------------------------------
const IMG_CACHE_KEY = "realestate_imgcache";
let imgCache = JSON.parse(localStorage.getItem(IMG_CACHE_KEY) || "{}");
const listImage = (l) => l.image || imgCache[l.id]?.url || null;

async function fetchPexels(query, orientation = "landscape") {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=${orientation}`,
    { headers: { Authorization: CONFIG.pexelsKey } });
  if (!res.ok) return null;
  return (await res.json()).photos?.[0] || null;
}
function listMedia(l, seed) {
  const url = listImage(l);
  const credit = imgCache[l.id]?.photographer;
  if (url) return `<img src="${esc(url)}" alt="${esc(l.address)}"${credit ? ` title="Photo: ${esc(credit)} / Pexels"` : ""} loading="lazy">`;
  return houseSVG(seed);
}

// --- Hero + agent portrait backgrounds ---------------------------------
async function loadBg(elId, cacheKey, query, srcPick = (p) => p.src.landscape) {
  const el = $(elId);
  const cached = imgCache[cacheKey]?.url;
  if (cached) { el.style.backgroundImage = `url("${cached}")`; return; }
  try {
    const photo = await fetchPexels(query, cacheKey === "__agent" ? "portrait" : "landscape");
    if (photo) {
      const url = srcPick(photo);
      imgCache[cacheKey] = { url, photographer: photo.photographer };
      localStorage.setItem(IMG_CACHE_KEY, JSON.stringify(imgCache));
      el.style.backgroundImage = `url("${url}")`;
    }
  } catch (_) { /* fallback stays */ }
}

// --- Listings: filter + sort + render ----------------------------------
const grid = $("listingGrid");
let activeType = "All";
let sortMode = "featured";

function renderFilters() {
  const types = ["All", ...new Set(LISTINGS.map((l) => l.type))];
  const el = $("typeFilters");
  el.innerHTML = types.map((t) => `<button class="filter-chip ${t === activeType ? "active" : ""}" data-type="${t}">${esc(t)}</button>`).join("");
  el.querySelectorAll(".filter-chip").forEach((b) =>
    b.addEventListener("click", () => { activeType = b.dataset.type; renderFilters(); renderGrid(); }));
}
function sortListings(list) {
  const s = [...list];
  if (sortMode === "price-asc") s.sort((a, b) => a.price - b.price);
  else if (sortMode === "price-desc") s.sort((a, b) => b.price - a.price);
  else if (sortMode === "beds-desc") s.sort((a, b) => b.beds - a.beds);
  else if (sortMode === "sqft-desc") s.sort((a, b) => b.sqft - a.sqft);
  return s;
}
function renderGrid() {
  const list = sortListings(LISTINGS.filter((l) => activeType === "All" || l.type === activeType));
  grid.innerHTML = list.map((l, i) => {
    const badge = l.badge ? `<span class="l-badge ${l.badgeSold ? "sold" : l.badgeAlt ? "alt" : ""}">${esc(l.badge)}</span>` : "";
    return `
    <article class="listing-card" data-id="${l.id}" tabindex="0" role="button" aria-label="View ${esc(l.address)}">
      <div class="listing-media" data-id="${l.id}">${listMedia(l, i + 1)}${badge}</div>
      <div class="listing-body">
        <span class="l-price">${money(l.price)}</span>
        <span class="l-address">${esc(l.address)}</span>
        <span class="l-area">${esc(l.area)}</span>
        <div class="l-specs">
          <span>&#128716; ${l.beds} bed</span><span>&#128703; ${l.baths} bath</span><span>&#128208; ${sqftFmt(l.sqft)}</span>
        </div>
      </div>
    </article>`;
  }).join("");
  grid.querySelectorAll(".listing-card").forEach((card) => {
    card.addEventListener("click", () => openProperty(card.dataset.id));
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProperty(card.dataset.id); } });
  });
}
$("sortSelect").addEventListener("change", (e) => { sortMode = e.target.value; renderGrid(); });

async function hydrateImages() {
  for (const l of LISTINGS) {
    if (listImage(l)) continue;
    try {
      const photo = await fetchPexels(l.query);
      if (!photo) continue;
      imgCache[l.id] = { url: photo.src.large, photographer: photo.photographer };
      localStorage.setItem(IMG_CACHE_KEY, JSON.stringify(imgCache));
      const el = grid.querySelector(`.listing-media[data-id="${l.id}"]`);
      if (el) { const old = el.querySelector("svg, img"); if (old) old.outerHTML = listMedia(l, 1); }
    } catch (_) { /* keep SVG */ }
  }
}

// --- Property detail modal ----------------------------------------------
const modal = $("propModal");
function openProperty(id) {
  const l = LISTINGS.find((x) => x.id === id);
  if (!l) return;
  $("propModalBody").innerHTML = `
    <div class="pm-media">${listMedia(l, 1)}</div>
    <div class="pm-body">
      <div class="pm-head">
        <div><div class="pm-addr">${esc(l.address)}</div><div class="pm-area">${esc(l.area)} · ${esc(l.type)}</div></div>
        <span class="pm-price">${money(l.price)}</span>
      </div>
      <div class="pm-specs">
        <div class="pm-spec"><b>${l.beds}</b><span>Bedrooms</span></div>
        <div class="pm-spec"><b>${l.baths}</b><span>Bathrooms</span></div>
        <div class="pm-spec"><b>${sqftFmt(l.sqft)}</b><span>Living area</span></div>
        <div class="pm-spec"><b>${l.year}</b><span>Year built</span></div>
        <div class="pm-spec"><b>${l.garage}</b><span>Garage</span></div>
        <div class="pm-spec"><b>${esc(l.lot)}</b><span>Lot size</span></div>
      </div>
      <p class="pm-desc">A wonderful ${esc(l.type.toLowerCase())} in ${esc(l.area)}. Book a private showing to experience everything this home has to offer, or estimate your monthly mortgage below.</p>
      <ul class="pm-features">${l.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      <div class="pm-actions">
        <button class="btn btn-primary" id="pmBook">Book a showing</button>
        <button class="btn btn-ghost" id="pmCalc">Estimate mortgage</button>
      </div>
    </div>`;
  $("pmBook").addEventListener("click", () => { closeProperty(); $("contactProperty").value = `${l.address} (${money(l.price)})`; $("contact").scrollIntoView({ behavior: "smooth" }); });
  $("pmCalc").addEventListener("click", () => { closeProperty(); $("cPrice").value = l.price; updateCalc(); $("calculator").scrollIntoView({ behavior: "smooth" }); });
  modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
}
function closeProperty() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
$("propClose").addEventListener("click", closeProperty);
modal.addEventListener("click", (e) => { if (e.target === modal) closeProperty(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeProperty(); });

// --- Mortgage calculator ------------------------------------------------
function updateCalc() {
  const price = +$("cPrice").value || 0;
  const down = +$("cDown").value || 0;
  const years = +$("cTerm").value;
  const rate = +$("cRate").value;
  $("cTermLabel").textContent = `${years} years`;
  $("cRateLabel").textContent = `${rate.toFixed(1)}%`;
  const principal = Math.max(price - down, 0);
  const n = years * 12;
  const r = rate / 100 / 12;
  const monthly = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  $("cMonthly").textContent = money(isFinite(monthly) ? monthly : 0);
}
["cPrice", "cDown", "cTerm", "cRate"].forEach((id) => $(id).addEventListener("input", updateCalc));

// --- Forms --------------------------------------------------------------
$("valuationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = new FormData(e.target).get("name") || "";
  e.target.reset();
  toast(`Thanks ${String(name).split(" ")[0]} — your free evaluation is on the way!`);
  $("valNote").textContent = "Demo: captured locally. Wire to email/Firebase for real delivery (see README).";
});
$("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = new FormData(e.target).get("name") || "";
  e.target.reset();
  toast(`Thanks ${String(name).split(" ")[0]} — I’ll be in touch within one business day!`);
  $("contactNote").textContent = "Demo: captured locally. Wire to email/Firebase for real delivery (see README).";
});

// --- Mobile nav + misc --------------------------------------------------
const navToggle = $("navToggle"), navLinks = $("navLinks");
navToggle.addEventListener("click", () => { const o = navLinks.classList.toggle("open"); navToggle.setAttribute("aria-expanded", o); });
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => navLinks.classList.remove("open")));

let toastTimer;
function toast(msg) {
  const t = $("toast"); t.textContent = msg; t.hidden = false;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.classList.remove("show"); setTimeout(() => (t.hidden = true), 250); }, 3200);
}
$("year").textContent = new Date().getFullYear();

// --- Init ---------------------------------------------------------------
renderFilters();
renderGrid();
updateCalc();
loadBg("hero", "__hero", CONFIG.heroQuery);
loadBg("aboutPortrait", "__agent", CONFIG.agentPortraitQuery, (p) => p.src.large);
hydrateImages();
