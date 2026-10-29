/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES } from '../lib/guides';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS_ORDER, groupLabel } from '../i18n/nav';
import params from '../data/params-2026.json';
import { ALL } from '../lib/engine/jury';

const words = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Jury duty in the 50 US states, the District of Columbia and the federal courts: the juror fee for each day of service, wages employers must keep paying, job protection, age exemptions, lawful excuses, postponement, length of service, time before another summons and penalties for not appearing. Each fact read in the state's code on its legislature's site or on its judiciary's official juror page, with the date. Tools: pay calculator, excuse checker, state comparator, scam checker, day checklist, request letter built in the browser. Independent site, not a court; it answers no summons. Published by Radif Partners. Last updated ${words(LAST_UPDATED)}.`,
    '',
    '## Data',
    `- State codes and court rules (official legislature and judiciary sites), 28 U.S.C. §§ 1861-1878, United States Courts, FTC and IRS pages, read ${words(params.retrieved_at)}.`,
    '',
    `- [Jury duty by state](${SITE_URL}${route('home', 'en')}): pay calculator and the rules of every state`,
    '',
    ...GROUPS_ORDER.flatMap((g) => [`## ${groupLabel(g)}`, ...PAGES.filter((p) => p.group === g).map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`), '']),
    '## Jury duty by state',
    ...ALL.map((j) => `- [${j.kind === 'federal' ? 'Federal courts' : j.name}](${SITE_URL}${route(`st-${j.code}`, 'en')})`),
    '',
    '## About',
    `- [Method and sources](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
