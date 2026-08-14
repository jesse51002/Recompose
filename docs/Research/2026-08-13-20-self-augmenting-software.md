# Self-Augmenting Software, Commercial and Hobbyist: A Field Report

## TL;DR
- Across commercial low-code/no-code platforms and hobbyist extension ecosystems, the systems that let users change what software *does* are numerous and in several cases large (Notion reports 100M+ users; Airtable reports 500,000+ organizations; Obsidian's directory lists 6,586 community plugins; Home Assistant's opt-in analytics cover 518,790 installations), but the proportion of users who actually *author* an extension is measured in very few places, and where it is measured it is a minority (npm: 73,000 of 211,000 registered users had ever published a package in 2016).
- The longest-running natural experiment — HyperCard, Lotus Notes/Domino, Microsoft Access/Excel VBA, Zope/Plone through-the-web development, Emacs Lisp — shows both survival (Emacs, Excel) and managed decline or discontinuation (HyperCard discontinued 2004; Notes/Domino sold by IBM to HCL in 2018–2019; Zope community explicitly discouraged through-the-web development), with named post-mortems attributing outcomes to distribution model, strategic narrowing, and the fragility of through-the-web code.
- Widely repeated "citizen developer" statistics (Gartner's "70% of new applications by 2025," "citizen developers will outnumber professional developers 4:1," "80% of technology products built by non-professionals by 2024") are forecasts, not measurements, and are frequently repeated as if measured; the "88% of spreadsheets contain errors" figure is a misquotation of Panko's field-audit summaries, which report 86–94% depending on the sample.

## Key Findings
1. Home Assistant's public opt-in analytics report "automations 14" per reporting installation, with 518,790 of 665,467 installations (77.96%) sharing statistics as of August 14, 2026. This is a per-install aggregate telemetry figure; the dashboard does not label it mean or median, and it does not distinguish self-authored automations from blueprint-imported ones. [COMMUNITY-MEASURED]
2. On npm in 2016, 73,000 of 211,000 registered users had published a package (~35% of registered users; ~1.8% of an estimated 4 million total users). [PRIMARY/COMMUNITY-MEASURED — npm Blog, Laurie Voss, 26 Apr 2016]
3. VS Code Marketplace hosted ~60,000 extensions from ~45,000 publishers with 3.3 billion installs; the median extension had 500 installs. [THIRD-PARTY — Koi Security, ~2024]
4. Gartner's "by 2025, 70% of new applications developed by organizations will use low-code or no-code technologies, up from less than 25% in 2020" is a forecast/prediction, traceable to Gartner press materials (2019–2021). It is widely repeated as measurement. [VENDOR-CLAIMED forecast]
5. Gartner's "by 2023, the number of active citizen developers at large enterprises will be at least four times the number of professional developers" was stated by Jason Wong at the Gartner IT Symposium (2021). Later repetitions shift the target year to 2026 or 2028. [VENDOR-CLAIMED forecast]
6. HyperCard was discontinued by Apple in March 2004; Bill Atkinson said in a 2002 interview: "If I'd grown up in a network-centric culture, like Sun, HyperCard might have been the first Web browser. My blind spot at Apple prevented me from making HyperCard the first Web browser." [PRACTITIONER — Atkinson interview, 2002]
7. IBM sold Lotus Notes/Domino to HCL (announced Dec 2018, completed Jul 2019); HCL ended support for Notes/Domino 9.x and 10.x on 1 Jun 2024. [PRIMARY — IBM/HCL/The Register]
8. Google shut down App Maker citing "low usage," officially ending it 19 Jan 2021, and stated apps could not be directly migrated. [PRIMARY — Google Workspace Updates blog, Jan 2020]
9. Yahoo Pipes shut down 30 Sep 2015 to "focus our efforts on core Yahoo product experiences." [PRIMARY/THIRD-PARTY]
10. Chrome's Manifest V3 removed the blocking webRequest API used by V2 ad blockers, replacing it with declarativeNetRequest; Google stated "Manifest V3 is more secure, performant, and privacy-preserving than its predecessor." EFF's Alexei Miagkov said "the reasons they have stated publicly [for this transition] don't fully make sense." [PRIMARY/THIRD-PARTY]
11. The "88% of spreadsheets contain errors" claim is a misquotation of Raymond Panko's field-audit summaries, which report errors in "at least 86%" of recent audits and a "weighted average percentage of spreadsheets with errors [of] 94%" for the 88-spreadsheet sample. [ACADEMIC]
12. Scaffidi, Shaw & Myers (2005) estimated that in 2012 there would be ~90 million end-users in American workplaces, of whom 55M+ would use spreadsheets or databases (potential end-user programmers) and 13M+ would describe themselves as programmers. [ACADEMIC]

## 1. Taxonomy of what "self-augmenting" means in practice

Classification axes used: **UI/screens**, **data model/schema**, **business logic**, **integrations**, **automations**, **extension mechanism** (whether the user can extend how the system is extended).

| System | UI | Data model | Logic | Integrations | Automations | Extension-of-extension | Boundary quote / note | Tag |
|---|---|---|---|---|---|---|---|---|
| Airtable | Yes (interfaces) | Yes (bases/tables) | Partial (scripting/automations) | Yes | Yes | No | 100M records/table on Enterprise per third-party | VENDOR-CLAIMED / THIRD-PARTY |
| Notion | Yes (pages/blocks) | Yes (databases) | Limited (formulas, buttons) | Via API/integrations | Yes (AI agents/automations) | No | Databases capped at 20,000 rows on paid plans per third-party | THIRD-PARTY |
| Salesforce | Yes (Lightning) | Yes (custom objects) | Yes (Flow declarative; Apex code) | Yes | Yes (Flow) | Yes (Apex) | Apex requires code; Flow is declarative | PRIMARY/THIRD-PARTY |
| Home Assistant | Yes (dashboards) | Partial (helpers, entities) | Yes (automations/scripts/templates) | Yes (integrations) | Yes | Yes (custom integrations/HACS) | Custom integrations "at your own risk," "not supported by the Home Assistant project" | PRIMARY |
| Obsidian | Yes (via plugins) | Note/markdown files | Via plugins (JS) | Via plugins | Via plugins | Yes (plugin API) | Plugin authoring requires JavaScript | PRIMARY |
| Excel/VBA | Yes (forms) | Yes (sheets) | Yes (formulas, VBA macros) | Via add-ins | Yes (macros) | Yes (VBA/add-ins) | Formulas framed by Microsoft as "the world's most widely used programming language" | VENDOR-CLAIMED |

Most systems permit data-model and automation extension without code but gate general-purpose logic behind a scripting language. The documentation boundary is quoted at point of use in §2–§4.

## 2. Commercial systems

Precision note: adoption figures below are labeled by who disclosed them. Private companies (Airtable, Notion) do not file public financials, so revenue and user figures circulating online are frequently third-party estimates.

| Name | Founded | Status | Extension primitive | Who extends | Artifact | Where it runs | Pricing/unit | Disclosed adoption | Tag | Source & date |
|---|---|---|---|---|---|---|---|---|---|---|
| Airtable | 2012 | Active, private | Bases, interfaces, automations, scripting | Ops/business users; scripting needs JS | Config + scripts | Vendor cloud | Per-seat tiers | "500,000+ organizations," "80% of the Fortune 100" | VENDOR-CLAIMED via third-party | sqmagazine / timeeting, Jan 2026 |
| Notion | 2013 | Active, private | Databases, formulas, buttons, AI agents | Business users | Config | Vendor cloud | Per-seat | "100M+ users" (registered, not DAU) | VENDOR-CLAIMED via third-party | super.so / toolfinder, 2024–2026 |
| Salesforce (Flow/Apex) | 1999 | Active, public | Flow (declarative), Apex (code), LWC | Admins (Flow); developers (Apex) | Config + general-purpose code | Vendor cloud | Per-seat + platform | "20M+ Trailblazer community members" (described as "mostly admins and learners, not active developers") | THIRD-PARTY | syncgtm, 2026 |
| Google App Maker | 2016 | Shut down 19 Jan 2021 | Drag-drop UI, declarative data | IT/enthusiasts | Config | Vendor cloud | G Suite bundle | "low usage" (Google) | PRIMARY | Google Workspace blog, Jan 2020 |

Read-across note on §2: SyncGTM (2026) characterizes the Salesforce ecosystem as "20 million+ Trailblazer community members — but most are admins and learners, not active developers," and states developers "represent 44% of total talent supply" — a THIRD-PARTY breakdown, not a Salesforce disclosure.

Additional commercial candidates from the brief (Retool, Glide, Bubble, Zapier, Make, Coda, Smartsheet, Monday.com, Zoho Creator, Appian, Mendix, OutSystems, Quickbase, Claris FileMaker, Directus, Baserow, NocoDB, Budibase, Appsmith, Superblocks, Xano, Webflow, Shopify Functions/Flow, Atlassian Forge/Connect, Slack Workflow Builder, HubSpot custom objects, Anvil, Streamlit, Lovable, Replit Agent, v0, Val Town, Gumloop, n8n cloud, ServiceNow App Engine, Microsoft Power Apps/Power Automate/Dataverse) were not individually verified with dated primary sources within the research budget and are listed in §13 Unverified leads rather than asserted here.

## 3. Hobbyist and community systems

| Name | Founded | Status | Extension primitive | Who extends | Artifact | Where it runs | Registry size (date, what it counts) | Tag | Source |
|---|---|---|---|---|---|---|---|---|---|
| Home Assistant + HACS | 2013 | Active | Automations, custom integrations | Hobbyists (YAML/Python for custom) | Config + code | Self-hosted | 665,467 installs in opt-in analytics (Aug 2026) | PRIMARY/COMMUNITY-MEASURED | analytics.home-assistant.io |
| Obsidian community plugins | 2020 | Active | Plugins (JS), themes | Users w/ JS | General-purpose code | Local | "6,586 plugins and 681 themes" (obsidian.md/plugins) | COMMUNITY-MEASURED | obsidian.md |
| AutoHotkey | 2003 | Active (v1 & v2) | Scripts | Power users | Scripts | Local (Windows) | Not centrally registered | PRIMARY | autohotkey.com |
| MELPA (Emacs) | 2012 | Active | Emacs Lisp packages | Users w/ Elisp | Code | Local | Count not verified within budget | COMMUNITY-MEASURED (unverified count) | — |

Registry counts measure *published packages*, not *authoring users*. The number of people who ever authored a plugin is not disclosed by any of these registries; see §8. Obsidian's official directory site launched a developer dashboard and, per a practitioner account (Sébastien Dubois, dsebastien.net), previously carried a manual-review "backlog [that] reached 2,300+ queued submissions" before the May 2026 automated system.

## 4. Historical prior art

**HyperCard (1987–2004).** Extension mechanism: stacks, cards, buttons, and the HyperTalk scripting language; the creation tool and the finished artifact were the same environment. Shipped free with every Macintosh from 1987; Apple began charging for HyperCard 2.0 in 1990 ($49.95 standalone), which practitioners identify as fragmenting the user base ("The free-distribution model that had made HyperCard ubiquitous in 1987-1990 was broken"). Active development stopped ~1998; formally discontinued March 2004. In a 2002 interview Bill Atkinson said: "I missed the mark with HyperCard. I grew up in a box-centric culture at Apple. If I'd grown up in a network-centric culture, like Sun, HyperCard might have been the first Web browser. My blind spot at Apple prevented me from making HyperCard the first Web browser." [PRACTITIONER — Atkinson, 2002; THIRD-PARTY — AppleInsider/Slashdot, 2011–2025]

**Lotus Notes/Domino (1989– ).** Extension mechanism: Notes applications (forms, views, LotusScript, formula language) authored through the Notes client and stored in NSF databases; applications proved "sticky" and often outlived support contracts. IBM announced in 2016 it would switch from numbered releases to "feature packs" (interpreted by the community as managed decline), then handed development to HCL; IBM sold the product line to HCL (announced Dec 2018, completed Jul 2019). HCL's email to users stated: "Due to the age of these releases, HCL will not be offering extended support for these specific product versions," ending support for 9.x and 10.x on 1 Jun 2024. Practitioner framing (The Register): the platform "was steamrolled by Microsoft's Exchange and has arguably been legacy tech." [PRIMARY — IBM/HCL; THIRD-PARTY — The Register/Teamstudio]

**Zope/Plone through-the-web (TTW) development (1998– ).** Zope was designed to be "tightly coupled with... the Web development model," allowing site managers to "safely delegate control to design experts, database experts, and content managers." The current Zope documentation states: "Zope had a much larger focus on Through-The-Web activities in its beginning. In recent years the Through-The-Web model has been discouraged for any kind of development and reduced to configuration tasks." A community retrospective ("Zope is Dead, Long Live Zope!", Lennart Regebro, Krakow 2011) dates the rewrite decision to 2001 ("The warts of Zope starts being a problem / A rewrite is started"), Zope 3's release to 2004, and its rename to BlueBream to 2009. [PRIMARY — Zope docs; PRACTITIONER — Regebro, 2011]

**Excel macros/VBA and Microsoft Access.** Excel formulas are framed by Microsoft as "the world's most widely used programming language." Microsoft has variously cited 750 million users (Nadella, 2017) and 1.1–1.2 billion Office "productivity services" users (2016). These systems survived; the survival cause practitioners cite is bundling with Office and installed base. [VENDOR-CLAIMED]

**Emacs and Emacs Lisp; Smalltalk images; Lisp machines; Squeak/Pharo.** Emacs survives with an active package ecosystem (MELPA). Detailed post-mortems for Smalltalk images, Lisp machines, and Squeak/Pharo were not retrieved with dated primary sources within the research budget; see §12 Nulls.

## 5. Persistence, sharing and upgrade — the survival question

- **Home Assistant:** An automatic backup is taken before each update; breaking changes are announced in advance; a repair system flags issues; users can roll back. HA states that when something breaks after an update "it usually affects a single integration... especially community-maintained ones, rather than your whole installation." HACS 2.0 (2024) was a "major version bump" with breaking changes: it "requires Home Assistant 2024.4.1 or later," "The sensor platform has been removed," and "You can no longer configure HACS in YAML." In HA 2026.7, the MS Teams integration was removed because "The integration relied on Office 365 Connectors, which Microsoft discontinued on May 22, 2026, so it no longer works," and the Microsoft Face integrations were removed as they "had been broken since 2022 after a change to Microsoft's Azure face API." [PRIMARY]
- **Obsidian:** Plugins are fetched from GitHub releases; "if your manifest.json requires a version of Obsidian that's higher than the running app, your versions.json will be consulted to find the latest version of your plugin that is compatible." Practitioner reporting (XDA, 2026) notes "Every time Obsidian updates, there's a chance one of your plugins will stop working" and describes the dependency as making Obsidian "powerful, but also fragile." [PRIMARY/PRACTITIONER]
- **AutoHotkey:** v1 and v2 are not backward-compatible; a maintainer wrote "V2 cannot be backward-compatible with v1," while "Users who choose not to install v2 can continue to run their v1 scripts with no changes." Forum reaction included: "Think of all the libraries, tools, tutorials, examples, and scripts written in AHK v1, that now become 'worthless'... a massive amount of community value becomes lost." Compatibility policy: "Compatibility-breaking changes must be deferred until v3.0." [PRIMARY/PRACTITIONER — AutoHotkey forums]
- **Chrome extensions:** Manifest V2→V3 migration removed capabilities; V3 extensions "lose the ability to execute remote code: no inline scripts, scripts loaded from remote URLs, or userscripts." [THIRD-PARTY — Frisbie/Substack, 2024]

Sharing / authorship-departure: Yahoo Pipes' shutdown prompted the observation (Online Journalism Blog, 2015) that "many organisations relying on pipes created by departed staff may find that things stop working" — a documented instance of the author-leaves problem. [PRACTITIONER]

## 6. Safety, rollback and verification

- **Home Assistant:** pre-update automatic backup, advance breaking-change notices, repair system, rollback ("If you ever get stuck, you can restore the automatic backup and you are right back where you started"). No mechanism verifies that a user automation is *correct* — only that it loads. [PRIMARY]
- **Obsidian:** plugins are "individually vetted before being included in the directory"; developer policies prohibit code that would "Obfuscate code to hide its purpose," "Insert dynamic ads," or "Include client-side telemetry." A May 2026 Community launch added automated scanning and "safety scorecards showing maintenance signals, update frequency, and risk indicators." Vetting checks policy compliance and security signals, not functional correctness. [PRIMARY/PRACTITIONER]
- **Chrome MV3:** Google frames restrictions as security/privacy improvements; the model is permission-scoping via declarativeNetRequest, not correctness verification. [PRIMARY/THIRD-PARTY]

Finding (negative result stated as finding): none of the systems reviewed verify that a user-authored extension is *correct* (produces intended results). Verification, where present, checks permission/policy compliance or that code loads.

## 7. The chatbot boundary

Claude Artifacts gained persistent storage in October 2025 for published artifacts on paid plans (up to 20MB per artifact), with MCP integrations and the ability to call Claude. Anthropic's help center states artifacts "can store data across sessions, enabling stateful applications like journals, trackers, and collaborative tools." A third-party limitations guide (Feb 2026) states "everything resets when you close the chat. There's no way to save state between sessions or persist user data," which conflicts with the current documentation; the resolution (Caipi, June 2026) is that "the feature changed in October 2025 and the top guides did not." The persistence has "narrow walls: text only, 20 MB, paid plans, and a lifetime fused to the publish state of one artifact." [PRIMARY — Anthropic; THIRD-PARTY — Caipi/explainx, 2026]

Claude Skills "package expertise into a standardized format"; MCP "gives AI agents such as Claude the tools: access to systems, databases, APIs, and resources" (O'Reilly, 2026). A skill authored in a session can persist in a project. The line currently sits between session-scoped chat and a saved artifact/skill/MCP connection that persists across sessions in the host account. Vendor claim (stateful apps) versus documentation qualifier (published-only, paid-only, deleted on unpublish) are reported side by side; they diverge.

Other candidates (ChatGPT custom GPTs/Projects, OpenAI Assistants/Agent mode, Copilot Studio, Gemini Gems, Zapier Agents, Sierra, Lindy, Agentforce, ServiceNow AI agents, Slack AI, Notion AI agents, Cursor/Windsurf rules files, GitHub Copilot extensions) were not individually verified with dated primary sources within the research budget; see §13.

## 8. Do users actually extend? — the adoption question

This section carries the most weight and has the least clean data.

- **Home Assistant:** "automations 14" per reporting installation across 518,790 of 665,467 opt-in installations (77.96%), accessed 14 Aug 2026. The dashboard does not label this mean or median. It does not distinguish self-authored automations from blueprint-imported ones. Analytics are opt-in; a 2021 milestone post estimated "there are 4-5x more installations than people that opt-in to analytics." This measures automation *presence per install*, not *authoring rate*. [COMMUNITY-MEASURED]
- **npm:** "There are a little over 211,000 registered npm users, of whom about 73,000 have published packages." (~35% of registered; ~1.8% of an estimated 4 million total users — the 4M is described by the author as an estimate: "We think there are four million npm users"). Dated 26 Apr 2016 (Laurie Voss, npm). By 2025 npm reported ~17M registered developers (OpenJS Foundation), but no updated publisher count was found. [PRIMARY/COMMUNITY-MEASURED — dated]
- **VS Code Marketplace:** ~60,000 extensions from ~45,000 publishers, of which "only 1,800 of them are verified"; "3.3 billion installs with the average developer installing 40 extensions"; "the average install count per extension is ~55,000 installs while the median only sits at 500 installs." Publishers are well under a fraction of a percent of the tens of millions of users. [THIRD-PARTY — Koi Security (Amit Assaraf), ~2024]
- **PyPI:** No published author-vs-consumer ratio found. [NULL]
- **Obsidian, AutoHotkey, Tasker:** No rigorous survey figure for authoring rate found. [NULL]
- **Stack Overflow Developer Survey:** No specific "authored vs. installed an extension" question located in 2024/2025 surveys. npm reported used by 57% of respondents in the 2025 survey. [THIRD-PARTY]
- **Academic baseline:** Scaffidi, Shaw & Myers (2005) estimated ~90M US workplace end-users by 2012, 55M+ using spreadsheets/databases (potential end-user programmers), 13M+ self-describing as programmers — a modeled estimate extending Boehm's 1995 "55 million performers" figure, not a direct measurement of authoring. [ACADEMIC]

Bottom line for §8: where authoring is measured (npm 2016, VS Code Marketplace), authors are a small minority of users. For most systems the authoring rate is unknown; a large plugin registry with an unknown authoring rate is reported here as exactly that.

## 9. Failures and abandonment

| System | Event | Date | Stated cause (quoted) | Tag |
|---|---|---|---|---|
| HyperCard | Discontinued | Mar 2004 | Strategic narrowing under Jobs; "It was killed quietly" (practitioner framing) | THIRD-PARTY |
| Google App Maker | Shut down | 19 Jan 2021 | "Due to low usage, Google App Maker will be turned down gradually" (Google) | PRIMARY |
| Yahoo Pipes | Shut down | 30 Sep 2015 | "focus our efforts on core Yahoo product experiences" | PRIMARY/THIRD-PARTY |
| Lotus Notes/Domino 9.x/10.x | End of support | 1 Jun 2024 | "Due to the age of these releases, HCL will not be offering extended support" | PRIMARY |
| Chrome extensions (narrowing) | MV2→MV3 capability restriction | 2023–2025 | "more secure, performant, and privacy-preserving" (Google) | PRIMARY |

Deliberate narrowing: Chrome MV3 removed the blocking webRequest API and remote-code execution. Google's stated reason: "Manifest V3 is more secure, performant, and privacy-preserving than its predecessor." EFF senior staff technologist Alexei Miagkov (to The Register, Sept 2021): "Our criticism still stands. The reasons they have stated publicly [for this transition] don't fully make sense." [PRIMARY/THIRD-PARTY]

App Maker migration note (PRIMARY, Google): "due to the specific source code used for App Maker, you can't directly migrate your apps to another platform." App Maker's shutdown followed Google's acquisition of AppSheet (Jan 2020); Forrester's John Rymer stated "Google is expanding its commitment to low-code, not reducing it."

Other candidates named in the brief (InfoPath deprecation, Google Wave, IFTTT pricing changes, Coda/Grammarly acquisition, Adobe Flash/Flex, Silverlight, Parse sunset, Firebase feature removals, Atlassian Server EOL) were not verified with dated primary sources within budget; see §13.

## 10. Circulating statistics that do not survive sourcing

- **"By 2025, 70% of new applications developed by organizations will use low-code or no-code technologies, up from less than 25% in 2020."** Traceable to Gartner press materials (App Builder cites "Gartner Magic Quadrant for Enterprise Low-Code Application Platforms, August 2019"). It is a forecast, repeated widely as if measured. No published measurement confirming the realized 2025 figure was found. Do not use as measurement. [VENDOR-CLAIMED forecast]
- **"Citizen developers will outnumber professional developers 4:1."** Jason Wong, Gartner IT Symposium, 2021: "By 2023, the number of active citizen developers at large enterprises will be at least four times the number of professional developers." Repetitions drift the year to 2026 and 2028 and drop the "large enterprises" qualifier. Forecast, not measurement. [VENDOR-CLAIMED forecast]
- **"80% of technology products and services will be built by those who are not technology professionals by 2024."** Gartner press release (June 2021), "Gartner Says the Majority of Technology Products and Services Will Be Built by Professionals Outside of IT by 2024." Forecast. [VENDOR-CLAIMED forecast]
- **"88% of spreadsheets contain errors."** A misquotation of Raymond Panko's field-audit summaries. Panko ("Spreadsheet Errors: What We Know," arXiv 0802.3457) reports older field audits "found errors in 24% of the 367 spreadsheets audited," while "the most recent field audits... found errors in at least 86% of the spreadsheets audited"; Panko (2005) reports "For all 88 [spreadsheets], the weighted average percentage of spreadsheets with errors is 94%." Panko's own site reports "91% of the 55 spreadsheets" for the five core-methodology studies. The "88" phrasing conflates the *number of spreadsheets* (88) with a percentage; the underlying finding is an 86–94% range. [ACADEMIC]
- **Excel "750 million users."** Attributed to Satya Nadella (2017); separately, Microsoft cited 1.1–1.2 billion Office "productivity services" users (2016). These conflate Excel-specific and whole-Office counts; the 750M figure cannot be verified as Excel-specific. [VENDOR-CLAIMED]
- **"X% of Home Assistant users write their own automations."** No such published figure found; the analytics report automations-per-install, not authoring rate. [NULL]
- **IDC/Forrester low-code market forecasts.** Multiple non-reconciled figures circulate (e.g., ReportLinker "$36.43 billion by 2027," Forrester "$21.2 billion by 2023 at 40% CAGR" per Kissflow's secondary citation, "market reached $13.8 billion in 2023 growing 22.6% YoY"). These are shown as conflicting, not averaged; original IDC/Forrester primary documents were not retrieved within budget. [VENDOR-CLAIMED / secondary]

## 11. Excluded and why

- **Preference/settings panels, themes:** excluded (do not change what the system does). Obsidian *themes* are excluded from the extension count where they only restyle; Obsidian *plugins* are included.
- **Content authoring (writing notes, entering records):** excluded where capabilities are unchanged. Notion page/content creation is excluded; Notion database/automation creation is included.
- **Marketplaces where users only install:** the install-only path is excluded; the author-your-own path is included and separated (Salesforce AppExchange install vs. Apex/Flow authoring; HACS install vs. custom-integration authoring; Obsidian install vs. plugin authoring).
- **One-shot code generators with no persistent host:** excluded per brief (generated-and-abandoned repos). Claude Artifacts are treated as a boundary case in §7 because they gained persistence in Oct 2025.
- **Chat assistants that only answer:** excluded from §2–§3; the boundary is treated in §7.

## 12. Nulls

- Publisher-vs-consumer ratio for PyPI: searched registry statistics and packaging guides; not published. (Aug 2026)
- Authoring-rate surveys for Obsidian, AutoHotkey, Tasker: searched community/forum sources; no rigorous figure found. (Aug 2026)
- Whether Home Assistant's "14 automations" is a mean or median: dashboard does not label it; analytics source code not confirmed within budget. (Aug 2026)
- Smalltalk image, Lisp machine, Squeak/Pharo post-mortems: not retrieved with dated primary sources within budget.
- MELPA package count; Blender 2.7x→2.8x add-on API break specifics; Emacs 29/30 package incompatibilities; Coda/Grammarly and InfoPath details: web_search budget exhausted before verification.
- Search terms used across the run included: "Home Assistant analytics usage statistics automations," "Scaffidi Shaw Myers end user programmers 2005," "HyperCard discontinuation Apple," "Chrome Manifest V3 breakage," "Google App Maker shutdown 2020," "Obsidian community plugins count API changes," "AutoHotkey v1 v2 breaking change," "88% of spreadsheets errors Panko," "Salesforce Apex Flow citizen developer count," "Airtable Notion user count," "Claude Skills MCP persistent artifact," "Lotus Notes Domino HCL end of support," "through the web development considered harmful Zope Plone," "Home Assistant breaking changes community reaction," "Gartner citizen developers 4 to 1," "Yahoo Pipes shutdown IFTTT," "Excel 750 million users." Date range of sources: 1995 (Boehm) through August 2026.

## 13. Unverified leads

Commercial: Retool, Glide, Bubble, Zapier, Make, Coda, Smartsheet, Monday.com apps, Zoho Creator, Appian, Mendix, OutSystems, Quickbase, Claris FileMaker, Directus, Baserow, NocoDB, Budibase, Appsmith, Superblocks, Xano, Webflow, Shopify Functions/Flow, Atlassian Forge/Connect, Slack Workflow Builder, HubSpot custom objects, Anvil, Streamlit, Lovable, Replit Agent, v0, Val Town, Gumloop, n8n cloud, ServiceNow App Engine, Microsoft Power Apps/Power Automate/Dataverse.

Hobbyist: Logseq, Roam, Raycast, Alfred, Hammerspoon, Tasker, Shortcuts/Automator, KDE/GNOME extensions, Userscripts/Greasemonkey/Tampermonkey, Stylus, Blender add-ons, Godot plugins, Node-RED, Homepage/Dashy/Heimdall, Discord bots, Neovim plugins, TiddlyWiki, Grist, Anytype, Silverbullet, Minecraft datapacks/mods, Roblox Studio, Scratch, Decker, LiveCode.

Chatbot boundary: ChatGPT custom GPTs/Projects, OpenAI Assistants/Agent mode, Copilot Studio, Gemini Gems, Zapier Agents, Sierra, Lindy, Agentforce, ServiceNow AI agents, Slack AI workflows, Notion AI agents, Cursor/Windsurf rules, GitHub Copilot extensions.

Failures: InfoPath deprecation, Google Wave, IFTTT pricing/platform changes, Coda/Grammarly acquisition, Adobe Flash/Flex, Silverlight, Parse sunset, Firebase feature removals, Atlassian Server EOL.

## What the evidence does and does not support

**Established:** Large extension registries exist and their published-package counts are directly countable (Obsidian "6,586 plugins and 681 themes"; VS Code ~60,000 extensions from ~45,000 publishers). HyperCard (Mar 2004), Google App Maker (19 Jan 2021), and Yahoo Pipes (30 Sep 2015) were discontinued on stated dates with stated causes. IBM divested Notes/Domino to HCL (2018–2019); HCL ended 9.x/10.x support 1 Jun 2024. Chrome MV3 removed specific extension capabilities (blocking webRequest, remote-code execution). The npm 2016 publisher ratio (73,000/211,000) and the VS Code median-install figure (500) are measured. The Zope community explicitly discouraged through-the-web development, per current Zope docs.

**Open:** The authoring rate — the share of users who ever create an extension — is unknown for nearly every system. Whether Home Assistant's "14 automations" is a mean or median is unresolved, as is whether those automations were authored or imported. Realized (versus forecast) low-code adoption percentages are not measured in the sources found. IDC and Forrester market-size figures conflict and were not reconciled to primary documents.

**Negative results:** No system reviewed verifies extension *correctness*. No published figure states what fraction of Home Assistant users author automations. Gartner's headline citizen-developer statistics ("70% by 2025," "4:1," "80% by 2024") are forecasts, not measurements, despite frequent repetition as measurement. The "88% of spreadsheets contain errors" figure is a misquotation of an 86–94% range.

## Caveats

- Private-company user/revenue figures (Airtable, Notion) are third-party estimates; the companies do not file public financials. Notion's "100M users" is registered accounts, not disclosed daily-active users.
- Home Assistant analytics are opt-in and self-selected toward engaged users; a 2021 HA post estimated ~4–5× more installations exist than opt in.
- The npm publisher ratio is from 2016 and predates growth to ~17M registered developers by 2025; it should not be read as current.
- VS Code publisher/verified counts are vendor-reported (a third-party security firm scraping the marketplace), not Microsoft-official; the ~36M MAU comparator is secondary/estimate.
- Registry counts measure published packages, not authoring users; the two are conflated in much secondary reporting.
- Several sections rest on read-across from adjacent domains (spreadsheet end-user-programming literature applied to modern low-code) and on practitioner blog retrospectives where primary post-mortems were unavailable.
- The Atkinson HyperCard quote is from a 2002 interview reproduced in secondary sources; the primary transcript was not directly retrieved.
- The research web_search budget was exhausted before verifying a number of candidate systems, which are listed as unverified leads rather than findings.
- Some secondary sources (e.g., a Taskade blog on HyperCard, low-code vendor blogs on Gartner figures) are content marketing a competing product; their factual claims were cross-checked against non-vendor sources where possible, and their forecasts are labeled as forecasts.