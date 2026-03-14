// ============================================================================
// REALDEAL ACCESS CONTROL PROVIDER → access-control.compact
// ============================================================================
//
// Manages document access permissions, sharing events, and custody chains.
//
// Contract circuits (Phase 2 — need wallet):
//   - registerParticipantKey(pubKeyHash, role) → void
//   - assignRoleForCase(caseId, pubKeyHash, role) → void
//   - grantDocumentAccessToParticipant(docHash, recipientHash, tier) → void
//   - revokeDocumentAccessFromParticipant(docHash, recipientHash) → void
//   - proveParticipantHasRole(caseId, pubKeyHash, role) → boolean
//   - shareDocumentWithParticipant(docHash, recipientHash, tier) → proofHash
// ============================================================================

import type {
  IAccessControlProvider,
  AccessPermission,
  SharingEvent,
  CustodyEntry,
  AccessGrant,
  ProtectiveOrderTier,
} from '../types';

import {
  getPermissionsByCase,
  getSharingEventsByCase,
  getCustodyEntriesByDocument,
  addAccessGrantLocally,
  revokeAccessGrantLocally,
} from './storage/adl-storage';

export class RealAccessControlProvider implements IAccessControlProvider {

  async getPermissions(caseId: string): Promise<AccessPermission[]> {
    return getPermissionsByCase(caseId);
  }

  async getSharingEvents(caseId: string): Promise<SharingEvent[]> {
    return getSharingEventsByCase(caseId);
  }

  async getCustodyChain(documentId: string): Promise<CustodyEntry[]> {
    return getCustodyEntriesByDocument(documentId);
  }

  async grantAccess(
    documentId: string,
    participantName: string,
    level: ProtectiveOrderTier,
  ): Promise<AccessGrant> {
    const now = new Date().toISOString();

    const grant = addAccessGrantLocally({
      documentId,
      grantedTo: participantName,
      grantedToRole: 'defense', // Default; will come from participant registry in Phase 2
      accessLevel: level,
      grantedAt: now,
      grantedBy: 'current-user', // Will use wallet public key in Phase 2
      revoked: false,
    });

    // Phase 2: Call access-control.grantDocumentAccessToParticipant circuit
    // const docHash = hexToBytes32(document.contentHash);
    // const recipientHash = hexToBytes32(participantPublicKeyHash);
    // const tierEnum = BigInt(tierToNumber(level));
    // await deployed.callTx.grantDocumentAccessToParticipant(docHash, recipientHash, tierEnum);

    console.info(
      `[RealAccessControlProvider] Access granted locally. Connect wallet to anchor on-chain.`,
    );
    return grant;
  }

  async revokeAccess(grantId: string): Promise<void> {
    revokeAccessGrantLocally(grantId);

    // Phase 2: Call access-control.revokeDocumentAccessFromParticipant circuit
    console.info(
      `[RealAccessControlProvider] Access revoked locally. Connect wallet to anchor on-chain.`,
    );
  }
}
