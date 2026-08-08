---
name: writing-x-posts
description: Review, sharpen, brainstorm, generate, or finalize X (Twitter) posts for Jesse's CombatDen build-in-public account. Use this skill whenever Jesse drafts a tweet/thread/post, asks "is this good?", wants ways to phrase something for X, wants feedback on a social post, asks what to post today, confirms he posted something (so the file moves from ideas/ to posted/), or when a scheduled task needs to generate today's posts. Pulls recent CombatDen pivots and office hours so output is grounded in what's actually being built. Trigger aggressively on anything tweet/X/post/social-shaped, even when not explicitly named — Jesse posts daily and most X-related asks benefit from this skill's judgment.
---

# Writing X Posts — CombatDen, build-in-public

This skill helps Jesse run a daily X account for CombatDen. The account exists for four reasons he's stated: don't build in a vacuum, grow an audience that's useful for fundraising, surface ideas from comments, and have fun. Every interaction with this skill should serve those — not generic "Twitter growth" goals.

## Format: single posts only

CombatDen's X account uses **single posts, never threads.** Every output of this skill is one post, not a numbered series. If a story or argument is long, it lives in one post with line breaks for rhythm — not split across `1/`, `2/`, `3/` tweets.

This is a deliberate choice. Threads work for accounts already in front of an audience; single posts read cleaner cold, demand less commitment to start, and force tighter phrasing.

## Concise phrasing (load-bearing)

This is not a word-count rule. It's a phrasing-and-readability rule. Less is more.

Even a long post should read in short, scannable beats. Each sentence does one job. Each line break creates a rhythm gap so the reader's eye lands easily. No throat-clearing, no transitional fluff, no qualifiers that don't earn their place.

A useful test: read the post aloud. If you have to pause for breath inside a sentence, it's too long. If two sentences could be one sharper sentence, collapse them. If a phrase doesn't add information or rhythm, cut it.

The goal is not "short post." The goal is "post where every line carries weight."

## Folders

Three folders under `socials/twitter/`:

- **`ideas/`** — the inbox. Every post the skill generates lands here as a single file (`YYYY-MM-DD-<theme-slug>.md`). Hand-written drafts also live here until they ship. Multiple files per day are normal.
- **`posted/`** — confirmed shipped posts. When Jesse confirms he posted something on X, the corresponding file moves from `ideas/` into `posted/`. This becomes the canonical record of what's actually been said publicly.
- **`what_worked/`** — Jesse's signal of which past posts got real traction (engagement, replies, follows, investor DMs, whatever signal Jesse cares about). Jesse populates this manually based on actual performance. The skill READS from this folder to inform Generate mode but doesn't write to it — the user owns that signal.

## Four modes

- **Review mode** — Jesse has a draft post. The skill reviews, suggests changes only when they materially help, writes the final to `ideas/`.
- **Brainstorm mode** — "What should I post today?" / "give me angles on Y." The skill mines recent vault activity and proposes 3–5 angles (seeds + hooks, not full drafts).
- **Generate mode** — A scheduled task or Jesse explicitly asks for "today's 3 posts." The skill produces three ship-ready single posts in `ideas/`, each with a specific role (see Generate mode below).
- **Confirm mode** — Jesse says "I posted X" / "I shipped the design-not-features one" / similar. The skill moves the corresponding file from `ideas/` to `posted/`.

If which mode applies isn't obvious, ask one short question. Don't guess.

## Four operating principles

### 1. Honesty rule (load-bearing)

When a post is already good, say so. Don't fabricate weaknesses. Don't suggest edits to look helpful — it wastes Jesse's time and erodes trust in the skill.

A post is good when it passes the rubric below. If it does, say "this is good, ship it" and finalize. If it doesn't, name which dimension is off and offer **2–3 alternative phrasings or fixes** — not one, because seeing options helps Jesse choose rather than just accept what's offered.

### 2. Repetition rule (loose by design)

Repeating yourself is fine, often correct. Build-in-public means circling the same ideas as they evolve, and finding what works means doubling down on what's worked.

The rule is simple:

- **Reframes are encouraged.** Same idea, new angle / new evidence / different framing / new lesson — ship it. Doesn't matter if you've said something close before. The reader on X today is not the reader on X last week.
- **Building on a proven angle is encouraged.** If something in `what_worked/` resonates, lean into it. New posts can extend, riff on, or directly cite an angle that's gotten traction.
- **Only literal copy-paste is bad.** Word-for-word reposting of an existing post is the only thing that's actually a problem. Anything that adds even a small reframe, new line, or fresh evidence is fine.

The duplicate check during review is just: "is this the same words as something already in `posted/` or `ideas/` from the last 7 days?" If yes, change at least one phrasing; the post can keep the same idea. If no, ship it.

### 3. Inform, don't pitch (load-bearing)

Most posts share insight, story, or info. They are not advertisements for the product.

Talking about what Jesse is building is good, often valuable — it's part of what makes him different from the average build-in-public account. But every post should NOT turn into a pitch. The goal is to grow Jesse the person and the audience around him, not to sell the product in every post.

The line:

- **Good**: insight, story, or framework → casually mention his work as the reason he cares about the topic, or as the place he ran into it. Reader gets value, learns something about Jesse along the way.
- **Bad**: "Here's a problem → here's the solution my product offers → here's why it's better than competitors X, Y, Z." Reader feels sold to. Even if every individual sentence is true, the post-shaped-as-pitch is what to avoid.

A useful self-check: would a reader who doesn't know Jesse's product walk away with something useful? If yes — insight, framework, story, observation — the post is doing its job. If the only payoff is "now I know what Jesse sells," cut back.

Personal connection lines like *"this is why I started making X"* or *"this came up while I was figuring out Y"* are the right level of product mention. Sales-pitch lines like *"here's how my product solves it"* or *"this is what makes mine better than [competitor]"* are not.

Mentioning competitors by name is fine when they're examples, not when they're targets to beat in a sales comparison.

### 4. Voice

CombatDen's X voice is founder-not-corporate, specific-not-abstract, conversational-not-performative. Real numbers, real moments, named decisions. If the draft sounds like LinkedIn, that's a flag. If it sounds like a confident peer telling a story over coffee, that's the target.

Avoid: corporate hedges ("I'm excited to share…"), em-dash-heavy rhythm that reads as AI, generic productivity-Twitter aesthetics that don't match the gym / combat-sports world Jesse's actually building in.

#### Plain language, not business jargon (load-bearing)

Jesse is a story person, not a business expert. People respond to plain, concrete words and specific mechanics — not MBA vocabulary. Reaching for business jargon makes a post land less, not more.

These words are fine in office hours docs and pivot docs. They are NOT fine in posts:

- `moat`, `TAM`, `ACV`, `unit economics`, `contribution margin`, `runway`, `verticalization`
- `white-labeled`, `multi-tenant`, `orchestration layer`, `cross-modal coherence`, `modality`
- `B2B2C`, `SaaS positioning`, `compressed-labor layer`, `commoditized`
- `leveraging`, `scaling`, `unlocking`, `enabling`, `surfacing`

Plain replacements:

- "moat" → describe what makes it hard to copy directly, or skip the word
- "white-labeled apps" → "customizable apps for businesses" (Jesse's own phrasing)
- "unit economics" → the actual numbers ("$100/mo, 10 hours of my time per customer")
- "orchestration layer" → what it does ("AI fits the design to each brand in less than a second")
- "TAM" → "the market" or skip if obvious

**Concrete mechanics beat abstract claims.** Compare:

- ❌ "AI orchestrates cross-modal coherence across the brand identity."
- ✅ "AI makes/fetches custom animations that fit the business's brand in less than a second."

The first is jargon a reader can't picture. The second is something they can. The second wins every time.

The test: would Jesse say this exact sentence to a friend over coffee? Or would he only say it in a pitch deck? If it's deck-only, rewrite it.

### Hashtags (growth-stage rule)

Jesse is at 0 followers and needs discovery surface. So **every post gets exactly 2 highly relevant hashtags**, placed at the end of the post.

Selection rules:

- **`#buildinpublic` is the default first tag.** It plugs into a small but high-quality community of indie founders who actively browse the tag, retweet each other, and are watched by investors.
- **Swap `#buildinpublic` for a niche-specific tag when the niche fits the post better than the build-in-public framing.** If a post is fundamentally about fitness tech, SaaS positioning, UX/design, or another tight niche where the actual ideal reader hangs out, lead with that.
- **Second tag** is the most specific tag that captures the post's content audience.
- **Exactly 2.** Three or more triggers spam-pattern de-prioritization. One leaves discovery surface on the table at this stage.
- **No noise tags.** Avoid `#startup`, `#entrepreneur`, `#motivation`, `#hustle`, `#growth` — they don't pull in audiences who actually read.

Once the account has real follower momentum, hashtag count can drop back toward zero. Until then, two relevant tags is non-negotiable.

## The rubric

Use this in review mode (and to self-check Generate-mode output before saving). Each dimension is a yes/no.

1. **Hook** — Would a stranger scrolling X stop on the first line? Concrete, specific, with tension or a twist. See `references/hooks.md` if the hook needs work.
2. **One idea** — One clean thought, one through-line. Even a long single post should be reducible to a one-sentence summary.
3. **Specificity** — Real numbers, real moments, named decisions. Not vague abstractions.
4. **Voice + not a pitch** — Sounds like Jesse, not like a brand. Shares insight or story; doesn't read as a sales pitch for the product. Personal connection ("this is why I started making X") is welcome; product-pitch shape ("here's how my product solves this and why it beats competitor Y") is not. See "Inform, don't pitch" principle above.
5. **Payoff** — Reader leaves with something useful even if they ignore the product mention: an insight, a story arc, a laugh, a frame they didn't have before.
6. **Concise phrasing** — Every line earns its place. No throat-clearing. See Concise phrasing principle above.
7. **Not a literal copy** — Not word-for-word identical to an existing post in `posted/` or `ideas/` from the last 7 days. Reframes of the same idea pass this.
8. **Hashtags** — Exactly 2 relevant hashtags at the end. `#buildinpublic` default first, swap for a niche tag if it fits better.

**All 8 pass:** say so plainly, finalize, write to its own date-slug file in `ideas/`.
**1–2 fail:** name which, offer 2–3 fixes or reframes.
**3+ fail:** the underlying idea probably isn't ready — switch to brainstorm mode and surface adjacent angles.

## File naming

Each post lives in its own file. Filename format:

```
YYYY-MM-DD-<theme-slug>.md
```

Examples:
- `2026-05-02-the-third-option.md`
- `2026-05-02-design-not-features.md`
- `2026-05-02-peak-end-bet.md`

Same convention applies in `ideas/`, `posted/`, and `what_worked/`. The filename moves with the file when it gets confirmed (`ideas/` → `posted/`).

### Slug rules

- **Kebab-case**, lowercase, words separated by hyphens.
- **2–4 words**, descriptive enough that the filename alone tells you what the post is about.
- **Derived from the post itself.**
- **Not generic.** Avoid "draft", "daily", "post".
- **Unique within `ideas/`.** Two posts in the inbox shouldn't share a slug; sharpen one.

## Workflow

### Step 0 — Look around for relevant context (past 7 days only)

Don't load the whole vault. Don't load months of history. Browse what's recent.

- **`Business/Office_Hours/`** — list the folder. Open files from the **last 7 days**. Older sessions are usually noise for the day's posting work.
- **`Business/pivots/`** — same. Open pivots from the last 7 days. (If a pivot from earlier is directly referenced by a recent office hours, follow that link, but don't preemptively load older pivots.)
- **`socials/twitter/ideas/`** — list and skim recent files for the duplicate check.
- **`socials/twitter/posted/`** — list and skim files from the last 7 days. This is what's been said publicly recently.
- **`socials/twitter/what_worked/`** — read the entire folder. This is the signal of what resonates; it's almost always small enough to read in full.

Skip `Concepts/` unless a specific term in a draft needs disambiguation.

The principle: read enough to be grounded in what Jesse's currently doing and what's currently working, not the whole archive.

### Step 1 — Identify the mode

- **Review** — Draft pasted in.
- **Brainstorm** — "What should I post today?" / "give me angles on Y."
- **Generate** — Scheduled task, OR Jesse says "generate today's 3 posts."
- **Confirm** — Jesse says "I posted X" / "shipped the design-not-features one" / similar.

### Step 2a — Review mode

1. Run the rubric. Be honest.
2. Run the literal-copy check against `ideas/` and `posted/` from the last 7 days. Reframes pass; only word-for-word reposts fail.
3. Cross-check claims against the vault. If the post says CombatDen does X but a recent pivot says CombatDen now does Y, flag it before finalizing — pivots are the source of truth.
4. If all 8 rubric points pass: say "this is good, ship it" and write it to `socials/twitter/ideas/YYYY-MM-DD-<theme-slug>.md`.
5. If 1–2 fail: name them, offer 2–3 alternative phrasings or fixes. Iteration happens in conversation, not in the file. Once Jesse picks a final, write that to `ideas/`.
6. If 3+ fail: explain why the idea isn't landing yet, propose 2–3 reframes from recent vault activity. Don't write to `ideas/` until the post is ship-ready.

### Step 2b — Brainstorm mode

1. From recent (last 7 days) office hours / pivots, pick 3–5 angles that haven't been posted recently.
2. For each angle, give exactly:
   - **Seed** — 1 sentence on the idea.
   - **Why it lands** — 1 sentence on the tension or specificity.
   - **Hook draft** — 1 line.
3. Don't draft full posts upfront. Let Jesse pick an angle, then move into review mode on whatever he writes.

### Step 2c — Generate mode

This is what the daily scheduled task uses. Output is **three ship-ready single posts** in `ideas/`, each with a specific role:

- **Post 1 — Fresh angle from this week.** Pick the strongest unposted angle from the last 7 days of office hours / pivots. Write it as a single post.
- **Post 2 — Riff on what's working.** Read `what_worked/`. Pick one of the angles in there and extend, reframe, or build on it. Same idea is fine if there's any new framing, evidence, or follow-up. The point is to lean into proven angles, not avoid them. If `what_worked/` is empty (the account is too new for traction signal yet), make this slot a second fresh angle and note that in the file.
- **Post 3 — Forward tie to a past post.** Look at `posted/` (any time, but especially the last 30 days). Pick a past post and write a follow-up: a new insight on it, a reversal ("I was wrong about X"), additional value, a what-happened-next, or an evolution of the original idea. The post should be standalone-readable but explicitly carrying a thread of thought from a past post forward.

For each of the three:

1. Write the post in CombatDen voice, single post format, line breaks for rhythm.
2. Self-check against the rubric. If it fails 3+ points, replace it.
3. Pick a kebab-case 2–4-word slug.
4. Add 2 hashtags per the hashtag rule.
5. Determine today's date in `YYYY-MM-DD` format using local time.
6. Write `socials/twitter/ideas/YYYY-MM-DD-<slug>.md` per the post-file template.
7. In `## Notes`, record the post's role (Fresh / Riff / Forward-tie) and source: which office hours / pivot / `what_worked` post / `posted` post it drew from.

### Step 2d — Confirm mode

When Jesse confirms a post shipped:

1. Identify which file in `ideas/` he's referring to. If unclear, list the files and ask.
2. Move the file from `ideas/` to `posted/`. Filename stays the same.
3. Confirm to Jesse with the new path.
4. Don't touch `what_worked/` automatically — Jesse populates that based on real-world signal, not just shipping.

### Step 3 — Write the post file

Each finalized post lives in its own file. The file IS the post.

If a file with the same date+slug already exists, don't overwrite — pick a different slug.

#### Post-file template

```markdown
---
tags: [x-post, social, build-in-public]
date: YYYY-MM-DD
slug: <theme-slug>
---

# <one-line label or hook>

<the post content — a single post, never a thread. Use line breaks freely for rhythm. The 2 hashtags go at the end. Whatever Jesse would actually publish, exactly as it should appear on X.>

## Notes
<!-- Generate-mode role (Fresh / Riff / Forward-tie) if applicable, plus source: office hours / pivot / what_worked / posted reference -->
```

## CombatDen-specific guardrails

- **Don't mischaracterize decisions.** If a post claims CombatDen does X but a recent pivot says otherwise, flag it before finalizing. Pivots are the source of truth.
- **Use vault vocabulary when it fits.** Don't put `[[Two_Pillars]]` in a tweet, but say "two pillars" the way the vault says it.
- **Don't invent metrics or stories.** If Jesse hasn't actually done a thing, don't write a post claiming he has.
- **Founder voice ≠ unfiltered.** Slightly raw is good. Sloppy or unkind is not.

## References

- `references/hooks.md` — generic hook patterns. Useful when the hook is weak. Voice in these examples is generic; CombatDen voice should be sharper.
- `references/examples.md` — generic single-post and thread examples. Use the single-post examples for shape; ignore the thread examples (CombatDen does single posts only).

## Quick checklist

**Review mode:**
1. Did I look at the last 7 days of office hours, pivots, ideas, and posted?
2. Did the post pass all 8 rubric dimensions, honestly?
3. Did I run the literal-copy check (not the broader near-duplicate check — reframes are fine)?
4. If suggesting changes, did I offer 2–3 options, not one?
5. Did the finalized post land in `ideas/`?

**Generate mode:**
1. Did I look at last 7 days of office hours / pivots / posted / ideas, and read `what_worked/` in full?
2. Does each of the 3 posts fulfill its role (Post 1 fresh, Post 2 riff on what worked, Post 3 forward tie to past)?
3. Did each post self-pass the rubric (or get replaced)?
4. Distinct kebab-case slugs?
5. Each post in its own file in `ideas/`, with role + source noted in `## Notes`?

**Confirm mode:**
1. Did I correctly identify which `ideas/` file Jesse meant?
2. Did the file move to `posted/` with the same filename?
