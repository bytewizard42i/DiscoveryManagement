// ============================================================================
// REALDEAL JURISDICTION PROVIDER → jurisdiction-registry.compact
// ============================================================================
//
// Manages jurisdiction registrations and rule pack verification.
// This contract has NO witnesses — all operations are pure circuit logic.
//
// Contract circuits (Phase 2 — need wallet):
//   - registerNewJurisdiction(code, rulePackHash) → void
//   - updateJurisdictionRulePack(code, newHash, version) → void
//   - verifyRulePackHashMatchesExpected(code, expectedHash) → boolean
// ============================================================================

import type {
  IJurisdictionProvider,
  JurisdictionRegistration,
} from '../types';

import {
  getAllJurisdictions,
  getJurisdictionByCode,
} from './storage/adl-storage';

export class RealJurisdictionProvider implements IJurisdictionProvider {

  async getRegisteredJurisdictions(): Promise<JurisdictionRegistration[]> {
    return getAllJurisdictions();
  }

  async getJurisdictionDetails(code: string): Promise<JurisdictionRegistration> {
    const jurisdiction = getJurisdictionByCode(code);
    if (!jurisdiction) {
      throw new Error(`[RealJurisdictionProvider] Jurisdiction not found: ${code}`);
    }
    return jurisdiction;
  }

  async verifyRulePack(code: string): Promise<{ valid: boolean; message: string }> {
    const jurisdiction = getJurisdictionByCode(code);
    if (!jurisdiction) {
      return { valid: false, message: `Jurisdiction ${code} not registered` };
    }

    // Phase 2: Call jurisdiction-registry.verifyRulePackHashMatchesExpected circuit
    // const codeBytes = jurisdictionToBytes8(code);
    // const expectedHash = hexToBytes32(jurisdiction.registryHash);
    // const tx = await deployed.callTx.verifyRulePackHashMatchesExpected(codeBytes, expectedHash);
    // return { valid: tx.public.result, message: tx.public.result ? 'Verified on-chain' : 'Mismatch' };

    if (jurisdiction.verifiedOnChain) {
      return { valid: true, message: 'Rule pack hash verified on-chain' };
    }

    return {
      valid: true,
      message: 'Rule pack registered locally. Connect wallet to verify on-chain.',
    };
  }
}
