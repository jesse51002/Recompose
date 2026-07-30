# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**The buyer** is a multi-tenant white-label SaaS platform with real tenant
volume — explicitly not agencies, not freelancers, not the end business. The
sharpest wedge is a platform that already runs a design service, because that is
direct evidence of demand for design variety and they can read the value off a
P&L.

**Two operators inside the product.** An *admin* (Recompose, or the platform's
own staff) onboards a codebase and watches a fleet of designs stay current. A
*tenant* — the platform's customer, e.g. a Pilates studio on a gym CRM — writes
a brand brief and signs off the design made from it. They never see the fork or
the repository. **That sign-off is the only gate in the product**, and it is one
design by the person whose brand it is; everything after it runs without waiting
for anybody.

**The audience for the demo surface** is a YC / investor room watching a pitch,
not a buyer evaluating a purchase. They need the mechanism legible in seconds
and are deciding whether this is a real company.

## Product Purpose

Customers agentically redesign white-label apps. A brand brief goes in; a
store-ready branded app comes out, with no human handoff in between.

The scope is a **full visual redesign** driven by the tenant — every screen,
every asset — **with no new features**. Not theming, not tokenizing. Success is
that one person can manage a hundred of these at once.

## Positioning

The mechanism is deliberately two parts, split where determinism runs out.

*Assets are data, so a pipeline generates them.* An app-agnostic dependency DAG
resolves palette, typography, copy, icons and images, deterministic where
determinism is available, with WCAG AA enforced as an accept condition rather
than checked afterwards. Coherence is achieved structurally — one derived
palette feeds every image prompt — not by a critique loop.

*Layout is code, so an agent writes it.* The app is tokenized into a shared
fork, mirrored as a feature-free JSX visual mock, redesigned by an agent with
full freedom, validated against screenshots, then converted back to production
code by a productionalize agent.

**Recompose never writes to the platform's trunk.** Two agent-maintained fork
layers, re-derived as the platform ships. They grant read access; that is the
integration.

**Nothing waits to be approved.** A design ships when its own checks pass and
stops when they do not — because at a hundred branches an approval queue is the
bottleneck, and a reviewer who must clear every one of them is the thing that
stops this scaling. Human attention goes to the exceptions instead: a design
that halted is a design that needs a decision, and the fleet page exists to show
which ones those are.

The promise is still leverage rather than magic — one person managing a hundred
designs — but the leverage comes from only being asked about the ones that
stopped, not from reviewing every one.

## Operating Context

- The platform grants **read access** to a repository. There is no pull request,
  no branch on their trunk, no library to install, no integration work.
- Onboarding is **once per platform**, not once per tenant, and takes roughly an
  hour. Its cost amortizes across every design.
- Per design: brief → asset pipeline → design agent → validation →
  productionalize → deploy. No approval step between them; a stage that cannot
  satisfy its own checks halts and asks, and that is the only time a person is
  involved after the brief.
- **Most passes are slow and that is fine.** The design pass is the fast one
  (~2 minutes). Validation is 20–40 minutes because it walks every screen in
  every state and then a functional-equivalence gate. Productionalize is 1–2
  hours because its output ships.
- Stated error budget ~95% clean / 4% minor / 1% significant. What makes it
  survivable is that the 5% **stops itself** rather than shipping: the checks
  are the architecture, and the exception queue is what a person actually
  works. A reviewer clearing every design was the earlier answer and does not
  survive contact with a hundred branches.

## Capabilities and Constraints

**Real and working.** The asset pipeline: 23 nodes over 3 levels for the
reference app — colour, typography, copy, icons and classification from the
brief, then 18 images (15 depending on colour, 3 derived from another image).
Fault-tolerant: a failed node skips only its transitive dependents and the run
still writes. A read-only API over the produced `output.yaml`. Two client
runtimes (Flutter, React). A local-only studio API with a brief-authoring agent.

**Specified but not built.** The layout half. Productionalize is the hard part
and where the product actually lives.

**The safety property** is functional equivalence: a redesign changes
*arrangement only*. No screen merged or split, no functionality added, none
removed, API surface provably identical — customer-verifiable by diff rather
than argued. The gate has never been built or run.

**Undecided, and must not be invented:** pricing for this ICP is open. The name
"Recompose" is provisional; domain and trademark unchecked.

## Brand Commitments

- **Recompose** is the product name (provisional).
- **CombatDen** is the reference implementation, demo canvas and eval bed — a
  class-based gym CRM. It is one app folder in the engine, not the company.
- Never sell hands-off autonomy. The promise is human leverage.
- Never make a moat claim. The barrier is packaging, not difficulty.

## Evidence on Hand

- A working pipeline and its produced artifacts, including a real slot inventory
  in `apps/combatden/app.yaml`: 4 colour roles, 2 fonts, 5 copy strings, 4
  icons, 18 images, 8 classification categories.
- Interactive feature-free mock screens in `RecomposeJsxMockUps` — two
  clickable assets, an app and a post-class celebration flow.
- **Absences future work must not fabricate:** there are zero customers, no
  named target platform, no pricing, no benchmarks, no testimonials, and no
  production deployment. Every tenant, platform and figure in the demo is
  synthetic and must be labelled as such.

## Product Principles

1. **Deterministic where determinism is available, agentic only where it is
   required.** The split is the architecture and the positioning at once.
2. **Never touch their code.** The fork model removes the adoption objection
   rather than answering it.
3. **Arrangement only.** A larger product surface under a tighter constraint,
   checkable rather than argued.
4. **Autonomous by default, human by exception.** Checks gate the pipeline, not
   a reviewer, because an approval queue does not survive a hundred branches.
   People are spent on the designs that halted.
5. **Default quality is the product.** A full redesign fails *visibly*, so the
   first pass has to be good.

## Accessibility & Inclusion

WCAG AA contrast is enforced inside the generated product as a pipeline accept
condition, not a review step. The studio surface itself must meet the same bar.
