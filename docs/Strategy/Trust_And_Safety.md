---
tags: [strategy, safety, security, marketplace, recompose]
status: living
---

# Trust and Safety

What running other people's code inside a workspace actually costs, what is promised, and what deliberately is not. The architecture this sits on is [[Strategy/Architecture_Thesis|Architecture_Thesis.md]].

**Freedom is the product position.** This page is not an argument against it. It is the list of what freedom obliges, so that nothing is promised which cannot be delivered.

---

## Why no workspace allows user HTML

The reason is named, documented, and unchanged across five years of Atlassian's own documentation. Confluence ships its HTML macro **disabled by default**:

> "Enabling these macros can make your Confluence site vulnerable to cross-site scripting attacks... We strongly recommend leaving this macro disabled if you allow self-signed up or anonymous users to create content."

And on the HTML Include macro: *"a legacy macro, and is often disabled by Confluence administrators for security reasons... You should only turn on these macros if you trust all your users not to attempt to exploit them."*

**In a multi-user document product, a page one person authors is a page another person renders.** That is the definition of stored cross-site scripting. This is not an absence nobody noticed — it is a named vulnerability class that a company with a security organisation chose to ship switched off.

**Claude Artifacts does permit user HTML, and the price it pays shows the shape of the answer:** a sandboxed iframe plus a blanket prohibition — *"NEVER use localStorage, sessionStorage, or ANY browser storage APIs."*

## The central tension

**The sandbox that makes user HTML safe is the same sandbox that stops it being a dashboard over your data.** What an artifact must do — read your tables — is precisely what the sandbox exists to prevent.

The resolution is a **capability-scoped bridge**, which is what Atlassian Forge and Shopify Functions are. The host holds the credential; the artifact talks to the host over IPC; the host makes the scoped call and returns the result. The artifact never sees a connection string.

**That single chokepoint is where the read scope is enforced, egress is logged, and the marketplace security story terminates**, which is why the IPC contract is specified before anything else is built.

## The local/shared asymmetry, and why it shrinks the problem

Execution is local. **A plugin running on your own machine in your own vault is Obsidian's model** — the user accepted the risk and the blast radius is their laptop.

So the cross-site-scripting and sandboxing work applies to the **published and shared** path, not to everything anyone authors. That is a much narrower surface than the architecture would otherwise have to bend around, and it is a real argument for the desktop decision beyond compute.

**The harder half is the shared path, because the person harmed is not the person who accepted the risk.** That is the open problem, and it is not solved by rollback.

## Freedom on public APIs, and the exfiltration path it opens

Artifacts may call any public API. This is a deliberate choice: the alternative reimposes exactly the limits the product exists to remove, and the product selects for users who accept the trade.

**The consequence, accepted rather than solved: scoped read plus unrestricted egress makes the read scope advisory rather than enforced.** An artifact granted access to one table with free outbound calls can send that table anywhere, and no permission dialog changes that. This is not hypothetical in this product class — a CodeIntegrity proof-of-concept in September 2025 demonstrated prompt-injection data exfiltration through a malicious PDF against Notion 3.0 agents.

**The mitigation that costs no capability, only opacity:** declare destinations at install time as browser extensions do with host permissions, show the user what an artifact talks to, and log the calls. The artifact may still call anything. What changes is that doing so is visible.

**What must be avoided is a permissions interface implying a guarantee it cannot make.** If the honest statement is *artifacts you install can talk to the internet, here is what this one talks to*, that is the statement to make.

## The marketplace decision, undecided and expensive to defer

Review bots, warnings and rigorous review are the intended mitigation, on the explicit analogy to code and prompts on GitHub — you cannot make everything safe, so move with caution.

**The analogy has one asymmetry that matters.** GitHub and npm survive being unsafe because nobody believes they are vetted; the trust decision is explicit and the user's. **A marketplace inside a product implies vendor endorsement.** Users reasonably assume the store checked.

So the real decision is not whether to run a review bot. It is **curated store or public index** — different user expectations, different blame when something goes wrong, different legal posture. A review bot plus warnings fits the public-index framing well and the curated-store framing badly, because curation implies responsibility was taken.

**This is free to choose now and expensive to change once users have formed an expectation.** It is undecided.

What the field shows about the cost of the curated posture: the VS Code Marketplace carries ~60,000 extensions from ~45,000 publishers with **only 1,800 publishers verified**, and the numbers are known because a security firm continuously scrapes it. Obsidian's directory ran a manual-review backlog that reached 2,300+ queued submissions before an automated system launched in May 2026 adding scanning and safety scorecards. **Review at scale becomes an organisation, not a feature.**

## What is actually promised

**Not correctness. Reversibility.**

Nothing in the surveyed field — commercial low-code, hobbyist ecosystems, browser extensions, forty years of prior art — verifies that a user-authored extension is correct. Verification, where it exists, checks policy compliance or that code loads.

The strongest safety mechanism located anywhere is Home Assistant's: **an automatic backup before every change, with rollback.** That is what this product promises. The standard is *can I undo it*, not *was it right*.

Applied consistently, that means a snapshot before an artifact runs a migration, version history on files, and presence indicators when an agent is editing — which does not prevent a clobbered edit, because nothing does, but makes one recoverable. **Turning an unsolvable correctness problem into a recoverable one is the only kind of safety available without an oracle.**

## What is not for this

Regulated work, life-critical work, and anything where being wrong is an incident rather than an inconvenience. The safety model is honest for a team's operating information and dishonest for those.

Being non-business-critical makes errors tolerable. **It does not make the security review easier** — SSO, admin controls, audit logs and data residency are required regardless, and a marketplace of third-party executable code makes that review materially harder. That is the strongest argument for sequencing the marketplace and the enterprise motion rather than shipping them together.

## The contradiction to resolve

**Owning the substrate makes generated output checkable because the contract is narrow. Free-form code from arbitrary authors is maximally unbounded.**

Both cannot be held in full. Either the extension surface is bounded enough to verify against, or it is open enough to be a marketplace of arbitrary code — and the current direction claims both. The resolution is not chosen, and choosing it is upstream of the marketplace's design rather than downstream.
