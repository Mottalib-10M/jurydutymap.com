/**
 * Jury duty scam check: what the caller or message asked for → verdict, from the warnings published by
 * the federal courts (uscourts.gov) and the FTC (consumer.ftc.gov), read on the dates in params-2026.json.
 */
import { useState } from 'react';
import { box, PRIVACY } from './shared';

interface Props { idPrefix?: string; primary?: boolean; preset?: string }
const SIGNS = [
  { id: 'pay', label: 'Pay a fine or "bond" now', why: 'Courts never ask you to pay over the phone (FTC).' },
  { id: 'gift', label: 'Pay by gift card, payment app, crypto or wire', why: 'Only scammers insist on these ways to pay (FTC).' },
  { id: 'ssn', label: 'Give your Social Security number or birth date', why: 'Courts never ask potential jurors for this over the phone (FTC); federal courts never ask for sensitive information by phone or email (uscourts.gov).' },
  { id: 'arrest', label: 'Threat of arrest unless you act today', why: 'The scam script: a "marshal" or "officer" says a warrant is out (FTC, uscourts.gov).' },
  { id: 'stay', label: 'Stay on the line, tell no one', why: 'Pressure to act alone and at once is how the money is taken.' },
  { id: 'link', label: 'Click a link to "confirm" or "update" your juror record', why: 'Federal court contact with jurors comes mostly by mail; a real portal is reached from the court\'s own site.' },
  { id: 'mail', label: 'A paper summons came by mail with a court address', why: 'This is how courts normally summon jurors. Check the number on the court\'s own website before calling.' },
];
export default function ScamCheck({ idPrefix = 'scam', primary = false, preset = 'pay,gift,arrest' }: Props) {
  const [on, setOn] = useState<string[]>(preset ? preset.split(',') : []);
  const p = (s: string) => `${idPrefix}-${s}`;
  const red = SIGNS.filter((s) => s.id !== 'mail' && on.includes(s.id));
  const mail = on.includes('mail');
  const verdict = red.length ? 'Scam: hang up and do not pay' : mail ? 'Looks like a normal summons' : 'Tick what you were asked';
  return (
    <div data-chrome className={box(primary)}>
      <p className="text-base font-semibold text-navy-900">Is this jury duty call or message a scam?</p>
      <div className="mt-3 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <form className="grid min-w-0 grid-cols-1 content-start gap-2" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <p className="text-sm font-medium text-navy-700">The caller, e-mail or text asked me to</p>
          {SIGNS.map((s) => (
            <label key={s.id} htmlFor={p(s.id)} className="flex items-start gap-2 rounded-lg border border-navy-200 p-2 text-sm text-navy-800">
              <input id={p(s.id)} type="checkbox" checked={on.includes(s.id)} onChange={(e) => setOn((o) => (e.target.checked ? [...o, s.id] : o.filter((x) => x !== s.id)))} className="mt-0.5 h-4 w-4 shrink-0 accent-accent-600" />{s.label}
            </label>
          ))}
          <p className="text-xs text-navy-500">{PRIVACY}</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="self-start rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{red.length} warning sign{red.length === 1 ? '' : 's'}</p>
          <p className="mt-1 text-2xl font-bold text-navy-900">{verdict}</p>
          <ul className="mt-3 space-y-2 text-sm text-navy-800">{(red.length ? red : SIGNS.filter((s) => on.includes(s.id))).map((s) => <li key={s.id}><strong>{s.label}.</strong> {s.why}</li>)}</ul>
          {red.length > 0 && <p className="mt-3 text-sm text-navy-800">Next: do not pay or give any number; call the clerk of the court yourself, using the number on the court's official website; report it at ReportFraud.ftc.gov. If you already paid, call your bank or card issuer now.</p>}
        </div>
      </div>
    </div>
  );
}
