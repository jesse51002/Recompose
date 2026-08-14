---
tags: [strategy, competition, recompose]
status: living
verified: 2026-08-13
---

# Competition

The field, and where this sits in it. Grounded in [[Research/2026-08-13-21-ai-native-workspace-landscape|the AI-native workspace landscape brief]] and [[Research/2026-08-13-12-spreadsheet-to-application-field|the spreadsheet-to-application field brief]]. Figures carry the dates they were captured on; this page rots faster than anything else in the vault.

---

## The axis that separates products

Three questions, asked of everything. Nothing else discriminates as well.

1. **Who can change what the product does** — any end user, a designated admin, or only a professional developer?
2. **What the artifact is** — stored configuration interpreted by the vendor's runtime, a restricted scripting language, or general-purpose code the user can read and take elsewhere?
3. **Does AI produce that artifact** — no AI, AI that writes content, or AI that produces working functionality?

| | Who authors | Artifact | AI produces it |
|---|---|---|---|
| Notion | End users; admins gate agents | Config, plus external coding agents since 2026 | Agents, database views, automations |
| Airtable | End users | Config — bases, interfaces, automations | Omni produces working apps |
| Coda | End users | Config plus formula language | Content and formulas |
| Confluence | End users; HTML macro admin-gated | Config | Content; Rovo agents |
| Glean · Dust · Onyx | Admins and end users | Persisted agents over external data | Agents, not interfaces |
| Retool · Superblocks | Developers and admins | Config plus JS/SQL; no code export | AppGen produces apps |
| Claude Artifacts · v0 | End users | **General code, user-readable** | Working functionality |
| **This** | **End users** | **General code the user owns** | **Working functionality** |

**The cell nothing occupies is code-you-own inside a workspace.** Artifacts and v0 produce readable code and are not workspaces. Every workspace produces configuration.

---

## The verified nulls

Two findings the field-level briefs were commissioned to test, both clean across roughly forty products.

**Nothing outputs exportable general-purpose code.** For the open-source products the escape hatch is *self-hosting the vendor's own engine*, not owning the application. Proprietary products export CSV and never the app. Retool apps serialise to JSON and are Git-syncable when self-hosted, and still require a Retool runtime.

**Nothing has shipped a correctness oracle.** No product differentially tests or reconciles generated output against a source of truth. Every builder gates go-live with a human publish step. Verification, where it exists anywhere in the wider field, checks policy compliance or that code loads — never that the thing is right.

"Leave with your data **and your app**" is unmatched. So is any mechanical accept condition.

---

## Established workspaces

**Notion.** ~$500M annualized by September 2025. AI Agent September 2025, **Custom Agents 2026-02-24**, gated to Business and Enterprise; the standalone AI add-on retired May 2025 and is now bundled. Databases cap at 250,000 rows and 500 properties.

**And the fact that dents the structural argument: Notion opened to external coding agents — Cursor, Claude Code, Codex — as native agents in 2026.** They cannot ship free-form code without exposing internals, so they found a third route: let someone else's agent operate in the workspace. Their own objects remain configuration and there is no executable marketplace, so the argument is dented rather than broken. **"They cannot follow" should never be said without that qualification.**

**Airtable** relaunched as an AI-native platform, with **Omni generally available 2025-06-24** on every plan including free, marketed as producing "production-ready apps." Its own documentation concedes Omni "cannot perform complex calculations or compute statistical analyses such as sums, averages, or variances." Independent review: Omni "assembles interfaces from Airtable's prebuilt blocks, so what you get is a rearrangement of existing components," and it is for "quick scaffolding and data insights rather than as a primary building tool." Record caps run 1,000 Free to ~500,000 Enterprise Scale, cumulative per base, with an API limit of five requests per second.

**The category leader announced this thesis and shipped a product structurally incapable of delivering it.** Configuration is a bounded vocabulary and no model quality exceeds it. Fourteen months on, **Airtable has published no Omni usage figure at all.**

**Coda** was acquired by Grammarly in December 2024; the parent rebranded to Superhuman in October 2025 and Coda Brain was folded into Superhuman Go. **Confluence** ships Rovo, GA October 2025, now bundled with non-subscribers at $5/user/month, and **disables its HTML macro by default for cross-site-scripting reasons** — see [[Strategy/Trust_And_Safety|Trust_And_Safety.md]].

## Company brain

They sell into "the central hub of company information" — the destination budget line — with enterprise trust already established.

**Glean.** $100M ARR in Q4 FY25, **doubled to $200M by December 2025**. $7.2B valuation, ~$765M raised. **Glean Agents shipped early 2025**, powering "more than 100 million agent actions annually." **Dust.** 3,000+ organisations, 41,000 MAU, **over 300,000 agents deployed**, $40M Series B May 2026 with Sequoia. **Onyx.** MIT-licensed, self-hostable, air-gappable; 14,000+ at Netflix, 37,000 at UC San Diego.

**They crossed from retrieval into durable creation during 2025 — and they create agents, not interfaces.** Nobody in this band makes a rich interactive page. That is the gap, and it is narrower than the category being open. It is also the band to watch: if Glean starts building dashboards, it is the same product arriving with the distribution and the budget line already in hand.

## Artifact surfaces

**Claude Artifacts** is the closest thing that exists. Publishable artifacts June 2025, **persistent storage and MCP 2025-10-21** at 20MB per artifact on paid plans, public sharing with multiplayer editing by July 2026. It runs general code in a sandboxed iframe with browser storage APIs prohibited outright. Unpublishing permanently destroys the stored data.

**It is technically capable and not a project centre** — no workspace, no organisation, no returning to it tomorrow. That gap is where a product gets built, and it is wide.

**v0**: ~$50M annualized by April 2026 with **over half of revenue from Teams and Enterprise**, 4M+ users, exportable React and Next.js. **Gamma**: $100M ARR, 70M users, **profitable since early 2024 on roughly fifty people**, $2.1B valuation.

**ChatGPT Canvas is being sunset from GPT-5.5 models** (~late May 2026), folded back into inline writing and code blocks. OpenAI built a dedicated canvas surface and decided the separate surface was not worth keeping. **Tome**, an AI-deck rival with $43M raised, pivoted out. The artifact-surface category is churning.

## Coding agents

Not competitors under this architecture — **the substrate consumes them.** A vault of files on disk means Cursor, Claude Code and Codex operate on the workspace natively, and the power user's own subscription pays for the generation.

What they do not do: run anything, hold data, manage permissions, or survive their own output going stale. **Retool's CEO states the case better than we could** — "AI has dropped the bar to prototype, but the bar to ship hasn't moved" — while selling it as a reason to land in Retool.

## Retool, and why it is not a substrate

Growing ~39% year on year at $120M ARR in October 2025, with no priced round since a $3.2B valuation in July 2022 — and lapped: Lovable reached $120M in about a year, Cursor $500M by May 2025, Replit ~$253M. It is repositioning at non-engineers with an AWS collaboration behind it.

**Its Acceptable Use Policy forecloses building on it.** Reselling and sublicensing are prohibited, the licence is non-sublicensable and non-transferable, and a separate clause forbids using the service "in order to build a similar or competitive product or service." External Apps is for exposing your own applications to your own customers.

Its module system is worth knowing for a different reason: **"all apps that contain the module use the live version. Different apps cannot use different versions of the same module."** The most mature modular platform in the field has no per-consumer version pinning. Nobody has solved the problem this product has to solve.

---

## What the field cannot tell you

**No independent build-versus-buy frequency data exists.** No survey with a disclosed method and a stated denominator, no non-vendor category ranking, no coded distribution of what people leave when they build. Every quantified figure in circulation traces to a vendor selling build-side tooling. **This market cannot be sized from non-vendor data, and any market-size claim made in a pitch would be quoting a vendor.**

**Statistics that do not survive sourcing**, and must not be used: Gartner's "70% of new applications low-code by 2025," "citizen developers 4:1," "80% by 2024" — all forecasts repeated as measurement. "500 million new apps by 2023" is an IDC forecast, reframed by Microsoft into a low-code figure IDC never published. "88% of spreadsheets contain errors" is a misquotation conflating a sample of 88 spreadsheets with a percentage; the real finding is a range of 86–94%. Notion's "100 million users" traces to stat-aggregator sites rather than any disclosure, and its revenue figures conflict across sources by more than 2×.

**One statistic is clean and it is the one that matters.** Stack Overflow's 2025 survey, n≈49,000, method disclosed, no vendor stake: **84% use or plan to use AI tools while trust in their accuracy fell to 29% from 40%; 46% actively distrust the output and 3% highly trust it.** Adoption rising, trust falling, measured independently.
