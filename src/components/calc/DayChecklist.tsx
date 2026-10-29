/**
 * Before and on the day of jury service: tick the steps, see what is left. Ticks stay in this page only.
 * Steps are general; the state's own instructions (on the summons and the court's site) prevail.
 */
import { useMemo, useState } from 'react';
import { box } from './shared';

interface Props { idPrefix?: string; primary?: boolean; phase?: string }
const PHASES: Record<string, { label: string; steps: Array<{ t: string; d?: string }> }> = {
  before: { label: 'When the summons arrives', steps: [
    { t: 'Check the court, the date and the reporting time', d: 'Federal and state courts send separate summonses.' },
    { t: 'Answer the questionnaire by its deadline', d: 'Online through the portal printed on the summons, or by mail.' },
    { t: 'Ask for a postponement or excusal now if you need one', d: 'With proof: a doctor\'s note, a school schedule, a travel booking.' },
    { t: 'Tell your employer in writing', d: 'Some state laws require notice to your employer; your state\'s page says if yours does.' },
    { t: 'Plan child care and transport', d: 'Parking and transit vary by courthouse.' },
  ] },
  eve: { label: 'The day before', steps: [
    { t: 'Call the juror line or check the portal after the stated hour', d: 'Some courts cancel or move groups the evening before.' },
    { t: 'Prepare photo ID and the summons or juror badge', d: 'Courthouses screen visitors at the entrance.' },
    { t: 'Pack something to read and a charger', d: 'Waiting is the usual part of the day.' },
    { t: 'Check what the courthouse bans', d: 'Each court lists the items it refuses at the door.' },
  ] },
  day: { label: 'On the day', steps: [
    { t: 'Arrive at the reporting time, not later' },
    { t: 'Dress as for an office day', d: 'Many courts publish a dress code on their juror page: read yours.' },
    { t: 'Answer questions in jury selection honestly', d: 'Lying under oath is perjury.' },
    { t: 'Ask the clerk for a certificate of attendance', d: 'Your employer may need it for pay or leave.' },
    { t: 'Keep your mileage and parking receipts if your court reimburses them' },
  ] },
};
export default function DayChecklist({ idPrefix = 'day', primary = false, phase = 'before' }: Props) {
  const [ph, setPh] = useState(phase);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const cur = PHASES[ph] ?? PHASES.before;
  const k = (i: number) => `${ph}-${i}`;
  const n = useMemo(() => cur.steps.filter((_, i) => done[k(i)]).length, [cur, done, ph]);
  const next = cur.steps.find((_, i) => !done[k(i)]);
  const p = (s: string) => `${idPrefix}-${s}`;
  return (
    <div data-chrome className={box(primary)}>
      <p className="text-base font-semibold text-navy-900">Jury duty checklist</p>
      <div className="mt-3 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <form className="grid min-w-0 grid-cols-1 content-start gap-3" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Moment">
            {Object.entries(PHASES).map(([id, x]) => <button key={id} type="button" onClick={() => setPh(id)} className={`h-12 rounded-lg border px-2 text-sm font-medium ${ph === id ? 'border-accent-600 bg-accent-600 text-white' : 'border-navy-300 bg-white text-navy-800'}`}>{x.label}</button>)}
          </div>
          <ol className="space-y-2">
            {cur.steps.map((s, i) => (
              <li key={k(i)} className="flex gap-3 rounded-lg border border-navy-200 p-3">
                <input id={p(k(i))} type="checkbox" checked={!!done[k(i)]} onChange={(e) => setDone((o) => ({ ...o, [k(i)]: e.target.checked }))} className="mt-1 h-5 w-5 shrink-0 accent-accent-600" />
                <label htmlFor={p(k(i))} className="text-sm text-navy-800"><span className="font-medium text-navy-900">{s.t}</span>{s.d && <span className="block text-navy-600">{s.d}</span>}</label>
              </li>
            ))}
          </ol>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="self-start rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{cur.label}</p>
          <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{n} of {cur.steps.length} done</p>
          <p className="mt-3 text-sm text-navy-800">{next ? <>Next: <strong>{next.t}</strong>{next.d ? `. ${next.d}` : ''}</> : 'All done for this step.'}</p>
          <p className="mt-3 text-xs text-navy-600">Your summons and your court's website prevail over this list. Nothing you tick is sent or kept after you leave.</p>
        </div>
      </div>
    </div>
  );
}
