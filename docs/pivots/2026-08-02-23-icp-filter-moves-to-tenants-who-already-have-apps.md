# The ICP filter moves from "runs a design service" to "every tenant already has an app"

**Date decided:** 2026-08-02
**Status:** Decided

---

## The decision

The qualifying filter for a target platform changes from **"already runs a design service"** to **"every tenant already has their own branded app,"** and the cost-reduction half of the value argument is retired — what survives is capacity and delivery time.

## What it pivots from

P1a, decided 2026-07-27: the sharpest wedge is a platform already running a design service, because it can read the value off a P&L — "a headcount line, a per-customer cost, and a delivery time to compare against." Target list led by Mighty Pro, Passion.io, Subsplash and BentoBox.

## What it pivots to

Target platforms with **no shell tier**, where every tenant is provisioned with their own app, so the population of redesignable apps equals the tenant count. Pitch **capacity and elapsed delivery time**, never cost savings. Subsplash, Passion.io, Q2, Banno and Alkami are the named candidates; Subsplash fits best.

## Why

**The headcount line does not exist.** Circle's design department is ~4 people out of ~160 and its own job postings describe it as the internal *marketing* design team. Vagaro's design service is a $499 flat fee. ABC Trainerize prices the same class of deliverable standalone at $99–169 one-time. Professional services is 1.19% of revenue at Olo and 2.9% at Toast, and Olo's management stated they would rather upsell platform modules than grow it. There is not enough cost in a design service to build a cost-savings pitch on.

**The tier price is not a design price.** Mighty Pro's premium tier lists six deliverables and design is one — migration of members, courses and payments; a Community Design™ Plan built on 450+ businesses; setup; design services; a membership; ongoing reporting. The dedicated Community Strategist's published responsibilities are workshops, content cadence, member onboarding flows and email sequences. The tier is priced on the customer's business scale, not on any deliverable's cost.

**Attach rate on a shell tier is 0.1–3%, and it tracks tenant size.** Independently measured on Shopify: 1.73% of 74,777 Plus stores run Tapcart, 0.10% of 802,852 stores overall, and 88.2% of app-builder stores are on Plus against 43.7% of stores overall. Adoption spans at least 70× across the tenant-size range inside one platform at one price. A platform's tenant count is therefore not its addressable app count — on a shell model it is a small fraction of it, and compressing design cost does not move a tenant who was never going to buy the tier.

Full reasoning, the evidence tables, the discarded alternatives and the two rejected mid-session positions are in the office hours doc below.

## Office hours doc that explored this

`Office_Hours/2026-08-02-23-Office_Hours_Attach_Rate_And_The_Design_Service_Wedge.md`

Underlying research: `Research/2026-08-02-features-vs-design.md`, `Research/2026-08-02-why-custom.md`, `Research/2026-08-02-attach-rate.md`, `Research/2026-08-02-enterprise-tier-anatomy.md`, `Research/2026-08-02-incumbent-design-delivery.md`; synthesised in `Design_vs_Feature_Work.md` and `Build_vs_Buy.md`.

## What this does not change

The product is untouched. The mechanism, [[Full_Visual_Redesign]], [[No_New_Requests_Invariant]], never writing to the platform's trunk, read access as the whole integration, UAT as the landing branch, the autonomy promise and the halt-rather-than-ship property all stand. Pricing remains undefined. This is a change in the evidence under the value argument and in the qualifying filter, not in what is being built.

[[No_New_Requests_Invariant]] is in fact **strengthened**: 13 of 19 platforms researched have no path by which a tenant gets net-new functionality at any price, so "no new features" is the answer the platform already gives its own tenants rather than a constraint Recompose imposes.

## Downstream impact

- `Customer_ICP.md` — rewrite P1a around delivery time and capacity; re-label the named-examples table as tier prices rather than design-service prices; correct the "gated by how many designers you can hire" claim; reframe "the person whose team is being replaced is usually in the evaluation"; reorder the target list.
- `Recompose_Summary.md` — the "premium tier they cannot staff" and "capped by how many designers can be hired" claims.
- `Architecture_Thesis.md` — the "in-market prices are visible" passage conflates tier price with design price.
- `YC_Application_F26.md` — the 20% upgrade-rate benchmark, in the working notes only. The submitted answers are historical record and are not edited.
- `Open_Questions.md` — reframe the hostile-evaluator risk; add T15–T18.
- `Journey.md` — new Phase 6 addendum. Not a retroactive edit.
- `Competition.md` — in-platform design services as "the direct alternative" needs the tier-bundle correction.
