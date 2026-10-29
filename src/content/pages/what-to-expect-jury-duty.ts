import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'what-to-expect-jury-duty', group: 'serve', order: 4,
  tool: { kind: 'checklist', props: { phase: 'before' } },
  mini: { kind: 'mini:court-pay', props: { s: 'IL', d: 2 } },
  related: ['how-long-is-jury-duty', 'jury-duty-pay', 'postpone-jury-duty', 'jury-duty-scam'],
  sources: ['uscourts-scams'],
  en: {
    slug: 'what-to-expect-jury-duty', nav: 'What to expect', card: 'From the summons to the verdict: a checklist for each step, what to bring, and how jury selection works.',
    title: 'Jury Duty Checklist: What to Expect From Summons to Verdict',
    description: 'What to expect at jury duty: a checklist for the summons, the evening before and the day, what to bring, how jury selection works, and what jurors may not do.',
    h1: 'What to expect at jury duty, step by step',
    intro: 'Pick the moment you are at: the checklist shows what is left to do. Your summons and your court\'s juror page prevail.',
    resume: (h) => `Jury duty runs in four stages, and each has its own small tasks. When the summons arrives, you confirm the court and date, answer the questionnaire, ask for a postponement or excuse if you need one, and tell your employer. The evening before, many courts ask you to check a phone line or the juror portal, because groups are often cancelled or moved. On the day, you pass a security screening, wait in the jury assembly room, and may be sent to a courtroom for jury selection, where the judge and lawyers ask questions to choose the jurors for a case. If you are chosen, you hear the evidence, follow the judge's instructions and deliberate with the other jurors until a verdict, without researching the case on your own. Most people serve one day; the ${h.a('how-long-is-jury-duty', 'length page')} gives your state's term. Court fees for the day, from ${h.m(0)} to ${h.m(h.dayRate(h.agg.byDay1[0], 1))} on day one depending on the state, are set by law.`,
    faqs: (h) => [
      { q: 'What should I bring to jury duty?', a: `Your summons or juror badge, a photo ID, something to read, a phone charger and any medication you need during the day. Many courts allow phones in the assembly room but not in the courtroom during trial. Leave knives and anything sharp at home: courthouses screen visitors at the entrance, and each court lists the items it refuses at the door.` },
      { q: 'What happens during jury selection?', a: `A group of summoned jurors goes to a courtroom, where the judge describes the case and asks questions, and the lawyers may ask more. The purpose is to find jurors who can decide the case fairly. Some people are excused for cause, such as knowing a party, and each side can excuse a limited number without giving a reason. Answer honestly; you are under oath.` },
      { q: 'Can jurors use their phones or look up the case?', a: `During a trial, jurors may not research the case, the people involved or the law, online or anywhere else, and may not post or message about it. Judges give this instruction because a verdict must rest only on the evidence heard in court. Breaking it can force a new trial and lead to contempt. Phones are usually allowed during breaks for personal matters.` },
    ],
    body: (h) => `<h2>When the summons arrives</h2>
<p>Read it the day it comes. It tells you which court summoned you (state or federal, and which county or district), the reporting date and time, and how to answer the questionnaire. The questionnaire checks your eligibility: citizenship, residence, age, language, and in some states past convictions. Answer it truthfully and on time; a missing answer is treated like a missed date. If the date is a problem, ask now: the ${h.a('postpone-jury-duty', 'postponement page')} explains the rules, and the ${h.a('jury-duty-excuse', 'excuse request tool')} writes the request. Tell your employer in writing and check what your state's law says about pay on your state's page.</p>
<h2>The evening before</h2>
<p>Many courts ask jurors to call a recorded line or check the portal after a set hour to learn whether their group must report. Do it: you may not be needed at all. Lay out your ID and summons, plan the trip and parking, and arrange child care for the whole day, since you may not know when you will be released. The checklist above has a step for each of these.</p>
<h2>The day: assembly room and selection</h2>
<p>You check in, receive a badge, and usually watch an orientation that explains the process. Then comes waiting, sometimes for hours, until a courtroom requests a panel. If your group is called, the questioning called voir dire begins. Some jurors are excused because they know someone in the case or cannot be fair; each side may also use a limited number of challenges without explanation. Being excused from one trial is normal and says nothing about you.</p>
<h2>If you are chosen</h2>
<p>The judge swears in the jury and gives instructions you must follow throughout the trial: listen to the evidence, do not discuss the case with anyone until deliberation, do not research anything, and tell the court if someone approaches you about the case. At the end, the judge explains the law, and the jury deliberates in private until it reaches a verdict. Ask the clerk for proof of attendance for each day if your employer needs it. The mini-tool on this page gives the court fees for your days.</p>
<h2>What jurors are owed</h2>
<p>A fee for each day set by law, sometimes mileage, and protection of your job; in some states, continued wages from your employer for the first days. The ${h.a('jury-duty-pay', 'pay page')} compares every state. You owe the court your presence, honest answers and your attention. Nobody legitimate will ever ask you to pay to serve or to settle a missed date by phone.</p>
<h2>Needs and accommodations</h2>
<p>If you have a disability, a medical need or difficulty with English, tell the jury office before your date, using the contact on the summons. Courts arrange accessible entrances, seating and breaks, and can provide interpreters for hearing-impaired jurors. If you need to leave at a set time for medication or care, say so at check-in rather than on the bench. A juror who cannot follow the proceedings in English is usually not qualified to serve, which the questionnaire asks about.</p>`,
  },
});
