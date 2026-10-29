import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'jury-duty-scam', group: 'serve', order: 3,
  tool: { kind: 'scam', props: { preset: 'pay,gift,arrest' } },
  mini: { kind: 'mini:penalty', props: { s: 'FL' } },
  related: ['missed-jury-duty', 'what-to-expect-jury-duty', 'postpone-jury-duty', 'st-US'],
  sources: ['ftc-jury-scam', 'uscourts-scams', 'ftc-report'],
  en: {
    slug: 'jury-duty-scam', nav: 'Jury duty scams', card: 'The calls and messages that claim you missed jury duty: warning signs, what courts never ask, what to do if you paid.',
    title: 'Jury Duty Scam: Warning Signs, What Courts Never Ask, Help',
    description: 'Got a call saying you missed jury duty and must pay? It is a scam: the warning signs, what courts never ask for, how to check a summons, what to do if you paid.',
    h1: 'Jury duty scam: how to tell, what to do',
    intro: 'Tick what the caller, e-mail or text asked you to do: the tool shows the warning signs and the next step.',
    resume: (h) => `The jury duty scam follows one script. Someone calls, texts or emails claiming to be a U.S. Marshal, a deputy, a police officer or a court clerk. They say you missed jury duty, that a warrant has been issued, and that you will be arrested unless you pay a fine or a bond right now, often by gift card, payment app, cryptocurrency or wire transfer, sometimes while staying on the line. Some ask instead for your Social Security number or date of birth to "verify" your juror record. Every part of that is false. The Federal Trade Commission states that courts never ask you to pay over the phone and never ask potential jurors for sensitive information like a Social Security number by phone, and that only scammers insist on gift cards and similar payments. The federal courts add that real court officials will not request sensitive information by phone or email. Hang up, check with the court yourself, and report it. Sources read on ${h.read}.`,
    faqs: (h) => [
      { q: 'How do I know if a jury summons is real?', a: `Real summonses usually arrive by mail and name a specific court, a reporting date and a juror number. To check one, look up the court's own website or call the court at a number you find yourself, never the number in the message. The FTC gives the same advice. A real court will confirm whether you were summoned and what to do next.` },
      { q: 'I paid a jury duty scammer. What now?', a: `Act fast. If you paid by card or bank transfer, call your bank or card issuer at once and ask to stop or reverse the payment. If you bought gift cards, call the card company with the card numbers and receipt. Then report it at ReportFraud.ftc.gov. If you gave your Social Security number, consider freezing your credit with the three bureaus.` },
      { q: 'Do U.S. Marshals call about missed jury duty?', a: `Not to collect money. The FTC describes callers who claim to be a U.S. Marshal or police officer and demand payment for missed jury duty as scammers. Courts deal with missed service by mail and through orders to appear before a judge, never by taking payment over the phone. Impersonating a federal court official is itself a crime.` },
      { q: 'Should I report a jury duty scam call?', a: `Yes. Report it to the FTC at ReportFraud.ftc.gov, and tell the clerk of the court whose name the caller used; the federal courts ask people to notify the clerk of the U.S. District Court in their area. Reports help courts warn the public, and they help your bank if you need to dispute a payment.` },
    ],
    body: (h) => `<h2>The warning signs</h2>
<p>Each sign alone should stop you; together they are certain. A demand to pay now is the first: no court takes a fine over the phone, according to the ${h.src('ftc-jury-scam', 'FTC alert on missed jury duty calls')}. The payment method is the second: gift cards, payment apps, cryptocurrency and wire services are what scammers ask for because the money cannot be recovered. A request for your Social Security number, birth date or bank details is the third: the ${h.src('uscourts-scams', 'federal judiciary')} says its officials never ask for sensitive information by phone or email. Urgency and secrecy complete the picture: "stay on the line", "don't tell anyone", "a deputy is on the way".</p>
<h2>How real courts contact jurors</h2>
<p>Courts send summonses and questionnaires mostly by mail, with the court's name, address, a juror number and the address of the court's own portal. Some courts also send reminders by text or email to people who signed up in the portal; those messages point to the court's own website and do not ask for payment. If a court needs to talk to you about a missed date, it writes, or orders you to appear before a judge. The penalty, if any, is decided by a judge in a courtroom, not on the phone. The mini-tool on this page shows the real ceilings set by each state's law.</p>
<h2>What to do with a suspicious call or message</h2>
<p>Do not pay, do not give any number, and do not click links in the message. Hang up. Find the court's phone number on its official website, not in the message, and ask whether you were summoned. Then report the attempt at ${h.src('ftc-report', 'ReportFraud.ftc.gov')} and to the clerk of the court named by the caller. If the caller used a real official's name, the court will want to know.</p>
<h2>If you already paid or shared information</h2>
<p>Call your bank or card issuer immediately: card payments and some transfers can be disputed if you move quickly. For gift cards, contact the company that issued the card with the numbers and receipt; some can freeze unused balances. If you gave your Social Security number, place a fraud alert or a credit freeze with the credit bureaus and watch your accounts. Keep the call log and messages for the report.</p>
<h2>Why the scam works</h2>
<p>It borrows real details: actual court addresses, names of real officials, and the real fact that missing jury duty can lead to penalties. It also strikes people who did receive a summons and are unsure of a date. The defence is simple: no real penalty is ever paid on a phone call, so any call that ends with a payment is a scam.</p>
<h2>Warn the people around you</h2>
<p>Scammers often target older relatives and people who have recently moved. Tell them the one rule that settles every case: a court never asks for money by phone, text or email to cancel a warrant or a fine. A two-minute call to the clerk, using a number from the court's own website, ends the doubt.</p>`,
  },
});
