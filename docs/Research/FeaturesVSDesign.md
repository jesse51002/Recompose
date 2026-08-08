# White-Label SaaS: Is "Design Work" the Same Budget, Team, and SKU as "Feature Work"?

## TL;DR
- **No — across almost every platform studied, design work and feature work are separate teams, separate SKUs, and often separate budgets.** The "branded app design" service is overwhelmingly a design/asset function (icons, splash screens, store listings, brand colors) staffed by graphic designers or bundled into onboarding/customer-success roles; it almost never writes net-new code for a tenant.
- **True "platform-built, paid" custom feature development (category c) is rare and concentrated in fintech.** Jack Henry's Banno ("Custom Development team") and Backbase (its code-writing "Services" org) are the clearest examples; Tapcart blends the two via a code-writing "Solutions & Services Engineer." Most creator/fitness/church/restaurant platforms offer only self-serve extensibility (APIs/SDKs), partner networks, or roadmap influence — not bespoke builds.
- **Professional services is a small, deliberately-shrinking share of revenue at the public companies**, confirming these are cost/enablement functions, not profit centers: Olo's Professional Services and Other revenue was $3.384M of $284.938M total (1.19%) in FY2024; Toast's hardware-plus-professional-services was $180M of $6,153M total FY2025 revenue (2.9%); and Alkami's subscription revenue was ~95% of total in FY2025, implying only ~5% from professional/implementation services.

## Question 1 — When a white-label platform runs a design service, is that team design-only, or does it also build features?

### Bottom line
The design service is **design-only** in the overwhelming majority of cases. Where the same tier "does more," the "more" is app-store publishing logistics, content migration, and account management — not engineering. Only two clear exceptions surfaced: ABC Trainerize's **Enterprise** tier (custom-built widgets), and Tapcart's "collaborative app design services," which sit next to a genuine code-writing solutions-engineering function.

### Platform-by-platform

**Circle (Circle Plus "Design Studio")** — Design-only. Circle's own docs describe it as: "Circle's design team creates marketing screenshots, splash screens, and app icons for you." Job postings confirm the "Design Studio" is Circle's **internal marketing design team** ("the creative engine behind all of Circle's marketing design… product launches and campaigns to events, advertising, social, motion, and visual identity systems"), staffed by Senior Brand Designers and Growth Designers — not a per-tenant code shop. Built In shows Circle's design department at roughly 4 people out of a ~160-person company. No solutions-engineering or professional-services code role was found. Circle's extensibility is self-serve (API).

**Mighty Networks (Mighty Pro)** — Design + strategy support, no per-tenant engineering. Mighty Pro bundles "design customization, and VIP technical support," monthly strategy calls, and launch/migration help. It is explicitly a done-for-you launch and strategy service, not a custom-feature service. Company is ~150+ employees, fully remote. No professional-services engineering role found. Reportedly priced $3,000–5,000+/month (third-party estimate; Mighty does not publish pricing).

**Passion.io (Passion Plus / "Plus")** — Done-for-you build + account management. "Passion's team builds your app, handles content migration, manages App Store submission, and provides a dedicated success manager." The done-for-you tier ("Plus"/"Ultimate Plus") is a custom engagement starting around $10,000–$20,000; the Ultimate Plus plan allows development of 5 custom-branded apps per subscription. The support contact is called an "App Ninja" for "technical and design support." No evidence the team writes net-new features; new features roll out platform-wide automatically.

**Vagaro (Design Services Team / "Studio 180")** — Pure design-only, productized at a flat fee. Vagaro runs a dedicated "Design Services Team" of in-house graphic designers producing logos, brand kits, splash images, and app icons. Custom website design is a one-time fee (about $499 US/CA/AU, £399 GBP); the Brand Package includes two rounds of logo proofing. The branded app is themed by this team, not custom-coded. Tenant owns the brand rights.

**Mindbody (internal design team)** — Design-only for the branded app; custom work outsourced. Mindbody's team "collaborates closely with you," creates a "design mock-up for your final approval," then a "launch team builds your app." Client-facing staff are "Solutions Consultants" (pre-sales/config) and "Client Implementation Managers." Anything bespoke is pushed to an **external "Certified Consultants" marketplace** — not built in-house. Note: post-launch design changes "may incur a fee to cover the associated redesign and deployment costs."

**ABC Trainerize (Custom Branded App: Pro / Studio / Enterprise)** — Mostly design ("skin"), with a genuine custom-code exception at Enterprise. Trainerize frames it: "the branding as the 'skin' of the app, while Trainerize is the 'skeleton.'" Pro CBA is a one-time fee (~$99–$169). Studio includes one round of revision; Enterprise includes three. Critically, **Enterprise** "includes custom-built widgets… non-standard functionality tailored to your business" — the clearest design-team-adjacent custom functionality in the fitness set. Enterprise requires 5+ locations and is custom-priced.

**Subsplash** — Design + "building," bundled into paid onboarding, but not net-new feature engineering. Subsplash self-describes as "a design-centric company." Its "Customer Onboarding Specialist" role provides "tailored services for paid implementation clients including but not limited to consulting, building and graphic design," aiming to pass internal review "in six weeks or less." Reviews indicate tenants are "limited to features that the platform has built itself" — i.e., design/config, not bespoke features. ~280+ employees.

**Tapcart (Ultimate "Collaborative App Design Services")** — Design service sits next to a real engineering function. Tapcart's Ultimate/Enterprise tiers include "collaborative app design services" and a dedicated account manager. Separately, Tapcart staffs a code-writing **"Engineer, Solutions & Services"** ($120,000–$140,000) who is "building Custom Blocks and React web apps for existing and prospective clients," plus a "Senior React Developer, App Studio Solutions." So Tapcart is the clearest case where design work and feature work are visibly distinct SKUs/teams under one roof.

### Is the design service a profit center or a cost to close deals?
The evidence points to **cost/enablement, absorbed to close and retain deals**, not a standalone profit center — with the exception of flat-fee productized design (Vagaro's $499 website, Trainerize's one-time CBA fee) which is modest incremental revenue. At the public companies, "professional services" (the closest financial proxy) is small and shrinking: Olo's Professional Services and Other revenue was $3.384M against $284.938M total (1.19%) in FY2024, and management explicitly said they prioritize upselling platform modules "rather than growth in professional services." Toast folds professional services into "hardware and professional services," which fell to $180M in FY2025 (out of $6,153M total, 2.9%), dwarfed by financial-technology-solutions revenue of $5,037M and subscription revenue of $936M. This is the financial signature of a function that exists to enable subscription revenue, not to make money itself.

## Question 2 — Extensible edges: will they build net-new features for a tenant who pays?

Legend: (a) self-serve extensibility · (b) partner-built · (c) platform-built, paid · (d) roadmap influence only.

### The category (c) evidence — what the user most wants

**Jack Henry / Banno — (a) + (b) + (c). Strongest category-(c) evidence.** Banno operates a named **"Custom Development team"**: "Maybe your idea doesn't require a third-party — we build custom features, too." And: "our custom integrations team is here to build it for you… looking for a team to make it a reality." Banno notes such work "may involve an additional contract by the vendor and/or Jack Henry," confirming it is a paid, contracted engagement. Banno also has deep self-serve extensibility — the Banno Digital Toolkit (Plugin Framework, Consumer API, Admin API), where plugins are HTML/CSS/JS web apps hosted on the partner's infrastructure — and a partner ecosystem. **Gap: Banno does not publish setup fees, hourly rates, minimums, timelines, or IP/exclusivity terms; all are gated behind sales.**

**Backbase — (a) + (c).** Backbase runs a code-writing **"Services" organization** distinct from product R&D. A Services backend-engineer posting reads: "Your tailor-made code seamlessly integrates our products with customers' systems… You provide solid technical solutions to complex issues." This is per-tenant implementation/integration engineering for hire, alongside product R&D (a "mobile guild consisting of 70+ mobile engineers"). Pricing/IP terms not public.

**Tapcart — (a) + (b) + (c).** (a) Public developer platform: App Studio, Tapcart CLI, Global Components, Configurable Blocks, APIs/SDKs. (b) A partner-agency ecosystem builds Custom Blocks. (c) Tapcart's own "Solutions & Services Engineer" builds "Custom Blocks and React web apps for existing and prospective clients." Enterprise starts at ~$1,000+/month.

**ABC Trainerize — (c), narrow.** Enterprise's "custom-built widgets… non-standard functionality" is platform-built custom functionality, custom-priced, gated to 5+ location clients. IP/exclusivity terms not public.

### Self-serve / partner / roadmap platforms (no clear category (c))

**Q2 — (a) + (b), deliberately not (c).** Q2's model is the Caliper SDK plus certified third-party developers, with Q2 hosting/deploying: "Solutions developed in the Q2 SDK are deployed, hosted, and monitored by Q2." Q2 says it uses the same SDK internally and has "over 1,000 extensions running in product." On April 16, 2026, Q2 Holdings (NYSE: QTWO) announced "Q2 Code," described in its Business Wire release as "a governed AI-powered development environment… to build extensions and integrations on the Q2 Digital Banking Platform," built with Anthropic's Claude Code via Amazon Bedrock, with Mid-Hudson Valley Federal Credit Union named as an Early Access adopter; the Early Access program "will expand throughout 2026." Q2 pushes code to tenants/partners rather than building bespoke single-tenant features itself.

**Alkami — (a) + (b), plus implementation PS.** Alkami offers APIs, an extensible SDK, and prebuilt UI components; the Winter 2026 release added a "One-Click SDK Manager" for self-service deployment. Implementation & professional services is a separate, non-recurring revenue line but is small — Alkami's subscription revenue was ~95% of total in FY2025 (SaaS subscription was 95.5% of revenue for the nine months ended Sept 30, 2025), implying only ~5% from professional/implementation services. No clear evidence of Alkami engineers building bespoke single-tenant features as a productized SKU.

**Kajabi — (a) + (d).** Public API (included in the Pro plan announced Sept 16, 2025, or a $25/mo add-on) plus webhooks and Liquid/HTML/CSS/JS customization. Kajabi explicitly will not support custom coding: "Kajabi is not able to support inquiries specific to custom coding… we recommend seeking guidance from an expert or developer." Custom work is done by third-party freelancers. Feature requests go to a roadmap board.

**Uscreen — (a).** Public API available to Uscreen Plus customers ("contact the Uscreen team to inquire about access"). Branded OTT apps are templated/themed by Uscreen's team, published under the tenant's developer account. Deeper design customization is often pushed to third-party builders like VidApp.

**GoodBarber — (a) + (b) + (c) for resellers.** Custom code (HTML5/CSS/JS), APIs, Zapier/Make. Explicitly: "if you don't have the necessary resources, you can rely on our team of experts, who offer custom developments for resellers" ("GoodBarber builds the app that fits your unique business needs — Request a quote"). This is a quote-based platform-built custom-dev path aimed at its reseller/agency base.

**BuildFire — (a) + (b) + (c).** (a) Free open-source SDK (buildfire.js, MIT license) for custom plugins; keep a plugin proprietary by upgrading to a Business plan. (c) "Hire BuildFire's team of experts… to build features not currently available in BuildFire," sold as a "Professional Services" tier (contact sales) and "white glove app setup." Subscriptions ~$89–$499/mo (Standard $165/mo); agencies resell with setup fees ($2,000+) and managed services ($500+/mo).

**Subsplash — (a-limited) + (d).** Reviews indicate tenants are "limited to features that the platform has built itself," and integrations are described as thin. Positive reviews note Subsplash "actually implements our feature requests" — roadmap influence, not bespoke single-tenant builds.

**Toast, Olo, ServiceTitan — product-led; (a) + (d), no per-tenant (c).** All three expose robust public APIs/developer portals (ServiceTitan's developer.servicetitan.io; Olo's "open SaaS platform" with 400+ integrations; Toast's partner ecosystem). But feature work is done by internal product engineers for the whole base — Toast builds category products (e.g., Toast for Cafes & Bakeries) that fold into core, and an engineer posting says they aim to "make each restaurant feel like we built Toast just for them" (i.e., productized, not bespoke). Client-facing roles are "Implementation Specialist/Consultant" (config/migration), not feature builders. ServiceTitan reviews explicitly cite rigidity and "workarounds"; custom API integrations are handled by the tenant or third-party freelancers. Implementation fees are reported at $5,000–$50,000 with 12-month minimums (third-party estimate).

**Mindbody — (b).** Custom work outsourced to the Certified Consultants marketplace; no in-house bespoke feature engineering found.

**Mighty Networks, Passion.io, Circle — (a) + (d).** Self-serve theming/API where present; new features ship platform-wide; feature requests enter a general roadmap. No per-tenant paid feature builds found.

### Comparison table

| Platform | Vertical | Design service = design-only? | Self-serve (a) | Partner (b) | Platform-built paid (c) | Roadmap only (d) |
|---|---|---|---|---|---|---|
| Circle | Creator/community | Yes (internal Design Studio) | API | — | No | Yes |
| Mighty Networks | Creator/community | Yes (design+strategy) | Limited | — | No | Yes |
| Passion.io | Creator/coaching | Done-for-you build + AM | Integrations | — | No | Yes |
| Kajabi | Creator | n/a | API/webhooks/Liquid | Freelancers | No ("no custom coding") | Yes |
| Uscreen | Creator/OTT | Yes (templated) | API (Plus) | VidApp etc. | No | — |
| ABC Trainerize | Fitness | Mostly ("skin") | — | — | Enterprise widgets | — |
| Mindbody | Fitness/wellness | Yes | — | Certified Consultants | No | — |
| Vagaro | Fitness/beauty | Yes (Design Services/Studio 180) | — | — | No | — |
| Subsplash | Church | Design + config | Limited | — | No | Yes |
| Toast | Restaurant | n/a | API | Partners | No | Yes |
| Olo | Restaurant | n/a | Open SaaS API | 400+ integrations | No | Yes |
| Tapcart | Commerce | Design + separate eng SKU | App Studio/CLI/API | Agencies | Yes (Solutions Eng) | — |
| Alkami | Fintech | n/a | API/SDK | Marketplace | Implementation PS | Yes |
| Banno (Jack Henry) | Fintech | Design guidelines only | Digital Toolkit/API | Partners | **Yes (Custom Dev team)** | — |
| Q2 | Fintech | n/a | Caliper SDK | Certified devs | No (SDK/partner model) | — |
| Backbase | Fintech | n/a | SDK/API | — | **Yes (Services org)** | — |
| GoodBarber | Horizontal | Yes | Custom code/API | Resellers | Yes (quote-based) | — |
| BuildFire | Horizontal | Yes | Free SDK | Resellers | Yes (Prof. Services) | — |
| ServiceTitan | Field service | n/a | Dev portal/API | Freelancers | No | Yes |

### Where evidence was thin or absent
- No public dollar figures, hourly rates, minimums, timelines, or IP/exclusivity terms were found for Banno's or Backbase's custom development — all gated behind sales.
- No direct tenant quote saying "the platform built us a custom feature" was located for any platform; the closest is Subsplash reviewers noting the vendor "implements our feature requests" (roadmap, not bespoke).
- Tithe.ly, Ministry Brands, BentoBox, Owner.com, Nudge Coach, Disciple Media, Arketa, Everfit, Zenoti, Boulevard, Apiture, Jobber, Whova/Cvent: not enough evidence gathered to characterize confidently. I flag these as unresearched rather than infer.
- Team-size specifics for most design/PS sub-teams (Vagaro Studio 180, Toast, Olo, ServiceTitan, Mindbody, Q2, Banno) were not publicly available.

## Recommendations
1. **If you need net-new features built for you by the vendor, look to fintech-grade platforms.** Banno/Jack Henry (Custom Development team) and Backbase (Services org) are the only clear "platform-builds-it-for-you" models; Tapcart is the best consumer-commerce analog. Ask specifically for the SOW template, hourly/fixed pricing, minimum engagement, timeline, and — critically — whether the IP stays exclusive to you or folds into core.
2. **If you only need branding, the design SKUs are cheap and productized.** Vagaro (~$499 one-time), Trainerize (one-time CBA fee), Mindbody, Circle Plus, Passion Plus deliver icons/splash/store assets. Do not expect these teams to change functionality.
3. **If you expect to extend functionality yourself, prioritize API/SDK depth.** Banno Digital Toolkit and Q2 Caliper SDK (fintech), Tapcart App Studio/CLI (commerce), BuildFire/GoodBarber (horizontal) are the strongest self-serve escape hatches. Kajabi explicitly won't help with custom code — plan to hire a freelancer.
4. **Benchmarks that should change your decision:** If a vendor's professional-services revenue is <3% of total and shrinking (Olo at 1.19%, Toast's combined line at 2.9%), assume they will steer you to self-serve/partners rather than build for you. If they staff a titled "Solutions Engineer" or "Custom Development team" (Tapcart, Banno, Backbase), category (c) is realistic — get it in writing.

## Caveats
- Several pricing figures (Mighty Pro $3–5K/mo, Passion Plus $10–20K, ServiceTitan implementation $5–50K) are third-party estimates, not vendor-published; treat as directional.
- Many job postings cited are expired/historical; titles and descriptions remain valid evidence of how roles are structured but headcounts may have changed.
- The absence of category-(c) evidence for a platform is not proof it never builds custom — only that no public documentation, posting, or review confirmed it.
- Q2's "Q2 Code" was announced April 16, 2026, with Early Access expanding throughout 2026; real-world adoption is early.
- Revenue percentages are computed from the specific filings cited (Olo FY2024 10-K; Toast Q4/FY2025 8-K Exhibit 99.1; Alkami FY2025 results) and reflect the closest available "professional services" proxy, which mixes implementation with design and may overstate design-specific spend.