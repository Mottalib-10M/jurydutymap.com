/**
 * Generated parts of a state page (title, description, facts table, FAQ), built from data/states.json only:
 * the sentence is chosen by the data (paid from day one or not, employer duty or not, age rule), never a
 * fixed sentence with numbers swapped. Marked `data-chrome` on the page; the state's own text is in
 * content/state-notes.ts.
 */
import { courtPay, dayRate, type Juris } from './engine/jury';
import { money, formatNumberL } from './format-l';

const fit = (cands: string[], lo: number, hi: number, what: string) => {
  const ok = cands.find((c) => c.length >= lo && c.length <= hi);
  if (!ok) throw new Error(`${what}: no candidate within ${lo}-${hi}: ${cands.map((c) => `${c.length} ${c}`).join(' | ')}`);
  return ok;
};
export const short = (j: Juris) => (j.kind === 'federal' ? 'federal court' : j.name);

export function stateTitle(j: Juris) {
  if (j.kind === 'federal') return 'Federal Jury Duty 2026: Pay, Employer Rules, Excuses';
  const n = j.name;
  return fit([
    `Jury Duty in ${n} 2026: Pay, Employer Rules, Excuses`,
    `Jury Duty in ${n} 2026: Pay, Employer Rules and Age`,
    `Jury Duty in ${n} 2026: Pay, Employer, Excuses`,
    `Jury Duty ${n} 2026: Pay, Employer, Excuses`,
    `Jury Duty in ${n} 2026: Juror Pay, Employer Rules, Excuses, Age`,
    `Jury Duty in ${n} 2026: Juror Pay, Employer Rules, Excuses`,
  ], 50, 60, n);
}
export function stateDescription(j: Juris) {
  const n = j.kind === 'federal' ? 'Federal court' : j.name;
  return fit([
    `${n} jury duty rules for 2026: juror pay day by day, whether your employer must pay you, age exemption, excuses and postponement, with the law cited.`,
    `${n} jury duty rules for 2026: juror pay day by day, whether your employer must keep paying you, age exemption, excuses and postponement, law cited.`,
    `${n} jury duty in 2026: juror pay day by day, whether your employer must keep paying you, the age exemption, excuses and postponement, with the law cited.`,
    `${n} jury duty in 2026: what jurors are paid each day, whether your employer must keep paying you, the age exemption, excuses, postponing and the law cited.`,
    `${n} jury duty in 2026: what jurors are paid each day, whether your employer must keep paying your wages, the age exemption, excuses, postponing, law cited.`,
    `${n} jury duty rules for 2026: juror pay by day, whether your employer must pay you, age exemption, excuses and postponing, with the law cited.`,
  ], 150, 160, n);
}

/** One sentence on pay, chosen by how the state pays. */
export function paySentence(j: Juris) {
  const p = j.pay;
  if (p.daily === null && p.first === null) return `${j.name} law sets no statewide juror fee that we could read; the court that summons you states its own rate.`;
  const parts: string[] = [];
  if (p.from > 1) parts.push(`${p.first ? `${money(p.first)} for ${p.from === 2 ? 'the first day' : `each of the first ${p.from - 1} days`}` : `nothing for ${p.from === 2 ? 'the first day' : `the first ${p.from - 1} days`}`}, then ${money(p.daily ?? 0)} a day`);
  else parts.push(`${money(p.daily ?? 0)} for each day you attend`);
  if (p.later !== null && p.laterFrom !== null) parts.push(`${money(p.later)} a day from day ${p.laterFrom}`);
  return `${short(j) === 'federal court' ? 'Federal courts pay' : `${j.name} pays`} ${parts.join(', and ')}${p.countyVaries ? ', as a minimum that counties may raise' : ''}. Five days come to ${money(courtPay(j, 5))} before tax.`;
}

export function factRows(j: Juris) {
  const ns = 'not specified by the state';
  const link = (src: string | null, law: string | null) => (src ? `<a href="${src}" target="_blank" rel="nofollow noopener noreferrer">${law ?? new URL(src).hostname.replace('www.', '')}</a>` : law ?? '');
  const p = j.pay;
  return [
    ['Juror pay', p.daily === null && p.first === null ? ns : `${p.from > 1 ? `${money(p.first ?? 0)} day 1${p.from > 2 ? `-${p.from - 1}` : ''}, then ` : ''}${money(p.daily ?? 0)} a day${p.later !== null ? `; ${money(p.later)} from day ${p.laterFrom}` : ''}${p.countyVaries ? ' (minimum)' : ''}`, link(p.src, p.law)],
    ['Mileage', p.mileage ?? ns, link(p.src, p.law)],
    ['Employer must keep paying', j.employer.pays === 'unknown' ? ns : j.employer.pays === 'no' ? 'No' : j.employer.text, link(j.employer.src, j.employer.law)],
    ['Job protected', j.employer.protection === null ? ns : j.employer.protection ? 'Yes' : 'No', link(j.employer.src, j.employer.law)],
    ['Age', j.age.rule === 'not-specified' ? ns : j.age.age === null ? 'No age exemption' : `${j.age.age} and over: ${j.age.rule === 'automatic' ? 'exempt by law' : 'may ask to be excused'}`, link(j.age.src, j.age.law)],
    ['Length of service', j.term.text ?? ns, link(j.term.src, j.term.law ?? null)],
    ['Before another summons', j.frequency.months === null ? ns : `${formatNumberL(j.frequency.months)} months`, link(j.frequency.src, j.frequency.law ?? null)],
    ['Postponing', j.deferral.text ?? ns, link(j.deferral.src, j.deferral.law ?? null)],
    ['Not showing up', j.penalty.text ?? ns, link(j.penalty.src, j.penalty.law)],
  ];
}

/** Three FAQ per state, answers built from the data (40 to 90 words each). */
export function stateFaqs(j: Juris) {
  const n = short(j) === 'federal court' ? 'federal court' : j.name;
  const inN = j.kind === 'federal' ? 'in federal court' : `in ${j.name}`;
  const e = j.employer;
  const empA = e.pays === 'unknown'
    ? `The statutes and court pages we read ${inN} do not say whether a private employer must keep paying wages during jury service, so we cannot confirm a duty. ${e.protection ? 'Your job is protected: an employer may not fire you for serving.' : ''} Ask your employer for its jury leave policy in writing, and the court fee is ${money(dayRate(j, 1))} a day before tax.`
    : e.pays === 'no'
    ? `No wage duty: ${e.law ?? 'the law'} does not make a private employer keep paying you during jury service ${inN}. ${e.protection ? 'It does protect your job: firing or punishing you for serving is unlawful.' : ''} Many employers pay anyway under their own policy, so read your handbook. The court fee is ${money(dayRate(j, 1))} for the first day before tax.`
    : `Yes, within limits. ${e.text} The rule comes from ${e.law ?? 'state law'}. ${e.protection ? 'Your job is also protected while you serve.' : ''} Ask your employer for its jury leave policy in writing and give it a copy of your summons as soon as it arrives.`;
  const ageA = j.age.rule === 'not-specified'
    ? `The statutes we read ${inN} set no age at which jury service ends, so age alone is not a ground we can confirm. Older jurors can still ask to be excused for a medical condition or hardship, with proof, under the excuse rules of the court that summoned them. Check the questionnaire sent with your summons.`
    : j.age.age === null
      ? `There is no upper age limit ${inN}: ${j.age.text} A person of any age may still ask to be excused for illness, disability or hardship, usually with a doctor's note. The request goes to the court or jury office named on the summons, before the reporting date.`
      : `${j.age.text} The rule is in ${j.age.law ?? 'state law'}. ${j.age.rule === 'automatic' ? 'Claim it on the questionnaire or call the jury office; you do not need a medical reason.' : 'It is a request, not an automatic exemption: answer the questionnaire and ask, otherwise you remain on the list.'} Younger jurors need another ground, such as illness or hardship.`;
  const payA = `${paySentence(j)} ${j.pay.mileage ? `Travel: ${j.pay.mileage}.` : 'Mileage is not set in the statute we read.'} The fee is taxable income on your federal return. The calculator at the top of this page adds what your employer must pay for your own days and wage.`;
  return [
    { q: `How much does jury duty pay ${inN}?`, a: payA },
    { q: `Does my employer have to pay me for jury duty ${inN}?`, a: empA },
    { q: `Is there an age limit for jury duty ${inN}?`, a: ageA },
  ].map((f) => ({ q: f.q, a: f.a.replace(/\s+/g, ' ').replace(/\s+\./g, '.').trim() }));
}
