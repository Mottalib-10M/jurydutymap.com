import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'missed-jury-duty', group: 'serve', order: 2,
  tool: { kind: 'mini:penalty', props: { s: 'TX' } },
  mini: { kind: 'scam', props: { preset: 'pay,arrest' } },
  related: ['jury-duty-scam', 'postpone-jury-duty', 'how-to-get-out-of-jury-duty', 'compare-jury-duty-by-state'],
  sources: ['uscourts-scams', 'ftc-jury-scam'],
  en: {
    slug: 'missed-jury-duty', nav: 'Missed jury duty', card: 'Penalties for missing jury duty in each state, what to do now, and why a call demanding payment is a scam.',
    title: 'Missed Jury Duty: Penalties by State and What to Do Now',
    description: 'Missed jury duty? The fine and jail each state allows, what courts actually do first, how to fix it by calling the jury office, and why phone demands are scams.',
    h1: 'Missed jury duty: what happens and what to do',
    intro: 'Choose the court: the tool gives the maximum fine and jail its law allows. The steps below show how to put things right.',
    resume: (h) => `If you missed jury duty, call the jury office of the court that summoned you as soon as you notice, using the number printed on your summons or on the court's website, and ask for a new date. In practice courts usually start with a second notice or an order to appear and explain, and the penalties in the law are for people who keep ignoring the court. Those penalties are real: among the jurisdictions whose statute sets a fine, the maximum runs up to ${h.m(h.agg.fines[0]?.penalty.fine ?? 0)} in ${h.agg.fines[0]?.name ?? ''}, and some laws allow jail for contempt of court. In federal court, 28 U.S.C. § 1866 allows a fine of up to ${h.m(h.FEDERAL.penalty.fine ?? 1000)}, imprisonment of up to ${h.FEDERAL.penalty.jail ?? 3} days, community service, or a combination. One thing courts never do is call to demand payment over the phone: that is the most common jury scam, and the FTC and federal courts warn about it. Rules read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Will I be arrested for missing jury duty?', a: `Rarely as a first step. Courts generally send a notice or an order to appear and explain, and arrest is reserved for people who ignore court orders. Anyone who calls saying a warrant is out and you must pay now is a scammer: the FTC states that courts never ask you to pay over the phone. Call the jury office yourself to check.` },
      { q: 'What should I say when I call the jury office after missing my date?', a: `Give your name and juror number, say plainly that you missed the date and why, and ask to be rescheduled. Honest mistakes such as a lost letter or a change of address happen, and jury offices can usually set a new date. If you missed it for a reason the law recognizes, like illness, say so and offer proof.` },
      { q: 'I never received a summons. Can I still be penalized?', a: `Penalties require that you were properly summoned, and courts know that mail goes astray. If a court contacts you about a summons you never got, answer it promptly and explain. Keep your address current on voter and driver records, which many courts draw on to send summonses, so the next one reaches you.` },
    ],
    body: (h) => {
      const rows = h.agg.fines.map((j) => [h.st(j.code), h.m(j.penalty.fine ?? 0), j.penalty.jail === null ? '-' : `${h.num(j.penalty.jail)} days`, j.penalty.law ?? '']);
      return `<h2>Maximum penalties in each state's law</h2>
<p>These are the ceilings written in the statutes we read, sorted by fine. A judge decides the actual penalty, if any, after hearing why you did not appear. States not in the table set no specific juror fine in the sections we found, and courts there rely on their general contempt power.</p>
${h.table(['State', 'Maximum fine', 'Maximum jail', 'Law'], rows, `Read on ${h.read}.`, ['l', 'r', 'r', 'l'])}
<h2>What usually happens first</h2>
<p>The sequence depends on the court, but it tends to escalate slowly. A missed date triggers a letter asking you to reschedule or explain. A second failure may bring an order to show cause, which requires you to appear before a judge. Only an unexplained failure to obey that order leads to a fine or contempt finding. Responding at any stage, even late, usually ends the process with a new date.</p>
<h2>Fixing it today</h2>
<p>Find the court on your summons or on any letter it sent, and call the jury office or log into the juror portal. Ask for a new date and write down the name of the person you speak to. If the court has sent an order to appear, go: missing it is what turns a paperwork problem into contempt. If you were sick or had an emergency, bring proof.</p>
<h2>The scam that copies this situation</h2>
<p>Scammers call or email claiming to be a marshal, a deputy or a clerk, say you missed jury duty and face arrest, and demand payment by gift card, payment app, crypto or wire. The ${h.src('ftc-jury-scam', 'FTC')} is clear: courts never ask you to pay over the phone, and never ask potential jurors for a Social Security number or birth date by phone. The ${h.src('uscourts-scams', 'federal courts')} add that they never request sensitive information by phone or email. The checker above sorts the warning signs; the ${h.a('jury-duty-scam', 'scam page')} explains what to do if you already paid.</p>`;
    },
  },
});
