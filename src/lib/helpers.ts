/** Writing helpers handed to every page: links, figures read from data/states.json and params-2026.json, tables. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, pct, dateL } from './format-l';
import { ALL, STATES, FEDERAL, byCode, courtPay, dayRate, employerDue, rankByPay, READ_ON, type Juris } from './engine/jury';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>) {
  const a = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${a(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${a(i)}">${typeof c === 'number' ? esc(formatNumberL(c)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
/** Every content page id of the plan: a link to a planned page that is not written yet renders as text. */
export const PLANNED = [
  'jury-duty-pay', 'employer-pay-jury-duty', 'jury-duty-taxes', 'how-to-get-out-of-jury-duty', 'jury-duty-excuse', 'postpone-jury-duty',
  'jury-duty-exemption-age', 'how-long-is-jury-duty', 'missed-jury-duty', 'jury-duty-scam', 'what-to-expect-jury-duty', 'compare-jury-duty-by-state',
];
const names = (js: Juris[], links = true, aFn?: (id: string, t: string) => string) => {
  const xs = js.map((j) => (links && aFn ? aFn(`st-${j.code}`, j.name) : j.name));
  return xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
};
/** Counts and lists over the 51 jurisdictions (50 states and DC), for sentences that stay true when the data changes. */
function aggregates() {
  const S = STATES;
  const empPays = S.filter((j) => j.employer.pays === 'yes' || j.employer.pays === 'partial');
  const protect = S.filter((j) => j.employer.protection === true);
  const ageAuto = S.filter((j) => j.age.rule === 'automatic' && j.age.age !== null);
  const ageAsk = S.filter((j) => j.age.rule === 'on-request' && j.age.age !== null);
  const ageNone = S.filter((j) => j.age.rule === 'none' || (j.age.age === null && j.age.rule !== 'not-specified'));
  const ages = [...ageAuto, ...ageAsk].map((j) => j.age.age as number);
  const paid = S.filter((j) => j.pay.daily !== null);
  const day1 = (j: Juris) => dayRate(j, 1);
  const byDay1 = [...paid].sort((a, b) => day1(b) - day1(a));
  const unpaidDay1 = paid.filter((j) => day1(j) === 0);
  const raises = paid.filter((j) => j.pay.later !== null || (j.pay.from > 1 && (j.pay.daily ?? 0) > (j.pay.first ?? 0)));
  const odot = S.filter((j) => j.odot === true);
  const freq = S.filter((j) => j.frequency.months !== null);
  const fines = S.filter((j) => j.penalty.fine !== null).sort((a, b) => (b.penalty.fine ?? 0) - (a.penalty.fine ?? 0));
  const tag = (t: string) => S.filter((j) => (j.excuses.tags as string[]).includes(t));
  return { empPays, protect, ageAuto, ageAsk, ageNone, ageMin: Math.min(...ages), ageMax: Math.max(...ages), paid, byDay1, unpaidDay1, raises, odot, freq, fines, tag };
}
const AGG = aggregates();
export function helpers(lang: Locale = 'en', strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict && !PLANNED.includes(id) && !ALL.some((j) => `st-${j.code}` === id)) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  /** Link to a state's page by its USPS code ("CA"), "DC" or "US" (federal). */
  const st = (code: string, text?: string) => a(`st-${code}`, text ?? byCode(code).name);
  const J = (code: string): Juris => byCode(code);
  return {
    lang, a, ext, src, st, J, P, agg: AGG, names: (js: Juris[], links = true) => names(js, links, a), ALL, STATES, FEDERAL, courtPay, dayRate, employerDue, rankByPay,
    m: (n: number) => money(n), num: (n: number, d = 0) => formatNumberL(n, 'en', d), pc: (x: number, d = 0) => pct(x, 'en', d),
    date: (iso: string) => dateL(iso), read: dateL(READ_ON),
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al2: Array<'l' | 'r'> = []) => table(h, r, c, al2),
  };
}
export type Helpers = ReturnType<typeof helpers>;
