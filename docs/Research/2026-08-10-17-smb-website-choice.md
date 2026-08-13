# What Small Businesses and Non-Technical People Actually Use to Make a Website: Traditional Builders/CMS vs. AI Generators

Ordinary small businesses overwhelmingly still get online through incumbent hosted builders (Wix, Squarespace, GoDaddy, Shopify) and WordPress — and the real AI shift reaching non-technical owners is "AI-as-default-onboarding" *inside* those incumbents, not adoption of standalone AI-native generators, most of which are actually developer/founder/app tools rather than small-business website products.

## TL;DR
- **Non-technical owners get sites from incumbents, not from AI-native startups.** The buzzy AI-native tools (Lovable, Bolt.new, v0, Base44, Replit Agent) are, on the evidence, developer / founder / app-building products, not small-business marketing-site products. The AI actually reaching SMB owners is embedded in the incumbents they already use.
- **"AI-as-a-feature" inside incumbents is where non-technical adoption is real and disclosed:** Squarespace says more than half of new customers now begin in Blueprint AI, and GoDaddy's Airo grew its annualized bookings run-rate 5x from $10M to $50M in a single quarter (Q1→Q2 FY2026). Standalone AI generators post huge "sites built" counts but almost no verifiable live-site survival.
- **Revealed behaviour diverges sharply from the marketing.** Verisign reports first-year .com renewal in the mid-40% range and that only ~18% of first-year domains are attached to any online presence; most launched sites are rarely updated; and social profiles plus booking marketplaces (Instagram, Google Business Profile, Fresha, Vagaro) are the real substitute good for a large minority of owners. Several widely-cited figures ("8%→30% of new sites are AI-generated," "only 29% of AI sites pass Core Web Vitals," "73% of SMBs have a website") do not survive sourcing.

## Key Findings
1. **The base rate is contested and vendor-polluted.** The most defensible recent primary survey — Clutch, "State of Small Business Websites 2025" (conducted 5 August 2025 via SurveyMonkey, N=406 US small-business owners, quota-balanced) — found **83% have a website, up from 64% in 2018.** The much-repeated "73%" (Zippia) and "60%/40%" (Visual Objects, 2019) figures are older and/or uncited. No US government statistic cleanly measures "share of small businesses with a website."
2. **Social media and marketplaces are the real substitute, not a rival builder.** GoDaddy's 2025 Global Entrepreneurship Survey found roughly half of small businesses now primarily operate online via websites, marketplaces, *or* social media, and 80% call social media important to sales. For whole verticals (salons, fitness, restaurants), a booking marketplace or Google Business Profile — not an owned site — is the primary customer channel.
3. **Platform detection ≠ how a site was made.** W3Techs/BuiltWith fingerprint the platform, not provenance. A Wix site made by Aria and one made from a template are byte-identical to a detector. Whole-web CMS share is NOT segmented to SMBs, and no reliable SMB-only platform split exists publicly.
4. **AI-native generators split into two non-overlapping markets.** Durable, 10Web, B12, Mixo, Butternut target non-technical SMB owners. Lovable, Bolt.new, v0, Base44, Replit Agent target developers, founders, and *app* builders. Conflating them is the single biggest analytical error in this space.
5. **AI-as-a-feature inside incumbents is where non-technical adoption is real and disclosed.** Squarespace: >50% of new customers start with Blueprint AI. GoDaddy Airo: $50M annualized bookings run-rate (Q2 FY2026), 5x its prior quarter. Wix launched its AI builder globally in early 2024 and Aria/Harmony in 2026 but has *not* disclosed a % of new sites starting from AI.
6. **Survival is the crux, and it is largely unmeasured.** Vendors quote cumulative "sites built" (Durable 10M+, B12 3M+, Mixo 3M+, 10Web 1M+, Base44 5M+ apps). These are attempts, not survivors. The one hard live-vs-built ratio found — Wix AI Website Builder, 73 live of 277,432 ever built = 0.026% (BuiltWith, Nov 2023) — is illustrative but single-source.
7. **Domain renewal data is the best proxy for survival, and it is sobering.** Verisign: first-year .com renewal is mid-40%; second-year-and-later is mid-80%; blended 2026 renewal ~76.3%. Only ~18% of first-year .com/.net domains are "attached to an online presence." Domains for AI-tool-built sites renew ~20 points higher — but off a tiny base.
8. **Post-launch, most SMB sites are rarely updated.** No rigorous crawl-based cohort study of SMB update cadence exists; agency guidance clusters around "redesign every 2–3 years," which is prescriptive, not observed. This is a genuine evidence gap.

## Details by Section

### A. The base rate

**A1. Share with a website.** The strongest recent primary source is **Clutch's "State of Small Business Websites 2025"** (survey conducted 5 August 2025 via SurveyMonkey; N=406 US small-business owners; quota-balanced; 54% male/46% female): **83% have a website, up from 64% in 2018.** Clutch's Jeanette Godreau, who oversees its web-design content, attributes the rise to accessibility: "No-code platforms and AI have made high-quality web design more accessible than ever." Clutch's own site-platform breakdown for those businesses: **41% built on DIY builders (Wix/Squarespace-type), 34% on WordPress/Shopify, and 12% custom.** [VENDOR-CLAIMED — Clutch is a B2B agency-review marketplace whose content promotes hiring web designers.]

The frequently-cited **"73% have a website" (Zippia)** and **"60% have / 40% don't" (Visual Objects, 2019)** are older and, in Zippia's case, uncited. GoDaddy's **Venture Forward** program (Feb 2024 national survey, N=3,500+ US microbusiness owners) is a rigorous vendor survey but focuses on GenAI use and business sentiment, not a clean website-ownership rate. **No US Census / Annual Business Survey figure was located that cleanly states the share of small businesses with a website** — a negative result. Size breakdowns (solo vs 1–9 vs 10–49 employees) were not available from any primary source.

**A2. Social media / marketplace instead of a site.** GoDaddy's **2025 Global Entrepreneurship Survey** found nearly half of small businesses now primarily operate online through some mix of websites, marketplaces, or social media, with 80% calling social media important to their sales strategy and 50% "very important." [VENDOR-CLAIMED — GoDaddy.] This is the real substitute good and it is growing, though no clean longitudinal "% with social-only, no website" series exists. Google has tightened rules against using a Facebook page in the Google Business Profile "website" field, nudging some owners toward at least a minimal site or a GBP-generated page.

**A3. Who makes the site.** Clutch 2025: small businesses are split — **~45% outsource to a web design agency, ~46% build in-house.** Clutch's 2019 predecessor found 39% used a website builder/software, 35% a freelancer/consultant, 19% an agency, with 52% using in-house staff for maintenance. A 2021 vendor compilation (Pixolabo) reported 51% in-house, 40% freelancer, 38% DIY builder, 31% agency. [All VENDOR-CLAIMED or uncited.] The consistent takeaway: DIY builders + in-house staff dominate the low end; agencies serve the more complex/expensive tier.

### B. Platform share

**B4–B5. Installed base vs new formation.** Whole-web CMS share (W3Techs, mid-2026): WordPress ~41–42%, Shopify ~5%, Wix ~4.3%, Squarespace ~2.5%; ~29–30% of sites use no detected CMS. HTTP Archive/CrUX-based measurement (Joost de Valk / GravityKit, April 2026) puts WordPress lower at ~33% because it counts subdomains separately and excludes very-low-traffic sites. **Neither is segmented to SMBs**, and both are detection-based (Trap 1). The one clear leading-indicator signal: among detectable CMSs, Wix and Squarespace grew fastest year-over-year while WordPress recorded its first sustained contraction in ~20 years — consistent with new small-business sites favoring hosted builders. Wix's CEO Avishai Abrahami stated an *ambition* for 50% of new internet sites to be built on Wix within 5–7 years — a stated goal, not a measured share.

**B6. Regional.** Builder share skews higher in North America (~38% of website-builder market revenue) with hosted builders more dominant in developed English-speaking markets; WordPress and hand-coded/other remain relatively larger elsewhere; emerging markets have far lower website penetration overall. All regional splits here are analyst/market-research estimates, not measured SMB data.

### C. AI-native generators — actual adoption

The category bifurcates cleanly:

**SMB-facing AI site builders** — genuinely aimed at non-technical owners but disclose almost nothing about *live* vs *drafted* sites: **Durable** (Vancouver/SF; targets plumbers, coaches, cleaners; 10M+ sites "built," 3M+ users claimed; free tier does not publish live until paid); **10Web** (AI + WordPress hosting; 1M+ sites claimed, 20M+ plugin downloads); **B12** (human-assisted AI for service pros; 3M+ sites claimed); **Mixo** (idea validation/landing pages; 3M+ businesses claimed); **Butternut AI**.

**Developer/founder/app tools (NOT SMB marketing sites):** **Lovable** — hit ~$500M annualized revenue by mid-2026 (from $200M in Nov 2025) at a ~$13.2B valuation; ~2.3M active users and 180,000 paying subscribers at its $100M-ARR milestone (TechCrunch, July 2025); ~8M users by Feb 2026 (Sacra); explicitly "vibe coding" apps for founders/product teams/developers. **Bolt.new** — 5M registered users (May 2025), ~$40M ARR; full-stack apps. **v0 by Vercel** — ships as a feature, no standalone revenue disclosed; UI/component generation for developers. **Base44** — acquired by Wix for ~$80M (June 2025), reached $100M ARR nine months post-acquisition, 5M+ apps, ~250–400K users — an app builder, not a site builder. **Replit Agent** — developers/learners building apps. **These should not be counted as small-business website tools.**

Traffic/tool inference (Similarweb-class) ranks Bolt.new and Lovable among the top AI coding tools; Durable and 10Web receive far less press-verified traffic disclosure. Registered-vs-paying-vs-live gaps are enormous everywhere, and vendors quote the first.

**AI-as-a-feature inside incumbents (the disclosures that matter):**
- **Squarespace:** Blueprint AI (part of the Design Intelligence suite, launched Refresh 2024; expanded Refresh 2025). Per TIME's Best Inventions of 2025 profile (Nov 2025), quoting CPO Paul Gubbay, **"More than half of new customers now begin with Blueprint,"** with a late-September update adding a chat element. This is the strongest disclosed "% of new sites from AI flow" datapoint found. [VENDOR-CLAIMED but specific and attributed.]
- **GoDaddy Airo:** $10M annualized bookings run-rate within weeks of beta (Q1 FY2026 call), then per the Q2 FY2026 earnings call (30 July 2026), CEO Aman Bhutani: **"Annualized bookings run rate has increased 5x to $50 million versus the $10 million we shared just one quarter ago,"** with customers "choosing Airo at a rate that is exceeding our expectations" and over 70% of Airo users holding two or more products. GoDaddy is *de-emphasizing* template-based builders and "do-it-for-you" services, folding them into Airo. [MEASURED — earnings calls.]
- **Wix:** launched its AI Website Builder globally in early 2024; Aria/Wix Harmony in 2026. No disclosed % of new sites from the AI flow — **negative result.**
- **Hostinger:** claims its traditional builder averaged 1.9 days creation-to-publish (down from 6.6 in Oct 2024) — a vendor operational stat, not an AI-share stat.

### D. Survival and retention (the crux)

**D9. AI-generated site survival.** Direct data barely exists. Vendor "built" counts are cumulative attempts that include unpublished drafts and free vendor-subdomain sites (e.g., `project.durable.site`). The single hard live-vs-built ratio located: **Wix AI Website Builder — 73 live sites of 277,432 ever built = 0.026%** (BuiltWith, 13 Nov 2023, via a secondary blog). This also illustrates Trap 1: BuiltWith can only see sites carrying that specific fingerprint, so the number understates all AI generation while still demonstrating the vast "built vs live" gap. **No cohort study, Common Crawl, or Internet Archive sampling of AI-*builder* site survival at 3/6/12 months was found** — a genuine research gap. BuiltWith's Live-vs-Historical counters for Durable/10Web/B12/Mixo are JavaScript-rendered and could not be extracted without a browser session or paid API; the relevant tracker URLs exist but the integers are not exposed in search snippets.

**D10. Baseline churn.** The best available proxy is domain renewal. Per Verisign's Q1 2026 earnings call (23 April 2026), CFO John Calys: **first-time (first-year) renewals sit in the "mid-40% range" and previously-renewed names in the "mid-80% range,"** with the overall expected 2026 renewal rate at 76.3% (up from 75.5% prior year). Per Verisign's Stuart Dinnes at Nordic Domain Days (Stockholm, 25 May 2026, via Domain Name Wire): only **~18% of first-year .com/.net domains are categorized as "attached to an online presence"** (rising substantially in recent years); domains built into a web presence or email renew ~9 points higher; a simple domain forward adds ~13 points; and **domains for AI-tool-built sites renew ~20 points higher — but Verisign explicitly cautions this is "a very, very small subset"** since AI-tool growth is <12 months old. Interpretation: roughly half of all newly registered domains vanish within a year, and only a minority ever carry a real site — so cumulative "sites built" massively overstates the live installed base for every builder, AI or traditional.

### E. Behaviour after launch

**E11–E12. Update cadence and triggers.** No rigorous crawl-based or academic study of SMB update frequency was found. Agency/vendor guidance uniformly prescribes "content monthly, redesign every 2–3 years," but this is normative advice, not observed behaviour, and should not be reported as a measured median. Named change triggers (from agency sources): rebrand, new service line, competitor pressure, an agency pitch, platform migration, or a specific complaint. The distinction between prescription and revealed behaviour is itself the finding here.

**E13. Bundled/free sites — publish-and-customize rate.** This came back **UNKNOWN** across every supplier, consistent with prior research. No platform (GoDaddy, Wix, Squarespace, Google, POS/booking vendors) discloses what share of bundled/free sites are ever published or customized past default. Indirect evidence is strong that it's a minority: Durable's own funnel implies 10M+ "built" vs 3M+ "users" vs a much smaller paid base; free tiers at Durable/B12/Mixo gate public publishing behind payment; and Verisign's 18% "attached to an online presence" figure caps how many domains carry a real site at all. **This remains the single most valuable missing number in the entire question.**

**E14. What they pay.** Ranges (all vendor/agency-sourced): DIY builder subscriptions roughly $12–50/month plus domain; freelancer one-offs commonly $500–5,000; agencies higher; booking/POS bundles fold the site into an existing SaaS fee. Clutch 2019: ~65% of SMBs spent under $10,000 to build their site.

### F. Why they choose what they choose

**F15. Decision drivers.** Survey evidence (Clutch, GoDaddy, Fiverr) points to price, ease/speed, "it came free with something else," and recommendation as top drivers, with SEO and appearance secondary. Fiverr's 2025 Small Business Month survey (~6,000 SMBs across 25 countries) found 70% spend under five hours/week on marketing and ~46% use freelancers for their primary business — time-scarcity is a dominant hidden driver.

**F16. Satisfaction and regret.** Owners tend to mention design/appearance mainly when prompted; unprompted, complaints cluster on leads/traffic and time. No clean dataset separating unprompted vs prompted design complaints was found — flagged as a gap.

**F17. Template awareness.** No study was found measuring whether non-technical owners can distinguish templated from custom sites; anecdotal agency commentary says most cannot and don't notice template similarity. UNKNOWN.

### G. Segment cuts

Website dependence varies enormously by how customers find the business. **Salon/spa, fitness, and beauty** run heavily on booking marketplaces — Fresha (which moved away from its fully-free model in late 2024, finalized Nov 2025), Vagaro, Booksy, GlossGenius, Mindbody, StyleSeat — where the "site" is a booking profile, not an owned marketing site. **Restaurants** lean on DoorDash/Uber Eats/Google. **Home services** lean on Google Business Profile and lead-gen directories. **Real estate** on Zillow. **Legal/healthcare** are more likely to maintain a conventional owned site. Where a marketplace owns discovery, the whole builder-vs-AI question is largely moot for that vertical.

## Master Table

| Question | Best answer | Evidence tag |
|---|---|---|
| % US SMBs with a website | 83% (Clutch 2025, N=406); "73%" (Zippia) is folklore | VENDOR-CLAIMED |
| Clutch platform split of those sites | 41% DIY builders / 34% WordPress+Shopify / 12% custom | VENDOR-CLAIMED |
| Social/marketplace as substitute | ~half operate online via site/marketplace/social; 80% call social important | VENDOR-CLAIMED (GoDaddy 2025) |
| Who builds it | ~45% agency / ~46% in-house+DIY (Clutch 2025) | VENDOR-CLAIMED |
| Whole-web CMS share | WP ~42%, Shopify ~5%, Wix ~4.3%, Squarespace ~2.5% (W3Techs mid-2026); WP ~33% (HTTP Archive) | MEASURED (detection; NOT SMB-segmented) |
| New-site leading indicator | Wix/Squarespace fastest-growing; WP first sustained contraction | MEASURED (detection) |
| Squarespace AI flow adoption | >50% of new customers start in Blueprint AI | VENDOR-CLAIMED (attributed, TIME 2025) |
| GoDaddy Airo | $10M→$50M annualized bookings Q1→Q2 FY2026 (5x) | MEASURED (earnings) |
| Wix AI flow % of new sites | Not disclosed | NEGATIVE RESULT |
| AI-native site survival | Wix AI Builder 73 live / 277,432 ever = 0.026% (BuiltWith 2023) | ESTIMATED (single-source, illustrative) |
| Domain first-year renewal | mid-40% (.com); mid-80% year 2+; blended ~76.3% 2026; AI-built +20pts (tiny base) | MEASURED (Verisign 2026) |
| Domains attached to a real site | ~18% of first-year .com/.net | MEASURED (Verisign 2026) |
| Bundled/free-site publish rate | UNKNOWN | NEGATIVE RESULT |
| SMB update cadence (observed) | UNKNOWN; agency prescription = redesign every 2–3 yrs | NEGATIVE RESULT |

## CSV

```csv
question,best_answer,evidence_tag,source,date
pct_smb_with_website,83% (Clutch); 73% Zippia is folklore,VENDOR-CLAIMED,Clutch State of Small Business Websites,2025-08
clutch_platform_split,41% DIY builders / 34% WordPress+Shopify / 12% custom,VENDOR-CLAIMED,Clutch,2025-08
social_marketplace_substitute,~half operate online via site/marketplace/social; 80% call social important,VENDOR-CLAIMED,GoDaddy Global Entrepreneurship Survey,2025-07
who_builds_site,~45% agency / ~46% in-house+DIY,VENDOR-CLAIMED,Clutch,2025
whole_web_cms_share,WP~42 Shopify~5 Wix~4.3 Squarespace~2.5,MEASURED-DETECTION,W3Techs,2026-mid
cms_leading_indicator,Wix/Squarespace fastest-growing; WP first sustained contraction,MEASURED-DETECTION,HTTP Archive/Joost,2026-04
squarespace_blueprint,>50% new customers start in Blueprint AI,VENDOR-CLAIMED,TIME Best Inventions / Squarespace CPO,2025-11
godaddy_airo,$10M to $50M annualized bookings Q1 to Q2 (5x); 70%+ hold 2+ products,MEASURED-EARNINGS,GoDaddy Q2 FY2026 earnings call,2026-07
wix_ai_flow_share,not disclosed,NEGATIVE-RESULT,Wix,2026
ai_native_survival,73 live of 277432 ever = 0.026%,ESTIMATED,BuiltWith via mycodelesswebsite,2023-11
domain_first_year_renewal,mid-40pct .com; mid-80 yr2+; blended 76.3pct 2026; AI-built +20pts tiny base,MEASURED,Verisign Q1 2026 call / Nordic Domain Days,2026
domains_attached_to_site,~18pct of first-year .com/.net,MEASURED,Verisign,2026
bundled_free_publish_rate,unknown,NEGATIVE-RESULT,none,2026
smb_update_cadence,unknown; agency prescription 2-3 yrs,NEGATIVE-RESULT,agency blogs,2026
```

## AI-Native Generators Table

| Product | Actual primary user | Users claimed | Paying users | Live sites (best available) | Traffic/scale signal | Pricing | Evidence quality |
|---|---|---|---|---|---|---|---|
| Durable | Non-technical SMB (plumbers, coaches, cleaners) | 3M+ users / 10M+ sites "built" | Not disclosed | Unknown (free tier not live until paid) | Moderate press | ~$12–15/mo+ | Low (vendor) |
| 10Web | SMB + WordPress users | 1M+ sites "built" | Not disclosed | Unknown | 20M+ plugin downloads | ~$10–24/mo | Low (vendor) |
| B12 | Service pros (consultants, coaches) | 3M+ sites "built" | Not disclosed | Unknown (draft vs published) | Low | Freemium+ | Low (vendor) |
| Mixo | Founders validating ideas / landing pages | 3M+ businesses | Not disclosed | Unknown (1-page free) | Low | Freemium+ | Low (vendor) |
| Butternut AI | SMB marketing sites | Not disclosed | Not disclosed | Unknown | Low | Freemium+ | Very low |
| Lovable | Developers, founders, product teams (APPS) | ~2.3M active (Jul 2025); ~8M (Feb 2026) | 180K (Jul 2025) | N/A (apps) | ~$500M ARR mid-2026; ~$13.2B valuation | $20–100+/mo | High (TechCrunch/Sacra) |
| Bolt.new | Developers/founders (full-stack apps) | 5M registered (May 2025) | Not disclosed | N/A (apps) | ~$40M ARR | token-based | High (BI/Sacra) |
| v0 (Vercel) | Developers (UI/components) | Not disclosed | Bundled | N/A | No standalone revenue | Bundled | Medium |
| Base44 (Wix) | Non-technical founders/operators (APPS) | ~250–400K users / 5M+ apps | Not disclosed | N/A (apps) | $100M ARR 9mo post-acquisition | Freemium+ | High (Wix earnings) |
| Replit Agent | Developers/learners (apps) | Not disclosed | Not disclosed | N/A | n/a | subscription | Medium |

## Platform Share for New SMB Sites Over Time

| Signal | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|
| Whole-web WordPress share (W3Techs) | ~43% | ~43% | ~43% peak | ~41–42% (first contraction) |
| Wix growth (YoY, detection) | growing | growing | +22–33% | fastest-growing major CMS |
| Squarespace new customers via Blueprint AI | n/a | launched | — | >50% |
| GoDaddy Airo annualized bookings | n/a | n/a | beta | $10M→$50M (Q1→Q2 FY2026) |
| AI-native SMB builder live-site share of new sites | negligible | negligible | negligible-but-rising | UNKNOWN/likely small |

*Note: no source provides a true SMB-only new-site platform distribution. Every row is either whole-web detection (not SMB-segmented) or a single-platform disclosure. There is no measured cross-platform SMB new-site share table; this is a negative result.*

## What the Evidence Does and Doesn't Support

**Established:** Incumbent hosted builders + WordPress dominate the installed base; hosted builders are gaining on WordPress in new formation; AI-as-onboarding inside incumbents is real and partially disclosed (Squarespace >50% Blueprint; GoDaddy Airo $50M run-rate); developer-facing AI tools (Lovable, Bolt, Base44) are large but are NOT small-business marketing-site products; roughly half of newly registered domains lapse within a year and only ~18% carry a real online presence.

**Open / unverified:** True SMB-only platform distribution; % of new sites at Wix/GoDaddy/Shopify starting from AI (except Squarespace); live-site survival curves for any AI-native builder; publish/customize rate of bundled free sites; observed (not prescribed) SMB update cadence; unprompted vs prompted design complaints; solo/1–9/10–49 employee breakdowns.

## Circulating Statistics That Do NOT Survive Sourcing (named individually)

1. **"AI website builders generated ~8% of new sites in 2023 and 30%+ by 2026."** Traces to uncited listicles (StackTutor "Best AI Website Builders 2026"; DigitalApplied "Website Statistics 2026"). No primary study exists. **Uncited folklore.**
2. **"Only 29% of AI-generated sites pass Core Web Vitals."** The genuine "29%" figure is *UK sites that do NOT meet Core Web Vitals* (Hostingstep CWV study), misattributed to AI-generated sites. **Misattributed statistic.**
3. **"73% of US small businesses have a website."** Zippia, uncited; parroted by dozens of blogs including Wix's own stats page. **Uncited folklore** (the better-sourced 2025 number is Clutch's 83%).
4. **"Wix has ~45% of the website-builder market / ~8 million live sites."** Colorlib, based on selective builder-only counting that excludes WordPress and Shopify. **Cherry-picked framing.**
5. **"Global AI website builder market worth $3.24B (2026) growing to $17.43B by 2035."** Precedence Research / Custom Market Insights projections — **forecasts, not measured adoption**, and unrelated to how many SMBs actually use these tools.
6. **"330 million SMEs, less than 30% have a professional website."** Circulates via market-research PDFs (Custom Market Insights) with no stated methodology. **Unsourced TAM claim.**
7. **"73 live Wix AI Website Builder sites in the world" as a market-size fact.** A real BuiltWith datapoint, but it measures a narrow fingerprint, not AI-built sites overall — routinely misquoted as if it captured all AI generation. **Detection artifact presented as market size (Trap 1).**

## Caveats
- **Trap 1 (detection ≠ provenance) governs the whole report:** every W3Techs/BuiltWith number identifies the platform, never whether AI or a human made the site. No source overcomes this.
- **Trap 2 (SEO pollution):** the topic is saturated with uncited listicles that cite each other; figures were traced to primary sources wherever possible and named as folklore where not.
- **Vendor surveys are flagged every time** (Clutch, GoDaddy, Fiverr, Wix). They are directionally useful but self-interested; the two most decision-relevant AI-adoption numbers (Squarespace Blueprint >50%; GoDaddy Airo $50M) are both first-party disclosures and should be read as such.
- **Dates matter:** anything pre-2023 predates LLM-based builders entirely; the AI-builder cohort is <18 months old, so renewal/survival data on it is necessarily thin (Verisign's own caveat).
- **Stated preference vs revealed behaviour diverge sharply, and that divergence is itself the headline finding.** Surveys say owners value design and "having a website"; revealed behaviour — mid-40% first-year domain lapse, only ~18% of domains attached to a real presence, rare updates, migration to booking marketplaces, and free-tier drafts that are never published — says most non-technical owners treat their website as a low-priority, set-and-forget, or entirely substitutable asset. The AI-generation boom has made *starting* a site nearly free and instant; it has not been shown to change whether those sites survive, get paid for, or get updated.