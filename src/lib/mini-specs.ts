/**
 * Mini-tools of the pages (RECETTE §9.3): one subject = one calculation, always through the engine
 * (`lib/engine/jury.ts`) and `data/states.json`, never a second formula.
 * Select inputs hold the index of a jurisdiction in ALL; date inputs a day number (days since 1970-01-01, UTC).
 */
import type { MiniSpec } from './mini-types';
import { ALL, courtPay, employerDue, ageStatus, nextSummons, rankByPay, dayRate, READ_ON, type Juris } from './engine/jury';
import { money, formatNumberL, dateL } from './format-l';
import { dayNum, isoOf } from './engine/dates';
import P from '../data/params-2026.json';

const BUILD_DAY: string = typeof __BUILD_DAY__ !== 'undefined' ? __BUILD_DAY__ : READ_ON;
const TODAY = dayNum(BUILD_DAY);
const OPTS = ALL.map((j, i) => ({ value: String(i), label: j.kind === 'federal' ? 'Federal court' : j.name }));
const idx = (code: string) => Math.max(0, ALL.findIndex((j) => j.code === code));
const J = (i: number): Juris => ALL[Math.max(0, Math.min(ALL.length - 1, Math.round(i)))];
const st = (code: string) => ({ id: 's', label: 'Court', def: idx(code), options: OPTS });
const ns = (s: string | null | undefined) => s ?? 'not specified by the state';
const read = `Rules read on ${dateL(READ_ON)}.`;

const SPECS: Record<string, () => MiniSpec> = {
  'court-pay': () => ({
    title: 'Court fees for your days of service', cta: 'Jury duty pay in every state', ctaPage: 'jury-duty-pay',
    inputs: [st('TX'), { id: 'd', label: 'Days of service', def: 5, unit: 'days', max: 90 }],
    run: (v) => {
      const j = J(v.s); const d = Math.max(0, Math.round(v.d));
      return { head: [`${j.name}, ${d} day${d === 1 ? '' : 's'}`, money(courtPay(j, d))], rows: [['First day', money(dayRate(j, 1))], [`Day ${Math.max(2, d)}`, money(dayRate(j, Math.max(2, d)))], ['Mileage', ns(j.pay.mileage)]], note: `${j.pay.law ?? ''} ${j.pay.countyVaries ? 'State minimum; counties may pay more.' : ''} ${read}`.trim() };
    },
  }),
  employer: () => ({
    title: 'Does your employer have to pay you?', cta: 'Employer duties in every state', ctaPage: 'employer-pay-jury-duty',
    inputs: [st('NY'), { id: 'd', label: 'Days of service', def: 3, unit: 'days', max: 90 }, { id: 'w', label: 'Your pay for a day of work', def: 200, unit: '$', max: 5000 }, { id: 'e', label: 'People at your employer', def: 25, max: 1000000 }],
    run: (v) => {
      const j = J(v.s); const r = employerDue(j, v.d, v.w, v.e);
      return { head: [r.applies ? `${j.name}: wages your employer must pay` : `${j.name}: what the law requires`, r.applies ? money(r.amount) : 'No wages due'], rows: [['Days covered by the law', formatNumberL(r.days)], ['Job protected', j.employer.protection === null ? 'not specified' : j.employer.protection ? 'yes' : 'no'], ['Law', ns(j.employer.law)]], note: j.employer.text };
    },
  }),
  age: () => ({
    title: 'Can you be excused because of your age?', cta: 'Age exemptions in every state', ctaPage: 'jury-duty-exemption-age',
    inputs: [st('FL'), { id: 'a', label: 'Your age', def: 72, unit: 'years', max: 120 }],
    run: (v) => {
      const j = J(v.s); const s = ageStatus(j, Math.round(v.a));
      const head = { exempt: 'Exempt: claim it on the form', 'may-ask': 'You may ask to be excused', no: 'Age alone does not excuse you', unknown: 'Not specified by the state' }[s];
      return { head: [j.name, head], rows: [['Age set by law', j.age.age === null ? 'none' : `${j.age.age}`], ['How', j.age.rule === 'automatic' ? 'by law' : j.age.rule === 'on-request' ? 'on request' : '-'], ['Law', ns(j.age.law)]], note: j.age.text };
    },
  }),
  next: () => ({
    title: 'When can you be summoned again?', cta: 'How long jury duty lasts', ctaPage: 'how-long-is-jury-duty',
    inputs: [st('CA'), { id: 'l', label: 'Last day you served', def: TODAY - 30, date: true }],
    run: (v) => {
      const j = J(v.s); const n = nextSummons(j, isoOf(v.l));
      return { head: [`${j.name}: not again before`, n ? dateL(n) : 'not specified'], rows: [['Rule', j.frequency.months === null ? 'not specified by the state' : `${j.frequency.months} months`], ['Term', ns(j.term.text)]], note: j.frequency.text ?? read };
    },
  }),
  penalty: () => ({
    title: 'What happens if you miss jury duty?', cta: 'Missed jury duty: what to do', ctaPage: 'missed-jury-duty',
    inputs: [st('GA')],
    run: (v) => {
      const j = J(v.s);
      return { head: [`${j.name}: maximum fine`, j.penalty.fine === null ? 'not specified' : money(j.penalty.fine)], rows: [['Maximum jail', j.penalty.jail === null ? 'not specified' : `${formatNumberL(j.penalty.jail)} days`], ['Law', ns(j.penalty.law)]], note: j.penalty.text ?? read };
    },
  }),
  rank: () => ({
    title: 'Which states pay jurors the most?', cta: 'Compare states', ctaPage: 'compare-jury-duty-by-state',
    inputs: [{ id: 'd', label: 'Days of service', def: 3, unit: 'days', max: 60 }],
    run: (v) => {
      const d = Math.max(1, Math.round(v.d)); const r = rankByPay(d);
      return { head: [`Highest court fees for ${d} day${d === 1 ? '' : 's'}`, `${r[0].j.name}, ${money(r[0].pay)}`], rows: r.slice(1, 5).map((x) => [x.j.name, money(x.pay)] as [string, string]).concat([[`Lowest: ${r[r.length - 1].j.name}`, money(r[r.length - 1].pay)]]), note: `State figures; some counties pay more. ${read}` };
    },
  }),
  term: () => ({
    title: 'How long will your service last?', cta: 'One day or one trial explained', ctaPage: 'how-long-is-jury-duty',
    inputs: [st('NY')],
    run: (v) => {
      const j = J(v.s);
      return { head: [j.name, j.odot === null ? 'Term set by the court' : j.odot ? 'One day or one trial' : 'Term set by the court'], rows: [['Term', ns(j.term.text)], ['Wait before next summons', j.frequency.months === null ? 'not specified' : `${j.frequency.months} months`]], note: read };
    },
  }),
  tax: () => ({
    title: 'Jury pay on your federal tax return', cta: 'Jury duty pay in every state', ctaPage: 'jury-duty-pay',
    inputs: [{ id: 'f', label: 'Jury fees you received this year', def: 150, unit: '$', max: 100000 }, { id: 'g', label: 'You handed them to your employer', def: 0, options: [{ value: '0', label: 'No, I kept them' }, { value: '1', label: 'Yes, employer kept paying my salary' }] }],
    run: (v) => {
      const f = Math.max(0, v.f); const back = v.g === 1 ? f : 0;
      return { head: ['Jury pay that stays taxable', money(f - back)], rows: [[`Report on ${P.irs.incomeLine}`, money(f)], [`Deduct on ${P.irs.repayLine}`, money(back)]], note: `IRS ${P.irs.pub}: jury duty pay is income; the part you must give to an employer who kept paying your salary is an adjustment to income. Mileage refunds are not covered here.` };
    },
  }),
};

export function getSpec(kind: string): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini-tool ${kind}`);
  return f();
}
export const MINI_KINDS = Object.keys(SPECS);
