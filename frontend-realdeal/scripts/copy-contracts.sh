#!/bin/bash
# ============================================================================
# COPY CONTRACT ASSETS TO PUBLIC DIRECTORY
# ============================================================================
# Copies the compiled contract keys and zkir from the autodiscovery-contract
# package into frontend-realdeal/public/contracts/ so they can be served
# as static assets by Vite (for the BrowserZkConfigProvider).
#
# Run this after compiling contracts:
#   npm run copy-contracts
# ============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$(dirname "$SCRIPT_DIR")"
CONTRACT_DIR="$(dirname "$FRONTEND_DIR")/autodiscovery-contract/src/managed"
PUBLIC_DIR="$FRONTEND_DIR/public/contracts"

echo "📦 Copying contract assets to public directory..."
echo "   Source: $CONTRACT_DIR"
echo "   Dest:   $PUBLIC_DIR"

# List of ADL contracts (excluding counter — it's just a test contract)
CONTRACTS=(
  "discovery-core"
  "document-registry"
  "compliance-proof"
  "jurisdiction-registry"
  "access-control"
  "expert-witness"
)

for contract in "${CONTRACTS[@]}"; do
  echo ""
  echo "  → $contract"

  # Create target directories
  mkdir -p "$PUBLIC_DIR/$contract/keys"
  mkdir -p "$PUBLIC_DIR/$contract/zkir"

  # Copy keys (prover + verifier for each circuit)
  if [ -d "$CONTRACT_DIR/$contract/keys" ]; then
    cp -f "$CONTRACT_DIR/$contract/keys/"* "$PUBLIC_DIR/$contract/keys/" 2>/dev/null || true
    KEY_COUNT=$(ls "$PUBLIC_DIR/$contract/keys/" 2>/dev/null | wc -l)
    echo "    Keys: $KEY_COUNT files"
  else
    echo "    Keys: ⚠️  No keys directory found"
  fi

  # Copy zkir files
  if [ -d "$CONTRACT_DIR/$contract/zkir" ]; then
    cp -f "$CONTRACT_DIR/$contract/zkir/"* "$PUBLIC_DIR/$contract/zkir/" 2>/dev/null || true
    ZKIR_COUNT=$(ls "$PUBLIC_DIR/$contract/zkir/" 2>/dev/null | wc -l)
    echo "    ZKIR: $ZKIR_COUNT files"
  else
    echo "    ZKIR: ⚠️  No zkir directory found"
  fi
done

echo ""
echo "✅ Contract assets copied to $PUBLIC_DIR"
echo ""
echo "Total size:"
du -sh "$PUBLIC_DIR" 2>/dev/null || echo "  (could not calculate)"
