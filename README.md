# FleetIQ — Smart Food & Grocery Marketplace

FleetIQ is a modern, responsive concept website for an AI-powered food and grocery delivery marketplace. "Fleet" represents the intelligent delivery network connecting restaurants, grocery stores, riders, and customers.

**Tagline:** Everything you love. Delivered smarter.

## Sections
- Hero with live search, a personalized greeting line, and animated trust stats
- Explore Food — filterable category pills and restaurant cards with real food photography
- Grocery Shopping — category sidebar and product cards with real photography
- FleetIQ AI Food Assistant — mood-based recommendations (interactive)
- Live Order Tracking — animated delivery stepper and mini map
- Offers & Deals
- Personalized For You
- FleetIQ Advantage — animated business impact stats
- Sign-up / contact section
- Mobile bottom tab bar (Home / Search / Cart / Favs / Profile), synced to scroll position
- Responsive footer

## Dynamic interactions
- Category filtering on the Explore Food grid
- Tap-to-favourite hearts on every food card
- Live cart counter synced between the navbar and the mobile tab bar
- Animated count-up statistics that trigger on scroll
- AI Assistant mood chips with a simulated "thinking" delay and generated recommendation cards
- Auto-advancing live order tracker with a moving rider icon

## Design
Warm, premium food-app aesthetic:
- **Palette:** cream/white background, deep charcoal ink, coral/orange primary accent, gold and sage secondary accents
- **Type:** Fraunces (display headlines), Plus Jakarta Sans (body/UI), IBM Plex Mono (prices, times, data labels)
- **Icon:** custom delivery-bag + fork mark (`favicon.svg`), reused as the inline logo in the navbar and footer
- **Photography:** real food and grocery photos sourced from Unsplash (free to use under the Unsplash License), hotlinked directly from `images.unsplash.com` — no local image assets required

## Tech
- HTML5, CSS3, vanilla JavaScript
- Google Fonts (Fraunces, Plus Jakarta Sans, IBM Plex Mono) loaded via CDN link tags
- Food photography hotlinked from Unsplash's CDN
- No build step, no other dependencies

> Note: because photos are hotlinked from Unsplash, an internet connection is required to see them. For a production deployment, consider downloading the images and serving them from your own `/assets` folder for reliability.

## Run locally
Open `index.html` in any modern browser.

## GitHub Pages
1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, `favicon.svg`, `README.md`.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**, choose `main` and `/root`.
5. Save and open the generated Pages URL.

> This is an educational/demo website created to demonstrate AI-assisted website generation. Figures are illustrative.
