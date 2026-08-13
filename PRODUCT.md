# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**The buyer** is a multi-tenant white-label SaaS platform that **already funds
per-tenant custom development** — Jack Henry's Banno, Backbase, Tapcart, ABC
Trainerize at Enterprise, GoodBarber, BuildFire. The budget line already exists,
so the value is read off a P&L rather than imagined. Sorted within that by
whether every tenant already has their own app. Explicitly not agencies, not
freelancers, not the end business.

**Two operators inside the product.** An *admin* (Recompose, or the platform's
own staff) onboards a codebase and watches a fleet of modules stay current. A
*tenant* — the platform's customer, e.g. a Pilates studio on a gym CRM —
describes functionality they need and confirms the module built from it. They
never see the extension surface or the repository.

**The audience for the demo surface** is a YC / investor room watching a pitch,
not a buyer evaluating a purchase. They need the mechanism legible in seconds
and are deciding whether this is a real company.

## Product Purpose

Customers agentically extend white-label apps. A tenant says what they need the
app to *do*, and a module is generated and inserted into their app — carrying
the platform's own design tokens, so it reads as part of the app rather than as
something bolted on. The platform never builds it and never reviews it.

*The one-line description is provisional and has not been tested on anyone.*

**Why features rather than design.** Design has never once been the sole reason
anyone built bespoke; app-store reviews of white-labeled apps complain about
bugs, never about looking generic; branded-app attach rate tracks tenant size
rather than design quality. And there is no design budget line — the deliverable
prices standalone at $99–499 and professional services runs 1–3% of revenue at
the public companies. Per-tenant feature work is a **named engineering
organisation priced behind sales**, and thirteen of nineteen researched
platforms refuse it outright.

## Positioning

The mechanism is deliberately two parts, split where determinism runs out.

*Assets are data, so a pipeline generates them.* An app-agnostic dependency DAG
resolves palette, typography, copy, icons and images, deterministic where
determinism is available, with WCAG AA enforced as an accept condition rather
than checked afterwards. Coherence is achieved structurally — one derived
palette feeds every image prompt — not by a critique loop. Its output is the
token set a generated module renders against, which is what makes a module
Recompose built indistinguishable from one the platform built. **That is the
entire role of theming: no layout generation, no animation, no redesign of
anything that already exists.**

*Behaviour is code, so an agent writes it.* A tenant describes functionality; an
agent produces an **additive** module against the platform's extension surface,
wired to endpoints their API already exposes.

**Additive only.** A module adds a screen, a widget, a workflow. It never edits,
moves, merges, splits or removes anything already there. This is the boundary
Salesforce, ServiceNow, SAP, Shopify, Atlassian Forge, Q2's Caliper, Banno's
Plugin Framework and Gigacatalyst all converged on independently, and it is what
makes a module separable by construction.

**Recompose never writes to the platform's trunk.** A module lands in an
extension surface the platform already owns, hosts and governs. Where no such
surface exists the platform adds insertion points, which needs
engineering-leadership sign-off and is a materially harder sale — which is why
the buyer is a platform that already has one.

**Whether any existing surface is deep enough to carry a real feature is
unverified.** Banno's Plugin Framework hosts web apps on the *partner's*
infrastructure; Tapcart's blocks live inside its own studio. Checking this from
public developer documentation is the first task in front of the direction.

## Operating Context

- **The hard part is the boundary, not the code.** A module's interior is new
  code in a defined slot. Its edges — auth, session, user identity, tenant
  scoping, base data reads, RBAC inheritance — are integration against a
  production system nobody here wrote. That is most of the work, and a mistake
  there is a security incident rather than an ugly screen. Never present this as
  an easy or incremental path.
- Onboarding is **once per platform**, not once per tenant. Its cost amortizes
  across every module.
- **Contract drift is the coupling hazard.** A module depends on the platform's
  API and the dependency is invisible: a field that keeps its name and changes
  meaning passes cleanly, and every module built on it is silently wrong with
  nothing reporting it. A proxy absorbing upstream API changes is the working
  idea; it centralises coupling rather than removing it and cannot see a
  semantic change.
- **Nothing amortises automatically.** A module is for one tenant by
  construction. Whether a module library re-serves later requests, and who owns
  it, decides the margin and is undecided.

## Capabilities and Constraints

**Real and working.** The asset pipeline: 23 nodes over 3 levels for the
reference app — colour, typography, copy, icons and classification from the
brief, then 18 images (15 depending on colour, 3 derived from another image).
Fault-tolerant: a failed node skips only its transitive dependents and the run
still writes. A read-only API over the produced `output.yaml`. Two client
runtimes (Flutter, React). A local-only studio API with a brief-authoring agent.

**Only the asset pipeline has an assigned job in the current mechanism.** The
theme runtimes, the JSX mock surfaces and the studio do not. That is an open
decision, not something to let drift.

**Not built.** The module generator, the boundary (auth, identity, tenant
scoping, base data), the admin surface, and the accept condition.

> **There is no accept condition for a generated feature, and this is the
> load-bearing gap.** Nothing a human reads at a glance, and no diff that proves
> correctness rather than absence of change. Candidates, none chosen: read-only
> modules first; generated tests through the platform's own CI; a bounded
> vocabulary of tested primitives; tenant approval against real data.

**Do not claim autonomy and do not quote an error budget.** Unattended operation
needs a check the system can fail, and there is none yet. The ~95/4/1 figure in
circulation was never measured and describes cosmetic defects; do not quote it,
adapt it, or replace it with a new number before anything is measured.

**Undecided, and must not be invented:** the accept condition; compile-time
versus runtime insertion; how deep the existing extension surfaces go; what
bounds a tenant's request; where the admin dashboard lives; whether one person
can carry three surfaces each with its own security surface; and pricing.

## Brand Commitments

- **Recompose** is the product name (provisional; domain and trademark
  unchecked). *Composition* names arrangement, which is not what the product
  does — weigh that if the name is ever revisited.
- **CombatDen** is the reference implementation, demo canvas and eval bed — a
  class-based gym CRM. It is one app folder in the engine, not the company.
- Never claim autonomy or quote an error budget until an accept condition
  exists.
- Never sell *"your tenants will love it."* The buyer is the platform and the
  argument is capacity and refused revenue.
- Never quote an enterprise-tier price. Every figure in circulation is a
  third-party estimate of a contact-sales number.
- Never make a moat claim. The barrier is packaging, not difficulty — and the
  buyer is defined by already owning the expensive half of it.

## Evidence on Hand

- A working asset pipeline and its produced artifacts, including a real slot
  inventory in `apps/combatden/app.yaml`: 4 colour roles, 2 fonts, 5 copy
  strings, 4 icons, 18 images, 8 classification categories.
- Interactive feature-free mock screens in `JsxMockUps` — two clickable assets,
  an app and a post-class celebration flow.
- **Absences future work must not fabricate:** there are zero customers, no
  named human at any target platform, no pricing, no benchmarks, no
  testimonials, and no production deployment. Nothing in the module mechanism is
  built. Every tenant, platform and figure in the demo is synthetic and must be
  labelled as such.

## Product Principles

1. **Deterministic where determinism is available, agentic only where it is
   required.** The split is the architecture and the positioning at once.
2. **Additive only.** A module adds; it never edits. Separable by construction,
   which is what makes it safe to accept.
3. **Never write to their trunk.** Adoption that requires the customer to
   restructure is a product defect, not an objection to argue past.
4. **Remove the developer, don't accelerate one.** A governed AI dev environment
   on an SDK the platform already owns is something every target buyer can build
   in-house — Q2 did, in months, on an SDK from 2018. The product is a
   non-technical tenant describing what they need and getting it.
5. **The boundary is where the risk lives.** Auth, identity, tenant scoping and
   data classification are the work and the danger, not the module body.

## Accessibility & Inclusion

WCAG AA contrast is enforced inside the generated product as a pipeline accept
condition, not a review step. Generated modules inherit it through the token
set. The studio surface itself must meet the same bar.
