import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'compare-jury-duty-by-state', group: 'states', order: 1,
  tool: { kind: 'compare', props: { a: 'CA', b: 'TX', c: 'NY', days: 5 } },
  mini: { kind: 'mini:rank', props: { d: 10 } },
  related: ['jury-duty-pay', 'employer-pay-jury-duty', 'jury-duty-exemption-age', 'st-US'],
  sources: ['uscourts-scams'],
  en: {
    slug: 'compare-jury-duty-by-state', nav: 'Compare states', card: 'Three courts side by side: juror pay, employer duty, age rule, one day or one trial, penalties.',
    title: 'Jury Duty by State Compared: Pay, Employer, Age, Penalties',
    description: 'Compare jury duty in any three states or federal court: daily juror pay for your days, whether employers must pay, age exemption, term, and the maximum fine.',
    h1: 'Compare jury duty rules between states',
    intro: 'Pick up to three courts and your number of days: the table puts their rules side by side, from each state\'s own law.',
    resume: (h) => `Jury duty is one of the most local obligations in American law: the same week of service can pay ${h.m(h.courtPay(h.agg.byDay1[0], 5))} in one state and ${h.m(h.courtPay(h.agg.byDay1[h.agg.byDay1.length - 1], 5))} in another, come with continued wages in one and nothing in the next, and end at age ${h.agg.ageMin} or never. Comparing helps when you live in one state and work in another, when you have just moved, or when you receive both a state and a federal summons. The comparator above reads the same data as the state pages, where each rule links to the statute or court page it comes from. Among the 51 jurisdictions, ${h.num(h.agg.empPays.length)} make some employers keep paying, ${h.num(h.agg.ageAuto.length + h.agg.ageAsk.length)} have an age rule, ${h.num(h.agg.odot.length)} state a one day or one trial system, and ${h.num(h.agg.fines.length)} put a specific fine in the jury statute. Federal courts follow federal law wherever they sit. Read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Which state pays jurors the most?', a: `On the first day, ${h.agg.byDay1[0].name} pays the most in our data, ${h.m(h.dayRate(h.agg.byDay1[0], 1))}. The order changes with the length of service, because several states raise the fee after a few days; the mini-tool on this page ranks the states for the number of days you choose. Some counties pay more than the state minimum, so check your court's juror page.` },
      { q: 'I live in one state and work in another. Which rules apply?', a: `The rules of the court that summons you, which is the court where you live: state courts draw jurors from their own residents. For your pay, the employer duty usually follows the law of the state where you work, so compare both rows. A federal court follows federal law, which protects your job but requires no wages.` },
      { q: 'Can I be summoned by a state court and a federal court at the same time?', a: `Yes. State and federal courts keep separate juror lists and do not coordinate summonses. If the dates clash, answer both and ask one court to postpone, explaining the other summons. Service in one system does not count toward the protected period of the other, so a state service does not stop a federal summons.` },
    ],
    body: (h) => {
      const rows = h.STATES.map((j) => [h.st(j.code), j.pay.daily === null ? '-' : h.m(h.courtPay(j, 5)), j.employer.pays === 'no' ? 'no' : j.employer.pays === 'unknown' ? '-' : 'yes', j.age.age === null ? '-' : `${j.age.age}${j.age.rule === 'automatic' ? '' : '*'}`, j.penalty.fine === null ? '-' : h.m(j.penalty.fine)]);
      return `<h2>All 51 jurisdictions on one table</h2>
<p>The table sums up the four rules people compare most: a five-day week of court fees, whether some employers must keep paying, the age rule (an asterisk marks an age that works on request rather than by law), and the maximum fine in the jury statute. A dash means the statutes we read do not set the rule. Each state name opens its page with the details and the law.</p>
${h.table(['State', 'Five days of fees', 'Employer pays', 'Age', 'Maximum fine'], rows, `Read on ${h.read}. * on request.`, ['l', 'r', 'l', 'r', 'r'])}
<h2>Where the differences matter most</h2>
<p>Pay matters for long trials and for hourly workers. A state that pays little on the first day but more afterwards treats a one-day summons as a civic duty and a long trial as work. The employer rule matters for everyone with a salary: in the ${h.num(h.agg.empPays.length)} jurisdictions that require continued wages, a short service costs little, while elsewhere it depends entirely on company policy. The age rule matters for older residents, and the penalty for anyone tempted to ignore a summons.</p>
<h2>State and federal service side by side</h2>
<p>Federal courts pay ${h.m(h.dayRate(h.FEDERAL, 1))} a day under 28 U.S.C. § 1871, require no employer pay, protect your job under § 1875, and let most districts excuse people over ${h.FEDERAL.age.age ?? 70} on request. Pick "Federal court" in the comparator to set it against your state. The ${h.st('US', 'federal page')} gives the details.</p>
<h2>How the data is kept</h2>
<p>Every rule comes from the state's code on the legislature's website or from the official court juror page, with the date we read it. When a state does not set a rule, the comparator says "not specified" instead of filling the gap. The ${h.a('method', 'method page')} lists the checks.</p>`;
    },
  },
});
