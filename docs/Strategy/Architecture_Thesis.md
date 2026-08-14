---
tags: [strategy, architecture, technical, recompose]
status: living
---

# Architecture Thesis

How the product is built and why each piece sits where it does. Decisions **D1–D6** were taken in [[Office_Hours/2026-08-13-22-Office_Hours_The_Extensible_Workspace|Office_Hours/2026-08-13-22-Office_Hours_The_Extensible_Workspace.md]]. The security model that follows from them is in [[Strategy/Trust_And_Safety|Trust_And_Safety.md]].

---

## The three-way split

**Files local. Data server-side. Execution local.** Each is placed for a different reason, and the reasons do not generalise to each other.

| | Where | Why there |
|---|---|---|
| Files | The user's disk, syncing | Coding agents operate on a folder |
| Data | Per-workspace database on the server | Collaboration is impossible otherwise |
| Execution | The user's machine | Arbitrary compute must not be on our bill |

---

## D1 — Desktop, not browser-only

Three arguments, and the compute one is the weakest of them.

**Arbitrary long-running work has no home in a browser tab.** Background tabs throttle, and the work dies when the tab closes. Under a policy of "run whatever you want," that is a design for the median case in a product explicitly built for the tail.

**Browser memory is bounded** at roughly 2–4GB per tab depending on platform. That is ample for dashboards and inadequate for genuine data processing. WASM, Web Workers, OPFS and WebGPU are more capable than they are credited for — JupyterLite and Observable run real work in-browser — but the ceiling is real and the product is built for the case above it.

**And a hosted runtime for arbitrary user processes is an unbounded liability**, which would require quotas on capability, which is the limiting the product exists to remove.

Desktop puts real Node, Python and subprocesses on the user's machine at zero marginal cost.

**What it costs, and this must be held rather than forgotten:** install friction, multi-platform builds and updates, no mobile, and harder viral sharing. **Desktop optimises for creators and taxes installers** — the one-click casual user is exactly the person least likely to install an application to try something. The resolution is Obsidian Publish's shape: **desktop to author, browser to view**, so a shared artifact can be seen and used without installing anything, and installed only when someone wants to own and modify it.

## D2 — A vault of files on disk, syncing to the server

The decision with the largest downstream consequence, and it is not about storage.

**Claude Code, Cursor and Codex operate on the workspace natively, with no integration built.** Notion cannot do this, Confluence cannot, Glean cannot, and none of them can without abandoning its storage model.

It reframes the competitive question rather than answering it: the product stops competing with coding agents and becomes **the substrate they operate on**. It also moves the heaviest inference cost onto the power user's own subscription, which is what makes the population that supplies the marketplace nearly free to serve.

## D3 — Data server-side, isolated per workspace

Collaboration is impossible with local-only data, and collaboration is a stated core value.

**Per-workspace SQLite, not a shared Postgres instance** — the pattern used by Turso/libSQL, LiteFS and Cloudflare Durable Objects. Isolation is free, snapshots are a file copy, restore is per-workspace, and one workspace's runaway query cannot reach another's.

A shared instance would have forced query-level policing to protect neighbours, which is capability limiting by another name.

**What this signs up for:** a routing layer that knows which node holds which workspace; process and connection management once thousands of databases are live; and **replication**, because a single-node SQLite file is a data-loss event waiting for a disk failure. Turso and LiteFS exist because that last one is real work to do properly.

**Resource limits are not capability limits.** Per-workspace isolation permits *build anything you like; this workspace has so much storage and so much compute.* Total freedom over **what**, a bound on **how much**, enforceable at the file and process level without inspecting what anyone is doing. That is what makes a freemium tier survivable, and it is the only form of limit consistent with the product's position.

**And it is a differentiator, not only an implementation.** The platform absorbing infrastructure, operations and billing so the user never thinks about it is the most legible of the three things a coding agent cannot do. An agent hands you code; you still have to provision, deploy, secure, back up and pay for a database.

## D4 — Execution is local

Follows from D1 and D3. The consequence to design for: a locally-running artifact needs to reach a server-side database, which means credentials live somewhere on the user's machine. That is handled by D6 rather than by hoping.

## D5 — No dev/prod separation. Snapshot and restore instead

Dev/prod separation was rejected for simplicity, correctly — it is complexity the product does not need.

But AI-generated code plus heavy database modification with no undo will destroy someone's data quickly. **Home Assistant's answer — an automatic backup before every change, with rollback — is the strongest safety mechanism found anywhere in the surveyed field**, across commercial low-code, hobbyist ecosystems, browser extensions and forty years of prior art. With a file-and-SQLite vault it is nearly free: copy the file before an artifact runs a migration.

**Nothing anywhere verifies that a user-authored extension is correct.** Verification, where it exists, checks policy compliance or that code loads. So rollback is not a nice property here — it is the only accept condition actually available, and the standard it sets is *can I undo it* rather than *was it right*.

## D6 — Freedom on public APIs; internal access through a host-held credential

Artifacts may call any public API. Internal data access is capability-scoped.

**The artifact never holds a connection string.** It runs sandboxed, talks to the host over IPC or `postMessage`, and the host makes the scoped query and returns the result.

That gives **one chokepoint** where the read scope is enforced, egress is logged, and the entire marketplace security story terminates. It is why the host-to-artifact IPC contract is the first thing to specify — permissions, logging, sharing and publishing all resolve to it, and it is expensive to change once artifacts exist in the wild.

## Concurrent editing — explicitly not solved

Multi-agent editing of one file is unsolved everywhere, and the budget does not go there. Warnings and presence indicators when an agent is editing.

The cheap addition that changes its character: **presence plus version history.** It does not prevent a clobbered edit — nothing does — but it makes one recoverable. Snapshots already exist for D5, so the same mechanism covers files.

**Turning an unsolvable correctness problem into a recoverable one is the only kind of safety available without an oracle**, and it is the same move D5 makes.

---

## Build order

1. **The vault format** — how a workspace is represented on disk, and how a change merges.
2. **The host-to-artifact IPC contract** — the chokepoint everything else terminates at.
3. **Seeded presets**, before the first user. This requires no users, no funding and no permission.
4. **One installed artifact, modified by prompt, watched by someone who is not the founder.**

Everything else is downstream of the first two, and both are expensive to change later.

---

## The unsolved problem this keeps hitting

**Surviving concurrent change** appeared in five distinct places in a single day: Retool modules where all consumers take the live version and no per-app pinning exists; marketplace artifacts forking with no diff or merge story; extensions breaking on base upgrades across Obsidian, AutoHotkey and Chrome, where **nobody migrates them forward and backup-and-rollback is the state of the art**; sync conflict between two editors or an agent and a server; and version drift when a hand edit meets a regeneration.

It is the same problem each time. [[Concepts/Product/Mechanisms/Re_Derived_Not_Forked|Re_Derived_Not_Forked]] names the shape of an answer and nothing in any surveyed ecosystem implements one. **It is the central engineering problem of this product**, and solving it is the second of the three things a coding agent cannot do.

## Editing generated artifacts

The tractable half: **parameterise text content at generation time**, so content edits are slot writes rather than structure rewrites and survive regeneration. Scoped to documents that want embedded or animated visuals rather than to all HTML, which is what makes it buildable.

The boundary to hold deliberately: **structure edits stay prompt-only.** The moment a hand edit touches structure, the hard case returns — reconciling hand edits with regeneration without drift eating the earlier ones. Keeping slot names stable across regenerations so content re-binds is engineering, not research.

## Storage dialects

Local SQLite holds the user's data; the server's own store holds accounts, auth, sync metadata, sharing and marketplace listings. Because the two hold different things there is no dual-dialect problem — the failure mode where the same schema must run on two engines and diverges into environment-specific bugs does not arise here.

## What has no assigned job

The engine in this repository — the ThemeTree pipeline, the API over it, the Flutter and React theme runtimes, the mock surfaces and the studio — has **no role in this architecture.** That is an open decision, not something to let drift.
