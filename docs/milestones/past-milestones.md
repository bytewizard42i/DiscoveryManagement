# AutoDiscovery.legal — Past Milestones

**Last Updated**: March 25, 2026

> A record of what has been accomplished since the project's inception. Every milestone listed here is **done**.

---

## Phase 0 — Project Genesis (January 2026)

| Date | Milestone | Details |
|------|-----------|---------|
| **Jan 11, 2026** | **Initial commit** | Repository created at `SpyCrypto/AutoDiscovery`. First commit: "AutoDiscovery - GeoOracle Auto Compliance for Legal Discovery." |
| **Jan 11, 2026** | **Team formation** | Spy ([@SpyCrypto](https://github.com/SpyCrypto)) onboarded as domain expert and co-founder. Spy's full bio, team dossier, and role (20+ yr Idaho complex litigation paralegal) documented. |
| **Jan 11, 2026** | **MeshJS/Edda starter template** | Scaffolded initial project skeleton using Midnight starter template. `PROJECT_OVERVIEW.md` created. |
| **Jan 11, 2026** | **AutoDiscovery logo** | First brand asset added to `media/` folder. |
| **Jan 11, 2026** | **John's fork established** | Second remote (`john` → `bytewizard42i/autoDiscovery_legal`) set up for dual-push workflow. |

---

## Phase 1 — Research, Ideation & Build Club (February 2026, Weeks 1–2)

| Date | Milestone | Details |
|------|-----------|---------|
| **Feb 5, 2026** | **Build Club Week 1 homework** | Customer Analysis Matrix completed — evidence tags, WTP analysis, 15 sourced references, glossary. |
| **Feb 5, 2026** | **6-jurisdiction deep dive** | Idaho, Utah, Washington, California, NYC, Ohio — UIDDA interstate rules, 20 automation metrics, 10 innovation ideas. |
| **Feb 6, 2026** | **Idaho "Hall of Shame" case research** | Verified real sanction cases: Gem State Roofing, Raymond v ISP, Sanders v UI, Erickson v Erickson. Kohberger 68TB discovery chaos documented. |
| **Feb 6, 2026** | **Project overview with legal/tech imagery** | Visual overview added by Spy. |
| **Feb 7, 2026** | **Rebranded to AutoDiscovery.legal** | Title rebrand from generic "AutoDiscovery" to "AutoDiscovery.legal" across all docs and PDF exports. |
| **Feb 10, 2026** | **Idaho-first strategy decided** | Archived Ohio research to `docs/reference/`. Restructured docs to make Idaho the anchor jurisdiction. |
| **Feb 10, 2026** | **Build plan + Grok review** | `BUILD_PLAN.md` created. Cross-LLM architecture review conducted with Grok for validation. |
| **Feb 10, 2026** | **Spy collaboration workflow** | Spy response files, accuracy checklists, and malpractice insights documented. |
| **Feb 11, 2026** | **6-entity TypeScript data model** | Phase 0.3 complete — strongly-typed interfaces for Case, DiscoveryStep, JurisdictionRulePack, Document, Party, ComplianceAttestation (`autodiscovery-contract/src/types/`). |
| **Feb 11, 2026** | **Smart contract scaffold** | All `.compact` files created with witness file stubs in `autodiscovery-contract/src/contracts/`. |
| **Feb 11, 2026** | **Idaho IRCP rule pack** | First jurisdiction data file created — Idaho Rules of Civil Procedure encoded as structured JSON. |
| **Feb 11, 2026** | **Pitch fodder v2** | Deep dive merge — shock & awe stats ($8.5M sanctions, 38K NYC dismissals, $30B/yr cost), one-pager, 1000-word synopsis. |
| **Feb 11, 2026** | **Adoption strategy + interaction log** | Go-to-market strategy and decision history tracking begun. |

---

## Phase 2 — Pitch Deck & Brand Building (February 2026, Weeks 2–3)

| Date | Milestone | Details |
|------|-----------|---------|
| **Feb 15, 2026** | **Idaho statute of limitations details** | Spy validated and updated SOL documentation. |
| **Feb 16, 2026** | **8 demoLand UI features** | Sunday night upgrades — significant frontend feature push. |
| **Feb 16, 2026** | **README glow-up** | Logo, badges, architecture diagram, feature highlights, doc index, team cards, email safety showcase. |
| **Feb 16, 2026** | **Banner infographic** | "The Cost of Discovery Failure" infographic added to README. |
| **Feb 16, 2026** | **GeoZ architecture decoupled** | Jurisdiction determined by filing court, not geolocation oracle. GeoZ spun out as separate project (GeoZ.us / GeoZ.app). |
| **Feb 16, 2026** | **Jurisdiction ordering finalized** | ID → UT → WA → CA → NYC → OH. |
| **Feb 17, 2026** | **Build Club Week 3 pitch deck** | 13-slide HTML deck created + 3-minute video script with recording checklist. |
| **Feb 17, 2026** | **Elephant brand mascot** | Elephant-themed slides (elephant-sanctions, pink elephant, smarty elephant, ADL elephant) integrated into pitch. |
| **Feb 18, 2026** | **VC portfolio insights** | Fundraising strategy derived from OpenVC article, applied to ADL positioning. |
| **Feb 18, 2026** | **Spy's deck tweaks** | Vision line break, handle removal, ZK Proof card dropped, 3-column pricing, PDF regenerated. |
| **Feb 19, 2026** | **PDF regeneration pipeline** | Puppeteer-based PDF generation script (`docs/generate-pdf.mjs`) established for reproducible deck exports. |

---

## Phase 3 — White Paper, Contracts & Frontend (February 2026, Weeks 3–4)

| Date | Milestone | Details |
|------|-----------|---------|
| **Feb 20, 2026** | **White Paper draft** | Full autoDiscovery.legal White Paper published in `docs/product/`. |
| **Feb 21, 2026** | **4 core contracts compile** | `discovery-core`, `jurisdiction-registry`, `compliance-proof`, `document-registry` all compile with Compact 0.29.0 (pragma `>= 0.20`). Syntax fixed for real Compact language. |
| **Feb 21, 2026** | **All 6 contracts compile** | `access-control` and `expert-witness` contracts compiled. **Full 6-contract suite compiling.** |
| **Feb 21, 2026** | **Full demoLand UI built** | Dashboard, Case View, Login, Search, Compliance, Settings — all pages with mock providers. |
| **Feb 21, 2026** | **Physically separated realDeal frontend** | `frontend-realdeal/` created as separate Vite+React app with Lace wallet integration plumbing. |
| **Feb 21, 2026** | **"What It Means to Deploy" doc** | Beginner-friendly explainer for Midnight deployment process. |
| **Feb 22, 2026** | **MidnightVitals v0.1.0** | Real-time diagnostic console created — monitors wallet, proof server, contracts, network. |
| **Feb 22, 2026** | **MidnightVitals rapid iteration** | v0.1.0 → v0.3.8 in one day: granular CLI logging, scroll hints, card layout settings, slim horizontal monitor bar, floating panel mode, interaction tracking hook. |
| **Feb 22, 2026** | **MidnightVitals integrated into ADL** | Kill-switch design documented — vitals panel embedded in AutoDiscovery frontend. |
| **Feb 22, 2026** | **Edge Slide pitch strategy** | Competitive edge positioning slides created by Spy. |
| **Feb 23, 2026** | **Pitch deck v3** | 13-slide deck with Edge slide, pricing overhaul, visual refinements. Multiple script iterations. |

---

## Phase 4 — Business Docs, Investor Materials & demoLand/realDeal Architecture (Late February 2026)

| Date | Milestone | Details |
|------|-----------|---------|
| **Feb 25, 2026** | **Investor & VC Roadmap** | Full investor roadmap with market sizing, financial projections, and exit strategy. |
| **Feb 25, 2026** | **Docs reorganization** | Docs restructured into logical subfolders: `pitch/`, `architecture/`, `product/`, `team/`, `business/`. |
| **Feb 25, 2026** | **Starter template cleanup** | Removed starter template PNGs, purged 16 Zone.Identifier artifacts. |
| **Feb 25, 2026** | **Frontend renamed** | `frontend-vite-react` → `frontend-demoland-vite-react` to clarify the demoLand/realDeal split. |
| **Feb 25, 2026** | **Document-registry ZK keys** | Placeholder ZK keys added for `verifyTwinBondIntegrity`. |
| **Feb 25, 2026** | **ADL Next Steps roadmap** | Beginner-friendly next steps roadmap added (`docs/ADL_NEXT_STEPS.md`). |
| **Feb 26, 2026** | **4 contract fixes** | Constructor fixes, `disclose()` corrections, ledger refactoring, recompile. |
| **Feb 28, 2026** | **State Rollout Strategy** | Comprehensive state-by-state launch strategy: Idaho anchor → UT → WA → NV → WY → MT → CA → NY → remaining US. |
| **Feb 28, 2026** | **Pricing Analysis** | Detailed ROI calculations per firm size, competitive pricing comparison, value-based pricing models. |
| **Feb 28, 2026** | **Law Firm Market Research** | Verified benchmarks for pricing, marketing, and go-to-market strategy. |
| **Feb 28, 2026** | **Idaho Phase 1 deep expansion** | Deep IRCP rule mapping, 7-district court structure, UPL analysis, med-mal statutes, local rules, data privacy. |
| **Feb 28, 2026** | **Multi-state expansion docs** | Phases 2–7 expanded: deep rule mapping and court structure for UT, WA, CA, NY, OH, TX, FL, IL + 40-state batch model + FRCP. |

---

## Phase 5 — Provider Pattern, CI/CD & Contract Hardening (March 2026)

| Date | Milestone | Details |
|------|-----------|---------|
| **Mar 2026** | **demoLand/realDeal provider pattern** | Full provider architecture implemented: 12 provider interfaces (IAuthProvider, ICaseProvider, IDocumentProvider, IComplianceProvider, IAIProvider, IContactsProvider, IJurisdictionProvider, IAccessControlProvider, IExpertWitnessProvider, IEmailSafetyProvider, ISearchProvider). |
| **Mar 2026** | **demoLand mock providers** | Complete mock implementations with realistic demo data — "Smith v. Acme Corp" Idaho med-mal case, case contacts, jurisdictions. |
| **Mar 2026** | **realDeal provider stubs** | All realDeal providers scaffolded with Midnight contract integration points — `real-auth.ts`, `real-case.ts`, `real-document.ts`, `real-compliance.ts`, `real-contacts.ts`, `real-jurisdiction.ts`, `real-access-control.ts`, `real-expert-witness.ts`, `real-email-safety.ts`, `real-ai.ts`. |
| **Mar 2026** | **Chain reader for discovery-core** | `discovery-core-reader.ts` implemented in realDeal providers for on-chain state reading. |
| **Mar 2026** | **Storage layer** | `adl-storage.ts` and `case-storage.ts` created for realDeal persistence. |
| **Mar 2026** | **Email Safety Protocol UI** | 4-tier threat levels (SAFE/CAUTION/DANGER/CRITICAL), recipient auto-detection, attachment metadata scanning — fully built in demoLand. |
| **Mar 2026** | **Case Contact Management UI** | Team-based contacts, star precedence ratings, connected-contact highlighting, drag reorder. |
| **Mar 24, 2026** | **Search scoping** | Document search results scoped to authenticated user's accessible cases (`allowedCaseIds` filter). |
| **Mar 24, 2026** | **Jurisdiction panel refactor** | Jurisdiction rules panel moved from inline sidebar to dedicated `/reference` page. |
| **Mar 24, 2026** | **Deployment docs in README** | Proof server instructions, wallet funding, env vars, realDeal switching, references. |
| **Mar 24, 2026** | **Business docs reorganized** | Non-code markdown moved from root to `docs/business/` with README index. |
| **Mar 24, 2026** | **MidnightVitals gated** | Diagnostic panel hidden behind developer flag (URL param + keyboard shortcut) for clean demos. |
| **Mar 24, 2026** | **Tooltip fixes** | Access control panel tooltip triggers fixed. |
| **Mar 24, 2026** | **Integration findings documented** | `INTEGRATION-FINDINGS.md` — comprehensive findings from wiring realDeal layer to Midnight. |
| **Mar 24, 2026** | **Hash migration** | FNV-1a hash functions migrated to Midnight's native `persistentHash` for production readiness. |
| **Mar 24, 2026** | **Reproducible local dev** | `midnight-local-dev` Docker stack integration, `scripts/wait-for-stack.sh`, standalone and preview YAMLs. |
| **Mar 25, 2026** | **GitHub Actions CI** | `test-compile.yml` workflow: Node 22, Compact compiler installation, artifact upload/download, debug steps. Multiple PRs merged (#41–#47). |
| **Mar 25, 2026** | **MerkleTree API fix** | Corrected `proveParticipantHasRole` — replaced non-existent `.member(path, key)` with official `checkRoot(merkleTreePathRoot<N,T>(path))` pattern. Fixed `Maybe<T>` property access syntax. |

---

## Phase 6 — Documentation & Business Artifacts (Cumulative)

| Milestone | Details |
|-----------|---------|
| **20+ documentation files** | Architecture, product specs, pitch materials, team docs, discovery automation deep dives, reference research. |
| **13-slide pitch deck** | HTML + PDF with Puppeteer generation pipeline. |
| **3-minute video script** | Scripted demo walkthrough with recording checklist. |
| **AutoDiscovery Legal Bluebook article** | Legal implications framework in `Media/AutoDiscovery_Legal_Bluebook.md`. |
| **MidnightVitals sub-product** | Full business plan, architecture doc, design spec, feature roadmap, integration guide, README — positioned as standalone npm package and future SaaS. |
| **Build Club participation** | Week 1 Customer Analysis Matrix, Week 3 pitch deck, Week 5 notes, launch checklist for Demo Day. |
| **Comprehensive brand assets** | 22 media files — logos, elephants, courtroom imagery, neon map, judge illustrations, infographics. |
| **SelectConnect integration spec** | `SELECTCONNECT_INTEGRATION.md` — privacy-first contact sharing integration plan. |
| **Oracle & API integration plan** | External service integration architecture documented. |

---

## Summary Statistics (as of March 25, 2026)

| Metric | Count |
|--------|-------|
| **Total commits** | ~120+ |
| **Compact smart contracts** | 6 (all compiling) |
| **Exported ZK circuits** | 20+ across all contracts |
| **Frontend apps** | 2 (demoLand + realDeal) |
| **Provider interfaces** | 12 |
| **Mock providers** | 12 (full demoLand coverage) |
| **Documentation files** | 40+ |
| **Media/brand assets** | 22 |
| **UI pages** | 11 (dashboard, case view, login, search, compliance, settings, contacts, counter, wallet, home, reference) |
| **Contributors** | 3 (John, Spy, Copilot agent) |
| **Days since first commit** | 73 |

---

*AutoDiscovery.legal — Past Milestones — John, Spy & Penny (March 2026)*
