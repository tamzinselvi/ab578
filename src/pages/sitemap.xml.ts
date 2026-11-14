import type { APIRoute } from "astro";
import { platforms } from "../data/platforms";
import {
  DEFAULT_LOCALE,
  absoluteUrl,
  localeList,
  localePath,
  locales,
} from "../i18n";

/**
 * Sitemap covering every locale and every content page. Built as an endpoint
 * (not @astrojs/sitemap) so the URL list stays in one reviewed place and no
 * extra dependency is needed. URLs include the deploy base and site origin,
 * exactly like the canonical links in Base.astro.
 */

const CONTENT_PATHS = [
  "/",
  "/file",
  "/about",
  "/faq",
  "/privacy",
  ...platforms.map((platform) => `/${platform.id}`),
] as const;

export const getStaticPaths = () => [{}];

function alternateLinks(path: string): string {
  return localeList
    .map((locale) => {
      const hreflang = locales[locale].htmlLang;
      const href = absoluteUrl(localePath(locale, path));
      return `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`;
    })
    .concat(
      `<xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(
        localePath(DEFAULT_LOCALE, path),
      )}"/>`,
    )
    .join("");
}

function escapeXml(url: string): string {
  return url.replaceAll("&", "&amp;");
}

export const GET: APIRoute = () => {
  const urls = localeList.flatMap((locale) =>
    CONTENT_PATHS.map((path) => {
      const loc = escapeXml(absoluteUrl(localePath(locale, path)));
      return `<url>${alternateLinks(path)}<loc>${loc}</loc></url>`;
    }),
  );
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ` +
    `xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
