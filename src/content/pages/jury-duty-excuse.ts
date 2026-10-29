import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'jury-duty-excuse', group: 'excuse', order: 2,
  tool: { kind: 'letter', props: { state: 'FL', kind: 'medical' } },
  mini: { kind: 'mini:age', props: { s: 'PA', a: 76 } },
  related: ['how-to-get-out-of-jury-duty', 'postpone-jury-duty', 'jury-duty-exemption-age', 'what-to-expect-jury-duty'],
  sources: ['uscourts-scams'],
  en: {
    slug: 'jury-duty-excuse', nav: 'Excuse request', card: 'Write a jury duty excuse request in your browser: the reason, the proof to attach and a date you could serve instead.',
    title: 'Jury Duty Excuse Request: Write It, Attach Proof, File It',
    description: 'Write a jury duty excuse request: the reason your court recognizes, the proof to attach (doctor note, schedule), and where to file it. Nothing is sent.',
    h1: 'Jury duty excuse request: a letter the court can say yes to',
    intro: 'Choose the court, the request and the reason: the text is written in your browser, ready to copy into the juror portal or a letter.',
    resume: (h) => `A jury duty excuse is a request, and courts decide it on facts, so the letter that works is short, specific and backed by a document. It names the court and your juror number, states one reason in a sentence, attaches the proof the court asks for, and offers a later date in case the court prefers to postpone rather than excuse you. Most courts now take these requests through the juror portal printed on the summons, with the same content typed into a form. A medical reason calls for a note from your doctor; a child-care reason, a short explanation of why no one else can care for the child on those days; a student, a class or exam schedule; hardship, proof of income. Age is different: in ${h.num(h.agg.ageAuto.length + h.agg.ageAsk.length)} jurisdictions it is enough on its own once you reach the age the law sets, and the questionnaire often has a box for it. Until the court answers, you remain summoned.`,
    faqs: (h) => [
      { q: 'Does a doctor\'s note get you out of jury duty?', a: `Often, when it says that a condition prevents you from serving on the dates, or for good. Courts ask for a note from a licensed provider, sometimes on their own form, describing the limitation rather than the diagnosis in detail. A permanent condition may lead to a permanent excuse; a temporary one, such as surgery, usually to a postponement until you recover.` },
      { q: 'What should a jury duty excuse letter say?', a: `Your name, juror number and reporting date; the reason in one or two factual sentences; the document you attach; and a sentence offering a later date if the court prefers to postpone. Avoid long stories and opinions about the justice system. The letter tool on this page builds that text in your browser, so nothing you type leaves your device.` },
      { q: 'How long does the court take to answer an excuse request?', a: `It varies by court and by how close your date is, from a portal answer within days to a letter weeks later. File as soon as the summons arrives. If you have no answer a few days before your date, call the jury office number printed on the summons, or check the portal, and report as summoned unless told otherwise.` },
    ],
    body: (h) => `<h2>Pick the right request</h2>
<p>Ask to be <strong>excused</strong> when you cannot serve at all, or not for a long time: a lasting illness, sole care of a young child, a disability that the court cannot accommodate. Ask to <strong>postpone</strong> when the problem is the date: an exam, a surgery, a trip booked months ago, a busy season at work. Courts grant postponements more readily, and many allow one without any document. If you are unsure, ask to be excused and add that you would accept a later date: the court then has an easy way to say yes.</p>
<h2>The proof courts usually ask for</h2>
<p>For health, a signed note from a licensed provider stating that you cannot serve on the dates, or at all, and why in general terms. For caregiving, a statement of who depends on you and why no one else can step in; some courts accept your word, others ask for details. For students, a current schedule from the school. For financial hardship, recent pay records or tax papers showing what a week away would cost. For travel, the booking showing it predates the summons. The court that summoned you may publish its own list; follow it when it does.</p>
<h2>Age: often no letter at all</h2>
<p>Where the law sets an age exemption, reaching that age is the whole ground. ${h.agg.ageAuto.length} jurisdictions exempt people by law above an age between ${h.agg.ageMin} and ${h.agg.ageMax}; ${h.agg.ageAsk.length} let them ask. The questionnaire usually has a box or a line for it. The mini-tool above checks your state and age; the ${h.a('jury-duty-exemption-age', 'age page')} lists them all with the law.</p>
<h2>Filing and following up</h2>
<p>Use the channel your summons names: the juror portal, the mailed questionnaire, or the jury office by phone for urgent cases. Keep a copy of what you sent and the confirmation. A request does not suspend the summons by itself, so you still report on the date unless the court answers. If the request is refused, you can usually still ask to postpone. Never pay anyone to file an excuse for you; courts do not charge for it, and the federal courts warn about callers who ask for money or personal numbers in their name (${h.src('uscourts-scams', 'uscourts.gov')}).</p>
<h2>What we leave out</h2>
<p>There is no "magic phrase". Requests that rely on claimed prejudice, invented emergencies or exaggerated symptoms ask the court to rule on something false, and a false statement in a juror questionnaire can be punished. This tool only writes requests based on facts you can document.</p>
<h2>After the answer arrives</h2>
<p>A granted excuse usually comes as a letter, an email or a status change on the portal; keep it until the date has passed, together with a copy of what you sent. A refusal is not the end: many courts offer a postponement instead, and you can renew a hardship request closer to the date if your situation changes, again with proof. Without any answer by the week before your reporting date, call the jury office rather than assume the request was granted. Until the court confirms, the summons stands and the date remains yours.</p>`,
  },
});
