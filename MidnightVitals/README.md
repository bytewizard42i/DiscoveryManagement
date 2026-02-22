# 🩺 MidnightVitals

**Real-time diagnostics and health monitoring for Midnight blockchain DApps.**

---

## What Is This?

MidnightVitals is a developer-friendly diagnostic console that attaches to any Midnight-powered decentralized application. It provides:

- **Continuous health monitoring** of the proof server, network indexer, wallet connection, and smart contracts
- **Natural-language activity logging** that explains every blockchain interaction in plain English
- **Dependency verification** ensuring Docker, Node.js, Compact compiler, and all packages are correctly installed
- **Visual time wheels** showing seconds since last health check, with manual refresh buttons

Think of it as a **hospital vitals monitor for your Midnight DApp** — always showing you the heartbeat, blood pressure, and oxygen levels of your blockchain stack.

---

## Why Does This Exist?

Midnight is a cutting-edge zero-knowledge blockchain. That means:

1. **Multiple moving parts** — proof server (Docker), network node, indexer, wallet, smart contracts all need to be running
2. **ZK proofs take time** — 15-30 seconds per transaction, and users need to understand what's happening
3. **Error messages are cryptic** — blockchain errors like "proof verification failed" tell developers nothing useful
4. **Debugging is painful** — when something breaks, figuring out WHICH component failed is the hardest part

MidnightVitals solves all of this by providing a single diagnostic panel that:
- Continuously monitors every component
- Explains errors in plain English with actionable next steps
- Logs every user action and blockchain interaction with timestamps
- Runs self-diagnostics on demand

---

## Architecture

MidnightVitals is designed as a **pluggable module** that can attach to any Midnight DApp:

```
┌─────────────────────────────────────────────────────┐
│  Your Midnight DApp (React Frontend)                │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  🩺 MidnightVitals Panel                      │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │  Monitor Bar (time wheels + status)      │  │  │
│  │  │  [Proof Server: 🟢 12s] [Network: 🟢 8s]│  │  │
│  │  │  [Wallet: 🟡 --]  [Contracts: 🟢 15s]   │  │  │
│  │  ├─────────────────────────────────────────┤  │  │
│  │  │  Console Log (scrollable, resizable)     │  │  │
│  │  │  [11:03:22] You clicked "Create Case"... │  │  │
│  │  │  [11:03:24] Building a zero-knowledge... │  │  │
│  │  │  [11:03:47] Proof built successfully...  │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Two Modes

| Mode | Purpose | Data Source |
|------|---------|-------------|
| **Mock** (demoLand) | Demo and development | Simulated responses, fake timings |
| **Live** (realDeal) | Real blockchain connection | Actual HTTP pings, real contract reads |

---

## Quick Start

### In a Midnight DApp (React)

```tsx
import { VitalsProvider, VitalsPanel, VitalsToggleButton } from './vitals';

function App() {
  return (
    <VitalsProvider mode="mock">
      {/* Your app content */}
      <VitalsToggleButton />
      <VitalsPanel />
    </VitalsProvider>
  );
}
```

### Logging Events

```tsx
import { useVitalsLogger } from './vitals';

function CreateCaseButton() {
  const vitals = useVitalsLogger();

  const handleClick = () => {
    vitals.log('action', 'You clicked "Create New Case."');
    vitals.log('info', 'We are now asking the Midnight blockchain to register a new case.');
    // ... actual logic
    vitals.log('success', 'Your new case has been created. Case ID: 0xa7f3...');
  };
}
```

---

## Health Checks

| Component | Endpoint | Check Interval | Method |
|-----------|----------|----------------|--------|
| Proof Server | `http://localhost:6300/version` | 20 seconds | HTTP GET |
| Network Indexer | Configured indexer URL `/api/` | 20 seconds | HTTP GET |
| Wallet | In-memory state check | 20 seconds | Internal |
| Smart Contracts | Indexer GraphQL query | 30 seconds | HTTP POST |
| Docker | `docker --version` | On startup | Shell exec |
| Node.js | `node --version` | On startup | Shell exec |
| Compact Compiler | `compact --version` | On startup | Shell exec |

---

## Current Status

- **v0.1.0** — Mock mode for demoLand (simulated diagnostics)
- Built as `/src/vitals/` module inside AutoDiscovery.legal frontend
- Will be extracted to standalone npm package when stable

---

## Roadmap

See [FEATURE_ROADMAP.md](./FEATURE_ROADMAP.md) for the full plan.

---

## Integration

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for how to add MidnightVitals to your own Midnight DApp.

---

## License

MIT — Free to use, modify, and distribute.

---

## Created By

**AutoDiscovery.legal** — Zero-knowledge legal discovery platform on Midnight blockchain.

Built by John (SpyCrypto) with Penny 🎀.
