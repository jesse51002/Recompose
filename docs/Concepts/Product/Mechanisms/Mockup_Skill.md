---
tags: [concept, product, mechanism, agent, design, retired]
status: retired
retired: 2026-08-12
aliases: [mockup skill, per-app mockup skill, mock asset skill]
---

# Mockup Skill

> [!warning] Retired with the [[Concepts/Product/Mechanisms/Visual_Mirror|visual mirror]] it describes
> **The idea is live and general: an agent given freedom needs a specification, not supervision.** A module generator needs one for the platform's app — what endpoints exist, what the data means, what the extension surface allows — and nothing produces it. See [[Strategy/Open_Questions|Open_Questions.md]] §2.4; Gigacatalyst built agentic API discovery to solve exactly this.

A written description of a [[Concepts/Product/Mechanisms/Visual_Mirror|Visual_Mirror]] that ships **with** it, so an agent picking the mock up knows exactly what to expect and exactly how to edit it. Porting an app into a mock is not finished when the screens render — it is finished when that description exists.

The mock is the surface an agent rewrites **freely**, and the freedom is the point. What freedom needs is not supervision but *a specification*: an agent that knows what every screen is supposed to contain can rearrange it confidently, and one that does not is guessing at both the target and the constraints.

So the skill has two halves, and one without the other fails differently.

**What the app IS.** Every asset, every screen, everything each screen must contain, and every transition between them, in plain prose. This is the accept condition — a redesign is correct when the render matches this list exactly, nothing missing and nothing added, which is what makes [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]] checkable rather than argued. An element absent from the list is an element a redesign drops unnoticed, because nothing is looking for it.

**How to edit it safely.** The conventions and failure modes particular to this mock: what the names mean, which screens are easy to confuse, which upstream sources have gone stale, and which behaviours look like bugs but are unported work. These are the things a reader cannot infer from the code, usually because the code looks correct either way.

The split is per-app because the knowledge is: general rules travel to any mock, while which screens exist and how each behaves are facts about one product. A port that writes only the general half hands the next agent a false sense of coverage.

**It is a living document by construction.** A description that has drifted is worse than none, because everything downstream trusts it — including the QA sweep that checks the render against it. On this mock a deleted file that still *described* the wrapper it used to render was enough to convince the next reader that the wrapper still existed.

## Shows up in

- `JsxMockUps/.claude/skills/production-to-mockup/SKILL.md`
- `JsxMockUps/.claude/skills/mockup-redesign-general/SKILL.md`
- `JsxMockUps/.claude/skills/mockup-redesign-combatden/SKILL.md`
- `JsxMockUps/.claude/skills/mockup-qa/SKILL.md`
- `JsxMockUps/CLAUDE.md`

## Related concepts

- [[Concepts/Product/Mechanisms/Visual_Mirror|Visual_Mirror]]
- [[Concepts/Product/Mechanisms/Screenshot_Oracle|Screenshot_Oracle]]
- [[Concepts/Product/Mechanisms/No_New_Requests_Invariant|No_New_Requests_Invariant]]
- [[Concepts/Product/Mechanisms/Tokenized_Design_System|Tokenized_Design_System]]
- [[Concepts/Product/Mechanisms/Closed_Design_To_Production_Loop|Closed_Design_To_Production_Loop]]
