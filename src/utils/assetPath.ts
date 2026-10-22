/// <reference types="vite/client" />
export function getAssetPath(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  // Remove trailing slash from base and leading slash from path to prevent double slashes
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
