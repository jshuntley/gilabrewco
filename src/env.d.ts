/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_BREWFATHER_USER_ID: string;
  readonly PUBLIC_BREWFATHER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
