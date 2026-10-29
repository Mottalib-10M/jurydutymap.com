/** Jury engine: cases worked out by hand from the statutes recorded in data/states.json. */
import { describe, expect, it } from 'vitest';
import { ALL, STATES, FEDERAL, byCode, dayRate, courtPay, employerDue, weekIncome, ageStatus, ageOn, excuseMatch, nextSummons, rankByPay } from '../src/lib/engine/jury';

describe('data', () => {
  it('52 entries: 50 states, DC, federal; unique slugs', () => {
    expect(ALL.length).toBe(52);
    expect(STATES.length).toBe(51);
    expect(new Set(ALL.map((j) => j.slug)).size).toBe(52);
  });
  it('every stated figure has an official source, never a private legal database', () => {
    for (const j of ALL) {
      if (j.pay.daily !== null) expect(j.pay.src, `${j.code} pay`).toBeTruthy();
      if (j.age.age !== null) expect(j.age.src, `${j.code} age`).toBeTruthy();
      for (const u of [j.pay.src, j.employer.src, j.age.src, j.excuses.src, j.penalty.src, j.term.src, j.frequency.src, j.deferral.src]) {
        if (u) expect(u, j.code).not.toMatch(/findlaw|justia|cornell\.edu|casetext|public\.law|nolo|wikipedia|ncsl\.org/);
      }
    }
  });
});
describe('pay', () => {
  it('federal: $50 a day, $60 from day 11 (28 U.S.C. § 1871)', () => {
    expect(dayRate(FEDERAL, 1)).toBe(50);
    expect(dayRate(FEDERAL, 11)).toBe(60);
    expect(courtPay(FEDERAL, 12)).toBe(10 * 50 + 2 * 60);
  });
  it('California: nothing on day 1, $15 from day 2', () => {
    const ca = byCode('CA');
    expect(dayRate(ca, 1)).toBe(0);
    expect(courtPay(ca, 3)).toBe(30);
  });
  it('Texas: $20 then $58', () => { expect(courtPay(byCode('TX'), 3)).toBe(20 + 58 + 58); });
  it('ranking leaves out states without a statewide fee', () => {
    const r = rankByPay(1);
    expect(r.every((x) => x.j.pay.daily !== null)).toBe(true);
    expect(r[0].pay).toBeGreaterThanOrEqual(r[r.length - 1].pay);
  });
});
describe('employer', () => {
  it('New York: employers over 10 staff pay up to $72 for 3 days; the court tops up only the shortfall', () => {
    const ny = byCode('NY');
    expect(employerDue(ny, 5, 200, 50)).toEqual({ amount: 216, days: 3, applies: true });
    expect(employerDue(ny, 5, 200, 10).applies).toBe(false);
    const w = weekIncome(ny, 5, 200, 50, false);
    expect(w.court).toBe(2 * 72);
    expect(w.total).toBe(216 + 144);
  });
  it('Colorado: up to $50 a day for 3 days', () => { expect(employerDue(byCode('CO'), 5, 200, 5).amount).toBe(150); });
  it('a state with no wage duty owes nothing; a voluntary policy is counted', () => {
    const tx = byCode('TX');
    expect(employerDue(tx, 3, 200, 100).amount).toBe(0);
    expect(weekIncome(tx, 3, 200, 100, true).employer).toBe(600);
  });
});
describe('age, excuses, frequency', () => {
  it('Texas: 75 and over may claim an exemption', () => {
    const tx = byCode('TX');
    expect(ageStatus(tx, 74)).toBe('no');
    expect(ageStatus(tx, 75)).toBe('may-ask');
    expect(ageStatus(byCode('CA'), 90)).toBe('no');
  });
  it('age on a date', () => { expect(ageOn('1951-11-01', '2026-10-29')).toBe(74); expect(ageOn('1951-10-29', '2026-10-29')).toBe(75); });
  it('excuse match keeps named and unnamed grounds apart', () => {
    const r = excuseMatch(byCode('CA'), 40, ['caregiver', 'student']);
    expect(r.hits).toEqual(['caregiver']);
    expect(r.misses).toEqual(['student']);
  });
  it('next summons: California 12 months, end of month kept', () => {
    expect(nextSummons(byCode('CA'), '2026-10-29')).toBe('2027-10-29');
    expect(nextSummons(byCode('CA'), '2028-02-29')).toBe('2029-02-28');
  });
});
