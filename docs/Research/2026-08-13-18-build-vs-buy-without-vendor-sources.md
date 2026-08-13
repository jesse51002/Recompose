# Build-Versus-Buy in Software: Evidence from Non-Vendor Sources

## TL;DR
1. No independent survey with a disclosed methodology and a stated denominator measures how often organisations build software internally versus buy it; the most-circulated current figure (35% of teams have replaced a SaaS tool) comes from an internal-tools vendor (Retool) and is excluded from findings here. The best-sourced quantitative signals are indirect: audited SaaS-vendor earnings and government/Indeed labour-market indices.
2. Peer-reviewed literature on the build-versus-buy decision is real but predates current AI tooling; the largest empirical primary studies (Hung & Low 2008; Badampudi et al. 2016) identify strategy, commodity status, cost, and requirements-fit as decision drivers, not spreadsheets-as-baseline.
3. US software-developer job postings fell about 68% from their February 2022 peak to August 2026 (Indeed/FRED, measured), and multiple named public SaaS vendors disclosed seat and pricing pressure in 2025–2026 audited results; whether any of this reflects internal building rather than AI-driven automation or macro contraction is not established by any source located.

## Key Findings

1. **No qualifying independent build-vs-buy frequency survey exists.** [THIRD-PARTY / NEGATIVE] Searches for a survey or dataset on build-versus-buy frequency with a disclosed methodology, a stated denominator, and a non-vendor sponsor returned nothing. Every quantified "X% of teams build/replace" figure located traces to a vendor selling build-side tooling (principally Retool's 2026 Build vs. Buy Report, n=817) or to consultancies. This is itself the primary finding for Section 1.

2. **The most-cited current statistic is vendor-published.** [VENDOR-CLAIMED, EXCLUDED] Retool's 2026 Build vs. Buy Report (survey of 817 builders) claims "35% of teams have already replaced at least one SaaS tool with a custom build" and "78% expect to build more." Retool sells internal-tool-building software; per the brief this is excluded from findings and placed in the EXCLUDED CORPUS appendix.

3. **Peer-reviewed build-vs-buy research is pre-AI and interview-based.** [ACADEMIC] Hung & Low (2008, Journal of Information Technology) interviewed 10 large Australian organisations (turnover >A$750m) and found core factors — strategy, commodity/competitive advantage, maturity, cost, requirements fit — drive the decision, with risk, timing, politics and support secondary. Badampudi, Wohlin & Petersen (2016, Journal of Systems and Software) is a systematic literature review of in-house vs OSS vs COTS vs outsourcing.

4. **Klarna is the best-documented named "build/consolidate" case, and the company itself corrected the popular framing.** [PRIMARY] On an earnings call (Seeking Alpha transcript, via Diginomica), CEO Sebastian Siemiatkowski said: "There are large ongoing internal initiatives that are a combination of AI, standardization and simplification. As an example, we just shut down Salesforce. Within a few weeks, we will shut down Workday. We are shutting down a lot of our SaaS providers, as we are able to consolidate." He later corrected the "replaced SaaS with an LLM" framing on X: "So no, we did not replace SaaS with an LLM, and storing CRM data in an LLM would have its limitations. But we developed an internal tech stack, using Neo4j and other things, to start bringing data=knowledge together." He also wrote: "No, I don't think it is the end of Salesforce; might be the opposite."

5. **US software-developer job postings fell ~68% from peak.** [MEASURED] The Indeed Hiring Lab index of US software-development job postings (FRED series IHLIDXUSTPSOFTDEVE, Feb 1 2020 = 100, seasonally adjusted) peaked at 233.86 on 28 Feb 2022 and read 73.66 on 7 Aug 2026 — a 68.5% decline from peak, and about 27.5% below the pre-pandemic baseline. No public labour series isolates "internal tools engineer," "platform engineer," or "business systems engineer."

6. **Named public SaaS vendors disclosed seat/pricing pressure in 2025–2026 audited results.** [MEASURED] Atlassian, per its 11 March 2026 SEC 8-K and a CEO memo from Mike Cannon-Brookes, cut "~10% (or ~1,600 employees)" — "We are doing this to self-fund further investment in AI and enterprise sales"; the 8-K disclosed charges of $225m–$236m. Its Q3 FY2026 results still showed 32% YoY revenue growth and NRR above 120%. Bain (third-party) reports median public-SaaS net revenue retention fell from 117% (early 2021) to 108% (2025).

7. **The "prior state = spreadsheet" claim cannot be independently replicated from non-vendor sources.** [NEGATIVE] No non-vendor dataset records, across a defined denominator of build cases, what was in place before the build (spreadsheet / named purchased software / manual process / nothing / legacy). The spreadsheet-as-baseline narrative is heavily represented in the EXCLUDED CORPUS (vendor and agency blogs) and, qualitatively, in the academic shadow-IT/end-user-computing literature, but not in a form that yields a replication distribution.

8. **The reverse direction (built-then-bought / abandoned build) is under-published, but government audit records document build failure.** [REGULATORY] GAO and NAO records document large custom-build cost overruns and cancellations (e.g., GAO on DOD business IT systems; NAO on UK government technology suppliers, £14bn/year digital spend). These are build-side failures in the public sector; they do not always record a subsequent "buy" decision.

## Details

### 1. Independent quantitative data
No survey or dataset meeting all three tests (disclosed methodology, stated denominator, non-vendor sponsor) was located. Searched: general web ("build versus buy software survey developers"), academic databases, Stack Overflow Developer Survey, and analyst coverage. The Stack Overflow Developer Survey 2025 (n=49,000+, method disclosed) measures AI-tool adoption (84% use or plan to use AI tools; 51% of professional developers use them daily) but does not ask a build-versus-buy question. On trust, the 2025 survey found trust in AI-tool accuracy fell to 29%, down from 40% in 2024: "More developers actively distrust the accuracy of AI tools (46%) than trust it (33%)," with only 3% reporting they "highly trust" the output. [THIRD-PARTY, method disclosed] The only quantified build-vs-buy frequency figures found are vendor-published (see Section 11).

### 2. Category distribution
No non-vendor ranking of where internal building concentrates, by software category, with a stated denominator, was located. [NEGATIVE] The only category rankings found (workflow automation and internal admin tools leading, followed by CRM, BI, project management, customer support) come from Retool's report and are in the EXCLUDED CORPUS. The academic literature (shadow IT / end-user computing) describes categories qualitatively — spreadsheets, content apps, utilities — but not as a ranked build distribution.

### 3. The prior state — replication test
The prior finding (organisations most often leave a spreadsheet, not a competing product, when they build) could not be independently replicated. [NEGATIVE] No non-vendor source provides a case set with a coded "prior state" column and a denominator. The shadow-IT academic literature repeatedly identifies Microsoft Excel as the archetypal displaced tool, which is directionally consistent with the spreadsheet-baseline claim, but this is a qualitative characterisation of shadow IT generally, not a measured distribution of build cases. Agreement or disagreement therefore cannot be stated as a number.

### 4. Named cases from non-vendor sources
- **Klarna** (fintech). Capability: CRM / internal data-and-AI stack. Preceded by: Salesforce CRM (and Workday for HR). Stated reason (CEO, earnings call, verbatim): "As an example, we just shut down Salesforce." Who decided: CEO Sebastian Siemiatkowski. Outcome as of latest source: data consolidated onto internal stack using Neo4j; CEO says he does not expect others to follow ("No, I don't think it is the end of Salesforce; might be the opposite"). Evidence quality: PRIMARY (earnings call, CEO statements on X) plus THIRD-PARTY journalism (TechCrunch, Fortune, Diginomica). Note the CEO's own correction: "we did not replace SaaS with an LLM."
- **Uber** (mobility). Capability: unified payments platform ("Gulfstream"), replacing two internal systems; also change-data-capture and data-discovery tooling. Preceded by: in-house legacy systems. Source: The Pragmatic Engineer (named practitioner, Gergely Orosz) and Uber Engineering. Evidence quality: PRACTITIONER / engineering blog. This is in-house-replacing-in-house, not a buy displacement.
- **Airbnb / Netflix / Lyft** (various). Capability: data-management, CDC (Airbnb SpinalTap, Netflix DBLog), workflow orchestration (Airbnb Airflow), server-driven UI. Preceded by: mostly no adequate off-the-shelf option at their scale. Evidence quality: THIRD-PARTY / engineering-blog secondary coverage. These are "built because nothing existed at scale" cases, not documented buy-displacements.

Note the read-across limit: the richest non-vendor named cases are hyperscale technology firms whose scale is unrepresentative of the general build-vs-buy population.

### 5. The reverse direction
Systematically under-published, as the brief anticipated. [NEGATIVE + REGULATORY] Buyer-authored accounts of abandoning an internal build and buying a vendor product were not located in engineering-blog or journalism form during this search. The closest documented reverse-direction evidence is in government audit records of custom-build failure (Sections 6 and 8). Legacy-modernisation literature describes "replace custom system with COTS/SaaS" (e.g., replacing a bespoke HR system with Workday) as a standard pattern, but the sources describing it are consultancies/agencies (EXCLUDED or low-weight) rather than named buyers.

### 6. Public-company and financial evidence
- **Atlassian** [MEASURED, audited filing]: Q3 FY2026 revenue $1.79bn, +32% YoY; cloud +29%; NRR above 120%; net loss $98.4m including $223.1m restructuring charges. Per its 11 March 2026 8-K and CEO memo, it cut "~10% (or ~1,600 employees)" to "self-fund further investment in AI and enterprise sales"; disclosed charges $225m–$236m (severance $169m–$174m; office space $56m–$62m); CTO Rajeev Rajan stepped down effective 31 March. Management (CEO Cannon-Brookes) publicly pushed back on the thesis that AI is contracting seats, saying concerns are "certainly not playing out in Atlassian's numbers."
- **Bain** [THIRD-PARTY]: median public-SaaS NRR declined from 117% (early 2021) to 108% (2025); Bain notes seat growth "becoming a less meaningful expansion driver" and estimates AI could automate 30–50% of activity across key enterprise functions (this last is Bain's ESTIMATE/FORECAST, not observed).
- **Broad market** [THIRD-PARTY journalism, mixed reliability]: 2026 "SaaSpocalypse" coverage (Forbes, TNW, Saxo) reports software-sector market-cap declines and slowing SaaS revenue growth. Specific stock-move and market-cap figures (e.g., "$2 trillion evaporated") come from secondary blogs and should be treated as unverified.
No public filing located attributes revenue pressure specifically to customers building software internally rather than to AI automation, seat efficiency, or macro conditions.

### 7. Labour-market signal
[MEASURED] Indeed Hiring Lab / FRED series IHLIDXUSTPSOFTDEVE (US software-development job postings, seasonally adjusted, Feb 1 2020 = 100): peak 233.86 (28 Feb 2022); latest 73.66 (7 Aug 2026); −68.5% from peak and ~27.5% below pre-pandemic. Indeed Hiring Lab (July 2026) notes a rebound of ~14–15% since the 24 Feb 2025 launch of Claude Code, off a low base. [MEASURED] BLS OEWS: software developers (SOC 15-1252) employment ~1.5m (May 2022) rising to ~1.7m (May 2024), median wage $133,080 (May 2024); BLS projects +15% employment for the group 2024–2034 (but computer programmers, 15-1251, projected −6%). [THIRD-PARTY] Lightcast: ~570k software-developer postings in 2024, YoY −15% (2023→2024). [ACADEMIC] Stanford Digital Economy Lab "Canaries" dashboard reports ~13% relative employment decline for workers aged 22–25 in the most AI-exposed occupations (incl. software developers), correlational and statistically significant only from 2024, using ADP payroll data (not postings). What this does NOT indicate: none of these series isolates internal-tools/platform/business-systems engineering, and none attributes the decline to build-vs-buy shifts; AI automation, over-hiring correction, and the rate environment are all candidate drivers.

### 8. Academic and regulatory literature
- Hung, P. & Low, G.C. (2008). "Factors Affecting the Buy vs Build Decision in Large Australian Organisations." Journal of Information Technology 23(2):118–131. Method: interviews, 10 organisations, turnover >A$750m. Core factors: strategy, commodity/competitive advantage, maturity, cost, requirements fit. [ACADEMIC]
- Badampudi, D., Wohlin, C. & Petersen, K. (2016). "Software Component Decision-Making: In-House, OSS, COTS or Outsourcing — A Systematic Literature Review." Journal of Systems and Software 121:105–124. [ACADEMIC]
- Cortellessa, V., Marinelli, F. & Potena, P. (2008). "An Optimization Framework for 'Build-Or-Buy' Decisions in Software Architecture." Computers & Operations Research 35(10):3090–3106. [ACADEMIC]
- Shahzad, B. et al. (2017). "Build Software or Buy: A Study on Developing Large Scale Software." IEEE Access 5:24262–24274. [ACADEMIC]
- IT outsourcing / transaction-cost economics: Schermann et al. (2016, Journal of Strategic Information Systems) meta-analysis; multiple reviews find TCE predictions "frequently inconsistent" with empirical ITO findings. TCE frames build-vs-buy via asset specificity, frequency, uncertainty. [ACADEMIC]
- Shadow IT / end-user computing: peer-reviewed work frames shadow IT as a make-or-buy problem driven by transaction costs; a University of Maryland Baltimore County case study documents an internally-built legacy grants-management system with security vulnerabilities. [ACADEMIC]
- Regulatory: GAO-21-351 (DOD business IT systems, $12bn planned FY2019–22, cost/schedule changes in 20 of 29 programs); NAO (Jan 2025) on UK government technology suppliers (£14bn/year digital spend, reliance on legacy suppliers). [REGULATORY]
Publication-date caveat: all of the core decision-framework literature predates current AI coding tooling (mostly 2008–2017) and cannot speak to any AI-driven shift.

### 9. Effect of AI coding tools, from non-vendor sources
[ACADEMIC, mostly protocols/early] Two 2026 arXiv papers directly address AI and build-vs-buy: a pre-registered study protocol on how configuring agentic coding tools (Claude Code, OpenAI Codex) affects whether the tool imports a library or writes code from scratch — a code-level, not organisational, build-vs-buy definition; and "The Buy-or-Build Decision, Revisited: How Agentic AI Changes the Economics of Enterprise Software." Neither reports measured organisational adoption outcomes. The Stack Overflow 2025 survey establishes high AI-tool adoption among developers but does not link it to build-vs-buy. No non-vendor survey establishing that AI coding tools have changed organisational build-vs-buy decisions was located. [NEGATIVE] This absence is itself the finding.

### 10. Circulating statistics that do not survive sourcing
- **"35% of teams have replaced a SaaS tool with a custom build; 78% plan more."** Circulates via Businesswire, Medium, and numerous blogs. Traces to Retool's 2026 Build vs. Buy Report (n=817). Vendor-published; excluded. Should not be used as independent evidence.
- **"McKinsey: large IT projects run 45% over budget and deliver 56% less value."** Widely repeated (Alchemer and many others). Traces to a 2012 McKinsey–Oxford study; the figure is real but old and about IT projects generally, not build-vs-buy specifically. Attribution frequently omits the date.
- **"Gartner: 40% of enterprise SaaS spend shifts to usage/agent/outcome pricing by 2030" and "seat-based share fell 21%→15%."** The SaaS CFO explicitly notes: "The primary Gartner report is subscriber-only, and a specific public Gartner document for this exact figure could not be located." Treat as FORECAST with an unverifiable primary source.
- **"$2 trillion in software market cap evaporated in early 2026."** Appears in secondary blogs (Digital Applied) without a traceable primary market-data citation. Should not be used.
- **"Klarna replaced Salesforce with an LLM / with AI."** The CEO publicly corrected this ("we did not replace SaaS with an LLM"); the accurate version is data consolidation onto an internal stack. The viral framing does not survive the primary source.

### 11. Excluded corpus appendix (vendor-published; NOT evidence)
- **Retool 2026 Build vs. Buy Report** (n=817 builders): 35% replaced ≥1 SaaS tool with a custom build; 78% plan more; 60% built software outside IT oversight in the past year (25% "frequently"); category replacement pressure led by workflow automation and internal admin tools. Retool sells internal-tool-building software.
- **Superblocks** internal-tools guide: named customer anecdotes (Virgin Voyages "15+ production apps," Matthews brokerage). Vendor marketing.
- Various agency/consultancy blogs (CodeStringers, AutomateLab, Pardy Panda) assert spreadsheets are the dominant prior state and cite "94% of spreadsheets contain errors." Agencies that build custom software; excluded.
Divergence note: where the excluded corpus claims a broad, accelerating "build revolt" with spreadsheets as the baseline, the independent evidence (earnings, labour market, academic literature) neither confirms the frequency nor the baseline distribution. The vendor narrative is directionally about building; the independent record does not corroborate its magnitude.

### 12. Nulls
Searched and returned nothing usable: non-vendor build-vs-buy frequency survey with denominator; non-vendor category-distribution ranking; coded "prior state" distribution across a case set; buyer-authored built-then-bought post-mortems in engineering-blog/journalism form; any filing attributing SaaS revenue pressure specifically to customer in-house building. LinkUp public series for platform/internal-tools/business-systems engineer roles: not found. BLS/Lightcast standalone series for those exact titles: not found (they fall within SOC 15-1252 or 15-1299).

### 13. Unverified leads
- Reports that Starbucks "began building internal AI software to replace Microsoft applications" and Shopify's Lütke AI-before-headcount mandate circulate via secondary blogs (Dotun Opasina, Medium) without primary confirmation located here.
- "Klarna cut 1,200 SaaS applications" — now corroborated by the CEO himself in a March 2026 X post: "Yes, we did shut down Salesforce a year ago, as we have many SaaS providers—an internal estimate is about 1,200 SaaS shut down." This is a company self-estimate (VENDOR/PRIMARY, unaudited).
- Zendesk replacement following an OpenAI partnership — "widely reported" but no primary timeline/migration detail located.

## Tables

### Table A — Independent quantitative signals (non-vendor)
| Datapoint | Value | Date | Source | Tag |
|---|---|---|---|---|
| US SW-dev job postings index, peak | 233.86 | 28 Feb 2022 | Indeed Hiring Lab / FRED IHLIDXUSTPSOFTDEVE | MEASURED |
| US SW-dev job postings index, latest | 73.66 | 7 Aug 2026 | Indeed Hiring Lab / FRED | MEASURED |
| Change peak→latest | −68.5% | — | derived | ESTIMATED (arithmetic) |
| SW-dev postings vs pre-pandemic | ~−27.5% | Jul 2026 | Indeed Hiring Lab | MEASURED |
| Software developers employment (15-1252) | ~1.5m | May 2022 | BLS OEWS | MEASURED |
| Software developers employment (15-1252) | ~1.7m | May 2024 | BLS OEWS/OOH | MEASURED |
| Software developers median wage | $133,080 | May 2024 | BLS OOH | MEASURED |
| Software developers postings; YoY | ~570k; −15% | 2024 | Lightcast | THIRD-PARTY |
| Early-career (22–25) employment decline, most AI-exposed occs | ~13% relative | Jul 2026 release | Stanford DEL / ADP | ACADEMIC |
| Public-SaaS median NRR | 117%→108% | 2021→2025 | Bain | THIRD-PARTY |
| Atlassian Q3 FY2026 revenue growth | +32% YoY | Q3 FY2026 | Atlassian filing | MEASURED |
| Atlassian layoffs | ~1,600 (~10%) | Mar 2026 | Atlassian 8-K / CNBC | MEASURED |

### Table B — Named cases
| Company | Capability | Prior state | Decider | Evidence | Tag |
|---|---|---|---|---|---|
| Klarna | Internal data/AI stack; CRM | Salesforce CRM, Workday | CEO Siemiatkowski | Earnings call + X posts + journalism | PRIMARY |
| Uber | Payments platform (Gulfstream) | In-house legacy | Engineering leadership | Pragmatic Engineer / Uber Eng | PRACTITIONER |
| Airbnb | CDC (SpinalTap), Airflow | No off-the-shelf at scale | Engineering | Engineering blog (secondary) | THIRD-PARTY |
| Netflix | CDC (DBLog) | No off-the-shelf at scale | Engineering | Engineering blog (secondary) | THIRD-PARTY |

### Table C — Academic/regulatory literature
| Work | Year | Method | Tag |
|---|---|---|---|
| Hung & Low, Factors Affecting Buy vs Build | 2008 | 10 interviews, large AU orgs | ACADEMIC |
| Badampudi et al., Component Decision-Making SLR | 2016 | Systematic literature review | ACADEMIC |
| Cortellessa et al., Build-or-Buy optimization | 2008 | Optimization model | ACADEMIC |
| Shahzad et al., Build Software or Buy | 2017 | Study | ACADEMIC |
| Schermann et al., TCE in ITO meta-analysis | 2016 | Meta-analysis | ACADEMIC |
| GAO-21-351, DOD business IT | 2021 | Government audit | REGULATORY |
| NAO, Government's approach to technology suppliers | 2025 | Government audit | REGULATORY |

```csv
datapoint,value,date,source,tag
sw_dev_postings_peak,233.86,2022-02-28,Indeed Hiring Lab/FRED IHLIDXUSTPSOFTDEVE,MEASURED
sw_dev_postings_latest,73.66,2026-08-07,Indeed Hiring Lab/FRED,MEASURED
sw_dev_postings_change_peak_latest,-68.5%,,derived,ESTIMATED
sw_dev_postings_vs_prepandemic,-27.5%,2026-07,Indeed Hiring Lab,MEASURED
sw_dev_employment_2022,1500000,2022-05,BLS OEWS,MEASURED
sw_dev_employment_2024,1700000,2024-05,BLS OEWS/OOH,MEASURED
sw_dev_median_wage_2024,133080,2024-05,BLS OOH,MEASURED
sw_dev_postings_lightcast_2024,"570000,-15% YoY",2024,Lightcast,THIRD-PARTY
saas_nrr_median,117%->108%,2021-2025,Bain,THIRD-PARTY
atlassian_rev_growth_q3fy26,+32% YoY,Q3FY2026,Atlassian filing,MEASURED
atlassian_layoffs,1600 (~10%),2026-03,Atlassian 8-K/CNBC,MEASURED
retool_replaced_saas,35%,2026,Retool report,VENDOR-CLAIMED-EXCLUDED
```

## What the evidence does and doesn't support

**Established:**
- US software-developer job postings are down sharply from their 2022 peak (Indeed/FRED, measured).
- Multiple named public SaaS vendors disclosed restructuring and pricing/seat pressure in 2025–2026 audited results.
- A peer-reviewed literature identifies the decision drivers (strategy, commodity status, cost, requirements fit, asset specificity) — pre-AI.
- Klarna is a documented case of consolidating off named SaaS onto an internal stack, with the CEO cautioning against generalisation.

**Open:**
- Whether organisations are building internally more often now than before — no independent frequency measure exists.
- The causal driver of falling developer postings and SaaS seat pressure (AI automation vs internal building vs macro).
- The category distribution of internal building, from non-vendor data.

**Negative results:**
- No qualifying independent frequency survey.
- No non-vendor "prior state" distribution to replicate the spreadsheet-baseline claim.
- No buyer-authored built-then-bought post-mortems located.
- No public labour series for internal-tools/platform/business-systems engineer titles.
- No non-vendor survey linking AI coding tools to changed organisational build-vs-buy decisions.

## Caveats
- Recency and read-across: the strongest quantitative series (job postings, earnings) measure the software labour market and SaaS-vendor economics, which are adjacent to — not the same as — build-vs-buy frequency. Using them as a build-vs-buy proxy is an inference, not a measurement.
- The academic literature is small-sample (Hung & Low: 10 firms), old (2008–2017), and pre-AI.
- Named cases skew to hyperscale tech firms, unrepresentative of the general population of organisations.
- The −68.5% and similar derived figures are arithmetic on reported index values; the index is copyrighted Indeed data with a seasonally-adjusted methodology subject to revision.
- The Klarna "~1,200 SaaS shut down" figure is the company's own internal estimate (unaudited), not an independently verified count.
- Vendor material dominates the available writing on this topic; its exclusion is deliberate and means several questions have no main-section answer.
- Bain's 30–50% automation figure and Gartner's 40%-by-2030 figure are forecasts/estimates, not observed adoption, and the Gartner primary document could not be verified.