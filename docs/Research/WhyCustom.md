# White-Label vs. Bespoke Mobile Apps Across Eight Verticals: What the Data Actually Shows

## TL;DR
- **In every one of the eight verticals, white-label/vendor platforms dominate the population of businesses that have a mobile app — plausibly 90%+ in most, and >97% in credit unions — with true bespoke builds concentrated almost entirely among large national chains, megachurches, and the biggest brokerages that can staff an engineering team.** No precise per-vertical split can be measured from public data; the honest answer for every vertical is a bounded estimate with the derivation shown below.
- **App-store SDK counting (42matters / Sensor Tower–MightySignal / Apptopia / AppBrain) cannot produce a clean split**, because most white-label church/community/fitness apps are "container" or multi-tenant apps (one app listing, thousands of tenants). The strongest public denominators are instead vendor-disclosed tenant counts (Subsplash 20,000+ churches, Trainerize 400,000+ trainers, Toast ~164,000 locations, Alkami/Q2/Banno client counts from SEC filings) checked against industry population figures (NCUA ~4,300 credit unions; Hartford ~373,000 congregations).
- **On why the few who go custom go custom: control/data/integration is the dominant documented driver, followed by cost-at-scale and functional walls; design/brand almost never appears as the SOLE reason** in any credible first-hand account — it always travels with a functional, cost, or control driver. Reverse migrations (Red Lobster, Bloomin'/Brinker/Papa Murphy's back to Olo) suggest the stated build reasons often don't hold up over a multi-year horizon.

---

## Key Findings

1. **There is no reliable public number for the white-label-vs-bespoke split in any vertical.** Every figure below is a bounded estimate with the method shown. The paywalled SDK tools (Sensor Tower/MightySignal, Apptopia, 42matters) were not directly queryable within this research; their published material describes methodology (42matters detects SDKs across 19M+ apps and reports "SDK market share per category") but does not publish the specific platform-SDK counts needed for a census.

2. **The container-app problem breaks SDK counting.** Subsplash explicitly runs BOTH models: a standalone custom-branded app published under the church's own Apple/Google developer account, AND "The Church App" (TCA), a single container app that houses thousands of churches under one app-store listing (Subsplash's own support docs: "The Church App (TCA) is a container app built by Subsplash, which houses many of our apps all under a single roof"). The same pattern holds for Planning Center's Church Center, Tithe.ly's Church App, and Pushpay's My Church. A church inside a container app is invisible as a distinct app-store entry, so an app-store census dramatically UNDERcounts white-label tenants — and that error always inflates the apparent bespoke share.

3. **Vendor-disclosed tenant counts are the most reliable denominators available**, especially where they come from SEC filings (Toast, Olo, Alkami, Q2, ServiceTitan) rather than marketing pages (Trainerize, Subsplash, Vagaro, Mindbody).

4. **Design/brand as a SOLE stated reason for a bespoke build does not appear in credible first-hand evidence.** Across roughly a dozen documented cases, not one cited design alone with no functional, cost, or control driver behind it.

---

## Details — Q1: The Split, Per Vertical

### Method and source-quality ladder
- **Measured count** = a number a company or regulator published (SEC filing, NCUA data).
- **Inference** = a derived ratio combining two measured counts.
- **Estimate/guess** = reasoned bounding where no clean count exists; labeled as such.

A structural point applies to all eight verticals: **"has an app at all" is a much smaller set than "is a business in the vertical."** Most small churches, independent salons, solo agents, and small gyms have no dedicated app. So the meaningful ratio — share of *app-having* businesses on white-label — runs much higher than white-label tenant count ÷ total business population.

---

### 1. Fitness / Gyms
- **Population:** Hundreds of thousands of US fitness businesses and independent trainers.
- **White-label tenant counts (measured, vendor marketing):** ABC Trainerize markets "Over 400,000 personal trainers and coaches," "Over 45,000 health and fitness businesses," and "Over 1,600,000 clients" on its own site — explicitly flagged by an independent reviewer (coachway.io) as "a vendor marketing figure rather than an independently" audited number. Trainerize's custom-branded app is a **one-time $169 setup on Pro-tier plans** — i.e., a skin inside a multi-tenant platform, not a distinct bespoke build. Mindbody claims "35,000+ business subscribers." Other white-label: Glofox, Mariana Tek, Zen Planner, WellnessLiving, Vagaro (fitness side).
- **Bespoke:** Concentrated among national chains and well-funded D2C brands (Peloton, Equinox, Planet Fitness, Orangetheory). Independent studios essentially never build bespoke.
- **Derivation:** Because Trainerize's 45,000 businesses appear inside its platform (not as 45,000 distinct app-store bespoke apps), bounding the universe of fitness businesses with any branded app at ~50,000–100,000 (Trainerize + Mindbody + Glofox + others, minus overlap) against fewer than a few hundred true bespoke chain apps yields a bespoke share of roughly **1–5%**.
- **Bounded estimate:** White-label **93–98%** of fitness businesses with an app; bespoke **2–7%**, concentrated in national chains. *Confidence: low-moderate; inputs are unaudited vendor marketing counts.*

---

### 2. Churches
- **Population (measured):** Hartford Institute estimates ~373,000 US religious congregations (midpoint of US Religion Census 2020's 356,642 and Brauer 2017's 384,000).
- **White-label tenant counts:** Subsplash "serves over 20,000 churches and ministries" as of 2025, "including 50 of the top 100 churches in America" (an earlier company blog cited "almost 16,000," showing rapid growth); Subsplash was acquired by Roper Technologies in July 2025 for $800M. Pushpay, Tithe.ly, and Planning Center (Church Center) each serve additional thousands to tens of thousands.
- **Container caveat:** Many of these tenants live inside container apps, not standalone app-store listings, so an SDK census badly undercounts them.
- **Bespoke:** Almost nonexistent at the individual-church level. The one giant exception — Life.Church's YouVersion Bible App (1B+ installs) — is a product built in-house *before* white-label vendors existed, not a typical "church app"; Life.Church even gives its Church Online Platform to other churches free.
- **Derivation:** Summing major-platform tenants (Subsplash 20,000 + Pushpay + Tithe.ly + Church Center) gives on the order of 40,000–60,000 congregations on a major app/giving platform — roughly 11–16% of ALL 373,000 congregations. But most of the other ~313,000 congregations have no app at all. Among churches that *have* a dedicated app, bespoke builds are a rounding error.
- **Bounded estimate:** White-label **97–99.5%** of churches with an app; bespoke **<1–3%**. *Confidence: moderate; solid denominator, directionally reliable vendor counts.*

---

### 3. Restaurants
- **Population:** ~1 million+ US restaurant locations.
- **White-label / vendor counts (measured, SEC/press):** Toast reported **approximately 164,000 live locations as of Dec 31, 2025, up 22% YoY** (Q4 2025 results); CEO Aman Narang said on the earnings call that Toast now powers **~20% of US SMB and mid-market restaurants** (~15% of the total US market per the FY2024 10-K), having added "a record 30,000 net locations in 2025." Olo enables "over 800 brands… across approximately 90,000 locations" (company site; ~88,000 active locations as of Q1 2025 per earnings).
- **Critical vertical dynamic:** Olo and Toast frequently power ordering *inside* apps that are themselves custom-built. A large chain's branded app (Chipotle, Starbucks) is bespoke on the front end but may run Olo's "Serve" white-label ordering engine or Toast's APIs underneath — so "carries an Olo/Toast SDK" ≠ "is a white-label app." This makes SDK detection especially misleading here.
- **Bespoke:** Real bespoke consumer apps cluster among large chains. Independent restaurants overwhelmingly have NO own-brand app and rely on Toast/Olo web ordering or third-party marketplaces (DoorDash/Uber Eats).
- **Bounded estimate:** Among restaurant BRANDS with a dedicated consumer app: large chains skew bespoke-front-end-with-vendor-rails; SMB brands with an app skew white-label. Because so few independents have their own app, of the subset that do, roughly **50–75%** are white-label front ends and **25–50%** are bespoke fronts (usually still carrying a vendor ordering SDK). *Confidence: low; the build/buy line is blurred by the rails-inside-custom-app pattern.*

---

### 4. Salon / Spa
- **Population:** Hundreds of thousands of US salons, spas, and barbershops.
- **White-label counts (measured, marketing):** Vagaro "serves over 220,000 beauty and wellness businesses"; Mindbody "35,000+ business subscribers"; plus Booksy, Fresha, GlossGenius. These are largely marketplace apps — the consumer books through the Vagaro/Mindbody/Booksy app or a white-label branded add-on.
- **Bespoke:** Essentially nonexistent below the large-chain level.
- **Derivation:** Vagaro alone (220,000 businesses) dwarfs any plausible count of bespoke salon apps (tens, at most). The marketplace-app model means most salons never have a standalone app — they are a listing inside Vagaro/Booksy.
- **Bounded estimate:** White-label **>98%**; bespoke **<2%**, limited to national chains. *Confidence: moderate.*

---

### 5. Real Estate
- **Population:** ~1.5 million US Realtors; ~100,000 brokerages.
- **Reality:** Most agents do NOT have their own app. They rely on (a) portal apps — Zillow, Redfin, Realtor.com; (b) brokerage-provided apps; and (c) CRMs (Follow Up Boss, kvCORE). White-label vendors like HomeStack build branded apps for brokerages/teams.
- **Bespoke:** Confined to the largest brokerages with engineering orgs — Compass (three proprietary native iOS apps: consumer, agent, open-house) and REAL/Real Broker ("builds most of its technology in-house").
- **Bounded estimate:** Of the minority of real-estate businesses with their OWN branded app: white-label (HomeStack-type) **~70–85%**, bespoke **~15–30%** (skewed to a handful of large brokerages that account for a big share of transactions). The vast majority of agents have no proprietary app and live inside portal/brokerage apps. *Confidence: low; no clean denominator of "agents with own app."*

---

### 6. Community / Creator
- **Population:** Hundreds of thousands to millions of paid communities/creators globally.
- **White-label counts (measured, marketing):** Circle "5,000+ creators, 2M+ members"; Mighty Networks reports $500M cumulative host earnings (2025). Also Skool, Uscreen, Passion.io, Kajabi.
- **Container/multi-tenant caveat:** Circle and Mighty Networks run primary shared apps; a creator's community is a tenant inside them. A branded standalone app is a premium upsell (Mighty Pro, reported at roughly $28,000/yr, quote-based) — but even that is white-label, not bespoke.
- **Bespoke:** Only the largest creators/brands commission a truly bespoke native app; even they usually use a vendor SDK.
- **Bounded estimate:** White-label **>95%** of creators with any app presence; true bespoke **<5%**. *Confidence: low-moderate.*

---

### 7. Field Service
- **Population:** Hundreds of thousands of US trades/field-service businesses.
- **Vendor counts (measured):** ServiceTitan reported **approximately 10,800 total active customers as of its Q4 FY2026 results (up 14% YoY)**, with FY2026 revenue of $961.0M (up 24%) and GTV of $82.1B (an older Forbes figure of "11,800 trade customers" predates the current SEC-reported count). Plus Housecall Pro, Jobber, ServiceM8. These are operations platforms — the "app" is the technician/dispatch app, a multi-tenant vendor product, not a consumer-facing branded app.
- **Bespoke:** Consumer-facing branded field-service apps are rare; where they exist they cluster in large national franchises. Most SMB contractors use the vendor's technician app.
- **Bounded estimate:** For the operational/technician app, effectively **~100% vendor** (nobody builds their own dispatch stack below enterprise scale). For any consumer-facing branded app: white-label **~90%+**, bespoke a small national-franchise minority. *Confidence: low; the "app" definition is ambiguous in this vertical.*

---

### 8. Credit Unions (strongest denominator)
- **Population (measured, NCUA):** 4,411 federally insured credit unions as of March 31, 2025 (down from 4,571 in 2024); as of Dec 31, 2025 there were 4,287 (2,686 federal + 1,601 federally insured state-chartered). Call it ~4,300.
- **Vendor client counts (measured, SEC filings/press):**
  - **Alkami:** 301 digital-banking FI clients and 22.4M live registered users as of Dec 31, 2025 (10-K) — a mix of banks and credit unions.
  - **Q2 Holdings:** 457 installed digital-banking-platform customers and ~27.3M registered users as of Dec 31, 2025; 1,200+ total FI customers across all products, including over 50% of the top 100 US banks and credit unions (10-K).
  - **Banno (Jack Henry):** 300+ FIs live as of 2020 (grown since); Jack Henry serves ~11,300 clients overall.
  - Plus Fiserv, FIS, Candescent (ex-NCR/Digital Insight), Bankjoy, Lumin Digital, and CU-owned CUSO platforms.
- **Bespoke:** Vanishingly rare, and trade-press-labeled "unconventional": UW Credit Union (Madison, WI) and MSUFCU (Michigan State University FCU). Even MSUFCU has partly reversed toward a partnered CUSO model (Nextly) citing staffing challenges.
- **Derivation:** Nearly every US credit union offers a mobile app, and essentially all run a third-party digital-banking vendor. Summing vendor client counts across Alkami, Q2, Banno, Fiserv, FIS, Candescent, Bankjoy, and Lumin covers the full ~4,300 population several times over on a bank+CU basis. True in-house builders number in the low single digits to perhaps a dozen.
- **Bounded estimate:** White-label/vendor **~98–99.5%**; bespoke/in-house **<1–2%** (a dozen or fewer institutions). *Confidence: high — the only vertical where both the denominator and the vendor counts are solid and SEC-sourced.*

---

## Details — Q2: Why the Ones Who Go Custom Go Custom

### Evidence base and its limits
I assembled roughly a dozen documented cases. The evidence is **thin and heavily selection-biased**: the web is dominated by (a) vendor marketing framing build-vs-buy to sell a *different* platform, (b) app-dev agency case studies where operator quotes are curated by the paid vendor, and (c) SEO listicles. Genuinely independent first-hand accounts (engineering blogs, unsponsored interviews, operator forum posts) are rare and cluster in verticals with in-house engineering capacity (churches, credit unions, large brokerages). A critical structural finding: **in SMB verticals (small churches, boutique gyms, solo creators, individual agents), "going custom" almost always means switching to a DIFFERENT white-label vendor, not a true bespoke build.**

### Tally table

| Reason category | # of documented cases citing it | Evidence quality | Notes |
|---|---|---|---|
| **Control / data / integration** | 6 (Compass, REAL, UW CU, MSUFCU partial, HomeStack customers, Glofox refugee) | Strong for Compass/UW CU (named eng blog / named exec in reputable trade press); moderate elsewhere | The single most common driver — own the customer relationship, data, and leads |
| **Cost at scale** | 3 (Lumino, church→PWA/Buildify migrants, Uscreen refugee) | Moderate; often agency/vendor-sourced | Break-even math cited: per-tenant fees eventually exceed a dev team |
| **Functional wall** | 3 (Lumino multi-zone access control + API gaps, Compass workflow, MSUFCU "not keeping up") | Strong for Lumino (specific detail); strong for MSUFCU | Platform couldn't do a concrete needed thing |
| **Performance / reliability** | 2 (MSUFCU "not keeping up with the web," Lumino API instability) | Moderate-strong | Vendors too slow to evolve |
| **Design / brand differentiation** | 4 as a CO-driver (Lumino, HomeStack customers, Circle/Mighty testimonials, Mariana Tek marketing) | Weak-moderate; mostly vendor testimonials | Never appears alone |
| **Design / brand ALONE (no functional driver)** | **0** | — | **Not found in any credible first-hand case** |

### Category-by-category

**Control / data / integration — most common, best evidenced.**
- **Compass** (largest US residential brokerage by volume) built three proprietary native apps. Its engineering blog states the team was "very deliberate about building apps to serve the needs of specific users" and uses "the bare minimum" of open-source frameworks — tied to keeping the agent-client workflow and leads in-house rather than leaking them to portals. *Strong: named engineers, first-hand engineering blog.*
- **UW Credit Union** develops its mobile banking apps and card-reward programs in house; VP of E-Commerce Eric Bangerter told The Financial Brand, "We don't want to build tools that already exist and we can't improve on… Because we do the integration, we don't have some of these problems… we can collect data and integrate it into our other systems," adding that "people often tell us that our app does everything the Chase app does." *Strong: named exec, reputable trade press.*
- **HomeStack real-estate customers** (Shannon Gillette, Chase Cromwell, Kristin Halton): stop losing leads/data to Zillow/Redfin/Realtor.com. *Weak-moderate: quotes on the vendor's own marketing page, and HomeStack is itself white-label — so this is white-label-vs-portal, not custom-vs-white-label.*

**Cost at scale.**
- **Lumino Studios** (pseudonymous premium fitness brand, via agency Brocoders): "you're paying more the more successful you become," with break-even math around $100K–$150K/yr in platform fees ≈ the cost of a dev team. *Moderate: paid-agency case study, so ROI framing is self-serving.*
- **Church → PWA/Buildify migrants:** driven by Subsplash's $300–500/mo pricing and desire for code ownership. *Weak: partly vendor-sourced.*

**Functional wall.**
- **Lumino Studios:** the hardest-evidenced functional driver — bsport "didn't support open access control" for new multi-zone locations, and its API "couldn't support" user progress, coach reviews, and class ratings. *Strong on specificity.*
- **MSUFCU** (CDO Benjamin Maxim): vendors "were just not keeping up with what we needed to do… so we built our own apps, our own websites and our own online bank." *Strong: named exec, CUES/CU Management.*

**Performance / reliability.**
- **MSUFCU** as above ("not keeping up with how the internet and the web was evolving"). **Lumino** also reported API instability (a breaking endpoint change with no changelog). *Moderate-strong.*

**Design / brand differentiation — never alone.**
- **Lumino** leans heavily on brand ("we're not copy-cats… every app ends up looking identical… I can open any boutique fitness app and immediately know which software it's running on"; "generic gym app #37") — but sits on top of a hard functional wall (multi-zone access control). *Even the most design-forward case is not design-alone.*
- Circle ("how the platform looks and feels is really important to me") and Mariana Tek ("never puts its own branding in front of your clients") are the closest to design-alone, but both are (a) vendor testimonials and (b) platform-to-platform switches, not bespoke builds.
- **Bottom line: pure design-brand justification for a bespoke build does not appear in credible first-hand evidence — it always travels with a functional, cost, or control driver.**

### Reverse migrations (custom → back to platform) — highly informative
- **Red Lobster:** early Olo adopter → built homegrown digital ordering in 2023 → **rejoined Olo in 2025**. Per Olo's June 26, 2025 announcement, Red Lobster returned "after a brief departure to pursue an in-house digital ordering solution… citing the platform's enhanced capabilities, cost-effectiveness, and ability to keep pace with evolving technology trends." CMO Nichole Robillard: "While we gained valuable learning from our internal development efforts, we're thrilled to be partnering with Olo again." Olo CEO Noah Glass: "Red Lobster's return validates what we've always believed — that restaurants achieve better outcomes when they focus on what they do best." *Strong: named exec, press release corroborated by trade press.*
- **Bloomin' Brands** (Outback parent), **Brinker**, and **Papa Murphy's** all moved homegrown → Olo. Glass: "another anchor for our conviction that Olo's enterprise-grade SaaS platform will be a compelling alternative to the capex and opex of building in-house."
- **MSUFCU (partial reverse):** built everything in-house, then partnered with CUSO CU NextGen (Nextly) citing staffing challenges — a real signal that in-house builds can be unsustainable for mid-sized institutions.
- These reversals suggest the cost/functional case for building often does NOT hold up over a multi-year horizon once maintenance, staffing, and the vendor's own product velocity are priced in.

---

## Recommendations

1. **Do not attempt a precise SDK-based census.** For churches, community/creator, and fitness, the container/multi-tenant architecture means an app-store SDK count will systematically overstate the bespoke share. If you must run one, do it only in credit unions and restaurants, and treat the result as an *upper bound* on bespoke.
2. **Anchor every vertical on vendor-disclosed tenant counts vs. an industry population figure**, prioritizing SEC filings (Toast, Olo, Alkami, Q2, ServiceTitan) over marketing pages (Trainerize, Subsplash, Vagaro, Mindbody). Where only marketing counts exist, label them unaudited.
3. **If you need one defensible headline number, lead with credit unions** (~98–99.5% white-label/vendor), because it is the only vertical with both a hard denominator (NCUA ~4,300) and SEC-sourced vendor client counts.
4. **For Q2, weight the reverse-migration cases heavily.** Red Lobster and the Bloomin'/Brinker/Papa Murphy's → Olo moves are the strongest evidence that stated build reasons (cost, control, functionality) often don't survive contact with multi-year maintenance and vendor product velocity.
5. **Discount design-brand as a motive.** Any source claiming design alone drove a bespoke build should be treated as marketing. Benchmark to revisit: if you can find even two independent first-hand cases where design was the *sole* documented driver, revise this conclusion.
6. **Thresholds that would change the picture:** (a) if a major white-label vendor moves fully to standalone per-tenant app-store publishing, SDK counting becomes viable; (b) if per-tenant platform pricing rises faster than in-house dev costs fall (AI-assisted development), expect more mid-market bespoke builds and fewer reversals.

---

## Caveats
- **No precise split is measurable from public data in any vertical.** All eight figures are bounded estimates with the derivation shown; confidence is highest for credit unions and lowest for restaurants, real estate, and field service.
- **Vendor tenant counts are mostly marketing figures** (Trainerize, Subsplash, Vagaro, Mindbody, Circle) and are typically global, not US-only; SEC-sourced counts (Toast, Olo, Alkami, Q2, ServiceTitan) are more reliable but also often global.
- **Global vs. US:** Trainerize (400K), Toast, Olo, and Circle counts are worldwide; US-only shares would be smaller in absolute terms, but the white-label-dominance ratio holds.
- **The Q2 sample is small and selection-biased.** Companies that blog about custom builds are not a random sample, and agency/vendor case studies systematically overstate design as a motive. The strongest independent sources are the Compass engineering blog, CU Management (MSUFCU), and The Financial Brand (UW CU).
- **Definition ambiguity in field service and restaurants:** the "app" can mean an internal ops/technician app, a white-label ordering front end, or a bespoke consumer app carrying a vendor SDK — these blur the build/buy line.
- **The paywalled tools (Sensor Tower/MightySignal, Apptopia, 42matters SDK Explorer) were not directly accessible**; their free/published materials describe methodology but not the specific platform-SDK counts required, so no direct SDK census underlies these estimates. Where a "count" is a vendor marketing figure vs. a measured SEC/NCUA number vs. an inference, that distinction is labeled in-line above.