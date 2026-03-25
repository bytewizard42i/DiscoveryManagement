# AutoDiscovery.legal — Future Milestones

**Last Updated**: March 25, 2026

> Where we're going. No hard dates — we move forward when the work is **proven**, not when the calendar says so. Every new state is earned by the one before it.

---

## Guiding Principles

1. **Prove before you proceed.** No new state opens until the current batch is validated, integrated, tested, and stable.
2. **1–2 states at a time.** Depth over breadth. Each compliance packet is deeply researched, attorney-reviewed, and battle-tested before the next one starts.
3. **Build the guide as you go.** Every hurdle, workaround, gotcha, and lesson learned gets captured in the **Master Compliance Best Practices Guide** — a living document that makes each subsequent state easier than the last.
4. **Data additions, not code changes.** The architecture is modular. New states are rule pack data files plugged into an unchanged engine.

---

## The Master Compliance Best Practices Guide

> **This is not a milestone — it is an artifact that grows alongside every milestone.**

Starting with Idaho and updated with every state thereafter, this guide captures the institutional knowledge that makes compliance packet production faster and more reliable over time.

### What goes in the guide

| Section | Purpose |
|---------|---------|
| **Rule Pack Encoding Patterns** | What worked, what didn't. Naming conventions, schema patterns, edge cases in rule structure. |
| **Court Structure Mapping** | How to research and encode judicial districts, county overlays, local rules. Template for new states. |
| **Deadline Engine Gotchas** | Business day calculation quirks, holiday calendar integration issues, scheduling order override pitfalls. |
| **UPL Analysis Template** | Repeatable framework for analyzing unauthorized practice of law risk in each state. Statutes to check, safe harbor arguments, attorney memo template. |
| **Attorney Validation Workflow** | How to find, engage, and work with a local attorney to validate a state's rule pack. What to send them, what to ask, how to document sign-off. |
| **Case Type Specialization Notes** | Lessons from building med-mal, personal injury, contract, employment sub-packets. Which states have statutory quirks. |
| **Testing Playbook** | Sample cases to run through the deadline engine for each new state. Known-good expected outputs. Regression test patterns. |
| **Common State-to-State Differences** | A growing matrix of where states diverge from FRCP: interrogatory limits, response windows, deposition caps, privilege log requirements, sanctions regimes. |
| **Integration Checklist** | Step-by-step checklist for integrating a new compliance packet: encode → load → test → deploy → verify → monitor. |
| **Failure Log** | Every mistake, every misunderstood rule, every validation rejection — documented so we never repeat it. |

### How the guide evolves

- **Idaho**: The guide is born. Everything is new. Heavy documentation of first-time decisions.
- **States 2–3**: Guide gets its first real test. Patterns emerge. Template sections solidify.
- **States 4–6**: Guide becomes the primary onboarding tool. New states follow the guide, and deviations get folded back in.
- **States 7+**: Guide is mature. New state packets are produced primarily by following the guide, with occasional additions for truly novel edge cases.

---

## Phase 1 — Hackathon & Demo Day

| Milestone | Details |
|-----------|---------|
| **Demo Day presentation** | Midnight Vegas hackathon. Scripted 5-min demo: case creation → jurisdiction detection → rule loading → step generation → deadline tracking → ZK attestation. |
| **demoLand demo polished** | Smith v. Acme Corp click-path fully scripted, backup video recorded, 3 dry runs completed. |
| **realDeal "proof it's real" segment** | Brief live wallet connect + contract status check. Recorded backup ready. |
| **Contracts deployed to preprod** | All 6 contracts deployed, addresses recorded, minimal end-to-end calls verified. |
| **Build Club program completion** | All participation requirements fulfilled. Presentation delivered at Demo Day. |

---

## Phase 2 — Idaho Anchor State

> Idaho is where we prove everything. The anchor. The template. Nothing else opens until Idaho is rock-solid.

### Compliance & Legal Gates

| Milestone | Details |
|-----------|---------|
| **Spy validation pass** | Spy verifies every Idaho IRCP rule, deadline, exemption, and med-mal statutory requirement against her 20+ years of litigation experience. **Hard gate.** |
| **UPL legal memo** | Written memo from Idaho-licensed attorney confirming AutoDiscovery operates within safe harbor. |
| **ISB Ethics Opinion inquiry** | Informal inquiry to Idaho State Bar confirming no objection. |
| **Terms of Service** | ToS language affirming AutoDiscovery is a tool, not legal counsel. In-app disclaimer added. |
| **Idaho IRCP Rule Pack v1.0** | Spy-validated, production-ready rule pack for Idaho Rules of Civil Procedure. |

### Idaho Master Compliance Packet

| Milestone | Details |
|-----------|---------|
| **Idaho Master Compliance Packet** | Proprietary, deeply researched compliance packet covering all IRCP rules, 7 judicial districts, local rules, med-mal statutes, deadline computation, and sanctions. **This becomes the template for all future state packets.** |
| **4th District (Ada County / Boise) local rules** | Primary target market — highest case volume in Idaho. County-specific rule overlays. |
| **3rd District (Canyon County) local rules** | Secondary market — 2nd largest county in Idaho. |
| **6th District (Bannock County / Pocatello) local rules** | Tertiary market — ISU area. |
| **Idaho holiday calendar** | State-specific holidays for business day computation in deadline engine. |
| **Idaho med-mal compliance sub-packet** | Pre-litigation screening panel tracking, expert affidavit of merit, SOC documentation, IME workflows, HIPAA authorization tracking, medical records request deadlines. |

### Technical Completion

| Milestone | Details |
|-----------|---------|
| **Deadline computation engine** | `services/deadline-engine.ts` — converts relative deadlines from rule packs into absolute dates with business day calculations. |
| **Rule loader service** | `services/rule-loader.ts` — loads rule pack JSON, validates schema, merges county/judge overrides. |
| **realDeal providers wired** | All 12 providers connected to compiled Compact contracts + Lace wallet. |
| **End-to-end workflow test** | Create case → add steps → complete steps → generate attestation → verify proof — working on Midnight preprod. |
| **Deploy to production hosting** | Vercel/Netlify deployment. Target domains: `demo.autodiscovery.legal` (demoLand), `app.autodiscovery.legal` (realDeal). |

### Idaho Market Entry

| Milestone | Details |
|-----------|---------|
| **Idaho State Bar outreach** | Engage ISB Technology Committee. Present at bar association events. |
| **Pilot firm partnerships** | Target: 4th District (Boise) firms doing med-mal, personal injury, complex civil. |
| **Master Compliance Best Practices Guide v1.0** | First version of the guide written from everything learned building the Idaho packet. |

### Idaho Advance Gate

> **Do not proceed to the next state until ALL of the following are true:**

- Idaho compliance packet is Spy-validated and attorney-reviewed
- Deadline engine produces correct results for Idaho test cases
- At least one pilot firm is actively using the system
- No critical bugs in Idaho-specific workflows
- Best Practices Guide v1.0 is written and covers the full Idaho process

---

## Phase 3 — First Expansion: 1–2 Adjacent States

> Pick 1–2 of Idaho's immediate neighbors. Prove the template works for a second state. Update the guide.

### Candidate States (choose 1–2 at a time based on readiness)

| State | Rationale |
|-------|-----------|
| **Utah (URCP)** | Adjacent to Idaho. URCP closely mirrors FRCP. Well-documented rules. Good second state — similar enough to validate the template, different enough to test it. |
| **Washington (CR)** | Pacific NW corridor. Washington Civil Rules (CR) with distinct discovery procedures. Tests the template against a more divergent rule set. |
| **Montana (MRCP)** | Adjacent. Montana Rules of Civil Procedure. Similar to FRCP. Small bar — fast validation cycle. |
| **Wyoming (WRCP)** | Adjacent. Small bar (~2,200 members) but straightforward rules — fast validation. |
| **Oregon (ORCP)** | Pacific NW corridor. Oregon Rules of Civil Procedure. |
| **Nevada (NRCP)** | Adjacent. Growing legal market (Las Vegas). |

### Per-State Workflow (applies to every state from here forward)

1. **Research** — Gather state civil procedure rules, local court rules, court structure, holidays, relevant case law
2. **Encode** — Convert rules into structured JSON rule pack following the template established by Idaho
3. **Validate** — Local attorney in that state reviews every rule, deadline, exemption
4. **Test** — Run through deadline engine with sample cases; compare against known-good outputs
5. **Integrate** — Load into jurisdiction registry, test in demoLand, then realDeal
6. **Prove** — Run a pilot or internal test cycle; confirm accuracy
7. **Update the guide** — Document everything new: gotchas, differences from Idaho, attorney validation notes, any engine changes needed
8. **Ship** — Publish the compliance packet; open the state to users

### Advance Gate

- New state's compliance packet is attorney-validated
- Deadline engine handles the new state correctly (no regressions on Idaho)
- Best Practices Guide updated with lessons from this batch
- No critical bugs introduced

---

## Phase 4 — Wider Regional Expansion: 1–2 States at a Time

> Continue the spiral outward. Each batch is 1–2 states. Each batch follows the same workflow. Each batch updates the guide.

### Federal Baseline (build when needed for removal cases)

| Milestone | Details |
|-----------|---------|
| **FRCP Master Compliance Packet** | Federal Rules of Civil Procedure — the nationwide comparison baseline. Required when cases are removed from state to federal court. |
| **Jurisdiction switch workflow** | Automatic rule pack switching when a case moves between state and federal jurisdiction. |
| **Jurisdiction comparison UI** | Side-by-side view comparing rules across 2+ jurisdictions (interrogatory limits, response days, deposition caps). |

### Candidate States for Subsequent Batches

States are prioritized by a combination of **adjacency to existing coverage**, **market size**, and **rule complexity**:

| Priority Tier | States | Rationale |
|---------------|--------|-----------|
| **Near-adjacent** | Colorado, Arizona, New Mexico | Second ring of the spiral. Extends western coverage. |
| **Major markets** | California (CCP), New York (CPLR), Texas, Florida, Illinois | High case volume, high value. Complex rules — but by this point the guide and pipeline are mature. |
| **Mid-Atlantic & Southeast** | Ohio, Pennsylvania, Michigan, Georgia, Virginia, North Carolina, New Jersey, Massachusetts | Fill the eastern half of the map. Template-based production. |
| **Remaining states** | ~25 remaining states + DC + territories | Batch production following the mature guide. Smaller bars mean faster validation. |

### The Cadence

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Pick 1–2 states                                   │
│       ↓                                             │
│   Research & encode compliance packet                │
│       ↓                                             │
│   Attorney validation                                │
│       ↓                                             │
│   Test against deadline engine                       │
│       ↓                                             │
│   Integrate into platform (demoLand → realDeal)      │
│       ↓                                             │
│   Pilot / prove accuracy                             │
│       ↓                                             │
│   Update Master Compliance Best Practices Guide      │
│       ↓                                             │
│   Ship → open state to users                         │
│       ↓                                             │
│   Retrospective: what was hard? what was easy?       │
│       ↓                                             │
│   Loop back to top                                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Per-Batch Advance Gate (same every time)

- Compliance packet attorney-validated
- Deadline engine correct, no regressions
- Best Practices Guide updated
- No critical bugs
- Previous states still stable

---

## Phase 5 — Product Maturity & Revenue

> These features are built in parallel with state expansion, not gated by it. They ship when ready.

### Core Product Features

| Milestone | Details |
|-----------|---------|
| **E-Discovery pipeline** | ESI (Electronically Stored Information) handling with full metadata extraction. |
| **YubiKey access control** | All 3 modes: document-level, action-level gating, role elevation. Hardware key auth for sensitive documents. |
| **Full email safety workflow** | Tandem approval with N-of-M configurable approvers. Complete attachment scanning. |
| **Expert witness module** | Med-mal expert qualification attestation, W-9/I-9 workflows, HIPAA compliance, SOC documentation. |
| **AI metadata pipeline** | Real AI-assisted document parsing, entity resolution, metadata extraction for the 24 universal document categories. |
| **Compliance report export** | Court-ready PDFs with verification QR codes, attestation hash lookup, no blockchain jargon. |

### Revenue & Insurance

| Milestone | Details |
|-----------|---------|
| **Subscription launch** | Tiered pricing: Solo, Small Firm, Mid-Size, Enterprise. |
| **Error insurance product** | Legal malpractice insurance integration backed by ZK proof compliance records. |
| **Insurance underwriting API** | Insurers verify compliance attestations for E&O policy pricing — provable risk reduction. |
| **Court integration APIs** | Direct submission pathways for ZK compliance attestations to court filing systems. |

---

## Phase 6 — Ecosystem & Scale

### Protocol & Marketplace

| Milestone | Details |
|-----------|---------|
| **Rule Pack Marketplace** | Third-party jurisdiction contributions — law firms and legal tech companies publish and maintain their own rule packs. Revenue share model. |
| **AutoDiscovery Protocol standard** | Published as an open specification for the legal industry — the way discovery compliance should work everywhere. |
| **Court system partnerships** | Direct API integrations with court filing systems for automated compliance submission. |

### International Expansion

| Milestone | Details |
|-----------|---------|
| **Canada** | Provincial civil procedure rules — similar common law tradition. First international test. |
| **United Kingdom** | Civil Procedure Rules (CPR). Disclosure obligations differ from US discovery. |
| **European Union** | Member state civil procedure + GDPR data protection overlay. |
| **Australia / New Zealand** | Common law jurisdictions with established discovery procedures. |

### MidnightVitals Standalone

| Milestone | Details |
|-----------|---------|
| **npm package extraction** | `@midnight-vitals/core` — free open-source diagnostic module for any Midnight DApp. |
| **Pro Dashboard (SaaS)** | Multi-contract monitoring, alerts, analytics. |
| **Enterprise Monitoring** | 24/7 monitoring, SLA, Datadog/Grafana/PagerDuty integration. |

### DIDz Ecosystem Integration

| Milestone | Details |
|-----------|---------|
| **SelectConnect integration** | Privacy-first contact sharing between opposing counsel — progressive reveal without exposing client data. |
| **GeoZ oracle maturity** | Full privacy-preserving geolocation oracle for automatic jurisdiction detection as standalone Midnight infrastructure. |
| **KYCz integration** | Attorney identity verification — bar membership attestation without revealing personal data. |
| **DIDz identity layer** | Decentralized identity for all case participants — attorneys, experts, judges, parties. |

---

## The Spiral: Visual Expansion Map

```
                         NATIONWIDE
                    ┌─────────────────────────┐
                    │  Remaining ~25 states    │
                    │  + DC + territories      │
                    │                          │
                RING 4                         │
            ┌──────────────────────┐           │
            │  NY · TX · FL · IL   │           │
            │  + other majors      │           │
            │                      │           │
          RING 3                   │           │
      ┌─────────────────────┐      │           │
      │  CA · CO · AZ · NM  │      │           │
      │  + FRCP baseline     │      │           │
      │                     │      │           │
    RING 2                   │      │           │
  ┌──────────────────────┐   │      │           │
  │  1-2 adjacent states │   │      │           │
  │  at a time           │   │      │           │
  │                      │   │      │           │
  │  RING 1: ANCHOR      │   │      │           │
  │  ┌────────────────┐  │   │      │           │
  │  │                │  │   │      │           │
  │  │     IDAHO      │  │   │      │           │
  │  │                │  │   │      │           │
  │  └────────────────┘  │   │      │           │
  └──────────────────────┘   │      │           │
      └─────────────────────┘      │           │
            └──────────────────────┘           │
                    └─────────────────────────┘
                              │
                         INTERNATIONAL
                    (Canada · UK · EU · AU/NZ)

  Each ring = 1-2 states at a time, proven before advancing.
  The guide grows with every ring.
```

---

## Compliance Packet Revenue Model

Each proprietary regional compliance packet represents significant research, legal validation, and ongoing maintenance. These packets are a **core revenue driver** and a **competitive moat**:

| Component | Description |
|-----------|-------------|
| **State civil procedure rules** | Encoded as structured, machine-readable rule packs |
| **Local court rules** | County/district-level overlays on top of state rules |
| **Holiday calendars** | State-specific business day computation data |
| **Case type specializations** | Med-mal, personal injury, contract, employment — each with unique rules |
| **Deadline computation profiles** | Tested deadline scenarios with known-good outputs |
| **Sanctions research** | State-specific sanction case law and risk factors |
| **UPL analysis per state** | Legal memo confirming safe harbor in each jurisdiction |
| **Attorney validation attestation** | Signed-off by a licensed attorney in each state |

**Pricing consideration**: Premium states (CA, NY, TX) command higher pricing due to complexity. Smaller states can be bundled.

---

## Key Decision Points Ahead

| Decision | Trigger | Options |
|----------|---------|---------|
| **Demo Day strategy** | Before hackathon | demoLand only vs. demoLand + realDeal segment |
| **Domain acquisition** | When ready to go live | `autodiscovery.legal` — confirm availability and register |
| **First hire** | When revenue supports it | Paralegal/legal researcher to accelerate compliance packet production |
| **Funding strategy** | Post-hackathon | Bootstrap vs. Midnight Foundation grant vs. seed round |
| **Open-source vs. proprietary** | Before first paying customer | Core protocol open-source, compliance packets proprietary? Or fully proprietary? |
| **Per-state vs. subscription pricing** | Before second state launches | Charge per jurisdiction access or flat subscription with all states? |

---

*AutoDiscovery.legal — Future Milestones — John, Spy & Penny (March 2026)*
