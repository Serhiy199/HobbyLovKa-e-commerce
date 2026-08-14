import "server-only";

const LOCAL_SITE_URL = "http://localhost:3000";

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (!configuredUrl) {
    return new URL(LOCAL_SITE_URL);
  }

  try {
    return new URL(
      configuredUrl.startsWith("http")
        ? configuredUrl
        : `https://${configuredUrl}`,
    );
  } catch {
    return new URL(LOCAL_SITE_URL);
  }
}

export function absoluteSiteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}
