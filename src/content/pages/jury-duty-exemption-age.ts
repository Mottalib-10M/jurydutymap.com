import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'jury-duty-exemption-age', group: 'excuse', order: 4,
  tool: { kind: 'mini:age', props: { s: 'CA', a: 71 } },
  mini: { kind: 'mini:penalty', props: { s: 'CA' } },
  related: ['how-to-get-out-of-jury-duty', 'jury-duty-excuse', 'compare-jury-duty-by-state', 'st-US'],
  sources: ['uscourts-scams'],
  en: {
    slug: 'jury-duty-exemption-age', nav: 'Age exemption', card: 'The age at which each state lets you stop jury duty, whether it is automatic or on request, and the law.',
    title: 'Jury Duty Exemption Age by State: 65, 70, 75 and No Limit',
    description: 'Jury duty exemption age in every state: the age set by law, whether it excuses you automatically or only on request, states with no limit, and federal court.',
    h1: 'Jury duty exemption age, state by state',
    intro: 'Choose the court and enter your age: the tool says whether age alone lets you off, and how to claim it.',
    resume: (h) => `There is no national age limit for jury duty. Each state decides, and the rules fall into three groups. In ${h.num(h.agg.ageAuto.length)} jurisdictions people above a set age are exempt or disqualified by law, so they can decline the summons on age alone. In ${h.num(h.agg.ageAsk.length)} they may ask to be excused because of their age, and the court grants it on request, sometimes permanently. ${h.agg.ageNone.length ? `${h.names(h.agg.ageNone)} set no upper age, so older residents need another ground, such as a medical condition.` : ''} Where an age is set it runs from ${h.agg.ageMin} to ${h.agg.ageMax}. Federal courts have no age exemption in the statute, but most district court jury plans let people over ${h.FEDERAL.age.age ?? 70} ask for a permanent excuse. In every case the request is made on the questionnaire or to the jury office, before the reporting date. The table lists each state with its law, read on ${h.read}.`,
    faqs: (h) => [
      { q: 'At what age are you automatically excused from jury duty?', a: `Only where the state's law says so. In ${h.num(h.agg.ageAuto.length)} jurisdictions an age written in the statute makes you exempt or ineligible, so you can decline without another reason. Most of the others set an age at which you may ask, which is not automatic: if you do not answer the questionnaire, you remain on the list and must report.` },
      { q: 'Do seniors still get jury summonses?', a: `Yes. Juror lists are drawn from records such as voter and driver lists, which do not filter by age. A summons at 80 is normal in a state with an age rule: it is up to you to claim the exemption or ask to be excused on the form. In states with no age rule, a medical excuse remains available with a doctor's note.` },
      { q: 'Is the age exemption permanent?', a: `It depends on the state. Some courts record a permanent excuse once you claim it on age grounds, so you are not summoned again; others excuse you only for the current summons, and you claim it again next time. The state page cites the law; your court's juror page usually says whether a permanent excuse is offered.` },
    ],
    body: (h) => {
      const rows = h.STATES.map((j) => [h.st(j.code), j.age.rule === 'not-specified' ? 'not specified' : j.age.age === null ? 'none' : String(j.age.age), j.age.rule === 'automatic' ? 'by law' : j.age.rule === 'on-request' ? 'on request' : '-', j.age.law ?? '']);
      return `<h2>Every state's age rule</h2>
<p>Each row gives the age the statute or official court page sets, whether it works by law or on request, and the section we read. "By law" covers both exemptions and disqualifications: the wording differs but the effect for a juror is the same, you do not have to serve. "On request" means you must ask; the court excuses you, often without proof beyond your date of birth.</p>
${h.table(['State', 'Age', 'How', 'Law'], rows, `Read on ${h.read}.`, ['l', 'r', 'l', 'l'])}
<h2>How to claim it</h2>
<p>The juror questionnaire, on paper or in the portal, usually has a question on age or a list of exemptions to tick. Answer it before the deadline. If the summons has no questionnaire, call or write to the jury office named on it and give your date of birth. Some courts ask for a copy of an ID. Do not simply stay home: a summons that is not answered stays open, and the court may follow up with a notice or a penalty even if you would have been excused.</p>
<h2>Younger than the age, but unable to serve</h2>
<p>Health matters more than the number. ${h.num(h.agg.tag('medical').length)} jurisdictions name a medical condition among the grounds to be excused, usually with a doctor's note, and many courts accept a request for a permanent excuse for a lasting condition. Caring for a spouse or dependent can also be a ground. The ${h.a('how-to-get-out-of-jury-duty', 'excuses page')} shows which grounds your state names.</p>
<h2>Federal court</h2>
<p>A federal summons follows the jury plan of the district court that sent it, not the state's age rule. The Jury Selection and Service Act lets each district list groups who may ask for a permanent excuse, and most include people over ${h.FEDERAL.age.age ?? 70}. The ${h.st('US', 'federal jury page')} gives the federal pay, employer and excuse rules.</p>`;
    },
  },
});
