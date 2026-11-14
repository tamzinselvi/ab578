import type { APIRoute } from "astro";
import { absoluteUrl } from "../i18n";

/**
 * robots.txt as a build-time endpoint so the Sitemap line carries the real
 * site origin and base from the build environment, instead of a hardcoded
 * URL that would go stale on a custom domain.
 */

export const getStaticPaths = () => [{}];

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${absoluteUrl(`${base}/sitemap.xml`)}`,
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
