export function isStyleguideEnabled(): boolean {
  if (process.env.VERCEL_ENV === "production") {
    return false;
  }
  if (process.env.VERCEL_ENV === "preview") {
    return true;
  }
  if (process.env.NODE_ENV === "production") {
    return process.env.ENABLE_STYLEGUIDE === "true";
  }
  return true;
}
