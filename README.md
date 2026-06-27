# Real Estate Agent Framework — "Sarah Coleman Realty"

A sellable **real-estate agent** website: featured property listings with a detail modal,
a **mortgage calculator**, an agent bio with stats, a **free home-evaluation (seller) form**,
testimonials, and a book-a-showing flow. Pure HTML/CSS/JS, no build step, hosts free on
GitHub Pages.

Built on the shared design-system starter kit, re-skinned upscale **navy + gold** with serif
headings, and reuses the catalog-grid + Pexels-image pattern from the other frameworks.

## Why it sells to agents

Solo agents need a personal site that does three jobs — **show listings**, **capture buyer
leads** (book a showing), and **capture seller leads** (home valuation). This template does
all three, plus a mortgage estimator to keep visitors engaged.

## Features

- **Listings grid** — filter by property type (House / Condo / Townhouse) and sort by price,
  bedrooms, or size. Status badges (New / Open House / Just Listed / Sold).
- **Property detail modal** — full specs (beds, baths, sqft, year, garage, lot), features,
  and "Book a showing" (prefills the contact form) / "Estimate mortgage" (loads the price
  into the calculator).
- **Mortgage calculator** — live monthly payment from price, down payment, amortization, and
  rate. Estimate only.
- **Agent about** section with credibility stats and badges.
- **Free home-evaluation form** (seller lead capture) + **contact / showing form** (buyer lead).

## Personalising for a client

1. **Brand & colours** — `:root` tokens in `styles.css`; agent name + brokerage in
   `index.html` (header, hero, about, footer).
2. **Listings** — edit the `LISTINGS` array in `app.js` (price, address, area, type, beds,
   baths, sqft, year, garage, lot, optional `badge`/`badgeAlt`/`badgeSold`, `features`, and
   a Pexels `query`).
3. **Real photos** — give a listing an `image:` path (e.g. `image:"assets/123-maple.jpg"`),
   and set the agent's real headshot. Real listing + headshot photos are what convert.
4. **Forms** — wire the valuation + contact forms to **Formspree** or a **Firebase** `leads`
   collection (the two highest-value lead sources for an agent).

## Local preview

```bash
python3 -m http.server 5550   # then open http://localhost:5550
```

## Notes

- Pexels photos are demo placeholders (free key, same as the other frameworks), cached in
  `localStorage`. Swap for the client's real photos when sold.
- Demo only — the footer notes it's not affiliated with any real brokerage; update the
  brokerage, license #, and MLS disclaimers for a live agent.
- Hosting upgrade path for paying clients: Netlify / Cloudflare Pages + custom domain.
