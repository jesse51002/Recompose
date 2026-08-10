# Duda as a White-Label Website-Builder Supplier to SaaS Platforms: Vendor & Competitive Assessment

## TL;DR
- **Duda is a genuinely entrenched incumbent in the "website builder embedded into vertical SaaS" slot — an estimated $41.2M ARR for 2024 (up from $14.2M in 2023), 382 employees, 22.8K customers per Latka, and a VENDOR-CLAIMED "22,000+ organizations / 1M+ active sites" — but it is architecturally a canvas/section editor, and the AI it ships today is content-population inside templates, not layout synthesis.** The switching cost is integration depth (REST API, SSO, custom widgets) and incumbency of existing partner contracts, not data lock-in (sites export as static HTML/CSS/JS on Agency+ plans).
- **The single most important recent development cuts against the "editor-centric = structurally stuck" thesis: on January 28, 2026 Duda shipped "Populate Template with AI," an API-first feature aimed explicitly at SaaS platforms that combines AI-generated per-client content with platform-controlled templates.** This is Duda explicitly answering the "AI-native for platforms" demand — though it remains template + AI content, not free-form generation.
- **Partner/embed economics are opaque and the flagship partner statistics are not backed by any published study.** Duda's "Custom" plan is negotiate-only; no hard per-site volume rate, setup fee, or minimum is publicly documented anywhere. Duda takes **no revenue share** on partner widgets. The "25% lower churn / 29% higher MRR" partner claims are uncited marketing copy (the 29% traces to a single self-reported customer, Broadly).

## Key Findings

1. **Company scale (VENDOR-CLAIMED headline / ESTIMATED financials).** Duda repeats "More than 22,000 organizations have trusted Duda to build 1 million active websites" across all 2025–2026 PR. Latka estimates $41.2M ARR for 2024 (up from a $14.2M 2023 figure), ~382 employees "as of 2026," and 22.8K customers. Total raised is $96.2M across 7 rounds per Latka (Duda's own 2021 PR and other trackers round this to "$100M+"); last round was a $50M Series D in June 2021, led by Claridge IL with Susquehanna Growth Equity and Vintage Investment Partners. No round since 2021 — five years of no fresh primary equity as of this writing.

2. **The "1M sites" and "22,000 orgs" figures are unaudited and their composition is UNKNOWN.** Duda does not break out agencies vs. SaaS-platform partners vs. direct SMBs. The org figure grew from "over 17,000" (2021 Series D PR) to "20,000" (LinkedIn/older PR) to "22,000+" (2025–2026 PR). The "1 million" site figure has been static across 2021→2026 PR while the org count rose — treat it as a rounded marketing constant, not a tracked metric. One independent corroboration exists: BuiltWith's tracker (trends.builtwith.com/cms/Duda) counts 995,599 live Duda websites plus 604,687 historical, which supports the ~1M *live* order of magnitude even though Duda never defines "active" (live-and-paid vs. ever-published).

3. **Partner/embed pricing is genuinely undisclosed (MEASURED negative result).** Public plans: Basic $19/mo, Team $29/mo, Agency $52/mo, White Label $149/mo; extra sites $17–19/mo; eCommerce add-ons $8/$22/$49 per site/mo. White-label requires the White Label or Custom plan. The Custom (SaaS/embed) plan is described by Duda only as "negotiate discount and tiered pricing when purchasing or committing to sites at scale." A dedicated subagent search across Reddit, Indie Hackers, G2/Capterra/Trustpilot, and agency blogs found **no leaked negotiated dollar figure** — no per-site volume rate, no platform/setup fee, no annual minimum, no contract size. One third-party blog estimate ($25–$35/site/mo with volume breaks at 10+/50+) is unverified and internally inconsistent with Duda's own published $17. Duda's legacy public model separated an account fee ($348/yr) from per-site subscriptions ($168/yr), suggesting the Custom structure is likely "platform fee + tiered per-site."

4. **Revenue share: CONFIRMED none on partner widgets (VENDOR-CLAIMED, first-party).** Duda's blog states "Duda does not implement any kind of revenue sharing model on these widgets," and Duda does not facilitate payment for custom widgets sold between accounts. Duda monetizes via plan fees + per-site subscriptions + eCommerce add-ons + App Store apps billed to the account owner. There is no affiliate/reseller commission program. Partners keep 100% of what they charge their own clients — Duda's take is purely its platform + per-site fees.

5. **Customer ownership favors the platform (VENDOR-CLAIMED).** Duda says client accounts receive fully white-labeled communications, Duda never contacts the partner's clients directly, and "your customers are your own. Full stop." SSO + bi-directional REST API keep the SaaS platform as system of record.

6. **Exit is real but lossy (MEASURED, first-party support docs).** Site export is available on Agency plan and higher: a .zip of published HTML/JS/CSS/images "formatted to be installed on web servers" that "will work without needing the website editor." BUT: exported sites lose all dynamic features (personalization, contact forms, tracking), exports cannot be re-imported into Duda, three device-specific HTML folders are generated (a dynamic-serving artifact), and "additional development will be needed." So content is portable as a static snapshot but the live, editable, dynamic site is tied to Duda's runtime. Third-party migration shops (WebOption) state "Duda doesn't export code, the design is recreated in WordPress" for a usable CMS — i.e., practical migration is a rebuild.

7. **What the AI actually does (MEASURED via docs + hands-on reviews): template + AI content, NOT layout synthesis.** Duda's own docs describe "Populate Template with AI," "File to Site" (generates sitemap/design/draft content from a brief), "Generate Page Layout" that lets you pick from "over 200 section layouts," and AI section generation. A hands-on review (MakingThatWebsite) confirms: "The auto-generated layout comes with AI-generated content for each section." The Jan 2026 press release explicitly frames Duda's approach against free-form generation: "AI-generated, or 'vibe coded,' websites suffer from unpredictable, often generic, designs... Populate Template with AI overcomes this by combining [templates] with... content generated programmatically by AI." Duda's own developer docs concede the boundary: "The allure of pure-API website design fades once you consider the complexity of design and the limitations of the browser's DOM." **The boundary is explicit: Duda generates content and assembles pre-built sections into templates; it does not synthesize novel layout/structure.**

8. **Counter-evidence to the "structurally stuck" thesis (MEASURED).** Per Duda's press release (blog.duda.co, Jan 28, 2026): "Duda... today announced the release of their new 'Populate Template with AI' feature. Available initially via Duda's API... The feature was developed in response to the unique needs of SaaS companies," who "need more control over the appearance, performance, and functionality" of AI sites. Platforms customize templates per-vertical and embed proprietary widgets. This is Duda moving toward the exact "AI websites for platforms" positioning — but it is a template-population approach, deliberately NOT layout generation. The architecture constraint is real, but Duda has turned it into a positioning ("controlled, high-quality, SEO-safe AI" vs. "generic vibe-coded slop").

9. **Architecture is a section/canvas editor with dynamic per-device serving on a proprietary runtime (MEASURED/ESTIMATED).** Sites are hosted only on Duda (AWS + CloudFront); "dynamic serving of content by device" generates three HTML variants; dynamic features depend on Duda's runtime. This is why a "you don't edit anything / regenerate on demand" AI-native model is hard for Duda: their value, tooling, billing, and 200+ section-layout library are all built around a human (or client) editing a persistent canvas. Ripping that out contradicts the product's core loop and its per-site monetization.

10. **SEO / Core Web Vitals: legitimately strong (MEASURED, third-party corroborated).** HTTP Archive's CrUX-based Core Web Vitals Technology Report has repeatedly ranked Duda #1 among CMS platforms for share of sites passing CWV. Search Engine Journal (April 2024 report) stated: "Duda is clearly the Core Web Vitals performance champ, outscoring every content management system in this comparison... 71% of website visits resulted in a good core web vitals score" — leading the second-place pack (Squarespace) by roughly 13 points; Duda's own blog now claims an 82–83.63% pass rate (VENDOR-CLAIMED, higher than the independent SEJ figure). Duda's own blog also states "the average Lighthouse score of websites built using Duda is 70," a "strong" but not "green" score. Duda outputs performance-tuned sites at platform scale, independently verified.

11. **Mobile: web + PWA only, no native apps (MEASURED/first-party).** Duda supports Progressive Web Apps (add-to-homescreen, service workers, Chrome/Android + limited iOS). There is NO native iOS/Android app SDK for partners. Confirmed: Duda is strictly web/PWA. For a vertical SaaS whose value includes a native member/customer app (e.g., church, fitness), Duda does not touch that layer.

12. **Named SaaS-platform partners (see master table).** Documented Duda-powered platforms: a hospitality PMS (anonymized case study), Moovs (private transportation), Retailgear (retail webshops), Doo.net, Broadly (reputation/marketing SaaS), AppFolio (property management case study), 1&1 (host self-service builder), and Constructiv Digital (construction, 2026 partnership). Many named "SaaS success stories" are anonymized. Several checklist platforms are NOT Duda: Vagaro (MySite, in-house auto-syncing builder), Luxury Presence (in-house "Presence Platform"), Clio (in-house law-firm website builder), Subsplash (in-house church builder), Popmenu/BentoBox (in-house restaurant builders). GoHighLevel uses its own funnel/site builder. This confirms the category pattern: the biggest, best-funded verticals build in-house; Duda wins the platforms that don't want to build it.

13. **Platform-side friction (MEASURED/ESTIMATED).** API rate limit hard cap 10 calls/sec (publish/unpublish 20/min) — a real constraint for mass provisioning. Partner API access requires the Custom plan and bespoke integration ("develop it from the ground up"). Duda's own docs warn the Partner API is a management/publish-at-scale API, not design-by-API. No native app layer. Custom-pricing opacity itself is procurement friction.

14. **Company-health signals (ESTIMATED/MEASURED).** No new funding round since June 2021. Revenue estimate roughly tripled 2023→2024 per Latka (unaudited). Headcount roughly flat (~381→382). No public evidence of layoffs or major executive departures found (Itai Sadan still CEO; not exhaustively confirmed). PE presence: Susquehanna Growth Equity, Claridge IL, Vintage.

15. **The competitive set in the same supplier slot (see below).** The clearest direct competitor selling a white-label builder TO platforms via API is **10Web**, which is explicitly AI-native and API-embeddable for SaaS/hosts/registrars. Vendasta resells a Duda-powered and WordPress-based "Website Pro" to agencies (and is itself a Duda customer). Others (Wix, Squarespace, Webflow, Elementor, Brizy, Bookmark) are largely sold to end-businesses or agencies, not embedded into third-party platforms as OEM infrastructure.

16. **Is there an AI-native supplier in this slot yet? Yes — and it's 10Web.** 10Web launched its AI Website Builder API on May 8, 2025 and markets it explicitly for platforms to embed: per 10web.io, "Most AI site builders stuff predefined templates with AI-generated content. 10Web does something different... a custom builder engine that creates fully tailored websites — not just pre-filled layouts... generates unique page structures," all "built on WordPress" (founder/CEO Arto Minasyan). So the "no AI-native supplier to platforms" claim is FALSE as of 2026 — 10Web occupies it (WordPress-based). And Duda itself now offers API-driven AI template population. No supplier found is simultaneously AI-native, non-WordPress, portable-output, and closing a business-outcome loop.

## Details

### P0 — Economics of a Duda partnership
- **Pricing (P0.1):** Public tiers are Basic $19 / Team $29 / Agency $52 / White Label $149 per month, with additional sites $17–19/mo; eCommerce add-ons $8/$22/$49 per site/mo. White-label requires the White Label or Custom plan. Custom = negotiate-only. **No negotiated partner figure is publicly documented** (subagent negative result across Reddit/IH/G2/Capterra/agency blogs). The only third-party estimate ($25–$35/site/mo) is unverified and inconsistent with Duda's published $17. Legacy structure hints at "platform account fee + per-site subscription."
- **Deal structure (P0.2):** No revenue share on partner widgets (first-party confirmed). Duda doesn't process the partner's client payments; the partner sets its own prices and keeps the margin. Contract length, auto-renewal, exclusivity, and co-branding restriction terms for the Custom plan are UNKNOWN (not published). Customer/domain/content relationship is designed to sit with the platform (white-labeled comms, SSO, API as system-of-record).
- **Exit/switching (P0.3):** Static export on Agency+ (HTML/CSS/JS/images), but dynamic features, forms, personalization, tracking, and editability are lost; no re-import; practical migration to WordPress is a rebuild per third-party migration shops. No documented case of a large platform migrating OFF Duda was found. Lock-in is runtime/dynamic-feature lock-in and integration sunk-cost, not raw content hostage.

### P1 — Who uses it
- Confirmed Duda-powered SaaS platforms: hospitality PMS (anonymized case study, "25%+ direct booking increase" claim), Moovs (transportation; "300 websites... 45,000 visitors"), Retailgear (retail; "35% of revenue from Duda-powered webshops"), Broadly (marketing SaaS; "29% higher MRR"), Doo.net, AppFolio (property management), 1&1 (host), Constructiv Digital (construction, 2026; "83% reduction in supplier website development time").
- NOT Duda (in-house): Vagaro MySite, Luxury Presence, Clio, Subsplash, Popmenu, BentoBox, GoHighLevel.
- **Composition of 22,000/1M (P1.5): UNKNOWN.** Duda does not disclose the agency/SaaS/direct split, nor sites-created vs. sites-live-and-paid.
- **Attach/usage inside partners (P1.6): UNKNOWN / not disclosed.** No cohort data on what fraction of a partner's tenants publish and maintain a Duda site is published by Duda or any partner. Stating this explicitly per instruction.

### P2 — Product & technical
- AI = template + AI content (see Finding 7). Roadmap velocity is content-AI-centric: 2025–2026 shipped Content Collection (Apr 2025), AI section/page generation, File to Site, MCP server/Copilot, and Populate Template with AI (Jan 2026). Evidence points to AI work concentrated in content generation and template population inside the existing editor, NOT a move to free-form layout synthesis. Architecture (proprietary runtime, per-device dynamic serving, section-library editor) makes a "no-edit / regenerate" model contrary to Duda's core loop and per-site monetization. CWV/SEO is a real, independently verified strength. Mobile is web/PWA only, no native app SDK.

### P3 — Health & vulnerability
- No funding since 2021; $96.2M raised total (Latka); growth-equity/PE-backed; ~382 employees, roughly flat; no confirmed layoffs or exec departures found; ARR estimated $41.2M (unaudited). Platform-side friction: 10 calls/sec API cap, Custom-plan-gated Partner API, bespoke integration lift, no native app, opaque pricing. No documented platform churn-off case found.

### P4 — Competitive set
- **10Web** — AI-native, WordPress-based, API-embeddable for platforms (AI Website Builder API launched May 8, 2025); the closest direct competitor in the exact supplier slot. **Vendasta** — resells Duda + WordPress "Website Pro" to agencies (a Duda channel, not a pure competitor). **Wix / Squarespace / Webflow / Elementor / Brizy / Bookmark** — primarily sold to end-users or agencies; limited/editor-centric OEM story. **B12** — AI website + services, sold mostly to end businesses, limited platform-OEM embed.
- **AI-native supplier to platforms exists (10Web); a non-WordPress, portable, outcome-closing AI-native supplier does not appear to exist yet.**

### Flagged claims that don't corroborate
- **"25% lower churn / 29% higher MRR" partner stats: NO published study.** Verbatim from Duda's homepage: "SaaS companies who offer websites with Duda report 25% lower customer churn rates, higher product adoption rates, 29% higher monthly recurring revenue, and greater customer satisfaction scores." No sample size or methodology is given. The Jan 2026 press release restates the churn figure as passive-voice copy ("has been shown to reduce customer churn by nearly 25%") with no citation. Duda's success-stories page lists "29% higher MRR · SaaS DIFM" and "24.7% reduced churn · Agency DIFM" as separate single-customer anecdotes; the 29% traces specifically to the Broadly case study, self-reported and generalized into homepage copy. Duda also cites a Vendasta multi-product-retention stat as third-party support.
- **"Top platform for Core Web Vitals":** this one DOES corroborate via HTTP Archive/CrUX and Search Engine Journal (71% pass rate, independently measured).
- **"22,000 orgs / 1M sites":** VENDOR-CLAIMED and unaudited; composition undisclosed; "1M" static since 2021; the live-site order of magnitude is independently corroborated by BuiltWith (995,599 live).

## Master Table

| Platform | Vertical | Builder supplier | Builder depth | Tenant pays separately? | Consumer marketplace? | Shared CMS w/ mobile app? | Evidence | Source quality |
|---|---|---|---|---|---|---|---|---|
| Vagaro (MySite) | Salon/spa/fitness | In-house | Template + auto-sync | Bundled/add-on | Yes (Vagaro marketplace) | Yes (native app) | BusinessWire launch, Vagaro docs | MEASURED |
| Luxury Presence | Real estate | In-house ("Presence Platform") | Template + concierge/custom | Yes (subscription) | No | Mobile CMS, no separate app | Company site, Crunchbase | MEASURED/VENDOR |
| Clio | Legal | In-house | Template | Add-on | No | No | Clio site, Techcouver | MEASURED |
| Subsplash | Church | In-house | Drag-drop template | Bundled | No | Yes (native app core) | Subsplash site | MEASURED |
| Popmenu | Restaurant | In-house | Template + menu SEO | Yes | Ordering (DoorDash Drive white-label) | No | BentoBox/BOH reviews | MEASURED |
| BentoBox | Restaurant | In-house (Fiserv-owned) | Template | Yes | Ordering | No | Perfectvenue, getbento | MEASURED |
| GoHighLevel | Agency/home svcs | In-house (funnels/sites) | Funnel/site builder | Sub-account | No | No | Contractor ToolStack | MEASURED |
| Broadly | Reputation/marketing SaaS | **Duda** | Template + custom sections | Yes ($99/mo) | No | No | Duda case study | VENDOR-CLAIMED |
| Moovs | Transportation | **Duda** | Template + booking widget | Yes | No | No | Duda case study | VENDOR-CLAIMED |
| Retailgear | Retail | **Duda** | Dynamic CMS webshop | Yes | No | No | Duda case study | VENDOR-CLAIMED |
| AppFolio | Property mgmt | **Duda** | Template | Add-on | No | No | Duda case study | VENDOR-CLAIMED |
| 1&1 | Host/SMB | **Duda** | Self-service DIY | Yes | No | No | Creative-Tim/Duda | ESTIMATED |
| Constructiv Digital | Construction | **Duda** | Template + lead routing | Yes | Marketplace (iseekplant) | No | Duda blog (2026) | VENDOR-CLAIMED |
| Hospitality PMS (anon) | Hospitality | **Duda** | Template + booking | Yes | No | No | Duda case study | VENDOR-CLAIMED |

```csv
platform,vertical,builder_supplier,builder_depth,tenant_pays_separately,consumer_marketplace,shared_cms_with_mobile_app,evidence,source_quality
Vagaro (MySite),Salon/spa/fitness,In-house,Template + auto-sync,Bundled/add-on,Yes (Vagaro marketplace),Yes (native app),BusinessWire launch + Vagaro docs,MEASURED
Luxury Presence,Real estate,In-house (Presence Platform),Template + concierge/custom,Yes (subscription),No,Mobile CMS no separate app,Company site + Crunchbase,MEASURED/VENDOR
Clio,Legal,In-house,Template,Add-on,No,No,Clio site + Techcouver,MEASURED
Subsplash,Church,In-house,Drag-drop template,Bundled,No,Yes (native app core),Subsplash site,MEASURED
Popmenu,Restaurant,In-house,Template + menu SEO,Yes,Ordering (DoorDash Drive white-label),No,BentoBox/BOH reviews,MEASURED
BentoBox,Restaurant,In-house (Fiserv-owned),Template,Yes,Ordering,No,Perfectvenue + getbento,MEASURED
GoHighLevel,Agency/home services,In-house (funnels/sites),Funnel/site builder,Sub-account,No,No,Contractor ToolStack,MEASURED
Broadly,Reputation/marketing SaaS,Duda,Template + custom sections,Yes ($99/mo),No,No,Duda case study,VENDOR-CLAIMED
Moovs,Transportation,Duda,Template + booking widget,Yes,No,No,Duda case study,VENDOR-CLAIMED
Retailgear,Retail,Duda,Dynamic CMS webshop,Yes,No,No,Duda case study,VENDOR-CLAIMED
AppFolio,Property management,Duda,Template,Add-on,No,No,Duda case study,VENDOR-CLAIMED
1&1,Host/SMB,Duda,Self-service DIY,Yes,No,No,Creative-Tim/Duda,ESTIMATED
Constructiv Digital,Construction,Duda,Template + lead routing,Yes,Marketplace (iseekplant),No,Duda blog (2026),VENDOR-CLAIMED
Hospitality PMS (anon),Hospitality,Duda,Template + booking,Yes,No,No,Duda case study,VENDOR-CLAIMED
```

## What the evidence does and doesn't support

**Established fact:**
- Duda sells an embeddable white-label builder to SaaS platforms via REST API + SSO; white-label requires the White Label or Custom plan.
- Duda takes no revenue share on partner widgets; monetization is plan + per-site + add-ons.
- Site export exists (Agency+) but yields a static, non-editable, dynamic-feature-stripped snapshot; live sites are runtime-locked.
- Duda's AI today is template population + AI content, not layout synthesis — confirmed by Duda's own docs and press.
- Duda leads independent Core Web Vitals rankings (HTTP Archive/CrUX; SEJ 71% pass rate); ~1M live sites corroborated by BuiltWith (995,599).
- Duda is web/PWA only, no native app SDK for partners.
- On Jan 28, 2026 Duda shipped API-first "Populate Template with AI" targeting SaaS platforms.
- The biggest verticals (Vagaro, Luxury Presence, Clio, Subsplash, Popmenu, BentoBox) build in-house.
- 10Web is an AI-native, API-embeddable, WordPress-based supplier occupying the same platform-supplier slot (API launched May 8, 2025).

**Open / unverified:**
- Negotiated Custom/embed pricing (per-site, setup, minimums, contract size) — UNKNOWN, no leak found.
- Custom-plan contract terms (length, auto-renewal, exclusivity, co-branding) — UNKNOWN.
- Composition of "22,000 orgs / 1M sites" (agency vs SaaS vs direct; created vs live-paid) — UNKNOWN.
- Attach/retention of the builder inside partner tenants — UNKNOWN, not disclosed.
- "25% lower churn / 29% higher MRR" — NOT supported by any published study; single-anecdote origin.
- Any documented platform migrating off Duda — NOT FOUND.
- Duda layoffs/exec departures — none found (not exhaustively confirmed).

## Caveats
- Nearly all partner outcome metrics and the 22,000/1M scale figures are VENDOR-CLAIMED and unaudited; treat directionally. (The live-site count is the exception, corroborated by BuiltWith.)
- Negotiated pricing, contract terms, attach rates, and 22k/1M composition are genuinely UNKNOWN — not estimated here per instruction.
- Financials (ARR, headcount) are third-party ESTIMATES (Latka), not audited.
- Some case studies are anonymized; partner attributions rest on Duda's own case studies (self-selected, positive-outcome bias).
- Recency: Core Web Vitals leadership evidence includes 2021-era HTTP Archive coverage plus a 2024 SEJ measurement and 2026 restatements; the specific CWV ranking and pass-rate should be re-verified against the live HTTP Archive dashboard before relying on it. AI capability and pricing are the fastest-moving areas — re-verify within 90 days.
- No native-app or layoff/exec-departure searches returned positive results; absence of evidence is not proof of absence.
