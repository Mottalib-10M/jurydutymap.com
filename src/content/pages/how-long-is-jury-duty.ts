import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'how-long-is-jury-duty', group: 'serve', order: 1,
  tool: { kind: 'mini:term', props: { s: 'NY' } },
  mini: { kind: 'mini:next', props: { s: 'CA' } },
  related: ['what-to-expect-jury-duty', 'postpone-jury-duty', 'jury-duty-pay', 'st-US'],
  sources: ['uscourts-scams'],
  en: {
    slug: 'how-long-is-jury-duty', nav: 'How long it lasts', card: 'One day or one trial, terms set by statute, and how long before the same courts can summon you again.',
    title: 'Jury Duty Length: One Day or One Trial, Terms by State',
    description: 'How long is jury duty? One day or one trial in many states, longer terms elsewhere, grand juries for months, and how long before you can be summoned again.',
    h1: 'How long is jury duty?',
    intro: 'Choose the court: the tool gives the length of service its law sets and how long you are protected from another summons.',
    resume: (h) => `For most people jury duty lasts one day. Many states use a "one day or one trial" system: you report once, and if you are not picked for a trial by the end of that day, your service is over; if you are picked, you serve until that trial ends. We found the system written in the law or court pages of ${h.num(h.agg.odot.length)} of the 51 jurisdictions. Others summon jurors for a term, often a week or a set number of days, with the possibility of being called on several days. Trials themselves are usually short, but some last weeks, and the judge tells the panel the expected length during selection. Grand juries are different: federal grand jurors generally serve up to 18 months, meeting a few days a month. After you serve, ${h.num(h.agg.freq.length)} jurisdictions protect you from a new summons for a set time. The tool gives your state's rule, read on ${h.read}.`,
    faqs: (h) => [
      { q: 'What does one day or one trial mean?', a: `It means your obligation ends after one day at the courthouse unless you are selected for a trial that day, in which case it ends with that trial. You are not called back the next week for another case. ${h.num(h.agg.odot.length)} jurisdictions in our data state this rule; elsewhere the summons gives the term, such as a week.` },
      { q: 'How long does a jury trial last?', a: `There is no fixed length. Many trials end within a few days, while complex criminal or civil trials can run for weeks. During jury selection the judge tells the panel how long the trial is expected to take, and you can explain then if that length would cause real hardship. Federal law caps petit jury service at thirty days in two years, except to finish a case.` },
      { q: 'What time does jury duty end each day?', a: `Courts typically follow normal working hours, and the jury office states the reporting time on the summons. Panels that are not needed may be released before the end of the day. Deliberating juries may stay later. Expect a full working day and arrange child care and parking for it, then be glad if you leave early.` },
    ],
    body: (h) => {
      const rows = h.STATES.map((j) => [h.st(j.code), j.odot === null ? 'not specified' : j.odot ? 'yes' : 'no', j.term.text ?? 'not specified', j.frequency.months === null ? 'not specified' : `${h.num(j.frequency.months)} months`]);
      return `<h2>Service length in every state</h2>
<p>The table gives, for each jurisdiction, whether the one day or one trial rule appears in the law or court pages we read, the term in our words, and the protected period before another summons. A county court may run shorter terms than the statute allows, so your summons has the last word on your own dates.</p>
${h.table(['State', 'One day or one trial', 'Term', 'Next summons after'], rows, `Read on ${h.read}.`, ['l', 'l', 'l', 'r'])}
<h2>A day at the courthouse</h2>
<p>The day starts in a jury assembly room with an orientation, then waiting until a courtroom asks for a panel. Selected panels go to the courtroom for questioning, called voir dire, where the judge and lawyers choose the jurors for the case. People not chosen go back to the assembly room or home. The ${h.a('what-to-expect-jury-duty', 'what to expect page')} has a checklist for each step.</p>
<h2>Federal service</h2>
<p>A federal trial juror hears at most one case and is then discharged, and nobody can be required to attend more than thirty days as a petit juror in a two-year period, except to finish a case, under 28 U.S.C. § 1866. Grand jurors generally serve up to 18 months, extended to 24 by a judge, but meet only on scheduled days. The ${h.st('US', 'federal page')} has the pay for long service.</p>
<h2>How soon you can be summoned again</h2>
<p>Serving earns you a break in most states, but it applies to the court system that summoned you: state service does not protect you from a federal summons, and the reverse. A postponement or an excuse usually does not count as service. The second tool on this page computes the date from the last day you served.</p>`;
    },
  },
});
