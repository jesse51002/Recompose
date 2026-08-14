---
tags: [strategy, icp, customer, recompose]
status: living
---

# Customer ICP

Who this is for, in what order, and who it is explicitly not for. The product it describes is in [[Strategy/Recompose_Summary|Recompose_Summary.md]].

---

## The sequence, and why it is a sequence

**Small teams and early-stage companies first. The enterprise information hub is the destination.** Those are different buyers with different reasons, and the path between them has a discontinuity in it that has to be crossed deliberately rather than assumed away.

The measured precedent for the shape is v0: approaching $50M annualised by April 2026 with **over half of revenue now from Teams and Enterprise accounts**, starting from a prompt box aimed at individuals. Gamma is the other half of the proof — $100M ARR, profitable since early 2024, on roughly fifty people, priced free through $100. **A prosumer entry point does convert upward, and a casual AI-artifact product can carry real revenue.** Both of those were open objections until 2026-08-13.

## Two populations, opposite economics

The product has a supply side and a demand side and they are not the same people.

**Creators** author artifacts and populate the marketplace. Technically capable or willing to become so, tolerant of rough edges, already running Claude Code, Cursor or Codex. Because the vault is a folder of files on disk, **their own coding agent does the heavy generation and their own subscription pays for it** — which makes the population that supplies the marketplace nearly free to serve.

**Installers** take what creators made and modify it by prompting. This is the majority and the revenue. Where extension requires writing and publishing code, participation runs around two percent of users; where the barrier is low and private, the median reporting Home Assistant install carries fourteen automations. **The barrier is the code, not the desire** — which is the whole bet, and it means the installer is the user the product must be designed for even though the creator is the one who makes it interesting.

The consequence for onboarding is not subtle: **first run is "pick something that nearly works," never "here is your empty workspace."**

## The beachhead

People who already generate AI artifacts and have nowhere coherent to keep them. They are self-identifying, reachable this week, and visible in the live argument about HTML versus markdown — which is evidence of attention rather than of demand, but attention from a nameable population is more than this project has had at any point in nine months.

Adjacent and equally reachable: teams running on a workspace plus a pile of spreadsheets, where the spreadsheets exist precisely because the workspace does not bend.

**Reachability is the criterion that changed everything.** The previous buyer required a named human at a platform that does not answer email, and the assignment went unexecuted for seven consecutive sessions because of it.

## The enterprise destination, and the discontinuity in the middle

The budget line exists and is named: **the wiki and knowledge-management line.** Confluence occupies it; Atlassian bills billions against it; Glean has doubled to $200M ARR selling into the same conception of a central information hub, and Dust and Onyx are selling there now.

**What a solo founder buys is not what an enterprise buys.** The founder buys one tool they can extend themselves. Enterprise sprawl is driven by departmental autonomy, procurement, compliance and specialists who will not surrender a tool, and an extensible base does not touch any of that. The pitch has to change on the way up, and pretending otherwise is how land-and-expand stories fail.

**The security review does not get easier for being non-critical.** SSO, SCIM, admin controls, audit logs and data residency are required regardless of whether the workspace holds anything business-critical, and a marketplace of third-party executable code makes that review materially harder. That suggests the marketplace and the enterprise motion may need sequencing rather than shipping together.

## What is being displaced

Not a competitor's product. **A spreadsheet, a pile of AI-generated HTML with nowhere to live, and an internal tool nobody wants to maintain.**

The maintenance point is the one two independent research passes converge on: an in-house build dies of escalating requests, opportunity cost and orphaned ownership once the builder leaves — the incident.io case, the citizen-developer orphan pattern, and Yahoo Pipes stranding organisations that depended on pipes made by departed staff. **The custom build's failure mode is not building it. It is owning it afterward**, and "you never own the maintenance" is the value proposition with the most independent corroboration behind it and the least direct evidence that anyone will pay for it.

## Explicitly not

- **Regulated or life-critical work.** The safety model is rollback rather than verification. That is honest for a team's operating information and dishonest for anything where being wrong is an incident.
- **Enterprise as a first customer.** The requirements are real and the product is not there.
- **Non-technical solo users as the beachhead.** They are the eventual majority and they are the wrong first users, because early rough edges need someone who can diagnose them.
- **Anyone whose reason to buy is that it is cheaper.** Cost savings has been a dead pitch in this project since 2026-08-02 and nothing has changed.

## Pricing, undecided, with anchors for the first time

Every previous anchor in this vault was seat-based developer-tool pricing that did not transfer. These do: **$8–45 per seat per month** across the workspace field; Gamma's free/$8/$15/$100 ladder; Retool's split between a builder rate and a much lower consumer rate; and consumption pricing normalised by Glean, Rovo and Copilot Studio.

Two units fit the architecture and neither is chosen. **A builder/installer split** matches the two populations directly. **Per-workspace resource tiers** — so much storage, so much compute — match the isolation model, and let the product say *build anything you like* while bounding *how much*, which is the only kind of limit consistent with the freedom position.

The freemium risk is real and specific: a free tier plus heavy inference aimed at the population least willing to pay is the worst unit-economics shape in software. What makes it survivable is that creators bring their own agent, and that resource limits are enforceable per workspace without policing what anyone builds.
