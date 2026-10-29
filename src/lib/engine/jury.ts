/**
 * Jury duty engine: pure functions over `src/data/states.json` (50 states, DC and the federal courts).
 * Every figure comes from that file, where each fact carries its law, its official page and the date read.
 * A fact the state does not set is `null` and is shown as "not specified by the state", never guessed.
 */
import DATA from '../../data/states.json';

export type Tag = 'age' | 'caregiver' | 'medical' | 'student' | 'hardship' | 'distance' | 'military' | 'breastfeeding' | 'recent' | 'responder' | 'business';
export interface Fact { law?: string | null; src: string | null; text?: string | null }
export interface Juris {
  code: string; name: string; slug: string; kind: 'state' | 'dc' | 'federal';
  pay: { first: number | null; daily: number | null; from: number; later: number | null; laterFrom: number | null; mileage: string | null; countyVaries: boolean; topUp: boolean; text: string; law: string | null; src: string | null };
  employer: { pays: 'no' | 'yes' | 'partial' | 'unknown'; days: number | null; minEmployees: number | null; dailyCap: number | null; feeOffset: boolean; text: string; protection: boolean | null; law: string | null; src: string | null };
  age: { rule: 'automatic' | 'on-request' | 'none' | 'not-specified'; age: number | null; text: string; law: string | null; src: string | null };
  odot: boolean | null;
  term: Fact; frequency: { months: number | null; text: string | null; src: string | null; law?: string | null };
  deferral: Fact; excuses: { tags: Tag[]; text: string; law: string | null; src: string | null };
  penalty: { fine: number | null; jail: number | null; text: string | null; law: string | null; src: string | null };
  portal: string | null;
  /** Official sites that could not be reached on the reading date: blanks on this entry are unconfirmed, not absent. */
  unread?: string | null;
  /** How the sources of this entry limit it (county pages, bill texts), shown on the page. */
  caveat?: string | null;
}
export const ALL = (DATA.jurisdictions as unknown as Juris[]);
export const STATES = ALL.filter((j) => j.kind !== 'federal');
export const FEDERAL = ALL.find((j) => j.kind === 'federal')!;
export const READ_ON: string = DATA.readOn;
export const byCode = (c: string) => ALL.find((j) => j.code === c) ?? ALL[0];

/** Court fee for day `d` (1-based) of service. */
export function dayRate(j: Juris, d: number): number {
  const p = j.pay;
  if (p.later !== null && p.laterFrom !== null && d >= p.laterFrom) return p.later;
  if (d < p.from) return p.first ?? 0;
  return p.daily ?? 0;
}
/** Total court fees for `days` days of service (days are whole, at least 0). */
export function courtPay(j: Juris, days: number): number {
  let t = 0;
  for (let d = 1; d <= Math.max(0, Math.floor(days)); d++) t += dayRate(j, d);
  return t;
}

/**
 * Wages a private employer must keep paying under the state's law for `days` days, for a worker earning
 * `wage` a day, at an employer of `employees` people. `feeOffset`: the law lets the employer deduct the court fee.
 */
export function employerDue(j: Juris, days: number, wage: number, employees: number) {
  const e = j.employer;
  const n = Math.max(0, Math.floor(days));
  if (e.pays === 'no' || e.pays === 'unknown') return { amount: 0, days: 0, applies: false };
  if (e.minEmployees !== null && employees < e.minEmployees) return { amount: 0, days: 0, applies: false };
  const covered = e.days === null ? n : Math.min(n, e.days);
  let amount = 0;
  for (let d = 1; d <= covered; d++) {
    let w = e.dailyCap !== null ? Math.min(wage, e.dailyCap) : wage;
    if (e.feeOffset) w = Math.max(0, w - dayRate(j, d));
    amount += w;
  }
  return { amount, days: covered, applies: covered > 0 };
}

/** One week (or any stretch) of service: what comes in compared with a normal stretch of work. */
export function weekIncome(j: Juris, days: number, wage: number, employees: number, voluntary: boolean) {
  const legal = employerDue(j, days, wage, employees);
  // topUp: on days the employer must pay, the court only pays what the wage falls short of its fee (N.Y. Jud. Law § 521).
  let court = courtPay(j, days);
  if (j.pay.topUp && legal.applies) {
    for (let d = 1; d <= legal.days; d++) {
      const paid = j.employer.dailyCap !== null ? Math.min(wage, j.employer.dailyCap) : wage;
      court -= Math.min(dayRate(j, d), paid);
    }
  }
  const employer = voluntary ? Math.max(legal.amount, Math.max(0, Math.floor(days)) * wage) : legal.amount;
  const normal = Math.max(0, Math.floor(days)) * wage;
  const total = court + employer;
  return { court, employer, legal, total, normal, gap: normal - total };
}

/** Is a person of `age` (whole years) exempt or allowed to ask for excusal on age alone? */
export function ageStatus(j: Juris, age: number): 'exempt' | 'may-ask' | 'no' | 'unknown' {
  const a = j.age;
  if (a.rule === 'not-specified') return 'unknown';
  if (a.rule === 'none' || a.age === null) return 'no';
  if (age < a.age) return 'no';
  return a.rule === 'automatic' ? 'exempt' : 'may-ask';
}

/** Whole years between two ISO dates. */
export function ageOn(birth: string, on: string): number {
  const [by, bm, bd] = birth.split('-').map(Number);
  const [y, m, d] = on.split('-').map(Number);
  let a = y - by;
  if (m < bm || (m === bm && d < bd)) a--;
  return a;
}

/** Grounds the person reports that the state's law or official court page names. */
export function excuseMatch(j: Juris, age: number, tags: Tag[]) {
  const named = new Set(j.excuses.tags);
  const st = ageStatus(j, age);
  const hits = tags.filter((t) => named.has(t));
  const misses = tags.filter((t) => !named.has(t));
  return { age: st, hits, misses, any: hits.length > 0 || st === 'exempt' || st === 'may-ask' };
}

/** Earliest date the same court system may summon you again, from the date your service ended. */
export function nextSummons(j: Juris, lastIso: string): string | null {
  const m = j.frequency.months;
  if (m === null) return null;
  const [y, mo, d] = lastIso.split('-').map(Number);
  const t = new Date(Date.UTC(y, mo - 1 + m, d));
  if (t.getUTCDate() !== d) t.setUTCDate(0);
  return t.toISOString().slice(0, 10);
}

/** States ranked by court fees for `days` days (highest first). */
export function rankByPay(days: number) {
  return STATES.filter((j) => j.pay.daily !== null).map((j) => ({ j, pay: courtPay(j, days) })).sort((a, b) => b.pay - a.pay || a.j.name.localeCompare(b.j.name));
}

export const TAG_LABEL: Record<Tag, string> = {
  age: 'Age', caregiver: 'Caring for a young child or a dependent', medical: 'Your own illness or disability', student: 'Full-time student',
  hardship: 'Financial or personal hardship', distance: 'Distance or no transport', military: 'Active military duty', breastfeeding: 'Breastfeeding',
  recent: 'Served recently', responder: 'Emergency responder or essential public worker', business: 'Sole proprietor or key employee',
};
