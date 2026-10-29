import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'postpone-jury-duty', group: 'excuse', order: 3,
  tool: { kind: 'letter', props: { state: 'NY', kind: 'work' } },
  mini: { kind: 'mini:next', props: { s: 'NY' } },
  related: ['jury-duty-excuse', 'how-to-get-out-of-jury-duty', 'how-long-is-jury-duty', 'missed-jury-duty'],
  sources: ['uscourts-scams'],
  en: {
    slug: 'postpone-jury-duty', nav: 'Postponing', card: 'How to postpone jury duty in each state: how many times, how far ahead, and the request written for you.',
    title: 'Postpone Jury Duty: Deferral Rules by State, Request Letter',
    description: 'Postpone jury duty to a better date: how many deferrals your state allows, how far ahead, how to ask through the juror portal, and a request written for you.',
    h1: 'How to postpone jury duty',
    intro: 'Pick the court and your reason: the tool writes a postponement request with the date you can serve, to copy into the juror portal or a letter.',
    resume: (h) => `Postponing, also called deferring, moves your jury service to a later date without excusing you, and it is the request courts grant most easily. Most courts take it online through the juror portal on the summons, often without any proof for a first request, as long as you ask before the reporting date and choose a date within the window the court allows. Limits are set state by state. ${h.J('NY').name}, for example, allows one postponement as of right to a date within six months under its Judiciary Law, and longer for a breastfeeding mother. Federal courts handle deferrals through each district's eJuror system and let you pick an alternate time if the deferral is granted. A postponement does not reset the clock on future summonses in the way service does: once you serve, ${h.num(h.agg.freq.length)} jurisdictions protect you from another summons for a set period, from ${h.num(Math.min(...h.agg.freq.map((j) => j.frequency.months as number)))} to ${h.num(Math.max(...h.agg.freq.map((j) => j.frequency.months as number)))} months. Each state page gives the deferral rule we read, with its source, on ${h.read}.`,
    faqs: (h) => [
      { q: 'How many times can you postpone jury duty?', a: `It depends on the state and sometimes on the court. Many allow one postponement on request and further ones only for a strong reason; ${h.J('NY').name} allows one as of right within six months. The rule we found for each state is in the "Postponing" row of its page. A second request should come with proof, such as a medical note or a booking.` },
      { q: 'Can I postpone jury duty online?', a: `In most courts, yes: the summons prints the address of the juror portal and a juror number to log in. The portal offers the dates the court allows. Federal district courts use eJuror for the same purpose. If your court has no portal, call or write to the jury office named on the summons, before your reporting date.` },
      { q: 'What happens if I postpone jury duty and forget the new date?', a: `You are then treated like any summoned juror who did not appear: the court may send a notice to explain the absence, set a new date, or impose the penalty its law allows. Put the new date in your calendar as soon as you get the confirmation, and call the jury office at once if you missed it.` },
    ],
    body: (h) => {
      const rows = h.STATES.filter((j) => j.deferral.text).slice(0, 51).map((j) => [h.st(j.code), j.deferral.text ?? '']);
      return `<h2>Postponement rules state by state</h2>
<p>The table gives the deferral rule we read for each jurisdiction, in our words, with the state page holding the link to the statute or court page. Where a state leaves postponement to each court, the row says so: the county jury office then sets its own limits.</p>
${h.table(['State', 'What the law or court says'], rows, `Read on ${h.read}.`, ['l', 'l'])}
<h2>When to ask</h2>
<p>As soon as the summons arrives. Portals usually close requests a few days before the reporting date, and a request on the day itself is often refused. Have a date in mind: courts like a specific week rather than "later", and some only offer a list. Choose a period you can actually keep, since a second postponement is harder to obtain.</p>
<h2>Reasons that work for a postponement</h2>
<p>Almost any honest scheduling conflict: exams, a surgery or medical treatment, a trip booked before the summons, a seasonal peak at work, a family event, childcare that you can arrange for later. Unlike an excuse, a postponement rarely needs to meet a legal test, because you still serve. That makes it the right request whenever the problem is the date rather than service itself.</p>
<h2>After you postpone</h2>
<p>You receive a new date on the portal or by mail. Tell your employer again, since the new date restarts their planning. When you have served, note the date: the mini-tool above shows when the same court system may summon you again under your state's rule. If you receive a call claiming you missed your new date and must pay, it is a scam; courts write to jurors and never take payment by phone, as the ${h.src('uscourts-scams', 'federal courts warn')}.</p>`;
    },
  },
});
