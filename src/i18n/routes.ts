import { makeRouter, type RouteDef } from './routes-core';
import { PAGES } from '../lib/guides';
import { ALL } from '../lib/engine/jury';
export const LOCALES = ['en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
const R = (id: string, en: string, noindex = false): RouteDef<Locale> => ({ id, paths: { en: `/en/${en}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { en: '/en/' } },
  R('method', 'method'),
  R('about', 'about'),
  R('widget', 'widget', true),
  R('contact', 'contact', true),
  R('editorial', 'editorial-policy', true),
  R('privacy', 'privacy', true),
  R('terms', 'legal-notice', true),
  R('cookies', 'cookies', true),
];
const fromPage = (p: (typeof PAGES)[number]): RouteDef<Locale> => ({ id: p.id, paths: { en: `/en/${p.en.slug}/` } });
/** One page per state, DC and the federal courts: id `st-<code>`, path `/en/<slug>/`. */
const fromJuris = (j: (typeof ALL)[number]): RouteDef<Locale> => ({ id: `st-${j.code}`, paths: { en: `/en/${j.slug}/` } });
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...PAGES.map(fromPage), ...ALL.map(fromJuris), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
