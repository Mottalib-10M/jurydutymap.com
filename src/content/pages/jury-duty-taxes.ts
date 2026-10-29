import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'jury-duty-taxes', group: 'pay', order: 3,
  tool: { kind: 'mini:tax', props: { f: 150, g: 0 } },
  mini: { kind: 'mini:court-pay', props: { s: 'CA', d: 10 } },
  related: ['jury-duty-pay', 'employer-pay-jury-duty', 'st-US', 'how-long-is-jury-duty'],
  sources: ['irs-p525'],
  en: {
    slug: 'jury-duty-taxes', nav: 'Taxes on jury pay', card: 'Jury pay is taxable: the Schedule 1 line to report it and the line to deduct what you hand to your employer.',
    title: 'Jury Duty Pay and Taxes: Schedule 1 Lines 8h and 24a',
    description: 'Is jury duty pay taxable? Yes: where to report juror fees on your federal return and how to deduct the fees you hand over to an employer that kept paying you.',
    h1: 'Is jury duty pay taxable?',
    intro: 'Enter the juror fees you received this year and whether you handed them to your employer: the tool gives the two amounts for your federal return.',
    resume: (h) => `Jury duty pay is taxable: the IRS counts it as income, and ${h.P.irs.pub} says where it goes: the fees you receive are reported on ${h.P.irs.incomeLine}, among the "other income" items, not as wages. The court does not withhold tax from the fee. If your employer kept paying your salary while you served and required you to give it the juror fees, you can deduct what you handed over as an adjustment to income on ${h.P.irs.repayLine}, so the same money is not taxed twice: once as salary, once as a fee. For most jurors the amounts are small. A week of federal jury service pays ${h.m(h.courtPay(h.FEDERAL, 5))}; a week in ${h.J('CA').name} pays ${h.m(h.courtPay(h.J('CA'), 5))} in court fees. Mileage refunds are a separate question that this page does not treat. The rules here were read on irs.gov on ${h.read}.`,
    faqs: (h) => [
      { q: 'Will the court send me a tax form for my juror fees?', a: `Whether a court sends a tax form depends on the court and on the amount it paid you, so do not wait for one. Either way the fees are income: ${h.P.irs.pub} asks you to report jury duty pay you receive, with or without a form. Keep the court's payment notices or bank statement with your tax papers for the year.` },
      { q: 'Where do I report jury duty pay on Form 1040?', a: `On ${h.P.irs.incomeLine}, the line for jury duty pay among additional income. The total of Schedule 1 then flows to Form 1040. It is not entered as wages on line 1, because the court is not your employer. Tax software usually lists it under "other income" or "less common income".` },
      { q: 'I gave my jury fees to my employer. How do I avoid paying tax on them twice?', a: `Report the fees on ${h.P.irs.incomeLine}, then enter the amount you repaid to your employer on ${h.P.irs.repayLine}, an adjustment to income. Your salary for those days is already in your W-2, so the deduction removes the duplicate. This applies when your employer continued your pay and required you to turn the fees over.` },
    ],
    body: (h) => `<h2>Two lines, one rule</h2>
<p>The IRS rule fits in two sentences of ${h.src('irs-p525', 'Publication 525')}. Jury duty pay you receive is income. If you must give it to your employer because the employer kept paying your salary, the amount you give is deducted. Everything else follows from those two sentences: the fee is taxed like any small income, and an arrangement with your employer does not create extra tax.</p>
<p>The calculator above applies them. With ${h.m(150)} of fees kept, all ${h.m(150)} is taxable. With ${h.m(150)} handed to your employer, the same ${h.m(150)} is reported and deducted, and your taxable income from jury service is zero beyond the salary already on your W-2.</p>
<h2>What counts as jury duty pay</h2>
<p>The daily attendance fee set by state law, or by federal law in a federal court, is the core. Some states pay a different amount for the first day, or more for long trials; all of it is jury pay. The fees for a whole year add up across courts: a juror who served in a state court in March and a federal court in October reports both. The second tool on this page gives the court fees of any state for the number of days you served, from the same data as the state pages.</p>
<h2>When the employer pays you</h2>
<p>Wages your employer pays during jury service are ordinary wages: they appear on your W-2 with the usual withholding. In the ${h.num(h.agg.empPays.length)} jurisdictions whose law requires some employers to keep paying, those wages are still wages, not jury pay. Only the court fee goes on ${h.P.irs.incomeLine}. The ${h.a('employer-pay-jury-duty', 'employer page')} lists who must pay and for how long.</p>
<h2>State income tax</h2>
<p>States with an income tax start from federal income in different ways, and their forms change each year, so this page does not give state lines. Many states begin from federal adjusted gross income, which already includes the fee you reported. Your state revenue department's instructions for the year answer the question for certain.</p>
<h2>Keep the paper trail</h2>
<p>Keep the court's attendance record and the payment notice, plus your employer's written policy if you handed the fees over. If the IRS asks about the adjustment on ${h.P.irs.repayLine}, those documents show that you received the fees and repaid them. They also settle disputes with an employer about the days you were away.</p>
<h2>A worked example</h2>
<p>Take a juror summoned to federal court for a five-day trial. The court pays ${h.m(h.courtPay(h.FEDERAL, 5))} in fees. If the employer pays nothing during those days, the ${h.m(h.courtPay(h.FEDERAL, 5))} goes on ${h.P.irs.incomeLine} and is taxed with the rest of the year's income; no adjustment applies. If the employer keeps the full salary running and its policy asks for the fees back, the juror still reports ${h.m(h.courtPay(h.FEDERAL, 5))} as income, hands the same amount to the employer, and enters it on ${h.P.irs.repayLine}. The net effect on taxable income is nil, and the salary shows on the W-2 as usual. A juror who keeps the fees and the salary simply reports both. The same steps apply in any state, with that state's fee in place of the federal one; the calculator gives it for your days.</p>
<p>No federal tax is withheld from most juror fee payments, so a long trial can leave a small balance due in April. Courts that send a year-end statement make the total easy to find; otherwise add up the payment notices.</p>`,
  },
});
