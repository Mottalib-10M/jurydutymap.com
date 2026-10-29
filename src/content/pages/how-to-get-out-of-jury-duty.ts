import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'how-to-get-out-of-jury-duty', group: 'excuse', order: 1,
  tool: { kind: 'excuse', props: { state: 'TX', age: 45, tags: 'caregiver' } },
  mini: { kind: 'mini:age', props: { s: 'FL', a: 72 } },
  related: ['jury-duty-excuse', 'postpone-jury-duty', 'jury-duty-exemption-age', 'missed-jury-duty'],
  sources: ['uscourts-scams'],
  en: {
    slug: 'how-to-get-out-of-jury-duty', nav: 'Getting excused', card: 'The excuses each state names in its law, age rules, postponement, and how to ask the court before your date.',
    title: 'Getting Out of Jury Duty Legally: Excuses Each State Allows',
    description: 'How to get out of jury duty the lawful way: the excuses your state names (child care, health, hardship, age, students), postponing, and how to ask the court.',
    h1: 'How to get out of jury duty, legally',
    intro: 'Tick what applies to you: the tool shows which grounds your state names in its law or on its court pages, and how the request is made.',
    resume: (h) => `The only lawful ways out of a jury summons are the ones the court grants: an exemption written into the law, an excuse the court accepts for a reason it recognizes, or a postponement to a better date. Nothing else works, and ignoring the summons can bring a fine. Each state lists its own grounds. Across the 50 states and DC, the laws and court pages we read name undue hardship in ${h.num(h.agg.tag('hardship').length)} jurisdictions, a medical condition in ${h.num(h.agg.tag('medical').length)}, caring for a child or dependent in ${h.num(h.agg.tag('caregiver').length)}, and breastfeeding in ${h.num(h.agg.tag('breastfeeding').length)}. Age gives an exemption by law in ${h.num(h.agg.ageAuto.length)} jurisdictions and a right to ask in ${h.num(h.agg.ageAsk.length)}, from ${h.agg.ageMin} to ${h.agg.ageMax}. A postponement is the easiest request to obtain almost everywhere. The checker above matches your situation to your state's list, read on ${h.read}.`,
    faqs: (h) => [
      { q: 'What is the best excuse to get out of jury duty?', a: `The true one that your state's law names. Courts grant requests based on documented facts: a doctor's note for a medical condition, proof that you are the only caregiver of a young child, a class schedule for a full-time student. Inventing a reason or lying on the questionnaire is perjury or contempt. If nothing on the list fits, ask for a postponement to a date that works.` },
      { q: 'Can I get out of jury duty for work?', a: `Work alone is rarely a ground, because the law protects your job while you serve. Courts do consider undue financial hardship, such as a sole proprietor with no one to run the business or a worker who would lose essential income. The usual answer to a work conflict is a postponement, which most courts grant once on request.` },
      { q: 'Does saying I am biased get me out of jury duty?', a: `Do not try it. Jury selection asks questions under oath, and a false answer given to avoid serving can be perjury or contempt of court. Honest answers about real experiences or views are a different matter: the judge and lawyers may excuse you from a particular trial because of them, but you remain a summoned juror for that day.` },
      { q: 'How do I ask to be excused?', a: `Follow your summons: most courts take requests through their online juror portal or the paper questionnaire, before the reporting date. Give the reason in a sentence or two and attach the proof the court asks for. Then wait for the answer: until the court excuses or postpones you in writing or on the portal, you must report as summoned.` },
    ],
    body: (h) => {
      const rows = (['hardship', 'medical', 'caregiver', 'student', 'distance', 'breastfeeding', 'military', 'recent', 'responder', 'business'] as const).map((t) => [({ hardship: 'Undue or financial hardship', medical: 'Illness or disability', caregiver: 'Caring for a child or dependent', student: 'Full-time student', distance: 'Distance or transport', breastfeeding: 'Breastfeeding', military: 'Active military duty', recent: 'Served recently', responder: 'Emergency or essential public worker', business: 'Sole proprietor or key employee' } as Record<string, string>)[t], h.num(h.agg.tag(t).length)]);
      return `<h2>Exemption, excuse, postponement: three different things</h2>
<p>An <strong>exemption</strong> is set by statute: if you meet it, you may claim it, and in some states you are simply not eligible to serve, such as non-citizens or people under 18. An <strong>excuse</strong> is granted by the court for a reason the law or the court recognizes, often with proof; the judge or jury commissioner decides. A <strong>postponement</strong> (deferral) moves your service to a later date without excusing you, and it is granted far more freely, usually once and within a set window.</p>
<p>The distinction matters because the paperwork differs. An age exemption may be claimed with a tick on the questionnaire; a medical excuse needs a doctor's note; a postponement usually needs only a date. Check which one you are asking for before writing to the court.</p>
<h2>The grounds states name most often</h2>
<p>The count below is how many of the 51 jurisdictions (the 50 states and DC) name each ground in the statute or official court page we read. A ground missing from a state's list is not necessarily refused: many laws give the judge broad discretion for "undue hardship", which can cover child care or travel without naming them.</p>
${h.table(['Ground', 'Jurisdictions that name it'], rows, `Grounds named in state statutes and official court pages, read on ${h.read}.`, ['l', 'r'])}
<h2>Age</h2>
<p>Age rules split into two families. In ${h.num(h.agg.ageAuto.length)} jurisdictions people above a set age are exempt or disqualified by law and can decline without giving another reason. In ${h.num(h.agg.ageAsk.length)} they may ask to be excused, and the court grants it on request. ${h.agg.ageNone.length ? `${h.names(h.agg.ageNone)} set no upper age at all.` : ''} The ${h.a('jury-duty-exemption-age', 'age page')} lists every state with its age and the law.</p>
<h2>What does not work</h2>
<p>Ignoring the summons does not end it: the court can send a second notice, an order to appear, or a fine, and some statutes allow jail for contempt. Giving false answers to look unsuitable is perjury. Moving the problem to the day of service, by turning up and hoping to be sent home, wastes a day you could have postponed. The honest request filed early is both the lawful route and the one most likely to succeed.</p>
<p>Beware also of anyone who calls to "clear" a missed summons for a fee. Courts write to jurors and do not take payment over the phone; the ${h.a('jury-duty-scam', 'scam page')} lists the warning signs published by the ${h.src('uscourts-scams', 'federal courts')}.</p>
<h2>Writing the request</h2>
<p>Keep it short and factual: who you are, your juror number, the reason in one sentence, the proof attached, and a date you could serve instead if the court prefers to postpone. The ${h.a('jury-duty-excuse', 'request letter tool')} writes it for you in the browser; nothing is sent. Then follow your summons for where to file it, usually the court's juror portal.</p>`;
    },
  },
});
