---
tags: [companies, index]
aliases: [company index, companies]
---

# Companies Index

Every company this repo tracks in depth. A company earns a page here when a decision depends on knowing it precisely — a competitor whose positioning bounds ours, a target buyer whose extension surface decides the sale, or a reference architecture worth copying.

**One page per company, named for the company.** `Companies/Gigacatalyst.md`, `Companies/Jack_Henry_Banno.md`. Title case with underscores, matching `Concepts/`.

> [!info] Why this folder exists separately from `Research/` and `Strategy/`
> `Research/` holds a dated brief answering a question at a point in time. `Strategy/` holds a position. **A company page holds the current facts about one entity**, revised as they change, so the same company does not get re-described in six documents that drift apart. Where a strategy doc needs a company fact, it links here.

## Conventions

**Frontmatter carries a `verified` date and a `relationship`.** Company facts rot faster than anything else in this vault — funding, headcount, product scope and pricing all move. A page whose `verified` date is months old is a page to re-check before quoting.

```yaml
---
tags: [company, <vertical>, <relationship>]
relationship: competitor | target-buyer | reference-architecture | supplier | adjacent
verified: YYYY-MM-DD
---
```

**Every claim carries its source and its quality**, in the same vocabulary the research briefs use: primary (filing, developer doc, engineering blog), vendor-claimed, third-party, competitor-sourced, inferred. A company page is where unsourced confidence does the most damage, because it gets quoted on calls.

**Say what is unverified.** Each page ends with what is not known about the company, so the gap is visible rather than filled in from memory.

**Do not narrate the company's history for its own sake.** Record what bears on a decision here. A funding round matters because it sets what they can outspend; a repositioning matters because it vacates or occupies ground.

---

## Tracked

- [[Companies/Gigacatalyst|Gigacatalyst]] — YC Spring 2026. Per-tenant functional customization embedded in a host SaaS, on the host's APIs and auth, no host codebase changes. The closest company in the market.

## Wanted, not yet written

Named because a decision already depends on them and the vault carries their facts scattered across strategy docs rather than in one place.

**Target buyers, gated on extension-surface depth (the verification task that precedes every call):**
Jack Henry's Banno · Backbase · Tapcart · BuildFire · GoodBarber · ABC Trainerize

**Platforms that shipped AI extension generators on their own SDKs:**
Q2 · Alkami · Temenos

**Reference architectures worth understanding rather than selling to:**
Salesforce (metadata, managed packages, AppExchange, Agentforce) · ServiceNow · Shopify · Atlassian Forge

**The graveyard, which is where the cheapest lessons are:**
Builder.ai · CodeParrot
