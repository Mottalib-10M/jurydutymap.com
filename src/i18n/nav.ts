import { route, hasRoute, type Locale } from './routes';
import { PAGES, pageById } from '../lib/guides';
import { STATES, FEDERAL } from '../lib/engine/jury';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Jury duty by state', method: 'Method and sources', about: 'About', widget: 'Embed a tool', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
const GROUP_LABEL: Record<Group, string> = { pay: 'Pay', excuse: 'Excuses', serve: 'Serving', states: 'States' };
export const GROUPS_ORDER: Group[] = ['pay', 'excuse', 'serve', 'states'];
export const groupLabel = (g: Group, _lang: Locale = 'en') => GROUP_LABEL[g];
const stateLabel = (id: string) => { const c = id.slice(3); const j = [...STATES, FEDERAL].find((x) => x.code === c); return j ? (j.kind === 'federal' ? 'Federal courts' : j.name) : null; };
export const label = (id: string, _lang: Locale = 'en') => CORE[id] ?? pageById(id)?.en.nav ?? (id.startsWith('st-') ? stateLabel(id) : null) ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS_ORDER.map((g) => ({ label: GROUP_LABEL[g], links: g === 'states' ? [link('home', lang), ...inGroup(g, lang), link(`st-${FEDERAL.code}`, lang)] : inGroup(g, lang) })).filter((c) => c.links.length);
}
export const navDirect = (_lang: Locale): NavLink[] => [];
/** Footer: the site's sections, then every state page (RECETTE §18.2: every page within two clicks). */
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...navCategories(lang),
  { label: 'States A to M', links: STATES.filter((j) => j.name < 'N').map((j) => link(`st-${j.code}`, lang)) },
  { label: 'States N to W', links: STATES.filter((j) => j.name >= 'N').map((j) => link(`st-${j.code}`, lang)) },
  { label: 'This site', links: ['method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
export const popularLinks = (_lang: Locale): NavLink[] => [];
