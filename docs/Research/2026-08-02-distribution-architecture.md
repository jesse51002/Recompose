# Distribution Architecture

Concepts touched: [[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]].

## Decision: per-customer Apple Developer accounts

The product ships customer apps under each customer's own Apple Developer account, not under the platform's account. The customer pays the operational tax (DUNS, banking info, signing certs, $99/yr Apple fee, ongoing renewals) and the platform delivers a real native app on the App Store with the customer's name on it.

User position, locked: *"100% Apple Developer accounts on their customers and price for it. There is no other way at scale."*

## Why this and not alternatives

Apple Rule 4.2.6 (introduced June 2017, revised December 2017) legitimizes only two architectures for white-label app platforms:

1. Per-customer binaries submitted under the customer's own Apple Developer account. **This is the chosen architecture.**
2. Single-binary picker/container apps where all clients live in one shared shell.

There is no Apple-blessed third path of "platform submits hundreds of branded variants under platform's developer account."

Picker apps (option 2) preserve SaaS economics (one binary, many clients) but cap the brand-depth promise: every customer is in the same shell, branded inside it, and the App Store listing belongs to the platform, not the customer. This is fundamentally inconsistent with the [[Concepts/Business/Strategy/Brand_Is_Product|Brand_Is_Product]] thesis.

PWAs sidestep Apple 4.2.6 entirely but lose the "real native app on the App Store" pitch. They are a fallback for customers who don't want or can't manage a developer account, not the primary architecture.

Per-customer Apple Developer accounts is what Subsplash (50 of top 100 US churches), Mighty Pro (Tony Robbins, Marie Forleo), and Trainerize (400K+ trainers) all do at scale.

## Apple Developer enrollment mechanics

Apple Developer **Individual** enrollment costs $99/yr on a personal Apple ID and requires identity verification — no DUNS number, no LLC, no legal entity. **Organization** enrollment with DUNS is required only when the App Store listing must read "[Company Name] LLC" rather than the individual's name.

The customer enrolls, then grants the platform Admin or App Manager access via App Store Connect. The platform handles binary upload, code signing, App Review submission, screenshots, privacy policy, certificate renewals, and the back-and-forth on first review. The customer's own steps are identity verification, payment info, accepting the agreements, and code signing.

Each customer's app submission is a separate review process with its own rejection risk, and versioning and update rollouts are per-customer, so App Store review surface scales linearly with customer count.

Trainerize Studio CBA is $250/mo. Subsplash and Mighty Pro are $1k+/mo, with sales teams, account managers and human design service in that cost structure. Trainerize, Passion.io, Mighty Pro and Subsplash all run per-customer developer accounts.

## Open

- Self-serve onboarding tooling investment. Determines marketplace-tier contribution margin. Whether to build a polished guided-self-serve flow before launch or accept higher concierge ratio in early days. TBD.
- PWA fallback for customers who can't or won't do per-customer-binary route. May be an option for the lowest pricing tier or for international customers where Apple Developer enrollment is harder. TBD.
- Android distribution. Easier than Apple in most ways (Google Play has different policies, less restrictive on white-label), but still requires per-customer accounts for the brand-on-store-listing promise. Architecture is the same; details differ.
