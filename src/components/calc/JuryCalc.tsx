/**
 * "What will I be paid?": court fees day by day, wages the state's law makes the employer keep paying,
 * and the gap with a normal stretch of work. Arithmetic in lib/engine/jury.ts; rules in data/states.json.
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { weekIncome, dayRate } from '../../lib/engine/jury';
import { money } from '../../lib/format-l';
import { jurisOptions, find, PRIVACY, box } from './shared';

interface Props { idPrefix?: string; primary?: boolean; state?: string; days?: number; wage?: number; title?: string; links?: boolean }

export default function JuryCalc({ idPrefix = 'pay', primary = false, state: s0 = 'CA', days: d0 = 3, wage: w0 = 200, title = 'What jury duty will pay you', links = true }: Props) {
  const [code, setCode] = useState(s0);
  const [days, setDays] = useState(d0);
  const [wage, setWage] = useState(w0);
  const [emp, setEmp] = useState(50);
  const [vol, setVol] = useState('0');
  const j = find(code);
  const r = useMemo(() => weekIncome(j, days, wage, emp, vol === '1'), [j, days, wage, emp, vol]);
  const p = (s: string) => `${idPrefix}-${s}`;
  const n = Math.max(0, Math.floor(days));
  const rates = [...new Set(Array.from({ length: Math.min(n, 30) }, (_, i) => dayRate(j, i + 1)))];
  const empLine = j.employer.pays === 'unknown' ? 'Not specified by the state: your employer\'s policy decides' : j.employer.pays === 'no'
    ? 'No duty to keep paying wages under this law'
    : r.legal.applies ? `${money(r.legal.amount)} for ${r.legal.days} day${r.legal.days > 1 ? 's' : ''}` : (j.employer.minEmployees !== null && emp < j.employer.minEmployees ? `Not required below ${j.employer.minEmployees} employees` : 'Not required for these days');
  const age = j.age.rule === 'not-specified' ? 'not specified by the state' : j.age.age === null ? 'no age exemption' : `${j.age.age} and over, ${j.age.rule === 'automatic' ? 'exempt' : 'may ask to be excused'}`;
  return (
    <div data-chrome className={box(primary)}>
      <p className="text-base font-semibold text-navy-900">{title}</p>
      <div className="mt-3 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <form className="grid min-w-0 grid-cols-1 content-start gap-3" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <SelectField id={p('st')} label="Court that summoned you" value={code} onChange={setCode} options={jurisOptions()} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <NumberField id={p('d')} label="Days of service" value={days} onChange={(x) => setDays(Math.min(90, Math.round(x)))} unit="days" max={90} tag="en-US" />
            <NumberField id={p('w')} label="Your pay for a day of work" value={wage} onChange={(x) => setWage(Math.min(5000, x))} unit="$" max={5000} tag="en-US" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <NumberField id={p('e')} label="People at your employer" value={emp} onChange={(x) => setEmp(Math.min(1000000, Math.round(x)))} max={1000000} tag="en-US" />
            <Toggle id={p('v')} label="Employer pays anyway?" value={vol} onChange={setVol} options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]} />
          </div>
          <p className="text-xs text-navy-500">{PRIVACY}</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="self-start rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">You receive for {n} day{n === 1 ? '' : 's'}</p>
          <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{money(r.total)}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            <tr><td className="py-1.5 pr-3 text-navy-600">Court fee{j.pay.countyVaries ? ' (state minimum)' : ''}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{j.pay.daily === null && j.pay.first === null ? 'not specified' : money(r.court)}</td></tr>
            <tr><td className="py-1.5 pr-3 text-navy-600">Employer, by law</td><td className="py-1.5 text-right text-navy-900">{empLine}</td></tr>
            {vol === '1' && <tr><td className="py-1.5 pr-3 text-navy-600">Employer, by its own policy</td><td className="tabular-nums py-1.5 text-right text-navy-900">{money(r.employer)}</td></tr>}
            <tr><td className="py-1.5 pr-3 text-navy-600">A normal {n} days of work</td><td className="tabular-nums py-1.5 text-right text-navy-900">{money(r.normal)}</td></tr>
            <tr><td className="py-1.5 pr-3 font-medium text-navy-700">{r.gap >= 0 ? 'Income lost' : 'More than usual'}</td><td className="tabular-nums py-1.5 text-right font-semibold text-navy-900">{money(Math.abs(r.gap))}</td></tr>
            <tr><td className="py-1.5 pr-3 text-navy-600">Age rule</td><td className="py-1.5 text-right text-navy-900">{age}</td></tr>
          </tbody></table>
          <p className="mt-2 text-xs text-navy-600">{j.name}: {j.pay.text}{rates.length > 1 ? ` Day rates used: ${rates.map((x) => money(x)).join(', ')}.` : ''} Before tax. {j.employer.text}</p>
          {links && <a href={`/en/${j.slug}/`} className="mt-2 inline-block text-sm font-medium text-accent-700 underline">{j.kind === 'federal' ? 'Federal jury service explained' : `All jury rules in ${j.name}`}</a>}
        </div>
      </div>
    </div>
  );
}
