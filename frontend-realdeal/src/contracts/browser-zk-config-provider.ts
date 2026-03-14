// ============================================================================
// BROWSER ZK CONFIG PROVIDER
// ============================================================================
//
// The NodeZkConfigProvider from @midnight-ntwrk reads circuit keys from the
// filesystem. That won't work in a browser. This provider fetches the same
// keys via HTTP from static assets served by Vite.
//
// The managed contract output (keys/*.prover, keys/*.verifier, zkir/*.zkir)
// must be copied to public/contracts/<contract-name>/ before building.
// Use the `copy-contracts` npm script to do this.
//
// USAGE:
//   const zkConfigProvider = new BrowserZkConfigProvider('/contracts/discovery-core');
//   // Now pass this to CompiledContract or findDeployedContract
// ============================================================================

import {
  ZKConfigProvider,
  type ProverKey,
  type VerifierKey,
  type ZKIR,
  createProverKey,
  createVerifierKey,
  createZKIR,
} from '@midnight-ntwrk/midnight-js-types';

/**
 * Browser-compatible ZK config provider that fetches circuit assets via HTTP
 * instead of reading them from the filesystem.
 *
 * In plain English: when the browser needs to generate a zero-knowledge proof,
 * it needs the "proving key" (a big binary file). This class fetches those
 * files from the web server instead of the hard drive.
 *
 * The SDK's NodeZkConfigProvider reads from disk. This class reads via fetch().
 */
export class BrowserZkConfigProvider extends ZKConfigProvider<string> {
  private readonly baseUrl: string;

  /**
   * @param baseUrl - Base URL where the contract's managed assets are served.
   *                  Example: '/contracts/discovery-core' (relative to site root)
   */
  constructor(baseUrl: string) {
    super();
    // Remove trailing slash if present
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  /**
   * Fetch a circuit's prover key (used to generate ZK proofs).
   */
  async getProverKey(circuitId: string): Promise<ProverKey> {
    const url = `${this.baseUrl}/keys/${circuitId}.prover`;
    const bytes = await this.fetchBinary(url, `prover key for ${circuitId}`);
    return createProverKey(bytes);
  }

  /**
   * Fetch a circuit's verifier key (used to verify ZK proofs).
   */
  async getVerifierKey(circuitId: string): Promise<VerifierKey> {
    const url = `${this.baseUrl}/keys/${circuitId}.verifier`;
    const bytes = await this.fetchBinary(url, `verifier key for ${circuitId}`);
    return createVerifierKey(bytes);
  }

  /**
   * Fetch a circuit's ZKIR (zero-knowledge intermediate representation).
   */
  async getZKIR(circuitId: string): Promise<ZKIR> {
    const url = `${this.baseUrl}/zkir/${circuitId}.zkir`;
    const bytes = await this.fetchBinary(url, `zkir for ${circuitId}`);
    return createZKIR(bytes);
  }

  /**
   * Internal helper to fetch a binary file and return it as Uint8Array.
   */
  private async fetchBinary(url: string, description: string): Promise<Uint8Array> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${description}: HTTP ${response.status} from ${url}. ` +
          `Make sure you ran 'npm run copy-contracts' to copy managed assets to public/.`,
        );
      }
      const buffer = await response.arrayBuffer();
      return new Uint8Array(buffer);
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(
          `Network error fetching ${description} from ${url}. ` +
          `Is the dev server running?`,
        );
      }
      throw error;
    }
  }
}
