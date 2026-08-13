# Why Businesses Switch CRMs, and Which Named Features Were Missing: An Evidence Report

## 1. TL;DR

- In the assembled evidence (roughly 24 documented complaint/switch instances across home services, salon/wellness, legal, property management, construction, restaurant and horizontal CRM), missing functionality is not the top switching driver. It ranks behind price/cost-at-scale and usability/adoption, and roughly level with support quality and integrations. Counted as instances where a named or category reason is attached to an actual switch or documented workaround: price/cost-at-scale ~11, usability/adoption ~9, missing functionality (specific named capability) ~9, support quality ~7, integrations ~6, reporting/data access ~6, performance/reliability ~4. These counts come from vendor comparison pages, review-platform text, and consultant blogs, which over-represent price and usability because those are the axes vendors and reviewers write about.
- Band distribution across ~24 instances with an identifiable capability or reason: Band A (caused an actual switch) ~10; Band B (paid for a workaround, stayed) ~5; Band C (complained, lived with it) ~9. No published dataset gives a comparable band distribution; this is a hand-count of a small, source-biased sample, not a measured population.
- Of the missing-functionality complaints where a capability is named, the large majority are generic (useful to most customers of that platform: custom/exportable reporting, multi-location roll-up reporting, accounting/QuickBooks sync, custom objects) rather than business-specific. In this sample roughly 4 in 5 named gaps are generic. The same capabilities recur across unrelated verticals (report customization and export appears against ServiceTitan, Toast, and Salesforce; custom-object limits appear against both Salesforce and HubSpot), and reporting/customization complaints reappear on destination platforms, so those complaints follow users across platforms rather than being resolved by a switch.

## 2. Key Findings

1. **Price/cost-at-scale is the most frequently documented switching driver in this sample (~11 instances).** VENDOR-CLAIMED / review. Salesforce reviewers quoted on Salesflare: "WAAAAAAY too expensive for what you get" and "License fees are out of control when you exceed the default number of custom objects" (blog.salesflare.com/salesforce-vs-hubspot). Mindbody→Zenoti switching is attributed to renewal price increases; Zenoti's comparison page quantifies it as "significant price increases at Mindbody contract renewal (users report 50-100%+ increases)" (zenoti.com/thecheckin/zenoti-vs-mindbody), against Mindbody's published pricing that starts at $99/month and scales to $599/month for the Ultimate Plus tier. Source-type note: comparison pages are sales documents that select for price framing.

2. **Usability/adoption is the second most documented driver (~9 instances).** VENDOR-CLAIMED / review. HubSpot's own switching page quotes a customer: "Salesforce was just too difficult to make do what we want without pricey consultants, whereas HubSpot was easy and intuitive out of the box" (hubspot.com/switch-from-salesforce). This is a stated reason on a sales document, not revealed behavior.

3. **Missing functionality with a specifically named capability appears in ~9 instances and is roughly tied for third.** Named capabilities include: multi-location roll-up reporting; custom/exportable reports; native accounting/job-costing; custom objects on lower tiers; and booking models for mixed service types. Review / consultant-marketing / VENDOR-CLAIMED depending on row (see Table 1).

4. **The single best-documented named vertical gap: Mindbody was built fitness-first and adapted to salons, and salon operators switched to Zenoti for that reason.** Review. Software Advice reviewer: "we were added into the Gym platform - we were not designed as hair salon software from the ground up." A Capterra Zenoti reviewer: "We switched from Mindbody because we needed a platform with more flexibility and customization for our business model" — naming spa services, thermal experiences, classes, packages, gift cards and hotel-related services in one booking system (softwareadvice.com; capterra.com/p/131057). Band A.

5. **Custom reporting is gated behind higher ServiceTitan tiers, which converts a reporting need into a paid upgrade (Band B).** Primary (vendor documentation). ServiceTitan help docs: "The ability to create custom reports is dependent on your ServiceTitan Package. For custom reports access, please contact your Customer Success Manager" (help.servicetitan.com). Reviewers also report reporting-layout inflexibility: "Limited flexibility of customizing the current layout of reporting templates" (capterra.com ServiceTitan reviews p.3).

6. **The vertical→horizontal migration the brief most wanted tested is close to a NEGATIVE RESULT in the public record.** No usable documented case was found of a company leaving ServiceTitan, Clio, Mindbody, kvCORE, AppFolio, Procore, Buildertrend or Dentrix for Salesforce/HubSpot/Zoho/Dynamics specifically to gain extensibility. The direction that IS documented is the reverse framing: vendor and consultant pages argue Salesforce requires customization and consultants, and vertical platforms are chosen to avoid that. ServiceTitan's own page: Salesforce "often needs a lot of customization... trade companies will often need to build extensions or integrate with third-party applications to fill functional gaps" (servicetitan.com/comparison/servicetitan-vs-salesforce). Salesforce markets Field Service as a ServiceTitan alternative but names no migration cases (salesforce.com/compare/servicetitan-alternatives).

7. **Horizontal↔horizontal (Salesforce↔HubSpot) is the richest, best-documented switching corridor, and it runs in both directions.** Consultant-marketing / VENDOR-CLAIMED. Salesforce→HubSpot is attributed to admin cost, consultant dependency, and adoption failure (pedowitzgroup.com, "based on 100+ migrations"; huble.com, "more than 500 HubSpot implementations"). HubSpot→Salesforce is attributed to needing "custom objects on non-Enterprise tiers, complex approval workflows, or industry-specific clouds" (tech-insider.org). Both are consultant blogs selling the migration they describe.

8. **Revealed-behavior signal: migration-service supported paths are dense among horizontal CRMs and near-absent for the vertical platforms in the brief.** MEASURED (marketplace-published lists) / ESTIMATED. Import2, Trujay/SyncMatters and HubSpot Smart Transfer publish connectors among Salesforce, HubSpot, Zoho, Dynamics, Pipedrive, Copper, Keap, ActiveCampaign. No comparable automated connector was found for ServiceTitan, Mindbody, Clio, AppFolio, Procore. A supported path measures what a vendor built a connector for, not migration volume.

9. **Data migration is cheap and bounded; full implementation is expensive and multi-month; the two are frequently conflated.** VENDOR-CLAIMED (migration pricing) + MEASURED (implementation survey). Automated data migration is priced per record: Import2 CRM tiers "$499 · For databases with less than 50,000 records," "$999 · less than 100,000," "$1,499 · less than 200,000," "$1,999+" above that (import2.com/pricing); Trujay/SyncMatters self-service $149 (<5k) to $3,499 (up to 2M records), guided add-on $875, fully-managed custom $2,500–$6,000 (syncmatters.com); Help Desk Migration "$100 for 1,000 records, while migrating 10,000 records under the same conditions costs just $514" (help-desk-migration.com/pricing). Full implementation is the large number: an Aptitude 8/Ascend2 survey of 332 sales/marketing professionals at mid-sized companies (100–1,000 employees) using HubSpot or Salesforce, fielded December 2022, of whom "94% had insight into their CRM implementation, and 88% implemented it within the last two years," found "43% of sales and marketing professionals surveyed reported an implementation process that took four months or longer," and "Nearly two-thirds (64%) of HubSpot users report that it took 3 months or less to implement their current CRM solution compared to just 51% of Salesforce users" (aptitude8.com/a-look-at-the-total-cost-of-ownership-of-hubspot-vs-salesforce).

10. **The widely circulated "CRM failure rate 30%/50%/70%" family of statistics does not survive sourcing.** See Section 6. The "Gartner 50%" and "Forrester 47%" figures are repeated across dozens of vendor blogs; the traceable root is a Harvard Business Review article (Scott Edinger, Dec 2018) which states the number "was actually an average of a dozen analyst reports. The numbers ranged from 18% to 69%" (hbr.org). Johnny Grow, who published an actual survey (55%), states there is "a lack of consensus for what defines a CRM software implementation failure."

## 3. Details by Research Question, Band, and Platform

### 3.1 Is missing functionality a top-three switching driver?

As a ranking question with instance counts (denominator ≈ 24 documented instances carrying an attributable reason):

| Rank | Reason | Instances | Dominant source type |
|---|---|---|---|
| 1 | Price / cost at scale | ~11 | Vendor comparison pages, review text |
| 2 | Usability / adoption | ~9 | Vendor switching pages, consultant blogs |
| 3 | Missing functionality (named capability) | ~9 | Reviews, consultant case notes |
| 3 | Support quality | ~7 | Review text (G2/Capterra Cons) |
| 5 | Integrations | ~6 | Reviews (QuickBooks sync), marketplaces |
| 5 | Reporting / data access | ~6 | Reviews, vendor docs |
| 7 | Performance / reliability | ~4 | Reviews (outages) |

Missing functionality is present but not dominant. It sits at or just below usability and clearly below price. Sampling bias runs against functionality: the highest-yield sources (competitive switching pages, "vs" comparison articles) are organized around price and ease-of-use, and G2's pros/cons taxonomy for ServiceTitan surfaces "Ease of Use," "Customer Support," "Learning Curve," "Poor Support" and "Limited Functionality" as named clusters, with "Limited Functionality" the smallest of the con clusters (9–10 mentions vs 20–23 for Learning Curve) (g2.com/categories/hvac). Review-platform pros/cons counts measure how reviewers phrase feedback, not switching volume.

### 3.2 Band distribution (the brief's central structure)

- **Band A — caused a switch (~10).** Mindbody→Zenoti (fitness-first platform; multi-location; mixed-service booking). FieldEdge→ServiceTitan ("Too many outages/problems... Constantly having outages which costed us a lot of money"). FieldAware→ServiceTitan ("Not good at reports"). Successware→ServiceTitan ("Could not fulfill all the needs I needed to run my company" — CAPABILITY UNKNOWN). FACS→ServiceTitan ("couldn't grow... with the limitations and lack of features" — CAPABILITY UNKNOWN). Buildium→AppFolio ("owners wanted a product that handles property management coupled with accounting"). Salesforce→HubSpot (cost/consultant dependency). HubSpot→Salesforce (custom objects on lower tiers / approval workflows).
- **Band B — paid for a workaround, stayed (~5).** ServiceTitan custom reporting gated behind higher package = paid tier upgrade. ServiceTitan↔Salesforce Zapier connector (a paid third-party integration to sync records the platform does not sync natively — zapier.com/apps/salesforce/integrations/servicetitan). Clio advanced reporting/CRM behind higher tiers (Clio Grow add-on). Weave Practice Analytics purchased by Dentrix/Eaglesoft/Open Dental practices to add reporting/patient-analytics their PM software lacked (businesswire.com, 2023). Toast users exporting order data to Excel to run pivot tables the POS cannot.
- **Band C — complained, lived with it (~9).** ServiceTitan report-layout inflexibility; ServiceTitan QuickBooks sync failures ("Syncing well with QB has NOT happened"); Toast "you cannot customize any reports and balancing at the EOD is nearly impossible"; Toast "not able to export order details into excel"; Buildertrend "The only thing missing is a first class accounting and job cost system"; Buildertrend "Not a lot of customization with the system"; AppFolio security-deposit adjustment on a past tenant without the move-out flow; MyCase "better calendar integration is also a common request"; Clio "limited options for repeating tasks."

Band B is the smallest documented band in this sample, but that is partly a measurement artifact: workarounds (an app install, a Zapier zap, a spreadsheet) generate far less written text than a switch (which produces a review) or a vendor comparison page. App marketplaces are the standing Band B evidence — every listed paid app is a gap someone pays to fill — but the platforms in the brief mostly do not publish install counts, so Band B volume cannot be measured from marketplace data.

### 3.3 Do businesses leave vertical CRMs for horizontal platforms to customize/extend?

Documented cases found: effectively none with a named extensibility reason. This is the brief's most-wanted cut and it is largely a negative result.

What exists instead:
- **Vendor framing runs the other way.** ServiceTitan argues Salesforce Field Service "often needs a lot of customization to meet the tailored needs of trade businesses" and that trade companies "need to build extensions or integrate with third-party applications to fill functional gaps" — positioning extensibility as a *burden* of the horizontal platform, not a *draw* (servicetitan.com).
- **Salesforce markets into the verticals but names no defectors.** Salesforce's "ServiceTitan alternatives" page pitches Field Service to HVAC/plumbing/electrical but documents no company that migrated (salesforce.com/compare/servicetitan-alternatives).
- **Reverse direction (horizontal→vertical) is asserted but also uncased.** Consultant/blog text describes Salesforce as "not a CRM you configure yourself... a development platform that requires technical expertise" (lowcode.agency), which is the mechanism the brief hypothesized would push firms toward vertical tools, but no named company migration was found.

Conclusion on this cut: the public record does not contain documented vertical→horizontal-for-extensibility migrations at instance level. The absence itself is the finding.

### 3.4 Did the new platform solve it, or did the complaint reappear?

Where cross-checks are possible, the same named capability class reappears on the destination:
- **Report customization/export** is complained about against ServiceTitan ("Limited flexibility of customizing... reporting templates"), Toast ("cannot customize any reports"), and Salesforce ("Custom reports built on custom objects need to be recreated... requires rethinking report architecture" — integrateiq.com). The complaint follows users across platforms.
- **Custom-object limits/licensing** appear against both Salesforce ("License fees are out of control when you exceed the default number of custom objects") and HubSpot ("custom object availability and limits depend on subscription" — HubSpot developer docs via noboundsdigital.com). Moving between the two horizontals does not remove the constraint; it changes its shape.

This is a factual observation with the capability named on both sides, not a claim that switching never helps a specific operator.

### 3.5 How expensive is migration (money and time)?

Two distinct numbers, frequently conflated:
- **Data migration (bounded, hundreds to low thousands, VENDOR-CLAIMED per-record pricing):** Import2 CRM $499 (<50k records) → $999 (<100k) → $1,499 (<200k) → $1,999+ (>200k); Trujay/SyncMatters self-service $149 (<5k) → $3,499 (up to 2M records), guided add-on $875, fully-managed custom $2,500–$6,000; Help Desk Migration "$100 for 1,000 records... $514" for 10,000 (help-desk data).
- **Full implementation (large, multi-month):** consultant figures put Salesforce first-year cost "typically exceed $100,000" for a 20-person company (coffee.ai) and HubSpot implementations at $30,000–$90,000+ for custom-object migrations (noboundsdigital.com); one worked HubSpot example: "The migration itself took another ten weeks and cost around $45,000" for a 150-person firm with ~180,000 contacts (insidea.com). The only disclosed-sample survey found (Aptitude 8/Ascend2, N=332, Dec 2022) reports timeline, not a single dollar average: "43%... four months or longer."

High switching cost means unmet demand accumulates rather than resolving, which is consistent with the sample being weighted toward Band A switches that are severe (outages, wrong-industry platform) and Band C complaints people tolerate.

### 3.6 Platform-by-platform evidence density

- **Rich evidence:** ServiceTitan, Mindbody/Zenoti, Salesforce, HubSpot, Clio/MyCase, Jobber/Housecall Pro, Buildium/AppFolio, Buildertrend/Procore, Toast.
- **Thin/indirect evidence:** Dentrix/Weave (integration/press releases, not switching), Follow Up Boss/kvCORE (one blog case, one Reddit summary), GoHighLevel (vendor-authored comparison text only).
- **Negative results (no usable switching evidence found):** Vagaro, WellnessLiving, PushPress, Olo, BoomTown, Yardi, Blackbaud, Subsplash, Planning Center, Shopmonkey, Tekmetric, Jane, Cliniko, Zoho, Dynamics 365, Pipedrive, Monday CRM, Keap (as origin/destination with a named capability).

## 4. Tables

### Table 1 — Named missing-capability instances

| Platform left | Vertical | Named missing capability | Band | Generic or business-specific | Vendor later shipped? | Switched to | Evidence quality | Source (date) |
|---|---|---|---|---|---|---|---|---|
| Mindbody | Salon/hair | Not built ground-up for hair salons; "added into the Gym platform" | A | Generic (to salons) | UNKNOWN | Zenoti | Review | softwareadvice.com (2026) |
| Mindbody | Spa/multi-service | Booking for mixed service types (spa, thermal, classes, packages, gift cards, hotel) in one system | A | Business-specific | UNKNOWN | Zenoti | Review | capterra.com/p/131057 (2026) |
| Mindbody | Salon/spa multi-site | Multi-location management depth | A | Generic | UNKNOWN | Zenoti | Vendor-claimed | zenoti.com (2026) |
| ServiceTitan | HVAC/trades | Custom report creation gated behind higher package tier | B | Generic | Gated, not free | Stayed (paid up) | Primary (vendor docs) | help.servicetitan.com (2026) |
| ServiceTitan | HVAC/trades | Report-template layout customization | C | Generic | UNKNOWN | Stayed | Review | capterra.com reviews p.3 (2024) |
| ServiceTitan | HVAC/trades | QuickBooks sync reliability | C | Generic | UNKNOWN | Stayed | Review | capterra.com reviews p.9 (2019) |
| FieldAware | Field service | Reporting ("Not good at reports") | A | Generic | n/a | ServiceTitan | Review | capterra.com reviews p.9 |
| FieldEdge | HVAC | Reliability/outages | A | Generic | n/a | ServiceTitan | Review | capterra.com reviews p.5 (2024) |
| Successware | HVAC | CAPABILITY UNKNOWN ("could not fulfill all the needs") | A | UNKNOWN | n/a | ServiceTitan | Review | capterra.com reviews p.2 (2026) |
| FACS | Service/install | CAPABILITY UNKNOWN ("limitations and lack of features") | A | UNKNOWN | n/a | ServiceTitan | Review | capterra.com reviews p.4 (2024) |
| Buildium | Property mgmt | Native accounting coupled with property management | A | Generic | UNKNOWN | AppFolio | Review | capterra.com AppFolio reviews p.8 (2023) |
| AppFolio | Property mgmt | Adjust security-deposit balance on past tenant without move-out flow | C | Business-specific | Partially (workaround via support) | Stayed | Review | capterra.com AppFolio reviews p.8 (2023) |
| Buildertrend | Construction | First-class accounting/job-cost system | C | Generic | UNKNOWN | Stayed | Review | capterra.com Buildertrend reviews p.31 (2018) |
| Buildertrend | Construction | System customization | C | Generic | "I think that is changing" | Stayed | Review | capterra.com Buildertrend reviews p.31 (2018) |
| Toast | Restaurant | Custom/exportable reports; EOD balancing | C | Generic | UNKNOWN | Stayed | Review | capterra.com Toast comparisons (2026) |
| Toast | Restaurant | Export order details to Excel for pivot tables | B | Generic | UNKNOWN | Stayed (spreadsheet) | Review | capterra.com Toast vs Focus (2026) |
| Salesforce | Horizontal | Custom objects beyond default without steep license fees | C | Generic | Paid add-on | Stayed | Review | blog.salesflare.com (2026) |
| HubSpot | Horizontal | Custom objects on non-Enterprise tiers; complex approval workflows; industry clouds | A | Generic | Tier-gated | Salesforce | Consultant-marketing | tech-insider.org (2026) |
| Salesforce | Horizontal | Usable without consultants/admin | A | Generic | n/a | HubSpot | Vendor-claimed | hubspot.com/switch-from-salesforce |
| Dentrix/Eaglesoft/Open Dental | Dental | Practice analytics / patient-retention reporting | B | Generic | n/a (3rd-party) | Stayed (bought Weave) | Vendor press release | businesswire.com (2023) |
| Clio | Legal | Advanced reporting/CRM behind higher tiers | B | Generic | Tier-gated | Stayed | Review | softwareadvice.com (2026) |
| MyCase | Legal | Calendar integration | C | Generic | UNKNOWN | Stayed | Review | softwareadvice.com (2026) |
| Clio | Legal | Repeating-task options | C | Generic | UNKNOWN | Stayed | Review | softwareadvice.com (2026) |

Generic vs business-specific split among rows with a named capability (excluding CAPABILITY UNKNOWN): ~18 generic, ~2 business-specific → roughly 80–90% generic in this sample.

### Table 2 — Ranked switching reasons with band mix

| Reason | Total instances | Band A | Band B | Band C |
|---|---|---|---|---|
| Price / cost at scale | ~11 | 3 | 2 | 6 |
| Usability / adoption | ~9 | 4 | 0 | 5 |
| Missing functionality (named) | ~9 | 4 | 2 | 3 |
| Support quality | ~7 | 1 | 0 | 6 |
| Integrations | ~6 | 1 | 2 | 3 |
| Reporting / data access | ~6 | 2 | 2 | 2 |
| Performance / reliability | ~4 | 2 | 0 | 2 |

Instances are not mutually exclusive (a single review often cites price and usability); totals therefore exceed 24.

### Table 3 — Migration direction (documented)

| Direction | Documented? | Named cases | Evidence type |
|---|---|---|---|
| Horizontal → Horizontal (Salesforce→HubSpot) | Yes, richest | Multiple consultant migration counts, no named companies | Consultant-marketing |
| Horizontal → Horizontal (HubSpot→Salesforce) | Yes | Custom-object/approval-workflow driver | Consultant-marketing |
| Vertical → Vertical (Mindbody→Zenoti) | Yes | Salon/spa operators (reviews) | Review |
| Vertical → Vertical (kvCORE↔Follow Up Boss) | Weak | One blog case ($340k), one Reddit summary | Consultant-marketing / forum |
| Vertical → Vertical (FieldEdge/FieldAware/Successware/FACS→ServiceTitan) | Yes | Named in reviews | Review |
| Vertical → Horizontal (for extensibility) | NEGATIVE RESULT | None found | — |
| Horizontal → Vertical (for time-to-value/lower admin) | Asserted, uncased | None named | Consultant-marketing |

### Table 4 — Band B catalogue (paid workarounds, with public cost)

| Workaround | Vertical | What it fills | Public cost | Source |
|---|---|---|---|---|
| ServiceTitan higher package for custom reports | Trades | Custom report builder | Not published (tier-gated) | help.servicetitan.com |
| ServiceTitan↔Salesforce Zapier connector | Trades | Record sync the platform lacks natively | Zapier subscription (tiered) | zapier.com |
| Weave Practice Analytics | Dental | Patient-retention/treatment-acceptance reporting on Dentrix/Eaglesoft/Open Dental | Not published | businesswire.com (2023) |
| Clio Grow add-on | Legal | Intake/CRM/reporting | Add-on tier | clio.com; softwareadvice.com |
| Excel export of Toast order data | Restaurant | Pivot-table analytics | Spreadsheet (labor) | capterra.com |
| Automated CRM data-migration services | Horizontal | Record transfer | Import2 $499–$1,999+; Trujay $149–$6,000; HDM $100/1k records | import2.com; syncmatters.com; help-desk-migration.com |

### CSV block

```csv
platform_left,vertical,missing_capability,band,generic_or_specific,switched_to,evidence_quality,source
Mindbody,Salon,"Not built ground-up for hair salons",A,generic,Zenoti,review,softwareadvice.com
Mindbody,Spa,"Mixed-service booking (spa/thermal/classes/packages/giftcards/hotel)",A,business-specific,Zenoti,review,capterra.com/p/131057
Mindbody,Salon multi-site,"Multi-location management depth",A,generic,Zenoti,vendor-claimed,zenoti.com
ServiceTitan,Trades,"Custom report creation gated behind package tier",B,generic,stayed,primary,help.servicetitan.com
ServiceTitan,Trades,"Report-template layout customization",C,generic,stayed,review,capterra.com
ServiceTitan,Trades,"QuickBooks sync reliability",C,generic,stayed,review,capterra.com
FieldAware,Field service,"Reporting",A,generic,ServiceTitan,review,capterra.com
FieldEdge,HVAC,"Reliability/outages",A,generic,ServiceTitan,review,capterra.com
Successware,HVAC,"CAPABILITY UNKNOWN",A,unknown,ServiceTitan,review,capterra.com
FACS,Service,"CAPABILITY UNKNOWN",A,unknown,ServiceTitan,review,capterra.com
Buildium,Property mgmt,"Native accounting + PM",A,generic,AppFolio,review,capterra.com
AppFolio,Property mgmt,"Security-deposit adjustment on past tenant without move-out",C,business-specific,stayed,review,capterra.com
Buildertrend,Construction,"First-class accounting/job-cost",C,generic,stayed,review,capterra.com
Toast,Restaurant,"Custom/exportable reports; EOD balancing",C,generic,stayed,review,capterra.com
HubSpot,Horizontal,"Custom objects on non-Enterprise tiers; approval workflows",A,generic,Salesforce,consultant-marketing,tech-insider.org
Salesforce,Horizontal,"Usable without consultants",A,generic,HubSpot,vendor-claimed,hubspot.com
Dentrix,Dental,"Practice analytics/reporting",B,generic,stayed(Weave),vendor-press,businesswire.com
Clio,Legal,"Advanced reporting behind higher tiers",B,generic,stayed,review,softwareadvice.com
```

## 5. What the Evidence Does and Doesn't Support

### Established
- Price/cost-at-scale and usability/adoption are the two most frequently written-about switching drivers; missing functionality is present but ranks at or below them in documented instances.
- Where a missing capability is named, it is usually generic (reporting customization/export, multi-location roll-up, native accounting, custom objects), and the same classes recur across unrelated verticals and reappear on destination platforms.
- Data migration is a bounded per-record cost (hundreds to low thousands via Import2/Trujay/Help Desk Migration); full implementation is multi-month and an order of magnitude larger.
- Salesforce↔HubSpot is the richest, bidirectional switching corridor in the public record.

### Open (unresolved facts / what was searched for and not found)
- **Band B volume is unmeasured.** App-marketplace install counts for ServiceTitan, Jobber, Clio, Mindbody, Procore, Buildertrend are not published, so the size of the "paid a workaround and stayed" population cannot be quantified. Searched: marketplace pages, vendor comparison pages.
- **Vertical→horizontal-for-extensibility migrations.** Searched vendor switching pages, Salesforce/HubSpot vertical marketing, consultant case studies, and community threads; no named case with an extensibility reason was found.
- **Business-specific vs generic proportion at population scale.** The ~80% generic figure is from ~20 named-capability rows; no published dataset measures this split.
- Three facts would most reorder the ranking: (a) marketplace install-count data (would likely raise missing-functionality/Band B); (b) a disclosed-methodology switching survey that asks the reason for the *actual* switch rather than review sentiment (would test the price/usability lead); (c) migration-service direction-of-travel volume data by product (would settle the vertical↔horizontal question).

### Negative results (platforms with no usable switching evidence)
Vagaro, WellnessLiving, PushPress, Olo, BoomTown, Yardi, Blackbaud, Subsplash, Planning Center, Shopmonkey, Tekmetric, Jane, Cliniko, Zoho, Dynamics 365, Pipedrive, Monday CRM, Keap — no instance with a named missing capability tied to a switch was found.

## 6. Circulating Statistics That Do Not Survive Sourcing

1. **"CRM implementations fail 30%/50%/70% of the time."** Repeated on nimble.com, arjankc.com.np, vantagepoint.io, oplacrm.com, anneomaly.com and others, attributed to "Gartner (50%)" and "Forrester (47%)." The traceable root is Harvard Business Review (Scott Edinger, "Why CRM Projects Fail and How to Make Them More Successful," Dec 2018), which itself only aggregated others: the figure "was actually an average of a dozen analyst reports. The numbers ranged from 18% to 69%" (hbr.org/2018/12). Johnny Grow (johnnygrow.com), which ran its own survey (55%), states there is "a lack of consensus for what defines a CRM software implementation failure"; its report adds that "25 percent of implementation projects achieved their planned objectives, time duration and budget" and "10 percent of all implementations were cancelled prior to the planned go-live event," with leading causes low user adoption (38%), inadequate change management (22%), and poor data quality (18%). The Gartner/Forrester single-number attributions dead-end with no report ID or date.
2. **"75% of CRM migrations fail."** (blog.cogentconnective.com) No citation.
3. **"67% of SMEs underestimate CRM implementation costs by at least 40%."** (blog.cogentconnective.com) No citation.
4. **"Businesses save 40% upfront / 70% on implementation switching to HubSpot."** Attributed to an Aptitude 8 "250 companies" study, distinct from the 332-respondent TCO survey; the 40%/70% figures could not be confirmed inside the 332-respondent report. Treat as separately-relayed vendor claim.
5. **"Average implementation cost: HubSpot $2,945 vs Salesforce $14,595."** Circulates as Aptitude 8 but is attributed to Software Advice on third-party pages; not present as a verbatim figure in the Aptitude 8 primary report, which publishes only ranges and percentages.
6. **ServiceTitan "$245/month per technician."** (pipelineon.com) Sourced to "contractor forums and Reddit threads"; ServiceTitan does not publish pricing.
7. **ServiceTitan "15–25% revenue increase per job."** (pipelineon.com) Attributed to "data shared at ServiceTitan's Pantheon conference" — vendor-claimed, unaudited.
8. **kvCORE migration "exceeded $340,000."** (ustechautomations.com) Single blog, unnamed company, no methodology.
9. **"72% of teams that switched from Salesforce to HubSpot reported higher CRM adoption."** (integrateiq.com, attributed to HubSpot research) VENDOR-CLAIMED; no linked instrument.

## 7. Caveats

- **Small, source-biased sample.** ~24 instances; not a population. Instance counts and band splits are hand-counts and should be read as orders of magnitude, not measurements.
- **Review platforms measure review volume, not switching volume**, and many reviews are vendor-solicited (G2 ServiceTitan entries are frequently marked "Incentivized Review" / "invite on behalf of seller"). Star ratings and pros/cons clusters reflect how reviewers write, not why companies switch.
- **Vendor switching pages and "vs" comparison articles are sales documents** that assert gaps rather than measure them; they are written by the destination vendor or by consultants who bill for the migration described (pedowitzgroup "100+ migrations," huble "500+ implementations," integrateiq "8-week delivery").
- **Migration-cost pricing is vendor self-published** (Import2, Trujay/SyncMatters, Help Desk Migration) and is data-migration-only; it does not include implementation, cleanup, or training.
- **The only disclosed-methodology survey used** (Aptitude 8/Ascend2, N=332, Dec 2022) is HubSpot-partner-sponsored and skews pro-HubSpot; its percentages are measured but subject to sponsor bias, and it reports timelines and spend ranges, not a single implementation-cost average.
- **Supported migration paths measure connectors built, not migrations performed.** Direction-of-travel inference from connector lists is ESTIMATED.
- **Recency:** most review quotes are 2024–2026; some (Buildertrend, AppFolio) are 2018–2023 and a named gap may since have been shipped ("I think that is changing").
- **Read-across:** legal, dental, restaurant and property-management evidence is thinner than home-services and horizontal-CRM evidence, and is weighted accordingly.