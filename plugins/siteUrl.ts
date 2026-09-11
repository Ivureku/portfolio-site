import type { Plugin } from 'vite';

/** Written into index.html wherever an absolute URL to the site is needed. */
const TOKEN = '__SITE_URL__';

/** Every <meta> or <link> tag carrying the token, with its leading whitespace. */
const TAGS_WITH_TOKEN = new RegExp(
  `\\s*<(?:meta|link)\\b[^>]*${TOKEN}[^>]*>`,
  'g'
);

/**
 * The deployed origin, without a trailing slash. VITE_SITE_URL wins; otherwise
 * it comes from the host's own build variables, so a deploy to Vercel or
 * Netlify needs no configuration at all.
 */
const resolveOrigin = (): string | undefined => {
  const { env } = process;
  const raw =
    env.VITE_SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    (env.NETLIFY === 'true' ? env.URL : undefined);

  return raw?.trim().replace(/\/+$/, '') || undefined;
};

/**
 * Canonical and Open Graph tags need an absolute URL — scrapers drop relative
 * image paths. This fills the token in at build time. With nothing to fill it
 * with, it removes those tags instead: a canonical naming the wrong host tells
 * search engines the page lives somewhere else, which is worse than none.
 */
export const siteUrl = (): Plugin => {
  let base = '/';

  return {
    name: 'site-url',

    configResolved(config) {
      base = config.base;
    },

    transformIndexHtml: {
      // Ahead of Vite's own HTML pass, which would otherwise try to resolve
      // the bare token in <link href> as a local asset.
      order: 'pre',
      handler(html, ctx) {
        const origin = resolveOrigin();

        if (!origin) {
          if (!ctx.server) {
            console.warn(
              '\n[site-url] No site URL found. Set VITE_SITE_URL to your domain; ' +
                'the canonical and link-preview tags that need one were left out.\n'
            );
          }
          return html.replace(TAGS_WITH_TOKEN, '');
        }

        // Subpath deploys (GitHub Pages) need the base appended — unless the
        // URL someone supplied already ends in it. A relative base has no
        // meaningful absolute form, so it's ignored.
        const path = base.startsWith('/') ? base.replace(/\/+$/, '') : '';
        const root =
          path && !origin.endsWith(path) ? `${origin}${path}` : origin;

        return html.split(TOKEN).join(root);
      },
    },
  };
};
