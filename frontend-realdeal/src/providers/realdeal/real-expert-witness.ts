// ============================================================================
// REALDEAL EXPERT WITNESS PROVIDER → expert-witness.compact
// ============================================================================
//
// Manages expert witness registration and credential verification.
//
// Contract circuits (Phase 2 — need wallet):
//   - registerExpertWitness(qualificationProofHash) → expertIdentifierHash
//   - verifyExpertIsRegistered(expertIdentifierHash) → boolean
// ============================================================================

import type {
  IExpertWitnessProvider,
  ExpertWitness,
} from '../types';

import {
  getExpertsByCase,
  getExpertById,
  registerExpertLocally,
} from './storage/adl-storage';

export class RealExpertWitnessProvider implements IExpertWitnessProvider {

  async getExpertsByCase(caseId: string): Promise<ExpertWitness[]> {
    return getExpertsByCase(caseId);
  }

  async getExpert(expertId: string): Promise<ExpertWitness> {
    const expert = getExpertById(expertId);
    if (!expert) throw new Error(`[RealExpertWitnessProvider] Expert not found: ${expertId}`);
    return expert;
  }

  async registerExpert(
    expert: Omit<ExpertWitness, 'id' | 'registeredAt' | 'qualificationProofVerified'>,
  ): Promise<ExpertWitness> {
    const newExpert = registerExpertLocally(expert);

    // Phase 2: Call expert-witness.registerExpertWitness circuit
    // const qualificationHash = computeExpertQualificationHash(expert.qualifications);
    // const tx = await deployed.callTx.registerExpertWitness(qualificationHash);
    // updateExpertLocally(newExpert.id, { qualificationProofVerified: true });

    console.info(
      `[RealExpertWitnessProvider] Expert "${newExpert.name}" registered locally. Connect wallet to anchor on-chain.`,
    );
    return newExpert;
  }
}
