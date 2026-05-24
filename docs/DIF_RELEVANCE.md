# DIF Relevance for DiscoveryManagement

> **Canonical source**: [`/home/js/DIDzMonolith/monolith-docs/DIF_KNOWLEDGE_BASE.md`](/home/js/DIDzMonolith/monolith-docs/DIF_KNOWLEDGE_BASE.md)
>
> This file is a short pointer. The deep content (specs, ecosystem, integration patterns, anti-patterns) lives in the canonical knowledge base. Refresh this file only when DiscoveryManagement's DIF needs materially change.

## Why DIF matters for DiscoveryManagement

DiscoveryManagement (legal discovery on Midnight) is a high-fit DIF integration target. Counterparties hold DIDs anchored across many methods, so Universal Resolver is essential. Presentation Exchange standardizes the produce-documents-matching-criteria-X requests, and DIDComm v2 handles the secure delivery channel.

## DIF specs to adopt

- **Universal Resolver**: cross-method DID resolution for opposing counsel, judges, third parties
- **Presentation Exchange**: standard format for discovery requests (produce documents matching Y)
- **DIDComm v2**: secure delivery channel for discovery responses
- **Confidential Storage**: encrypted document vaults that survive discovery without exposing unrelated material
- **Credential Manifest**: standard format for to access this case provide credential Y (bar-licensed, party-of-record, judge)

## Integration patterns from the canonical doc

- Pattern A (Universal Resolver as DID translation layer)
- Pattern B (Presentation Exchange for credential and document requests)
- Pattern C (DIDComm v2 for delivery)
- Pattern D (Confidential Storage for document vaults)

## Concrete next steps

1. Run Universal Resolver as part of the DiscoveryManagement infrastructure.
2. Map current discovery request format onto Presentation Exchange data shapes.
3. Use DIDComm v2 for the delivery channel.
4. Evaluate Confidential Storage as the long-term document home.

## Last refreshed

May 24, 2026 from DIF homepage and GitHub org listing.
