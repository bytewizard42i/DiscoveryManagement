// ============================================================================
// REALDEAL AUTH PROVIDER — Midnight Wallet Integration
// ============================================================================
//
// Connects the frontend to a Midnight wallet for identity and signing.
//
// WALLET MODES:
//   1. Lace Extension (production) — Browser extension injects window.midnight
//   2. Dev Seed (development) — Seed phrase from .env for automated testing
//
// FLOW:
//   1. User clicks "Connect Wallet"
//   2. We detect or prompt for Lace extension
//   3. Extract public key from connected wallet
//   4. Create an AuthSession with the wallet's identity
//   5. All subsequent contract calls use this wallet for signing + proofs
//
// The wallet connection is also needed by all other providers to:
//   - Sign transactions (callTx.*)
//   - Generate ZK proofs (via proof server)
//   - Pay tDUST fees on preprod
//
// CURRENT STATUS: Phase 1 implementation with localStorage session persistence.
// On-chain wallet connection will activate when SDK deps are added.
// ============================================================================

import type {
  IAuthProvider,
  AuthSession,
  AuthMethod,
  Credentials,
} from '../types';

// --- Session Storage ---

const SESSION_KEY = 'adl_realdeal_session';

function loadSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

function saveSession(session: AuthSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// --- Lace Wallet Detection ---

/**
 * Check if the Midnight Lace wallet browser extension is available.
 * Lace injects a `window.midnight` object when installed.
 */
function isLaceAvailable(): boolean {
  return typeof window !== 'undefined' && 'midnight' in window;
}

/**
 * Get wallet info from the Lace extension.
 * Returns the public key and wallet name if available.
 */
async function connectLaceWallet(): Promise<{ publicKey: string; walletName: string } | null> {
  if (!isLaceAvailable()) return null;

  try {
    // The Lace Midnight extension API exposes wallet connection
    // window.midnight is injected by the Lace browser extension
    const midnightApi = (window as any).midnight;
    if (!midnightApi) return null;

    // Request wallet connection (prompts user to approve in extension)
    // The exact API depends on the Lace version — this follows the pattern
    // from docs.midnight.network
    const wallet = await midnightApi.enable();
    if (!wallet) return null;

    // Extract the public key
    const publicKey = await wallet.getPublicKey?.() ?? 'lace-connected';

    return { publicKey: String(publicKey), walletName: 'Lace' };
  } catch (error) {
    console.warn('[RealAuthProvider] Lace wallet connection failed:', error);
    return null;
  }
}

// ============================================================================
// PROVIDER IMPLEMENTATION
// ============================================================================

export class RealAuthProvider implements IAuthProvider {
  private session: AuthSession | null = loadSession();

  /**
   * Connect to a Midnight wallet and create an authenticated session.
   *
   * @param method - Auth method: 'email' for dev mode, 'yubikey'/'trezor' reserved for future hardware
   * @param credentials - Optional credentials for dev mode login
   */
  async login(method: AuthMethod, credentials?: Credentials): Promise<AuthSession> {
    let publicKey = '';
    let displayName = '';
    let email = credentials?.email ?? '';

    if (method === 'email') {
      // Dev mode: Create a local session without real wallet
      // Useful for UI testing before Lace is available
      publicKey = `dev-${Date.now().toString(16)}`;
      displayName = email || 'Dev User';
      console.info('[RealAuthProvider] Dev mode login — no real wallet connected.');
    } else {
      // Production mode: Connect to Lace wallet extension
      const laceResult = await connectLaceWallet();

      if (laceResult) {
        publicKey = laceResult.publicKey;
        displayName = `${laceResult.walletName} Wallet`;
        console.info(`[RealAuthProvider] Connected to ${laceResult.walletName} wallet.`);
      } else {
        // Lace not available — fall back to dev mode with warning
        publicKey = `no-wallet-${Date.now().toString(16)}`;
        displayName = 'No Wallet (offline mode)';
        console.warn(
          '[RealAuthProvider] Lace wallet not detected. Install the Midnight Lace extension ' +
          'from https://midnight.network/lace to connect to the blockchain.',
        );
      }
    }

    const session: AuthSession = {
      userId: publicKey,
      displayName,
      email,
      role: 'defense', // Default role; can be updated per case
      publicKey,
      authMethod: method,
      authenticatedAt: new Date().toISOString(),
    };

    this.session = session;
    saveSession(session);
    return session;
  }

  async logout(): Promise<void> {
    this.session = null;
    clearSession();
    console.info('[RealAuthProvider] Session cleared.');
  }

  getSession(): AuthSession | null {
    return this.session;
  }

  getPublicKey(): string | null {
    return this.session?.publicKey ?? null;
  }
}
