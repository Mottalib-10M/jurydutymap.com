import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'jury-duty-pay', group: 'pay', order: 1,
  tool: { kind: 'pay', props: { state: 'TX', days: 5, wage: 180, title: 'Jury duty pay for your days and your wage' } },
  mini: { kind: 'mini:rank', props: { d: 3 } },
  related: ['employer-pay-jury-duty', 'jury-duty-taxes', 'compare-jury-duty-by-state', 'st-US'],
  sources: ['irs-p525'],
  en: {
    slug: 'jury-duty-pay', nav: 'Jury duty pay', card: 'The juror fee of every state day by day, what your employer adds by law, and the income you lose.',
    title: 'Jury Duty Pay by State 2026: Daily Fee, Mileage, Employer',
    description: 'Jury duty pay in all 50 states, DC and federal court: the daily juror fee, the days that pay more or nothing, mileage, and wages your employer must add.',
    h1: 'Jury duty pay by state: what each day pays you',
    intro: 'Pick the court, your days and your normal day of pay: the tool adds the juror fee the law sets and what your employer must keep paying.',
    resume: (h) => `Jury duty pay is a fee set by each state's law, not a wage, and it is small almost everywhere. Federal courts pay ${h.m(h.dayRate(h.FEDERAL, 1))} a day under 28 U.S.C. § 1871. Among the 50 states and DC, the first day pays the most in ${h.names(h.agg.byDay1.slice(0, 3))} (${h.agg.byDay1.slice(0, 3).map((j) => h.m(h.dayRate(j, 1))).join(', ')}), and ${h.agg.unpaidDay1.length ? `${h.num(h.agg.unpaidDay1.length)} pay nothing for it at all` : 'every state that sets a fee pays something from the first day'}. In ${h.num(h.agg.raises.length)} jurisdictions the daily fee rises after the first day or after a set number of days, which rewards long trials but not the usual one-day service. The fee is taxable income. What matters more for most households is the employer: in ${h.num(h.agg.empPays.length)} jurisdictions the law makes some employers keep paying wages for a few days, and everywhere else that depends on the company. The calculator puts both together for your own days and pay, read in each state's code on ${h.read}.`,
    faqs: (h) => [
      { q: 'Why is jury duty pay so low?', a: `Because the fee is meant to cover the day, not replace a wage. Most state rates were set decades ago and are changed only by a new law: the federal rate of ${h.m(h.dayRate(h.FEDERAL, 1))} comes from 28 U.S.C. § 1871. A few states pay more after the first days to soften long trials. Your real income depends on whether your employer keeps paying you, by law or by policy.` },
      { q: 'Do I get paid for jury duty if I am not picked for a jury?', a: `Yes. The fee is paid for each day you attend court as a summoned juror, whether you sit on a trial or wait in the assembly room and go home. The day rate is the same, except in states that pay less or nothing for the first day. Keep the attendance slip the clerk gives you; payment usually arrives by check or card a few weeks later.` },
      { q: 'Is mileage paid on top of the daily fee?', a: `In many states, yes, but the rule varies: some pay per mile each way, some only from the second day, some nothing. Federal courts reimburse travel at the rate set for court staff using private cars, plus tolls. The table on each state page shows the mileage rule we read in the statute, or says when the statute does not set one.` },
      { q: 'Can I refuse the juror fee or give it to my employer?', a: `Whether a juror can waive the fee is set by each court, so ask the jury office named on your summons. Handing the fee to your employer is a different matter: an employer that keeps paying your full salary may ask for it under its leave policy. The IRS lets you deduct the amount you hand over, as the taxes page explains with the two lines of Schedule 1.` },
    ],
    body: (h) => {
      const rows = h.agg.byDay1.map((j) => [h.st(j.code), h.m(h.dayRate(j, 1)), h.m(h.dayRate(j, 5)), h.m(h.courtPay(j, 5)), j.pay.countyVaries ? 'minimum' : '']);
      return `<h2>Every state's juror fee on one page</h2>
<p>The table ranks the 50 states and DC by what the first day of service pays, then gives the fifth day and a full five-day week. A week is a useful benchmark for a trial juror; many states limit service to one day or one trial, as their pages say. Where a state sets only a floor and lets counties pay more, the row says so; the fee you receive is then on your county court's juror page. The link on each state opens its page, with the statute behind the number.</p>
${h.table(['State', 'Day 1', 'Day 5', 'Five days', 'Note'], rows, `Juror fees read in each state's code or court page on ${h.read}. Before tax, mileage left out.`, ['l', 'r', 'r', 'r', 'l'])}
<h2>Three ways states pay</h2>
<p>A flat fee is the most common design: the same amount for every day you attend. A second group pays a token amount or nothing for the first day and a higher fee from the second, on the reasoning that one day is a civic duty and a trial is a job. A third group raises the fee only for long trials, after ten or thirty days. The federal courts combine the first and third designs: ${h.m(h.dayRate(h.FEDERAL, 1))} from the first day and up to ${h.m(h.dayRate(h.FEDERAL, 30))} a day once a trial juror has sat more than ten days on one case, at the judge's discretion.</p>
<p>The pattern changes the answer to a simple question. For one day in court, a flat-fee state pays you its daily rate while a stepped state may pay nothing. For a three-week trial, the stepped states often come out ahead. The calculator above applies the right day rate to each day you enter, so try your expected length rather than one day.</p>
<h2>The employer matters more than the fee</h2>
<p>For someone earning ${h.m(200)} a day, a five-day trial costs ${h.m(1000)} of wages, and no juror fee comes close. Whether that money is lost depends on your employer. ${h.num(h.agg.empPays.length)} jurisdictions require some employers to keep paying, usually for the first few days and sometimes only above a staff size; the ${h.a('employer-pay-jury-duty', 'employer page')} lists them. Elsewhere the law protects your job but not your pay, and the answer is in your company's leave policy.</p>
<!--tool:mini:employer-->
<p>Hourly and gig workers lose the most when no employer policy covers them. Self-employed people bear the whole cost; if a long trial would cause real financial hardship, ask the court to postpone or excuse you early, with proof of income, rather than on the day.</p>
<h2>Getting paid and declaring it</h2>
<p>Courts pay by check, direct deposit or a prepaid card, usually weeks after service; the jury office states its own schedule. Keep your attendance record: an employer that continues your pay may ask for it. Jury pay is income on your federal return, and if you had to give it to an employer who kept paying your salary, you deduct that amount; the ${h.a('jury-duty-taxes', 'taxes page')} shows the two lines of ${h.src('irs-p525', 'IRS Publication 525')}.</p>`;
    },
  },
});
