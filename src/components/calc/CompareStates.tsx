/** Side-by-side rules of three jurisdictions, read from data/states.json (lib/engine/jury.ts). */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import { courtPay } from '../../lib/engine/jury';
import { money } from '../../lib/format-l';
import { jurisOptions, find, box } from './shared';

interface Props { idPrefix?: string; primary?: boolean; a?: string; b?: string; c?: string; days?: number }
export default function CompareStates({ idPrefix = 'cmp', primary = false, a = 'CA', b = 'TX', c = 'NY', days: d0 = 5 }: Props) {
  const [codes, setCodes] = useState([a, b, c]);
  const [days, setDays] = useState(d0);
  const js = codes.map(find);
  const p = (s: string) => `${idPrefix}-${s}`;
  const set = (i: number) => (v: string) => setCodes((o) => o.map((x, k) => (k === i ? v : x)));
  const rows: Array<[string, (j: ReturnType<typeof find>) => string]> = [
    [`Court fees for ${days} day${days === 1 ? '' : 's'}`, (j) => (j.pay.daily === null && j.pay.first === null ? 'not specified' : money(courtPay(j, days)) + (j.pay.countyVaries ? ' (minimum)' : ''))],
    ['Employer must keep paying', (j) => (j.employer.pays === 'unknown' ? 'Not specified by the state' : j.employer.pays === 'no' ? 'No' : j.employer.days ? `Yes, ${j.employer.days} days${j.employer.minEmployees ? `, ${j.employer.minEmployees}+ staff` : ''}` : 'Yes')],
    ['Job protected', (j) => (j.employer.protection === null ? 'not specified' : j.employer.protection ? 'Yes' : 'No')],
    ['Age rule', (j) => (j.age.rule === 'not-specified' ? 'not specified' : j.age.age === null ? 'none' : `${j.age.age}+, ${j.age.rule === 'automatic' ? 'exempt' : 'on request'}`)],
    ['One day or one trial', (j) => (j.odot === null ? 'not specified' : j.odot ? 'Yes' : 'No')],
    ['Wait before next summons', (j) => (j.frequency.months === null ? 'not specified' : `${j.frequency.months} months`)],
    ['Maximum fine for not showing up', (j) => (j.penalty.fine === null ? 'not specified' : money(j.penalty.fine))],
  ];
  return (
    <div data-chrome className={box(primary)}>
      <p className="text-base font-semibold text-navy-900">Compare jury duty rules</p>
      <form className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-4" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
        {codes.map((x, i) => <SelectField key={i} id={p(`s${i}`)} label={`Court ${i + 1}`} value={x} onChange={set(i)} options={jurisOptions()} />)}
        <NumberField id={p('d')} label="Days of service" value={days} onChange={(x) => setDays(Math.max(1, Math.min(60, Math.round(x))))} unit="days" max={60} tag="en-US" />
      </form>
      <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="mt-4 overflow-x-auto rounded-lg bg-navy-50 p-3">
        <table className="w-full text-sm"><thead><tr><th scope="col" className="py-1.5 pr-3 text-left text-xs uppercase text-navy-600">Rule</th>{js.map((j, i) => <th key={i} scope="col" className="py-1.5 pr-3 text-left text-xs uppercase text-navy-700">{j.name}</th>)}</tr></thead>
          <tbody className="divide-y divide-navy-200">{rows.map(([l, f]) => <tr key={l}><td className="py-1.5 pr-3 text-navy-600">{l}</td>{js.map((j, i) => <td key={i} className="tabular-nums py-1.5 pr-3 font-medium text-navy-900">{f(j)}</td>)}</tr>)}</tbody></table>
        <p className="mt-2 text-xs text-navy-600">Each value links back to the state's law on its own page. Court fees before tax, mileage left out.</p>
      </div>
    </div>
  );
}
