# How Should We Partition the Discovery Blob?

> **Date**: February 15, 2026
> **Authors**: John + Cassie
> **Branch**: `johnny5i-branch`
> **Status**: Active brainstorm — living document

---

## The Core Problem

Legal discovery is a **giant blob**. One big undifferentiated mass of data, files, and evidence passed between any side of a case — defense, prosecution/plaintiff, judge, and relevant third parties (experts, law enforcement, witnesses, etc.).

Right now, this blob is managed with spreadsheets, email threads, and prayer. The result: $8.5M sanctions, 38,000+ dismissed cases, careers ended.

**AutoDiscovery's job**: Turn the blob into a structured, tracked, auditable, jurisdiction-compliant protocol.

---

## Step 1: Universal Discovery Categories

Before we split by party, we need to define **what kinds of things** exist in the blob. These are universal — they appear in virtually every civil and criminal case regardless of jurisdiction.

### Document Categories

| # | Category | Description | Examples |
|---|----------|-------------|----------|
| 1 | **Pleadings & Motions** | Formal court filings that frame the case | Complaints, answers, motions to compel, motions in limine |
| 2 | **Interrogatories** | Written questions one party serves on another | Standard interrogatories, contention interrogatories |
| 3 | **Requests for Production (RFP)** | Demands to produce documents or things | Requests for emails, contracts, records |
| 4 | **Requests for Admission (RFA)** | Requests that a party admit/deny specific facts | "Admit that you were driving the vehicle on [date]" |
| 5 | **Depositions** | Sworn testimony taken outside of court | Transcripts, video recordings, exhibits used |
| 6 | **Subpoenas** | Court orders to third parties to produce docs or appear | Subpoena duces tecum, subpoena ad testificandum |
| 7 | **Expert Reports & Opinions** | Analysis from qualified experts | Medical opinions, forensic reports, financial analyses |
| 8 | **Physical / Forensic Evidence** | Tangible items or scientific analysis thereof | DNA results, ballistics, accident reconstruction |
| 9 | **Digital Evidence (ESI)** | Electronically Stored Information | Emails, texts, databases, metadata, social media |
| 10 | **Medical Records** | Health-related documentation | Hospital records, therapy notes, imaging |
| 11 | **Financial Records** | Money-related documentation | Bank statements, tax returns, invoices |
| 12 | **Communications** | Messages between parties or witnesses | Emails, letters, text messages, voicemails |
| 13 | **Photographs / Video / Audio** | Visual or audio evidence | Surveillance footage, body cam, scene photos |
| 14 | **Law Enforcement Reports** | Reports from police, investigators, agencies | Arrest reports, incident reports, forensic lab reports |
| 15 | **Witness Statements** | Accounts from percipient or character witnesses | Written statements, interview transcripts |
| 16 | **Privilege Logs** | Lists of documents withheld and the legal basis | Attorney-client privilege claims, work product |
| 17 | **Protective Orders** | Court orders restricting access to sensitive materials | Trade secrets, minor identities, sealed records |
| 18 | **Disclosure Statements** | Mandatory initial disclosures (FRCP 26(a) / state equiv.) | Witness lists, damage computations, insurance info |

### Why This Matters

Every item in the blob should be **tagged** with at least one category. This is the first axis of the partition. An untagged item is a red flag — it means someone dumped it without classification.

---

## Step 2: Party Attribution — Who's Who

Every document has a **relationship** to one or more parties. The parties in a case:

```
┌─────────────────────────────────────────────────────────────┐
│                        CASE PARTIES                          │
├──────────────┬──────────────┬──────────┬────────────────────┤
│   DEFENSE    │ PROSECUTION  │  COURT   │   THIRD PARTIES    │
│    (DEF)     │  / PLAINTIFF │ (JUDGE)  │     (3P)           │
│              │    (PRO)     │          │                    │
│ • Defendant  │ • Plaintiff  │ • Judge  │ • Expert witnesses │
│ • Def atty   │ • Prosecutor │ • Clerk  │ • Law enforcement  │
│ • Def para-  │ • Pro atty   │ • Staff  │ • Fact witnesses   │
│   legal      │ • Pro para-  │          │ • Custodians       │
│              │   legal      │          │ • Government       │
│              │              │          │   agencies         │
└──────────────┴──────────────┴──────────┴────────────────────┘
```

Each document gets tagged with:
- **Originator**: Who created or first possessed it
- **Current Custodian(s)**: Who has it now
- **Intended Recipient(s)**: Who should receive it
- **Access Level**: Who is allowed to see it (protective orders, privilege)

---

## Step 3: Origination — "It Started Here..."

This is the anchor point. Every document enters the discovery universe at a single moment. We need to capture:

```
┌─────────────────────────────────────────────────────────────┐
│                    ORIGINATION RECORD                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Document ID:     [unique hash — content-addressable]        │
│  Category:        [from Universal Categories above]          │
│  Originating Party: DEF | PRO | COURT | 3P                  │
│  Originating Person: [name, role, bar # if attorney]         │
│  Original Format:  [PDF, DOCX, TIFF, MP4, CSV, etc.]        │
│  Date Created:     [when the document was originally made]   │
│  Date Entered Discovery: [when it entered the case]          │
│  Content Hash:     [SHA-256 of original file — immutable]    │
│  Bates Range:      [if applicable — standard legal numbering]│
│  Jurisdiction:     [which rules govern this document]        │
│  Related Request:  [which RFP/interrogatory/subpoena]        │
│                                                               │
│  ZK PROOF: "This document exists and was originated by       │
│             [party] at [timestamp] without revealing          │
│             the content to the chain."                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### The Content Hash Is Everything

When a document is first entered, we hash it. That hash goes on-chain via Midnight. The actual content **never** touches the blockchain — only the proof that "this document, with this hash, existed at this time, originated from this party."

If anyone later claims the document was altered, the hash proves otherwise. If someone claims they never received it, the delivery proof says otherwise.

---

## Step 4: Chain of Custody — Tracking the Journey

Once a document is originated, it moves. From DEF → PRO. From PRO → COURT. From 3P → both sides. We need a **transfer ledger**.

### Transfer Record

Every time a document moves from one party to another:

```
┌─────────────────────────────────────────────────────────────┐
│                     TRANSFER RECORD                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Document ID:      [hash reference to origination record]    │
│  Transfer ID:      [unique ID for this specific transfer]    │
│                                                               │
│  FROM:             [party + person]                           │
│  TO:               [party + person]                           │
│                                                               │
│  DEADLINE:         [when it was due — per rules/court order] │
│  DATE SENT:        [actual timestamp of transmission]        │
│  DATE RECEIVED:    [confirmed receipt timestamp]             │
│  METHOD:           [DApp / email / physical / courier]       │
│                                                               │
│  STATUS:           PENDING | SENT | RECEIVED | OVERDUE       │
│                                                               │
│  RECEIPT PROOF:    [ZK proof of delivery confirmation]       │
│  CONTENT MATCH:    [hash of received file == original hash?] │
│                                                               │
│  ⚠️  OVERDUE FLAG: [auto-triggers if DEADLINE < NOW          │
│                      and STATUS ≠ RECEIVED]                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### The Two-Sided Confirmation Problem

The DApp is **most powerful** when all parties use it. Here's why:

| Scenario | Proof Strength |
|----------|---------------|
| **Both parties on DApp** | Full proof — sender confirms send, receiver confirms receipt, both timestamped on-chain |
| **Sender on DApp, receiver not** | Partial proof — we prove it was sent, but receipt is unconfirmed (like certified mail without a signature) |
| **Neither on DApp** | No proof — the status quo. Chaos. |

This is the **adoption flywheel**: once one side uses AutoDiscovery, the other side is incentivized to join because the first side now has proof and they don't.

---

## Step 5: The Memorandum System — Periodic Status Reports

At configurable intervals (daily, weekly, or triggered by events), the protocol generates a **Discovery Memorandum** — a status report for all parties.

### Memorandum Contents

```
╔══════════════════════════════════════════════════════════════╗
║            AUTODISCOVERY MEMORANDUM #[sequence]               ║
║            Case: [case identifier]                            ║
║            Generated: [timestamp]                             ║
║            Period: [start date] — [end date]                  ║
╠══════════════════════════════════════════════════════════════╣
║                                                                ║
║  ITEMS SENT THIS PERIOD:                                       ║
║  ┌──────┬────────┬──────────┬─────────┬─────────────────┐     ║
║  │ Doc# │ From   │ To       │ Sent    │ Received?       │     ║
║  ├──────┼────────┼──────────┼─────────┼─────────────────┤     ║
║  │ 0042 │ DEF    │ PRO      │ Feb 12  │ ✅ Feb 12       │     ║
║  │ 0043 │ PRO    │ DEF      │ Feb 13  │ ✅ Feb 13       │     ║
║  │ 0044 │ PRO    │ COURT    │ Feb 14  │ ⏳ Pending      │     ║
║  └──────┴────────┴──────────┴─────────┴─────────────────┘     ║
║                                                                ║
║  UPCOMING DEADLINES:                                           ║
║  ┌──────────────────────────────┬─────────┬──────────────┐    ║
║  │ Obligation                   │ Due     │ Status       │    ║
║  ├──────────────────────────────┼─────────┼──────────────┤    ║
║  │ DEF Expert Report            │ Feb 20  │ 5 days left  │    ║
║  │ PRO Supplemental Disclosure  │ Feb 25  │ 10 days left │    ║
║  └──────────────────────────────┴─────────┴──────────────┘    ║
║                                                                ║
║  ⚠️  OVERDUE ITEMS:                                            ║
║  ┌──────┬────────┬──────────┬─────────┬──────────────────┐    ║
║  │ Doc# │ From   │ To       │ Due     │ Days Overdue     │    ║
║  ├──────┼────────┼──────────┼─────────┼──────────────────┤    ║
║  │ 0039 │ DEF    │ PRO      │ Feb 05  │ 🔴 10 days      │    ║
║  └──────┴────────┴──────────┴─────────┴──────────────────┘    ║
║                                                                ║
║  ZK COMPLIANCE PROOF: [hash — verifiable on Midnight]         ║
║                                                                ║
╚══════════════════════════════════════════════════════════════╝
```

### Memorandum Triggers

- **Periodic**: Every Monday at 8am (configurable)
- **Event-driven**: When a deadline is 72/48/24 hours away
- **Overdue alert**: Immediate notification when a deadline passes with no delivery
- **On-demand**: Any party can request a current-state memorandum at any time

### On-Chain Proof

Each memorandum gets hashed and anchored to Midnight. This creates a **time-series audit trail** — "as of this date, this was the state of discovery." If a sanctions hearing happens 6 months later, there's an immutable record of who had what, when.

---

## Step 6: The Data Dump Obfuscation Problem

### The Attack

This is the big one. It's not just a technical problem — it's an adversarial strategy. Parties intentionally:

1. **Dump massive volumes** — bury relevant documents in terabytes of irrelevant ones
2. **Use obscure formats** — deliver data in proprietary or hard-to-search formats
3. **Strip metadata** — remove dates, authors, and context from files
4. **Fragment documents** — split a single document across multiple files
5. **Mislabel categories** — tag a damaging email as "administrative" instead of "communications"
6. **Deliver at the last second** — technically meet the deadline but leave no time for review

### Real-World Examples

- **Qualcomm v. Broadcom**: Withheld 46,000+ documents → $8.5M sanctions
- **State v. Kohberger**: 68 TB of disorganized data dumped on defense
- **Gem State Roofing**: Defendant claimed "routine email deletion" while withholding hundreds of pages

### Our Countermeasures

#### 1. Structured Submission Requirements

Don't accept a raw blob. Require:

```
Every submission must include:
├── manifest.json          ← Machine-readable index of all documents
│   ├── document_id
│   ├── category (from Universal Categories)
│   ├── description (human-readable)
│   ├── date_created
│   ├── date_range (if applicable)
│   ├── related_request (which RFP/interrogatory this responds to)
│   └── content_hash
├── documents/             ← The actual files
│   ├── 001_contract.pdf
│   ├── 002_email_chain.pdf
│   └── ...
└── privilege_log.json     ← What was withheld and why
```

**If a party dumps 10,000 files without a manifest, the system flags it immediately.** The receiving party gets an alert: "Unstructured submission received — [n] items without category tags."

#### 2. Volume Anomaly Detection

Track the **ratio** of documents produced vs. documents requested:

```
Normal response to "Produce all emails between X and Y 
regarding [topic] from Jan-Mar 2025":
→ 50-200 documents

Obfuscation dump:
→ 47,000 documents including every email in the company 
  for the entire year, unfiltered
```

The protocol flags statistical outliers:
- **Volume spike**: 10x+ the expected document count for a request type
- **Category imbalance**: 95% of documents are "miscellaneous" or "other"
- **Format irregularity**: Bulk delivery in non-searchable formats (TIFF images of text instead of OCR'd PDFs)
- **Metadata stripping**: Files with no author, no date, no title

#### 3. Relevance Mapping

Each RFP/interrogatory has a **scope**. The protocol can cross-reference:

```
RFP #3: "All communications between Defendant and 
         Contractor X regarding Project Y, 2024-2025"

Expected categories: Communications, Contracts
Expected date range: Jan 2024 — Dec 2025
Expected parties mentioned: Defendant, Contractor X

Red flags if submission includes:
❌ Documents from 2018 (outside date range)
❌ HR records (unrelated category)
❌ 500 pages of corporate policy manuals (relevance?)
```

#### 4. Submission Scoring

Every submission gets a **compliance score**:

| Factor | Weight | Scoring |
|--------|--------|---------|
| Manifest completeness | 25% | All fields populated? |
| Category accuracy | 20% | Categories match request scope? |
| Format searchability | 15% | OCR'd, text-searchable, standard format? |
| Volume proportionality | 15% | Reasonable count for the request? |
| Timeliness | 15% | How close to deadline? Early = better |
| Metadata integrity | 10% | Dates, authors, titles present? |

**Score < 60% = auto-flag for potential obfuscation.** The memorandum system notifies all parties and the court.

#### 5. The "Haystack Alert"

When the system detects a likely data dump attack:

```
⚠️  HAYSTACK ALERT — Case [ID], Submission from DEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Response to RFP #3 contains 47,000 documents.
Expected range: 50-500 documents.

Anomalies detected:
• 89% of documents are uncategorized
• 12,000 files have no metadata
• Date range spans 2010-2025 (request was 2024-2025)
• 8,000 files are non-searchable TIFF images

Compliance Score: 23/100

Recommended action: Motion to compel properly 
organized production per [jurisdiction rule].

This alert has been recorded on-chain at [timestamp].
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## The Full Flow — How It All Connects

```
                    THE AUTODISCOVERY PROTOCOL
                    
    ┌─────────────────────────────────────────────────┐
    │                                                   │
    │  1. ORIGINATION                                   │
    │     Document enters the system                    │
    │     → Hash generated                              │
    │     → Category assigned                           │
    │     → Originator recorded                         │
    │     → ZK proof anchored to Midnight               │
    │                                                   │
    │  2. OBLIGATION MAPPING                            │
    │     Court order / rule / agreement creates         │
    │     a deadline for production                      │
    │     → Deadline tracked                            │
    │     → Countdown begins                            │
    │     → Alerts scheduled                            │
    │                                                   │
    │  3. STRUCTURED SUBMISSION                         │
    │     Producing party uploads via protocol           │
    │     → Manifest required                           │
    │     → Category tags required                      │
    │     → Compliance score calculated                 │
    │     → Anomaly detection runs                      │
    │     → ZK proof of submission on-chain             │
    │                                                   │
    │  4. TRANSFER & RECEIPT                            │
    │     Documents move from party to party             │
    │     → Send confirmed                              │
    │     → Receipt confirmed (if both on DApp)         │
    │     → Content hash verified (unchanged?)          │
    │     → ZK proof of delivery on-chain               │
    │                                                   │
    │  5. MEMORANDUM                                    │
    │     Periodic / triggered status reports            │
    │     → Sent/received summary                       │
    │     → Upcoming deadlines                          │
    │     → Overdue alerts                              │
    │     → Compliance scores                           │
    │     → Anchored to Midnight                        │
    │                                                   │
    │  6. DISPUTE RESOLUTION EVIDENCE                   │
    │     When things go wrong, the proof is there       │
    │     → Immutable timeline of events                │
    │     → "Your Honor, here is the ZK proof..."       │
    │     → Sanctions supported by on-chain evidence    │
    │                                                   │
    └─────────────────────────────────────────────────┘
```

---

## Open Questions

1. **Granularity of hashing** — Do we hash individual documents or batches? Individual = more precision but more on-chain transactions. Batches = cheaper but less granular.
   - Possible solution: Merkle tree — hash individual docs, combine into a batch root hash, put root on-chain. Can prove any individual doc later.

2. **What happens when a party supplements discovery?** — They find new docs, or the court orders more. We need a versioning system — "Supplemental Production #2 in response to RFP #3."

3. **Format standardization** — Should AutoDiscovery enforce format requirements (e.g., all text must be OCR'd PDF)? Or just flag non-compliance?

4. **Integration with existing e-discovery tools** — Firms already use Relativity, Logikcull, etc. AutoDiscovery should layer on top, not replace their document management.

5. **Privilege disputes** — When a party claims privilege, the other side can challenge. How does AutoDiscovery handle in camera review (judge sees it, nobody else does)?

---

*This is a living document. We'll update as we build.*
