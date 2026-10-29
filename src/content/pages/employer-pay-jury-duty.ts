import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'employer-pay-jury-duty', group: 'pay', order: 2,
  tool: { kind: 'mini:employer', props: { s: 'NY', d: 3, w: 220, e: 25 } },
  mini: { kind: 'mini:tax', props: { f: 120, g: 1 } },
  related: ['jury-duty-pay', 'jury-duty-taxes', 'what-to-expect-jury-duty', 'compare-jury-duty-by-state'],
  sources: ['irs-p525'],
  en: {
    slug: 'employer-pay-jury-duty', nav: 'Employer pay', card: 'Which states make employers keep paying wages during jury duty, for how many days, and where only your job is protected.',
    title: 'Employer Pay for Jury Duty by State: Wages, Days, Job Rules',
    description: 'Does your employer have to pay you for jury duty? The states that require wages for the first days, the staff-size limits, and job protection in every state.',
    h1: 'Does your employer have to pay you for jury duty?',
    intro: 'Choose the court, your days, your daily pay and the size of your employer: the tool applies the state law that decides whether wages continue.',
    resume: (h) => `In most of the country, no: the law protects your job during jury service but leaves your pay to your employer. Federal law is the clearest case. 28 U.S.C. § 1875 forbids firing or threatening a permanent employee over federal jury service, yet the federal courts state plainly that no employer is required to keep paying a salary. Among the 50 states and DC, ${h.num(h.agg.empPays.length)} go further and require at least some employers to keep paying wages: ${h.names(h.agg.empPays)}. The duty is usually short, a few days, and some states limit it by staff size, cap the daily amount, or let the employer subtract the juror fee. Job protection is far wider: ${h.num(h.agg.protect.length)} of the 51 jurisdictions write it into their law. The tool above applies these rules to your own case, and each state page cites the section that sets them, read on ${h.read}.`,
    faqs: (h) => [
      { q: 'Can my employer make me use vacation days for jury duty?', a: `Some state laws address it and many say nothing, in which case your employer's policy decides. Where the law requires wages for jury days, using up your vacation to cover them would defeat the rule. Check the employer row of your state's page and your handbook; if the law is silent, ask your employer in writing before your reporting date.` },
      { q: 'Can I be fired for going to jury duty?', a: `Firing someone because they answered a summons is unlawful in federal court under 28 U.S.C. § 1875 and in the ${h.num(h.agg.protect.length)} jurisdictions whose statute we read as protecting jurors' jobs. Several laws also forbid threats, demotion or loss of seniority. Give your employer a copy of the summons promptly: some statutes require notice. Remedies range from reinstatement to back pay and fines on the employer.` },
      { q: 'My employer pays my salary during jury duty: do I keep the juror fee?', a: `That depends on your employer's policy and, in a few states, on the law that lets the employer subtract the court fee from wages it must pay. If you hand the fee over, the IRS treats the repayment as an adjustment to income, so you are not taxed twice. The mini-tool above shows the amount to report and the amount to deduct.` },
      { q: 'Do part-time and hourly workers get jury pay from their employer?', a: `Only if the state law or the employer's policy covers them. Some statutes cover all employees, others only full-time staff or employers above a size. Hourly workers in states without a wage rule receive only the juror fee. If that loss is a serious hardship, the court can postpone or excuse you when you ask, with proof.` },
    ],
    body: (h) => {
      const rows = h.agg.empPays.map((j) => [h.st(j.code), j.employer.text, j.employer.law ?? '']);
      const prot = h.STATES.filter((j) => j.employer.protection !== true);
      return `<h2>The states where wages continue</h2>
<p>Each of these jurisdictions puts a pay duty on employers. Read the detail: a duty for "the first three days" ends on day four, and a duty limited to employers above a staff size leaves small firms out. Where a statute lets the employer subtract the juror fee, the worker ends up with the same total as a normal day, not more.</p>
${h.table(['State', 'What the employer must pay', 'Law'], rows, `Read in each state's code on ${h.read}.`, ['l', 'l', 'l'])}
<h2>Job protection without pay</h2>
<p>Everywhere else the law usually stops at the job. Where a statute protects jurors, it is unlawful to fire you, and often to threaten or demote you, because you were summoned. The wording differs by state, so the employer row of each state page quotes the section. ${prot.length ? `In ${h.names(prot)}, the statutes we read did not give us a clear protection rule to cite, so their pages say "not specified" rather than guess; their court juror pages may still describe local rules.` : 'Every jurisdiction in our data protects jurors from being fired for serving.'}</p>
<h2>How to raise it with your employer</h2>
<p>Send a short written note with a copy of the summons as soon as it arrives, and ask which leave code your absence will use. If your state requires wages, name the statute from your state page; employers outside the payroll department rarely know it. Ask the clerk for proof of attendance each day you serve. If you are sent home early, the court may expect you to call the jury line for the next day rather than return to work, so check before telling your manager you will be back.</p>
<p>If an employer refuses to pay wages the law requires or punishes you for serving, the remedy is in the same statute: a complaint to the state labor department, a civil action for lost wages, or both, depending on the state. You can also tell the jury office of the court that summoned you.</p>
<h2>Taxes when your employer keeps paying</h2>
<p>When an employer continues your full salary and asks for the juror fee in return, the fee still appears as income, and the amount you repaid is deducted, as ${h.src('irs-p525', 'IRS Publication 525')} explains. The second tool on this page shows both lines. Without such an arrangement, the fee is simply extra taxable income.</p>`;
    },
  },
});
