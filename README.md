# Forum EHTP-Entreprises — FORGE

Static website: open `index.html`, or preview with:

```sh
python -m http.server 4173 --directory website
```

From the project root, open http://localhost:4173. No build or package installation is required. All images, scripts, styles and available PDFs live inside `website/`; Google Fonts has system-font fallbacks.

## Identity

Based on the local FORGE REFINED sponsorship and PFE dossiers. The official anniversary SVG is reused without changing its geometry. Shared tokens in `style.css` define black `#080808`, steel `#1A1A1A`, crimson `#C41230`, chrome `#E8203A`, white, and the supplied eight-stop metallic gradient. Public Sans is used for reading and headings, IBM Plex Sans Condensed for labels and figures, and Source Serif 4 for quotations.

## Content and interactions

- `index.html`: Forum, event film, partner directory and testimonials, publications, committee and direct contact links.
- `archives.html`: all 18 existing archive entries plus the available March 2026 edition, with accent-insensitive search.
- `script.js`: accessible mobile navigation, active section indication, company-based testimonial selection (buttons, previous/next and keyboard), archive search, and one-time entrance animations that respect reduced motion. There is no automatic modal or countdown.
- The event film uses the original YouTube destination and its thumbnail, saved locally as `assets/forum-film.jpg`.

Event dates have not been announced; the old April dates are removed. Existing contact details are retained. The team photo is labeled as the 29th edition. Partner names/categories remain from the source site, with historical wording instead of implying confirmed sponsorship of the upcoming edition. Conflicting attendance/partner statistics have been replaced by edition, event duration and shared ambition indicators.

Publication PDFs are organized under `publications/forumistes/` and `publications/revues/`. The April 2026 Forumiste is featured on the homepage; April and March are embedded in `archives.html`. ATRIUM 29 is available in the archive and its 112-page PDF is embedded there. Other Forumiste editions remain marked unavailable. Participation links lead to the contact section because the original `participer.html` did not exist.

## Verification

Chromium checks covered both pages at 320, 390, 560, 768, 800, 801, 1024, 1440 and 1920px; local files and anchors; image loading; menu focus, Escape and contact navigation; testimonials; partner expansion; the PDF download; archive search, empty state and reset; reduced motion; and navigation with JavaScript disabled. Desktop and mobile screenshots were reviewed.

## Reserved images and credits

Sponsor categories use wrapping flex layouts with 53 downloaded logos across 54 slots (ONCF appears twice). Files live in `assets/sponsors/`; `sources.json` records the exact public source URL, original dimensions and SHA-256 hash for each asset. Original colors and image proportions are retained. Per-image CSS scale variables balance source files with large blank margins; original downloads are unchanged. Logos have empty alternative text because the adjacent caption already identifies the company. All logo requests are local and lazy-loaded. Contact portraits have reserved 3:4 `.portrait-slot` containers with decorative initials. To add an informative portrait, insert its image with alternative text and remove `aria-hidden` from that container. No portrait images are populated yet.

Current design and development: [Adam Salhi](https://www.linkedin.com/in/asalhi1/). Initial development credit: Imane Elabbadi. Both pages share these footer credits. Inline SVG icons identify video, downloads, location, search and contact methods.

## School and anniversary structure

The homepage now proceeds from the Forum and reasons to participate to its history, EHTP, event footage, partners, publications, committee and contact. Both page menus link to `#histoire` and `#ecole`; navigation collapses at 1050px. The existing campus photograph is moved into the school profile. The timeline references the first edition and documented recent editions, without assigning a year or date to the upcoming 30th edition.

References reviewed on 16 September 2026:

- https://www.forum-ecc.ma/ — inspiration for separating the event introduction, participation benefits, team, partners and retrospective. Text and visual identity were not copied.
- https://www.forumemientreprises.com/ — requested reference; both web preview and direct access returned HTTP 403, so its structure could not be verified.
- https://www.ehtp.ac.ma/presentation/ — EHTP's creation in 1971, Casablanca location, fields of engineering and research.
- https://www.ehtp.ac.ma/strategie-internationale-ehtp/ — international academic cooperation.
- Existing Forum film and committee photo — the 28th and 29th edition timeline links reuse the site's documented content.
