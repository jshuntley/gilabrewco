/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BREWFATHER_USER_ID: string;
  readonly BREWFATHER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
