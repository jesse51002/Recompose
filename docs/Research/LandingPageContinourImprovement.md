# Ploy and the Category of AI Agents That Continuously Automate/Optimize Live Websites

### Source quality legend

Every material claim in this report carries one of three tags:

- **MEASURED** — traceable to a primary record: an SEC filing, a court document, a dated changelog or press release, a first-party engineering or product doc, or a verified public dataset. Highest confidence.
- **VENDOR-CLAIMED** — the company's own marketing, PR, case studies, or sales material. Includes all customer counts, logo walls, and lift percentages a vendor publishes about itself. Treat as directional, not established. Where a vendor reports a "revenue" figure extrapolated from a conversion-rate lift rather than realized in a ledger, that is noted inline.
- **ESTIMATED** — third-party analyst figures, traffic-tool inferences, review-count proxies, or this report's own reasoning from indirect evidence. Lowest confidence.

Where two sources conflict, both are shown and the conflict is named. Figures are never averaged across sources. Anything that could not be established under any of the three tags is marked **UNKNOWN** rather than inferred.

### The L0–L6 website depth ladder

This ladder was defined in the previous report in this series (website builders inside vertical SaaS) and is referenced throughout this one. It measures **how much of a website a system can change, and on what basis** — from no website at all up to a site that rewrites itself against business outcomes.

| Level | What it means |
|---|---|
| **L0** | No website offering at all. |
| **L1** | Hosted landing page, microsite, or embedded booking widget only — a single page or a component dropped into someone else's site. |
| **L2** | Template site, content-editable only. Pick a theme, swap logo, colors, copy, images. No structural control. |
| **L3** | Block/section editor. Add, remove, and reorder pre-built sections within fixed page types. The vertical-SaaS default. |
| **L4** | Free-form layout control or custom code injection — arbitrary positioning, custom CSS/HTML/JS, theme code editing. |
| **L5** | AI-generated site structure. The system synthesizes pages and sections rather than presenting a fixed menu of them. |
| **L6** | Closed-loop self-optimizing site: the system continuously changes the live site based on measured outcomes, feeding results back into the next change. |

**Two things to hold onto when reading L6.** First, L6 has a hidden variable — *what outcome the loop closes on*. Every product that reaches L6 today closes on an on-page or in-session micro-conversion (a click, a form fill, a session purchase). None closes on realized downstream revenue, LTV, retention, or churn. That distinction is the crux of this report and is why "L6" alone is not a sufficient description of a system. Second, L6 in the vertical-SaaS survey was **empty — zero platforms** — while the horizontal frontier covered in this report (Coframe, Webflow Optimize, Mutiny, Unbounce Smart Traffic) reaches L6-on-conversion. The gap between those two facts is the whitespace.

**How the ladder maps to the tiers below:** they measure different axes and shouldn't be conflated. The ladder measures *change surface* (how much of the site is reachable); the tiers measure *where the human sits in the loop*. A Tier 1 generator like Lovable is L5 — it synthesizes structure — but has no loop at all. Tier 3 tools are L6 on a narrow surface: they close the loop, but only over variants a human authored. Ploy is L5 with a broad surface and no loop; Coframe is genuine L6 on a narrower surface. Neither is L6-on-revenue, which nothing currently is.

## TL;DR
- **"Ploy" is a real, verified company**: Ploy.ai, an AI marketing/website-automation platform founded by ex-Webflow co-founder/CTO Bryant Chou, out of stealth June 17, 2026 with a $27M seed led by First Round Capital and Y Combinator (YC S26). But despite its own marketing, **Ploy is human-in-the-loop by default** ("drafts and proposes; you approve") — it is not a fully autonomous website changer, and it deliberately does no A/B testing. Note a hard name collision with **Ploy.io**, an unrelated AI identity-governance company.
- **The category is real but young, and its central limitation is decisive for the user's thesis**: across every credible player (Coframe, Ploy, Evolv AI, Webflow Optimize/Intellimize, Unbounce Smart Traffic, Mutiny, OTTO SEO), **nobody closes the optimization loop on realized downstream revenue, LTV, retention, or churn.** They optimize on-page/in-session micro-conversions (clicks, form fills, signups, session purchases). The closest — ecommerce engines (Dynamic Yield/Insider/Bloomreach) — optimize session revenue-per-visitor and use *predictive* (not realized) LTV for targeting only. Evolv's docs explicitly state it *cannot* optimize to reduce churn/cancellations.
- **The market has repeatedly tried and abandoned automated optimization** (Google Optimize sunset Sep 30 2023; Sentient Ascend → Evolv; Qubit → Coveo; Intellimize → Webflow), and practitioner consensus is that most small sites **lack the traffic for valid inference** (Convert.com: ~5,000 visitors and ~1,000 conversions per variation; AB Tasty rule of thumb ~10,000 visitors + 300 conversions per variant). This is the binding constraint on serving small tenants of vertical SaaS — and no one currently sells a true multi-tenant, per-tenant closed-loop system.

## Key Findings

1. **Ploy = Ploy.ai**, San Francisco, est. 2026, founded solo by **Bryant Chou** (co-founder/CTO of Webflow 2013–2025; earlier co-founder/CTO of mobile-ad platform Vungle). $27M seed announced June 17, 2026, led by First Round Capital and Y Combinator, with angels including Lenny Rachitsky and Eoghan McCabe; First Round's Todd Jackson cited a 12-year relationship with Chou. YC S26 batch; Chou says over 13% of the current YC batch already use it. [MEASURED — PR Newswire June 17 2026; trade coverage]
2. **Ploy is a bundle of three engines** (Web, Grow, Ads) plus "PloyBooks" (repeatable agent playbooks), running a "Monitor–Act–Surface" loop. It builds/redesigns pages, audits SEO/AEO, de-anonymizes visitors, monitors competitors, and syncs to CRM. **Deployment is reverse-proxy + edge hosting + GitHub sync** — a hosting/platform play, not a JS-snippet overlay on your existing site. That is a meaningfully different (and more invasive) integration than Coframe/Mutiny.
3. **Ploy's autonomy is overstated by its own tagline.** Marketing says the site "works while you sleep" and "generate outcomes while you sleep," but the FAQ is explicit: "Ploy's Agent drafts and proposes; you approve … Nothing ships without your sign-off." **It also does not do A/B testing** — it reasons from analytics and ships a single approved change, i.e., "vibes"/LLM-judgment optimization with no statistical inference loop. This is the opposite of Coframe, which runs a rigorous bandit but leaves copy to the model.
4. **Coframe is the purest "self-improving website" play** and the most statistically rigorous: a modified Thompson-sampling multi-armed bandit with dynamic arm generation, adaptive holdout baseline, incubation periods for new arms, and dropping of underperformers. It generates and tests copy/visuals/UI/section variants continuously. Founded 2023; raised $9.3M seed (Reuters, Oct 29 2024), co-led by Khosla Ventures and NFDG (Nat Friedman & Daniel Gross); Tracxn lists a $9.55M total. It acquired HaystacksAI (Mar 2026) to build an "Autonomous Growth Agent." Coframe's own profile says it primarily serves mid-market/enterprise teams generating at least ~30,000 monthly visits — implicitly conceding the traffic-threshold constraint.
5. **The optimization-signal finding is the crux**: every website-optimization agent optimizes on a micro-conversion, not realized revenue. Coframe's bandit reward is a **Bernoulli success** ("conversion rate or some other indicator metric") — binary per session. Unbounce Smart Traffic routes on "button click, link click, or form fill." Evolv optimizes a per-session event or scalar (can weight by revenue-per-visitor) but "can only increase" the metric and explicitly cannot optimize to reduce cancellations/churn. Intellimize/Webflow Optimize = conversion/personalization.
6. **Consolidation and death dominate the history**: Google Optimize sunset **Sep 30 2023**; Sentient Ascend spun out and became **Evolv AI** (2019); **Qubit acquired by Coveo** (Oct 2021, ~90 staff, folded into commerce personalization); **Intellimize acquired by Webflow** (Apr 19 2024, ~eight figures, rebranded Webflow Optimize, ~50 staff moved, some laid off).
7. **Traffic threshold is the binding constraint**: Convert.com recommends A/B testing only with ~5,000 visitors and ~1,000 conversions per variation for conclusive results; AB Tasty's rule of thumb is ~10,000 visitors and 300 conversions per variant. Bandits/generative bandits (Coframe) are more sample-efficient but do not escape the fundamental data requirement. This means the vast majority of small-business tenant sites cannot support statistically valid continuous optimization.

## Details

### 1. DISAMBIGUATION — What "Ploy" is

There are (at least) two active companies called **Ploy**:

- **Ploy.ai** — the subject of this report. An "agentic marketing platform" that turns a company's website into a continuously optimized growth engine. Founder: Bryant Chou (ex-Webflow co-founder/CTO). Est. 2026, San Francisco. $27M seed (First Round Capital + Y Combinator), announced June 17, 2026. This is the one that matches "an agent that continuously automates the website." [MEASURED/VENDOR-CLAIMED — YC company page, Ploy.ai, Dealroom, PR Newswire]
- **Ploy.io** — an unrelated **AI-native identity & governance** company (agent "Luna"; auto-discovers service accounts, API keys, non-human identities across 180+ integrations; SOC-2/access-review automation). It has nothing to do with websites. A separate "Ploy security" listing also exists on G2. [MEASURED — ploy.io, G2]

There is no evidence of a website-optimization company under the alternate spellings the user flagged (getploy, Ployhq, Poly, Pally) in this space; those are not relevant. **The website-automation "Ploy" is unambiguously Ploy.ai.**

### 2. DEEP PROFILE — Ploy.ai

**What the agent changes.** Full pages and page structure (it "slurps" your site down to the pixel and reconstructs the design system into components + design tokens), copy, layout/section order, whole new pages (ABM/comparison/programmatic-SEO pages), SEO metadata and JSON-LD schema (for "Answer Engine Optimization"), and ad creative. It builds each site on its own component library so brand changes refactor cleanly. [VENDOR-CLAIMED — Ploy.ai feature pages]

**Deployment mechanism.** Reverse proxy + edge hosting + GitHub sync. You can route specific sections (e.g., /blog, /pricing) through Ploy while keeping the main site elsewhere, or host the whole site on Ploy; developers can clone locally, edit components in an IDE, and push back via git. This is a **hosting/CMS-replacement** posture, not client-side DOM injection — which avoids the CLS/flicker and cloaking problems of JS-overlay tools, but requires the customer to move hosting or proxy traffic. [VENDOR-CLAIMED — Ploy.ai FAQ; third-party TheAIAgentIndex]

**Optimization signal / objective function.** Ploy reads GA4, Google Search Console, PostHog, visitor de-anonymization, and competitor monitoring, then proposes the change "most likely to lift engagement." It syncs identified accounts to CRM (Attio/HubSpot). **The loop stops at engagement/traffic/pipeline signals and explicitly does NOT run controlled experiments** ("How does Ploy optimize my site without A/B testing?"). So there is no realized-revenue objective and no statistical inference — it is LLM judgment on analytics. [VENDOR-CLAIMED — Ploy.ai FAQ]

**Statistical method.** None in the rigorous sense — no A/B, no bandit, no sequential testing. Ploy pitches "continuous optimization compounds improvement from live data instead of waiting weeks for a split test." This is a genuine adversarial concern: without holdouts, claimed lifts are unfalsifiable. [VENDOR-CLAIMED; assessed ESTIMATED]

**Autonomy.** Human-in-the-loop by default and by design: "Ploy's Agent drafts and proposes; you approve." "It doesn't make [decisions] for you." The "while you sleep" framing refers to overnight *drafting/auditing*, not unsupervised shipping. [MEASURED — Ploy.ai FAQ verbatim]

**Guardrails.** Brand "source of truth" (aesthetics, imagery, content, POV) to prevent generic-AI drift; approval queue; per-workspace tenant isolation ("Ploy never reads across tenants"); SOC 2 Type II audit in progress with Vanta; passkeys/sign-in gating. Chou explicitly positions Ploy as "anti-slop." [VENDOR-CLAIMED]

**Data inputs / integrations.** GA4, Google Search Console, PostHog, Semrush, HubSpot, Attio, Notion, Google Workspace (Docs/Sheets/Drive/Slides), Airtable, Figma, GitHub, Google Ads, Mailchimp, Intercom, Supabase, ClickHouse, Slack, and more. Clay integration is bidirectional (visitor identity out; enriched account data in to generate per-account pages). No Stripe/billing/revenue integration is listed — consistent with the no-realized-revenue finding. [MEASURED — Ploy.ai integrations page]

**Pricing.** Free tier (no card, 60-second import); **Starter $50/mo; Pro $300/mo**; Enterprise (SSO, security terms, data-training opt-out). [VENDOR-CLAIMED — third-party TheAIAgentIndex, citing Ploy]

**What it explicitly does NOT do.** No A/B testing / statistical validation; does not ship changes without approval; does not replace the marketing team ("People still set strategy, approve changes"); no realized-revenue optimization.

**Traction.** Named early customers: **Hex** (on-brand ABM pages at scale), **Clay** (programmatic SEO — "dozens of on-brand guide/template pages"), and agency **TNT Growth**, which per citybiz (June 17 2026) "deploy[s] pages across more than 50 client accounts" (Tonik and TNT Growth build/manage customer websites through Ploy). Product Hunt: launched Jun 18 2026, ~117–123 upvotes, #14 day rank, only ~4 comments — a **modest** PH result for a $27M-seed, celebrity-founder launch. [VENDOR-CLAIMED for customers; MEASURED for PH metrics]

**People's experience with Ploy specifically.** Because it launched ~7 weeks before this report (as of Aug 8 2026), there is **almost no independent practitioner review corpus yet** — no G2/Capterra reviews for the website product (G2 "Ploy" results are the unrelated identity company). The most substantive public critique is on the Product Hunt thread: a commenter flagged that Ploy's consent-management platform "does not work at all" — Facebook/PostHog/GTM loading pre-consent, a GDPR problem — and noted 11MB+ of unlazy-loaded video on mobile. Another top comment captured the core category risk: "autonomous site changes plus untracked compliance is a rough combo to scale on." Endorsements exist (YC's Garry Tan; early adopters like Visux) but come from inside the YC network. **Verdict: too early to tell on real-world efficacy; no independent lift data exists.** [MEASURED — Product Hunt thread; assessed]

### 3. What the other material players actually do

**Coframe** — Tier 4, the flagship "living website." Changes copy/visuals/UI/section variants and generates new arms continuously. Deploys via a JS script (SOC-2, approval-before-live for AI content, automatic fallbacks). Signal: on-page conversion (Bernoulli). Method: **modified Thompson-sampling MAB with dynamic arm generation** — genuinely rigorous, the strongest statistics in the category. Autonomy: generate-analyze-test automatically, with an approval gate for AI content. Data: GA4, Amplitude, Segment, Statsig, Heap; site platforms Webflow/Shopify/Unbounce/Framer. Vendor-claimed wins: 410% conversion lift (Replit enterprise funnel), 59% homepage + 42% invest-page lift (StartEngine), "42% average CTR improvement, up to 352%." Partnership with **L Catterton** (PE) to run across portfolio companies. **Treat all lift % as VENDOR-CLAIMED; the "$3M incremental revenue" figures are extrapolated from conversion lift, not realized.**

**Evolv AI** (formerly Sentient Ascend) — Tier 3/4, the important precedent. **Evolutionary/genetic algorithm** doing massively-multivariate CRO; academic pedigree (Miikkulainen et al., published in AI Magazine). Optimizes a configurable per-session event or scalar (can be revenue-per-visitor) but "can only increase" the metric and **explicitly cannot optimize to reduce subscription cancellations/churn**. Origin: Sentient Ascend launched 2016; Evolv acquired it + raised $10M Series A (Horizons Ventures) in 2019. Enterprise customers historically included Verizon, Celebrity Cruises. [MEASURED for algorithm; VENDOR-CLAIMED for outcomes]

**Mutiny** — Tier 3, B2B website personalization/ABM. Changes headlines, testimonials, logos, CTAs, copy; builds 1:1 microsites and ABM pages. Deploys as an overlay on existing sites. Signal: conversion/pipeline attribution (with automatic holdout testing). Raised ~$72M total; $50M Series B at $600M valuation (Apr 2022; Sequoia/Insight/Tiger). By 2022, "50M people across 3M+ companies" had seen a Mutiny-personalized page. As of 2026 it has repositioned toward an "AI GTM agent" for generating customer-facing assets. [MEASURED for funding; VENDOR-CLAIMED for reach]

**Webflow Optimize (ex-Intellimize)** — Tier 3, now a native personalization/CRO feature inside Webflow's "Website Experience Platform." AI personalization + adaptive traffic allocation for conversion. Intellimize founded 2016, raised $50M+, acquired Apr 2024. [MEASURED]

**Unbounce Smart Traffic** — Tier 3. Contextual multi-armed bandit routing each visitor to the variant they're likeliest to convert on (click/form fill). Unbounce claims "30% more sales and signups (on average)" versus splitting traffic evenly (beta ~20%, now closer to 30%). Conversion only. [VENDOR-CLAIMED]

**Search Atlas / OTTO SEO** — Tier 4, the most genuinely autonomous. Auto-deploys thousands of on-page SEO fixes (titles, schema, canonicals, broken/redirect links, OG/Twitter cards, internal links, alt text) in real time via JS pixel, Cloudflare Worker at the edge, direct CMS writes (WordPress/HubSpot/Webflow/Shopify/Contentful/Duda), or GitHub/Vercel pipeline. **Offers both "Automatic" (fire-and-forget) and "Approval" modes** — the one product here with real optional full autonomy. Pricing $99–$999/mo. **Has a white-label/agency multi-client mode** (see multi-tenant section). Practitioner caveat: extra JS can hurt Core Web Vitals; auto-schema can conflict with existing markup; pros use AI copy "as inspiration rather than final copy." [VENDOR-CLAIMED + third-party review]

**Autonomous SEO-content agents (SEObot, Frizerly, Alli AI, Byword, etc.)** — Tier 4 content sub-category. Fully autonomous by default: research keywords, write 3,000–4,000-word articles, build programmatic pages, auto-internal-link, publish to CMS. SEObot ($49/mo entry; "1.2B impressions, 30M clicks" claimed across users; built by John Rush/Vitalik May). Frizerly targets SMB/Shopify/WordPress with daily auto-published blogs. **These optimize for search-traffic volume, not conversion or revenue, and are the highest AI-slop risk.** [VENDOR-CLAIMED]

### 4. Multi-tenant / platform embedding (directly relevant to the user's business)

**No one sells a true "embed our closed-loop optimizer via API inside your multi-tenant SaaS platform to auto-run across thousands of your tenants' sites."** The nearest approximations:
- **Search Atlas white-label** — a fully branded reseller platform (own logo/domain) giving *agencies* OTTO + 50 tools to manage many client sites; API access gated to Enterprise. This is an agency multi-client model, not a platform-embed. [VENDOR-CLAIMED]
- **Webflow Optimize** — runs across Webflow's own tenant base, but only because Webflow is itself the platform; it is not licensed out to other platforms.
- **Coframe–L Catterton** — running across a PE portfolio's companies; a multi-company arrangement, not an embedded product.
- **Ploy** — reverse-proxy architecture and named agency users (TNT Growth, 50+ client accounts) make it platform-adjacent, but there is no productized white-label/multi-tenant offering.

**What breaks at multi-tenant scale**: (a) per-tenant traffic is almost always below the inference threshold, so continuous optimization is statistically meaningless for the long tail; (b) brand-safety/legal review doesn't scale across thousands of tenants without either full autonomy (risky) or an approval queue nobody staffs; (c) client-side JS injection creates CLS/flicker/cloaking risk multiplied across every tenant; (d) cost per tenant (LLM generation + hosting) versus the low ARPU of small tenants.

### 5. TIER DEFINITIONS (read this before the master table)

Products in this space get lumped together as "AI website tools," which obscures the only distinction that matters: **does the thing keep changing your live site on its own, and against what objective?** The five tiers below separate them. Tier 4 is the actual subject of this report; Tiers 1–3 and 5 are included as boundaries so it's clear what Ploy and Coframe are *not*.

| Tier | Name | Defining property | Runs continuously? | Examples |
|---|---|---|---|---|
| **1** | One-shot AI site generation | Prompt → site, then static. The AI builds it once; every later change is a human editing a normal site. No feedback loop of any kind. | No | Durable, B12, 10Web, Hostinger Horizons, Wix AI Site Builder, Squarespace Blueprint AI, Framer AI, Relume, Lovable, Bolt.new, v0, Replit Agent, Base44, Dora AI, Butternut AI, Mixo |
| **2** | Manual / assisted experimentation | Classic A/B and multivariate testing. A human forms the hypothesis, builds the variants, and calls the winner. Statistically rigorous but entirely human-driven. | No | VWO, Optimizely, AB Tasty, Convert, Kameleoon, Adobe Target, Statsig, GrowthBook, Shopify native A/B |
| **3** | Automated optimization / bandits / auto-personalization | The machine allocates traffic and picks winners on its own (bandits, ML personalization), **but a human still supplies the variants.** The system optimizes among options it was given; it cannot invent new ones. | Yes, within a fixed option set | Unbounce Smart Traffic, Instapage, Intellimize → Webflow Optimize, Mutiny, Adobe Target Auto-Target, Dynamic Yield, Insider, Bloomreach, Evolv AI, Sitespect, Monetate/Kibo, Qubit |
| **4** | **Generative + continuous agents** — *the core of this report* | The agent both **generates new variants and deploys them to the live site on an ongoing basis.** Content and structure are authored by the model, not just selected by it. This is the "self-improving website." | Yes, with open-ended generation | **Ploy.ai, Coframe**, Search Atlas/OTTO SEO, SEObot, Frizerly, Alli AI, Byword, Wordlift, and the "AI growth engineer" startup cohort |
| **5** | Adjacent agentic surfaces | AI agents embedded inside a larger platform that *touch* the website among many other jobs (email, ads, support, CRM). Website automation is a feature, not the product, and is rarely continuous or autonomous. | Partially / not primarily web | Shopify Sidekick, HubSpot Breeze, Salesforce Agentforce, Klaviyo AI, Wix Astro, GoDaddy Airo, Duda AI, Vendasta "Vibe", Webflow AI Assistant |

**The two boundaries that matter most:**

- **Tier 3 → Tier 4 is the generation boundary.** Evolv AI runs a sophisticated evolutionary algorithm, but a human defines the design elements it recombines. Coframe writes new headlines and section variants that nobody wrote. That is the qualitative jump.
- **Within Tier 4, autonomy and rigor vary independently, and no one has both.** Coframe has real statistics (Thompson-sampling bandit) but gates AI content behind approval. Ploy has a broad change surface (whole pages, layout, new pages) but no experimentation at all — it reasons from analytics and ships one approved change. Search Atlas/OTTO is the only one offering genuine fire-and-forget autonomy, and it optimizes for search traffic rather than conversion. **A product that is simultaneously fully autonomous, statistically rigorous, and optimizing on realized revenue does not exist.**

Note that tier number does **not** track sophistication or quality — a Tier 2 tool run by a competent CRO team will beat a Tier 4 agent on a low-traffic site every time. The tiers describe *where the human sits in the loop*, nothing more.

### 6. MASTER TABLE

| Company | Tier | What the agent changes | Deployment | Optimization signal | Statistical method | Autonomy | Founded | Funding (amt, date, investors) | Headcount | Pricing | Traction | Status | Source quality |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Ploy.ai** | 4 | Full pages, copy, layout, new pages, SEO/AEO meta+schema, ad creative | Reverse proxy + edge hosting + GitHub | Engagement/traffic/pipeline; NOT revenue | None (LLM judgment, no A/B) | Human-in-loop (approval) | 2026 | $27M seed, Jun 17 2026, First Round + YC | UNKNOWN | Free / $50 / $300 / Ent | Hex, Clay, TNT Growth (50+ sites); PH #14 ~120 upvotes | Active (new) | VENDOR-CLAIMED + MEASURED |
| **Coframe** | 4 | Copy, visuals, UI, section variants, new sections | JS script (client-side) | On-page conversion (Bernoulli) | Modified Thompson-sampling MAB w/ dynamic arms | Auto w/ approval gate for AI content | 2023 | $9.3M seed ($9.55M total), Oct 2024, Khosla + NFDG | UNKNOWN (small) | Enterprise/custom | Replit, StartEngine; L Catterton partner | Active | VENDOR-CLAIMED + MEASURED (funding) |
| **Evolv AI** (ex-Sentient Ascend) | 3/4 | Multivariate design elements | JS / tag | Per-session event or scalar (can be rev/visitor); cannot reduce churn | Evolutionary/genetic algorithm | Automated within search space | 2016 (Ascend) / 2019 (Evolv) | $10M Series A 2019, Horizons Ventures | ~50–100 | Enterprise | Verizon, Celebrity Cruises (historic) | Active (pivot/rebrand) | MEASURED (algo) + VENDOR-CLAIMED |
| **Mutiny** | 3 | Headlines, logos, CTAs, copy, 1:1 microsites | Overlay on existing site | Conversion / pipeline attribution | A/B + auto holdout | Human-driven (copilot) | 2018 | ~$72M total; $50M Series B @ $600M, Apr 2022 (Sequoia/Insight/Tiger) | ~100+ | Enterprise/custom | 50M visitors / 3M+ cos (2022) | Active (pivoting to "AI GTM agent") | MEASURED |
| **Webflow Optimize** (ex-Intellimize) | 3 | Personalized content variants | Native in Webflow | Conversion | Adaptive allocation | Human-in-loop | 2016 (Intellimize) | $50M+ raised; acq. by Webflow Apr 19 2024 (~8-figures) | ~50 moved to Webflow | Part of Webflow WXP | Orangetheory, Dropbox (Webflow) | Acquired/absorbed | MEASURED |
| **Unbounce Smart Traffic** | 3 | Routes visitors among existing variants | JS / hosted LP | Conversion (click/form fill) | Contextual multi-armed bandit | Automated routing | 2009 (Unbounce) | Private; merged w/ Insightly 2023-era | UNKNOWN | Bundled w/ Unbounce | "+30% avg" claimed | Active | VENDOR-CLAIMED |
| **Search Atlas / OTTO SEO** | 4 | On-page SEO: titles, schema, links, alt, canonicals; content | JS pixel / Cloudflare Worker / CMS writes / git | Search rankings/traffic | Rule-based + AI | **Optional full autonomy** (Auto or Approval) | 2020s | Bootstrapped/private | UNKNOWN | $99–$999/mo | White-label agency base | Active | VENDOR-CLAIMED + 3rd-party |
| **SEObot** | 4 | Blog articles, programmatic pages, internal links | CMS API writes | Search-traffic volume | None (content generation) | Fully autonomous default | 2023 | Bootstrapped (John Rush) | Tiny | $49/mo+ | "1.2B impressions" claimed | Active | VENDOR-CLAIMED |
| **Frizerly** | 4 | Daily auto-published blogs, local pages | CMS (Shopify/WP) | Search traffic | None | Fully autonomous | 2025 | UNKNOWN (ex-Amazon/YC team) | Tiny | SMB tiers | "100+ businesses" claimed | Active (new) | VENDOR-CLAIMED |
| **Dynamic Yield** | 3 | Ecommerce personalization, layout, recs | Server + client SDK | Rev-per-user/AOV/session rev | ML auto-optimization | Automated | 2011 | Acq. McDonald's 2019 → Mastercard 2022 | Enterprise | Enterprise | APMEX "+7% rev/session" | Active (absorbed into Mastercard) | MEASURED |
| **Insider** | 3 | Personalization, journeys | SDK / tag | Session rev; predictive CLV/churn (targeting only) | ML predictive | Automated w/ config | 2012 | Unicorn ($100M+ Series D, 2022) | 1,000+ | Enterprise | Global CDP | Active | VENDOR-CLAIMED |
| **Bloomreach** | 3 | Ecommerce content/search personalization | SDK / API | Session rev; predictive CLV (targeting) | Loomi AI predictive | Automated | 2009 | $175M Series (2022) | 1,000+ | Enterprise | Enterprise retail | Active | VENDOR-CLAIMED |
| **Qubit** | 3 | Ecommerce personalization | Tag | Conversion / rev | ML | Automated | 2010 | ~$75M raised | — | — | Kate Spade, Kurt Geiger | **Acquired by Coveo Oct 2021** | MEASURED |
| **Google Optimize** | 2/3 | A/B + personalization | JS / GA | Conversion | Frequentist + Bayesian | Manual | 2016 | Google (free) | — | Free | Millions of users | **Sunset Sep 30 2023** | MEASURED |

*(Tier 1 one-shot generators — Durable, Lovable, Bolt.new, v0, Framer AI, Wix/Squarespace/Hostinger AI, etc. — and Tier 2 manual experimentation — VWO, Optimizely, AB Tasty, Convert, Statsig — and Tier 5 adjacent surfaces — Shopify Sidekick, HubSpot Breeze, Agentforce, GoDaddy Airo, Duda AI, Wix Astro — are excluded from continuous-agent scoring; none continuously and autonomously rebuild a live site on a business objective.)*

### 6. CSV of the master table

```csv
company,tier,agent_changes,deployment,optimization_signal,statistical_method,autonomy,founded,funding,headcount,pricing,traction,status,source_quality
Ploy.ai,4,"full pages/copy/layout/new pages/SEO+AEO meta+schema/ad creative","reverse proxy + edge hosting + GitHub","engagement/traffic/pipeline; NOT revenue","none (LLM judgment, no A/B)","human-in-loop (approval)",2026,"$27M seed Jun 17 2026 First Round + YC",UNKNOWN,"Free/$50/$300/Ent","Hex, Clay, TNT Growth 50+ sites; PH #14",active-new,VENDOR-CLAIMED+MEASURED
Coframe,4,"copy/visuals/UI/section variants/new sections","JS script client-side","on-page conversion (Bernoulli)","modified Thompson-sampling MAB w/ dynamic arms","auto w/ approval gate for AI content",2023,"$9.3M seed ($9.55M total) Oct 2024 Khosla + NFDG",UNKNOWN,Enterprise/custom,"Replit, StartEngine, L Catterton",active,VENDOR-CLAIMED+MEASURED
Evolv AI,3.5,"multivariate design elements","JS/tag","per-session event or scalar (can be rev/visitor); cannot reduce churn","evolutionary/genetic algorithm","automated within search space","2016 Ascend / 2019 Evolv","$10M Series A 2019 Horizons Ventures","~50-100",Enterprise,"Verizon, Celebrity Cruises historic",active-pivot,MEASURED+VENDOR-CLAIMED
Mutiny,3,"headlines/logos/CTAs/copy/1:1 microsites","overlay on existing site","conversion / pipeline attribution","A/B + auto holdout","copilot human-driven",2018,"~$72M total; $50M Series B @ $600M Apr 2022","~100+",Enterprise/custom,"50M visitors / 3M+ cos 2022",active-pivoting,MEASURED
Webflow Optimize,3,"personalized content variants","native in Webflow","conversion","adaptive allocation","human-in-loop",2016,"$50M+ raised; acq by Webflow Apr 19 2024 ~8-figures","~50 moved","part of Webflow WXP","Orangetheory, Dropbox",acquired-absorbed,MEASURED
Unbounce Smart Traffic,3,"routes visitors among existing variants","JS/hosted LP","conversion (click/form fill)","contextual multi-armed bandit","automated routing",2009,"private",UNKNOWN,"bundled","+30% avg claimed",active,VENDOR-CLAIMED
Search Atlas OTTO SEO,4,"on-page SEO titles/schema/links/alt/canonicals + content","JS pixel/Cloudflare Worker/CMS writes/git","search rankings/traffic","rule-based + AI","optional full autonomy (Auto or Approval)","2020s","private",UNKNOWN,"$99-$999/mo","white-label agency base",active,VENDOR-CLAIMED+3rd-party
SEObot,4,"blog articles/programmatic pages/internal links","CMS API writes","search-traffic volume","none","fully autonomous default",2023,"bootstrapped",tiny,"$49/mo+","1.2B impressions claimed",active,VENDOR-CLAIMED
Frizerly,4,"daily auto-published blogs/local pages","CMS Shopify/WP","search traffic","none","fully autonomous",2025,UNKNOWN,tiny,"SMB tiers","100+ businesses claimed",active-new,VENDOR-CLAIMED
Dynamic Yield,3,"ecommerce personalization/layout/recs","server + client SDK","rev-per-user/AOV/session rev","ML auto-optimization","automated",2011,"acq McDonalds 2019 -> Mastercard 2022",enterprise,Enterprise,"APMEX +7% rev/session",active-absorbed,MEASURED
Insider,3,"personalization/journeys","SDK/tag","session rev; predictive CLV/churn targeting only","ML predictive","automated w/ config",2012,"unicorn Series D 2022","1000+",Enterprise,"global CDP",active,VENDOR-CLAIMED
Bloomreach,3,"ecommerce content/search personalization","SDK/API","session rev; predictive CLV targeting","Loomi AI predictive","automated",2009,"$175M Series 2022","1000+",Enterprise,"enterprise retail",active,VENDOR-CLAIMED
Qubit,3,"ecommerce personalization","tag","conversion/rev","ML","automated",2010,"~$75M raised",-,-,"Kate Spade, Kurt Geiger","acquired by Coveo Oct 2021",MEASURED
Google Optimize,2.5,"A/B + personalization","JS/GA","conversion","frequentist + Bayesian","manual",2016,"Google free",-,Free,"millions of users","sunset Sep 30 2023",MEASURED
```

### 7. WHAT PEOPLE ACTUALLY SAY (by theme)

- **Does it work?** For high-traffic enterprise sites, vendor case studies claim large lifts (Coframe/Replit 410%, StartEngine 59%; Unbounce "+30%"), but **all are vendor-reported and several "revenue" figures are extrapolated from conversion lift, not realized.** No independent, peer-reviewed lift data exists for the generative-agent generation. A veteran optimizer quoted on Coframe's own site ("two decades … I wish I had this 10 years ago") is a testimonial, not independent evidence.
- **Copy quality / AI slop.** The dominant 2024–2026 practitioner theme is an "AI slop" backlash; Hacker News sentiment shifted toward "trust, security, and AI distortion." Ploy explicitly markets itself as "anti-slop," which is itself a tell that the market fears slop. On OTTO/Alli, pros report using AI copy as a starting point, not final.
- **Statistical validity.** CRO practitioners (Convert.com, CXL, Speero, Georgi Georgiev–style critique) stress that most sites lack traffic for valid inference and that "vibes" optimization without holdouts produces unfalsifiable wins. Ploy's no-A/B-testing stance is the sharpest version of this concern. Convert.com's own guidance — test only with ~5,000 visitors and ~1,000 conversions per variation — quantifies why the long tail is excluded.
- **SEO risk.** Client-side JS injection (used by many Tier 3 tools and OTTO's pixel mode) risks CLS/flicker and, if variants diverge too far or user-agent-detect, accidental cloaking — Google issues manual actions for cloaking/sneaky redirects. Server-side/reverse-proxy (Ploy) avoids flicker but concentrates risk in the hosting move.
- **Trust & control.** The recurring objection: who lets an agent change their live site unsupervised? The Product Hunt comment on Ploy — "autonomous site changes plus untracked compliance is a rough combo to scale on" — is representative. Most tools default to human-in-the-loop precisely because buyers won't grant full autonomy.
- **Cancellations/churn.** No large public churn corpus exists yet for the new agents (too early). The more informative signal is category-level: the repeated *shutdown/absorption* of automated-optimization products (below).

### 8. DEATH LIST (shutdowns, pivots, absorptions)
- **Google Optimize / Optimize 360** — sunset **Sep 30 2023**. The largest free A/B tool killed; a strong signal that even Google walked away from standalone web optimization.
- **Sentient Ascend** — evolutionary CRO, launched 2016; Sentient Technologies wound down; Ascend spun out and became **Evolv AI** (2019). Pivot/rebrand, not death, but the original company dissolved.
- **Qubit** (London, ~$75M raised) — **acquired by Coveo, Oct 15 2021**, ~90 staff; folded into Coveo commerce personalization; the standalone product effectively disappeared.
- **Intellimize** — **acquired by Webflow, Apr 19 2024** (~eight-figures), rebranded **Webflow Optimize**; ~50 staff moved, some laid off/severed.
- **Dynamic Yield** — acquired by McDonald's (2019), then sold to **Mastercard (2022)**; absorbed into an enterprise stack rather than an independent optimization product.
- **Kickdynamic** (email content personalization) — absorbed into the email-martech consolidation wave (status not independently confirmed here — flagged as a gap).
- **Kibo/Monetate, Certona-lineage** tools have consolidated repeatedly — the enterprise personalization space is a graveyard of rebrands.

### 9. WHAT THE EVIDENCE DOES AND DOESN'T SUPPORT
**Established fact:** Ploy.ai exists, is well-funded (($27M, First Round + YC, Jun 17 2026)), and is human-in-the-loop; Coframe runs a real Thompson-sampling bandit and raised $9.3M (Reuters, Oct 2024); the funding/acquisition dates above; the traffic-threshold consensus; the fact that **no player optimizes on realized revenue/LTV/retention**; Google Optimize's sunset and the Qubit/Intellimize acquisitions; Evolv's explicit inability to optimize churn.

**Open / unverified:** Every lift percentage (all vendor-claimed); Ploy's real-world efficacy (no independent data); Ploy's ARR/headcount (unknown); whether Coframe's bandit wins survive independent scrutiny; the durability of any tool's gains on low-traffic sites; long-term retention/churn of these tools; Kickdynamic's current status.

## Recommendations

**For the user (Recompose — selling visual redesigns to multi-tenant white-label SaaS platforms):**

1. **Do not position against Ploy/Coframe head-on as "continuous optimization."** They own the "self-improving website" narrative for single enterprise sites with traffic (Coframe itself targets ≥~30k monthly visits). Your wedge is the opposite end: **thousands of low-traffic tenant sites that these tools structurally cannot serve** (below the ~5k-visitor/~1k-conversion inference threshold, no per-tenant approval capacity). Sell the redesign as a one-time-plus-maintained *quality* uplift to the platform, not as a per-tenant experimentation engine.
2. **Exploit the closed-loop-on-revenue white space as differentiation, but be honest about the constraint.** Since nobody optimizes on realized revenue/LTV/retention, a credible pitch to a *platform* (which uniquely holds cross-tenant billing/retention data in Stripe/its own DB) is: aggregate signal across tenants to learn which design patterns correlate with tenant *revenue and retention*, then apply as priors to each tenant's redesign. This sidesteps per-tenant traffic scarcity by pooling — the one move none of the incumbents can make because they sell to one business at a time. This is the same "learn across tenants" idea Mutiny used for copy, extended to realized revenue.
3. **Adopt Ploy's guardrail model, not its autonomy tagline.** Human-in-the-loop with a brand "source of truth," approval queue, and tenant isolation is what buyers actually accept. Full autonomy is a liability at multi-tenant scale (the GDPR/consent and slop complaints on Ploy's own launch prove it).
4. **Prefer server-side/build-time rendering over client-side JS injection** for anything you ship, to avoid the CLS/flicker/cloaking problems practitioners complain about — especially since redesigns touch layout, not just copy.

**Benchmarks/thresholds that would change these recommendations:**
- If a vendor ships a *genuinely* revenue-closed loop (ingests Stripe/billing, optimizes on realized LTV/retention) with independent evidence → the white space closes; reassess positioning immediately.
- If Ploy or Coframe launches a productized **platform/white-label multi-tenant** offering with per-tenant economics that work below ~5k visits/mo → they become direct competitors for your buyer; monitor their "for platforms"/API pages and Search Atlas's white-label tier.
- If independent (non-vendor) data shows continuous agents produce durable lift on low-traffic sites → the traffic-threshold objection weakens and the "small tenants can't be optimized" thesis needs revising.

## Caveats
- **Recency:** Ploy launched ~7 weeks before this report; nearly everything about its real-world performance is unproven. Treat its capabilities as claimed, not demonstrated.
- **Vendor bias:** All lift percentages are vendor-claimed; several "revenue" numbers are extrapolations from conversion lift, not realized revenue. Do not treat them as findings.
- **Name collision:** Ploy.io (identity governance) and "Ploy security" on G2 are unrelated; don't conflate their reviews with Ploy.ai.
- **The category's own history is the strongest adversarial evidence:** automated web optimization has been repeatedly launched, acquired, and sunset (Google Optimize, Qubit, Sentient Ascend, Intellimize). "This time it's generative agents" is plausible but unproven; the traffic-inference constraint that limited prior generations still binds, and it binds hardest on exactly the small-tenant population a multi-tenant SaaS platform hosts.