# Oracle Pattern & API Integration Guide — DiscoveryManagement

> How external data gets into Midnight smart contracts, and which free APIs are relevant to DiscoveryManagement (eDiscovery platform).

---

## What is an API?

An **API (Application Programming Interface)** is a service you call from your code to get data or perform actions. You send a request, it returns structured data (usually JSON).

---

## Why Smart Contracts Can't Call APIs Directly

Midnight smart contracts (written in Compact) run inside **zero-knowledge proof circuits**. Every node validating a proof must get the **exact same result**. External API calls are non-deterministic — the response could differ between nodes, or the API could change between calls. This would break the proof.

This limitation applies to **all** smart contract platforms (Ethereum, Cardano, Midnight).

---

## The Oracle Pattern

An **oracle** is a trusted off-chain service that feeds external data into the blockchain:

```
┌──────────────┐      ┌──────────────────┐      ┌─────────────────────┐
│ External API │ ───> │  Oracle Service   │ ───> │  Midnight Contract  │
│ (Data source)│      │  (Your Backend)   │      │  (Compact / ZK)     │
└──────────────┘      └──────────────────┘      └─────────────────────┘
                        Signs attestation         Verifies signature
                        Packages proof data       Stores attestation
```

### Which layer can call APIs?

| Layer | Can call APIs? | Example |
|-------|---------------|---------|
| **Frontend (React/Vite)** | ✅ Yes | `fetch()` in browser |
| **Express/Node.js server** | ✅ Yes | Backend proxy, oracle service |
| **Midnight contract (Compact)** | ❌ No | Receives data via oracle pattern |

---

## Recommended Free APIs for DiscoveryManagement

### Legal & Government Data

| API | Description | Auth | URL |
|-----|-------------|------|-----|
| **[PACER](https://pcl.uscourts.gov)** | US Federal Court records | apiKey | https://pcl.uscourts.gov |
| **[CourtListener](https://www.courtlistener.com/api/)** | Free law project — court opinions, oral arguments | apiKey | https://www.courtlistener.com/api/ |
| **[Open States](https://openstates.org/data/)** | US state legislative data | apiKey | https://openstates.org |
| **[USA.gov](https://www.usa.gov/developer)** | US government data and services | None | https://www.usa.gov/developer |
| **[data.gov](https://api.data.gov)** | US open government data | apiKey | https://api.data.gov |

### Document & Text Analysis (for eDiscovery)

| API | Description | Auth | URL |
|-----|-------------|------|-----|
| **[Dandelion](https://dandelion.eu/docs/)** | Text analysis — entity extraction, sentiment, language detection | apiKey | https://dandelion.eu |
| **[MonkeyLearn](https://monkeylearn.com/api/)** | Text classification and extraction ML models | apiKey | https://monkeylearn.com |
| **[Aylien](https://docs.aylien.com/textapi/)** | NLP — summarization, entity extraction, sentiment | apiKey | https://aylien.com |

### Identity & Verification (for case participants)

| API | Description | Auth | URL |
|-----|-------------|------|-----|
| **[HaveIBeenPwned](https://haveibeenpwned.com/API/v3)** | Check if credentials were in a breach | apiKey | https://haveibeenpwned.com |
| **[EmailRep](https://docs.emailrep.io/)** | Email address threat/risk scoring | None | https://emailrep.io |
| **[Numverify](https://numverify.com)** | Phone number validation & lookup | apiKey | https://numverify.com |
| **[Mailboxlayer](https://mailboxlayer.com)** | Email validation & verification | apiKey | https://mailboxlayer.com |

### Blockchain & Audit Trail

| API | Description | Auth | URL |
|-----|-------------|------|-----|
| **[Etherscan](https://etherscan.io/apis)** | Ethereum explorer — txn history, wallet data | apiKey | https://etherscan.io |
| **[Covalent](https://www.covalenthq.com)** | Multi-chain data aggregator | apiKey | https://www.covalenthq.com |
| **[The Graph](https://thegraph.com)** | Blockchain indexing via GraphQL | apiKey | https://thegraph.com |

### Geolocation (for jurisdiction determination)

| API | Description | Auth | URL |
|-----|-------------|------|-----|
| **[ip-api](http://ip-api.com)** | IP → country/region/city | None | http://ip-api.com |
| **[CountryStateCity](https://countrystatecity.in)** | World jurisdictions data | apiKey | https://countrystatecity.in |

---

## DM-Specific Oracle Use Cases

### 1. Document Integrity Proofs
```
[Document uploaded] → [Oracle hashes document] → [Midnight contract stores hash]
                                                   Proves: "this document existed at time T"
                                                   Reveals: nothing about document contents
```

### 2. Jurisdiction Verification
```
[ip-api / geolocation] → [Oracle attests jurisdiction] → [Contract verifies]
                                                           Proves: "party is in jurisdiction X"
                                                           Reveals: nothing about exact location
```

### 3. Participant Identity
```
[EmailRep + HaveIBeenPwned] → [Oracle risk-scores identity] → [Contract stores attestation]
                                                                 Proves: "identity is low-risk"
                                                                 Reveals: nothing about the person
```

---

## demoLand vs realDeal

| Mode | How APIs are used |
|------|-------------------|
| **demoLand** | APIs called directly from frontend/server for realistic mock data. No blockchain. |
| **realDeal** | APIs called by oracle service, results packaged as signed attestations, verified by Midnight contracts via zk-proofs. |

---

## Key Principles

1. **Never trust a single source** — cross-reference multiple APIs for critical data
2. **Privacy by default** — zk-proofs ensure only assertions are stored, never raw data
3. **Oracle signatures** — in realDeal, oracles must sign attestations for contract verification
4. **Rate limits** — free tiers have limits; cache results and batch requests
5. **Chain of custody** — for eDiscovery, every data transformation must be auditable

---

## Reference

- Public APIs catalog: https://github.com/public-apis/public-apis
- Midnight docs: https://docs.midnight.network
- DM architecture: See project docs in this repo
