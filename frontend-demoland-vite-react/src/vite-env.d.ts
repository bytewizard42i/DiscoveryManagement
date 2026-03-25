/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AD_MODE: 'demoland' | 'realdeal';
  readonly VITE_CONTRACT_ADDRESS: string;
  readonly VITE_MIDNIGHT_NETWORK: string;
  readonly VITE_AI_SERVICE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
