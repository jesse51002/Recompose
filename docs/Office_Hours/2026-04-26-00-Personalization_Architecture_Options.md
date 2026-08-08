# Personalization Architecture Decision

**Date:** 2026-04-25
**Status:** Undecided

Concepts touched: [[Concepts/Product/Features/Personalization_Inputs]], [[Concepts/People/Coach]], [[Concepts/Business/Strategy/Layered_Architecture]].

## Context

Triggered during landing page review while discussing how to describe the post-class touchpoint and whether per-student coach feedback should be a featured product capability. The conversation expanded from a copy question into a foundational product question about how personalization is sourced.

## The Decision

How much should per-class personalization in CombatDen depend on coach action, and what personalization layers should the product support?

## Why This Decision Matters

The strategy doc states that "contextual delivery is the product, not the library itself." Different personalization architectures deliver contextual delivery in fundamentally different ways, with different tradeoffs in coach friction, member experience, engineering complexity, sales positioning, and long-term differentiation.

The decision has downstream effects on:

- Product depth (what features ship in V1 vs. later phases)
- Coach adoption requirements per gym
- Sales pitch (uniform across gyms vs. variable per gym)
- Engineering scope and complexity
- Pricing tier structure
- Long-term competitive moat

## Constraints From User Research

- Multiple interviewed coaches said "surfacing 5 students per class will make it seem like I have favorites" when pitched the original per-student feedback design.
- Coaches reported they currently track student needs mentally, by face. They do not perceive the absence of structured feedback as a current pain point.
- Combat sports gym classes are typically small (5-15 students), which limits the viability of any aggregation-based mechanism.

## Research Findings

- **Staff interactions reduce gym membership cancellations by approximately 33%.** [Source: needs citation]. This research describes in-person staff-member contact in fitness clubs. The translation rate from in-person interactions to app-mediated coach interactions (voice notes, personalized recommendations) is not directly established by the source research and would need to be validated separately.
- **Personalized content is associated with retention improvements for high-risk students.** A commonly circulated stat is "75% of high-risk students are more likely to stay with personalized content," [Source: needs citation]. The phrasing "more likely" without a magnitude makes this stat weak as a sales claim. The original source and the underlying magnitude would need to be located before relying on this for either internal decisioning or external positioning.
- **50% of new members quit within 6 months** (per the BMJ Open 2019 study cited on the landing page). Already in use.

## Options Considered

### Option 1: Per-Student Coach Feedback (Original Plan)

**Mechanism:** System surfaces 5 high-risk members per class. Coach records 30-60 second class summary plus 15 second voice note per surfaced student. AI formats and delivers personalized notes. Approximately 5 minutes coach time per class.

**Upside:**
- Maximum personalization. Members feel seen by name from their coach.
- Strongest emotional payoff in the product.
- Strongest differentiation against generic content apps.
- Difficult for competitors to replicate because it requires combat-sports-cultural understanding.

**Downside:**
- Favoritism objection raised by multiple coaches.
- Highest coach time per class. Highest adoption risk among the options.
- Single point of failure at the coach level. If a coach skips, that class's members get no feedback.
- Highest engineering complexity (surfacing logic, rotation, fairness state, per-student delivery).

**Possible mitigation for the favoritism objection.**

A proposed structural fix: rotate fairly across all students in the class, and explicitly prioritize members who have gone longest without receiving feedback. Make the rotation logic visible to coaches so they can defend it if challenged.

Concrete behavior: when a member asks "why didn't I get feedback this week?", the coach can point to the rotation queue ("Marco hasn't been surfaced in three weeks, he's next on Tuesday").

Open questions on the mitigation:
- Whether coaches trust the rotation enough to defend it transparently is untested. Worth probing in subsequent coach interviews by showing them the rotation UX.
- Whether members accept the rotation framing or still perceive favoritism in a small gym where everyone notices everything.
- Whether the rotation logic creates a different objection ("the system is picking who matters this week, not me") that replaces the favoritism objection.

### Option 2: No Per-Class Extraction (Algorithmic Floor)

**Mechanism:** No per-class action from coach or member. Recommendations are matched on inputs the system already has:
- Class type (from booking system)
- Owner-written class description (set once per class type at gym onboarding)
- Member rank and tier
- Member's prior class and content history
- "Haven't seen yet" filter for freshness

**Upside:**
- Zero per-class action required from any human.
- Zero per-class adoption risk.
- Predictable, uniform product across gyms.
- Easiest to demo and sell.
- Lowest engineering complexity for personalization.
- Ships fastest.

**Downside:**
- Drops the "tied to today's specific class" personalization layer.
- Drops the "feels seen by name" emotional payoff.
- Personalization comes entirely from the algorithm and metadata, not from human relationship.
- Differentiation reduces to algorithm quality and content library quality.
- The post-class notification slot has less to say. Reduces the emotional weight of the 24-hour notification described in the strategy doc.
- Members may notice content cycling within their class type if the library is small.

**Class-instance vs. class-type mismatch.**

A specific risk in Option 2 is the gap between class type and class instance. The class description is set per class type during gym onboarding (e.g., "Muay Thai class covers striking, clinch work, kicks, conditioning"), but any single instance of that class covers only a fraction of what the description names. One Tuesday's Muay Thai class drills teep kicks for an hour. The next Tuesday drills clinch entries. The static description treats them as the same.

Concrete member experience: a member walks out of class having drilled teeps for an hour. The app recommends a video about elbow strikes (also a Muay Thai topic, also in the description). The recommendation is technically "Muay Thai" but it has no relationship to what the member just spent an hour on.

Consequences of this mismatch:

- Any framing that implies "tied to today's class" or "tied to what your coach just taught" cannot be honestly used to describe Option 2. The product can accurately claim "Muay Thai content for your Muay Thai class" but not "content tied to what you just trained."
- Members may interpret the mismatch as the app not actually knowing what they did. The perceived value of the contextual delivery layer depends on whether the member feels the system is responsive to their experience or merely to their schedule.
- The video library either repeats (members see the same content cycling for the same class type over time) or feels arbitrary (no clear logic for why a particular video matches a particular class instance).
- Landing page copy and demo language must be precise about what is and is not tied to the class instance, or the product will overpromise relative to what Option 2 delivers.

Possible mitigations within Option 2:

- Frame all post-class recommendations at the class-type level only ("Tonight you took Muay Thai. Here's a Muay Thai video tuned to your rank"), keeping the claim accurate at the cost of softer positioning.
- Use member rank, history, and "haven't seen yet" filtering to vary recommendations within a class type, so the member at least sees fresh content even when it is not tied to today's specific drills. This approach overlaps with Option 6.
- Accept the mismatch as a known limitation of Option 2 and position the product around the layers Option 2 can deliver (class type recognition, rank-matched content, library freshness) rather than around per-instance precision.

The same mismatch is fully resolved in Option 3 (per-instance coach description), partially resolved in Option 5 (member tags reflect what was actually covered), and structurally accepted as a known limitation of Option 2 itself (the option avoids the mismatch by not making per-instance claims in the first place).

### Option 3: Per-Instance Class Description by Coach (30 Seconds)

**Mechanism:** Coach records or types a 30-second description of today's specific class. System uses that to recommend content for attendees. No per-student personalization. Approximately 30 seconds coach time per class.

**Upside:**
- Delivers contextual specificity for today's class.
- No favoritism issue. Everyone in the class gets the same content based on the same summary.
- Low coach time relative to Option 1.
- Significantly simpler to engineer than Option 1.

**Downside:**
- Still requires daily coach action.
- If a coach skips, that class's contextual layer is missing for that day.
- Coach has to remember to do it after every class.
- Mental load is real even if time cost is small.

### Option 4: New-Member-Only Personalized Feedback

**Mechanism:** Per-student feedback (similar to Option 1) but only for new members in their first ~4 weeks. After the onboarding window, personalized feedback stops for that member.

**Upside:**
- Removes favoritism within the new-member cohort. Every new member gets it equally.
- Targets the highest-leverage retention window cited in the BMJ Open study referenced in the landing page.
- Bounded coach time. Maps to onboarding workflow most gyms already run.
- Preserves differentiation.

**Downside:**
- Members at different tenures receive different product experiences.
- Members training together may compare experiences.
- Two tiers of product within the same gym.
- May feel like a downgrade as members tenure past the new-member window.

### Option 5: Member-Driven Class Tagging

**Mechanism:** After class, member is prompted to tap which topics were covered (from a class-type-specific tag list). Earns points for tagging. System uses aggregated member tags to drive content recommendations.

**Upside:**
- Eliminates coach friction entirely.
- Distributes work across many members instead of concentrating on one coach.
- Self-reinforcing engagement: tap → reward → better recs → tap more.
- Members rehearse what they learned, which has intrinsic learning value.

**Downside:**
- Members may experience the prompt as friction in an app meant to serve them.
- Notification dependency. If members don't open notifications, no input.
- Combat sports classes have 5-15 students. At low N, aggregation is unreliable.
- Brand mismatch: member app extracting data from members.
- Quality of input limited by member vocabulary, especially for new members.
- New members lack the technique vocabulary needed to tag accurately.

### Option 6: Member Goal Setting

**Mechanism:** Member sets a focus area at onboarding ("improve takedowns" / "build cardio" / "compete in 6 months"). Refreshed at natural moments such as after a promotion, after a streak, after a hiatus. System uses goal to weight between-class content (not per-class content).

**Upside:**
- Member agency without per-class friction.
- Goals are independent of class content. No disjoint risk between stated goal and actual class topic.
- Provides narrative for the 24-hour post-class notification.
- Provides a sense of "the app knows what I want."
- One-time setup plus occasional refresh, not daily.

**Downside:**
- Goals stale unless the member refreshes.
- Member must engage during onboarding. Some will skip.
- Does not replace the per-class context layer. Complements rather than replaces.
- Adds an onboarding step that may slow time-to-value.

### Option 7: Layered Architecture

**Mechanism:** Multiple personalization layers, each with different costs:

- Layer A: Type + rank + history (algorithmic, always on, no input required)
- Layer B: Member goals (cheap, one-time + occasional refresh)
- Layer C: Curriculum (gym-owner opt-in at onboarding, maps schedule to topics)
- Layer D: Coach voice notes or member tagging (high-cost, deferred until proven needed)

**Upside:**
- Floor product works without anyone doing anything.
- Each layer adds value independently.
- Layers can ship over time as the product matures.
- Different gyms can use different layers based on their preference.
- Allows shipping fast while preserving the option to grow toward a richer ceiling.

**Downside:**
- More complex architecture to manage.
- Requires deciding which layers ship in V1 versus later phases.
- Marketing the layered architecture is harder than marketing a single uniform product.
- May require gating logic to handle which layers are active per gym.

## The Underlying Strategic Question

The options above reflect two product philosophies:

**Coach-Independent Product:** Floor and ceiling are both bounded by what the algorithm + member data can deliver. Coach involvement is one-time setup or absent. Product quality is uniform across gyms.

**Coach-Leveraged Product:** Floor works without coaches. Ceiling rises with coach engagement. Better gym engagement = better product experience for that gym's members.

| Dimension | Coach-Independent | Coach-Leveraged |
|---|---|---|
| Ceiling | Bounded by algorithm + content library | Rises with coach engagement |
| Floor | Same as ceiling | Lower than ceiling |
| Validation signal | Clean (isolates product variable) | Mixed with coach engagement variance |
| Sales pitch | Uniform: "here's what your members get" | Variable: depends on coach buy-in |
| Engineering | Simpler | More complex |
| Adoption risk per gym | Low | Variable |
| Product quality across gyms | Uniform | Variable |
| Long-term moat | Algorithm + content library | Coach amplification + cultural fit |
| Combat sports cultural fit | Treats coach as setup-time actor | Treats coach as central figure |

## Open Questions

- Is the floor product (Option 2 alone) compelling enough to drive meaningful retention? Unknown without validation data.
- Will coaches actually engage with Option 3 (30-second class summary) consistently? Not yet tested with users.
- Does the small-class size constraint kill member-driven options (Option 5) outright, or only at certain class sizes? Unknown threshold.
- If shipping a layered architecture (Option 8), which layers go in V1 versus Phase 2?
- Does coach-leveraged positioning require coach involvement at all, or can curriculum (Layer C) plus goals (Layer B) deliver similar positioning ("we extend your coaches' reach") without per-class extraction?
- How much does the loss of the "feels seen by name" emotional payoff actually affect retention in combat sports specifically? Some data exists for the in-person case (staff interactions reduce gym cancellations by ~33%, see Research Findings). The translation rate from in-person staff interaction to app-mediated coach interaction is not established and would need separate validation.
- Does the favoritism objection from coach interviews extend to a curriculum-driven model, or only to per-student surfacing?

## Status

No decision has been made. Further user research, prototyping, or interviews with target gyms may be required before resolving.
