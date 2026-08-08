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

Per-customer Apple Developer accounts is what Subsplash (50 of top 100 US churches), Mighty Pro (Tony Robbins, Marie Forleo), and Trainerize (400K+ trainers) all do at scale. The architecture works.

## Operational implications

The per-customer-binary architecture creates real per-customer operational work, but the friction is more modest than earlier framing in this folder implied. Most fitness creators in the candidate ICP enroll as Apple Developer **Individual** ($99/yr, personal Apple ID, identity verification, no DUNS, no LLC, no legal entity required). Organization enrollment with DUNS is needed only when a customer wants the App Store listing to read "[Company Name] LLC" rather than the individual's name, which is a vanity choice for some buyers and irrelevant for most in this ICP.

Three things still flow into the product:

1. **Per-customer setup time, not per-customer entity setup.** The customer enrolls in Apple Developer Program (Individual or Organization), grants the platform Admin or App Manager access via App Store Connect, and the platform handles binary upload, code signing, App Review submission, screenshots, privacy policy, certificate renewals, and the back-and-forth on first review. Concierge time is real (estimated 2-4 hours per customer in early days, 30-60 minutes once tooling matures) but it is solvable engineering and support work, not a structural barrier. The product target: 70-80% self-serve via guided flows + AI support agent; 20-30% concierge support.
2. **Price band is workable at $250-300/mo, not gated above it.** Trainerize Studio CBA at $250/mo proves per-customer-binary architecture is viable at that price point. Subsplash and Mighty Pro at $1k+/mo simply have additional cost structure (sales teams, account managers, human design service) baked in. The $300/mo marketplace tier has comfortable contribution margin given the concierge math above.
3. **App Store review surface multiplies linearly with customers.** Each customer's app submission is a separate review process with potential for rejection. Versioning and update rollouts are per-customer. Maintenance burden scales with customer count. Build release tooling, automated submission flows, and per-customer status dashboards from day one so a single founder can ship a release across 50+ customer apps without it consuming a week per cycle.

## What this means for the GTM

The Apple Developer enrollment step is real paperwork the customer has to do (verify identity, provide payment info, accept agreements, handle code signing) but it is not LLC-tier friction for the candidate ICP. Individual enrollment is the default path. The platform compensates by handling everything around the enrollment (signing certs, deployment, store listing, screenshots, privacy policy, App Review interactions) so the customer's effective experience is "you sign up for the Apple Developer account, we do everything else."

This is a normal pattern in the white-label app space. Trainerize, Passion.io, Mighty Pro, and Subsplash all operate this way and several charge less than $300/mo while doing it. The friction is not a unique competitive disadvantage; it is the price of admission for the "your real native app on the App Store" promise, and the price has been validated as workable by every incumbent in the space.

## Open

- Self-serve onboarding tooling investment. Determines marketplace-tier contribution margin. Whether to build a polished guided-self-serve flow before launch or accept higher concierge ratio in early days. TBD.
- PWA fallback for customers who can't or won't do per-customer-binary route. May be an option for the lowest pricing tier or for international customers where Apple Developer enrollment is harder. TBD.
- Android distribution. Easier than Apple in most ways (Google Play has different policies, less restrictive on white-label), but still requires per-customer accounts for the brand-on-store-listing promise. Architecture is the same; details differ.
