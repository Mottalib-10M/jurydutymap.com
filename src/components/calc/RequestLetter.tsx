/**
 * Postponement or excusal request, written in the browser from the person's answers. Nothing is sent:
 * the text is copied or printed by the person and filed the way the summons says (portal, mail, clerk).
 */
import { useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { DateField, inputCls, isIso } from './fields';
import { jurisOptions, find, box, PRIVACY } from './shared';
import { dateL } from '../../lib/format-l';

interface Props { idPrefix?: string; primary?: boolean; state?: string; kind?: string }
const REASONS: Record<string, { label: string; text: string; proof: string }> = {
  work: { label: 'Work deadline or a trip already booked', text: 'I have a commitment on the reporting date that I cannot move', proof: 'a letter from my employer or my booking' },
  care: { label: 'Caring for a child or a dependent', text: 'I am the person who cares for a young child or a dependent during the day, and no one can replace me on that date', proof: 'any document the court asks for' },
  medical: { label: 'Illness, surgery or disability', text: 'a medical condition prevents me from serving on the reporting date', proof: 'a note from my doctor' },
  student: { label: 'Classes or exams', text: 'I am a full-time student and the reporting date falls during my classes or exams', proof: 'my class or exam schedule' },
  money: { label: 'Loss of income', text: 'serving on that date would cause me serious financial hardship', proof: 'proof of income if the court asks for it' },
};
export default function RequestLetter({ idPrefix = 'ltr', primary = false, state: s0 = 'CA', kind = 'work' }: Props) {
  const [code, setCode] = useState(s0);
  const [reason, setReason] = useState(kind);
  const [type, setType] = useState('postpone');
  const [from, setFrom] = useState('2027-01-11');
  const [juror, setJuror] = useState('');
  const [copied, setCopied] = useState(false);
  const j = find(code);
  const r = REASONS[reason] ?? REASONS.work;
  const p = (s: string) => `${idPrefix}-${s}`;
  const text = useMemo(() => [
    `To the Jury Office, ${j.kind === 'federal' ? 'United States District Court' : `${j.name} court named on my summons`}`,
    '',
    `Juror number: ${juror.trim() || '[number printed on the summons]'}`,
    '',
    type === 'postpone'
      ? `I ask to postpone my jury service because ${r.text}. I am available from ${isIso(from) ? dateL(from) : '[date]'} and will serve on any date the court gives me after that.`
      : `I ask to be excused from jury service because ${r.text}. I attach ${r.proof}.`,
    type === 'postpone' ? `I can provide ${r.proof}.` : 'If the court prefers to postpone my service instead, I will accept a later date.',
    '',
    'I understand that the court decides on this request and that I must report as summoned until I receive its answer.',
    '',
    'Name, address, phone:',
    'Date and signature:',
  ].join('\n'), [j, r, type, from, juror]);
  return (
    <div data-chrome className={box(primary)}>
      <p className="text-base font-semibold text-navy-900">Write a postponement or excusal request</p>
      <div className="mt-3 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <form className="grid min-w-0 grid-cols-1 content-start gap-3" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <SelectField id={p('st')} label="Court that summoned you" value={code} onChange={setCode} options={jurisOptions()} />
            <SelectField id={p('t')} label="Request" value={type} onChange={setType} options={[{ value: 'postpone', label: 'Postpone (defer)' }, { value: 'excuse', label: 'Be excused' }]} />
          </div>
          <SelectField id={p('r')} label="Reason" value={reason} onChange={setReason} options={Object.entries(REASONS).map(([value, x]) => ({ value, label: x.label }))} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DateField id={p('f')} label="Available from" value={from} onChange={setFrom} />
            <div className="grid min-w-0 grid-rows-subgrid row-span-3 content-start gap-y-0"><label htmlFor={p('j')} className="mb-1 block text-sm font-medium text-navy-700">Juror number</label><input id={p('j')} type="text" value={juror} onChange={(e) => setJuror(e.target.value)} className={inputCls} autoComplete="off" /><span /></div>
          </div>
          <p className="text-xs text-navy-500">{PRIVACY}</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="self-start rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">Your request, ready to copy</p>
          <pre className="mt-2 whitespace-pre-wrap rounded border border-navy-200 bg-white p-3 text-sm text-navy-900">{text}</pre>
          <button type="button" onClick={() => { navigator.clipboard?.writeText(text).then(() => setCopied(true)).catch(() => setCopied(false)); }} className="mt-3 h-12 rounded-lg bg-accent-700 px-4 text-sm font-semibold text-white">{copied ? 'Copied' : 'Copy the text'}</button>
          <p className="mt-2 text-xs text-navy-600">{j.deferral.text ?? 'File it the way your summons says.'} Use the portal or address printed on your summons.</p>
        </div>
      </div>
    </div>
  );
}
