/**
 * "Can I be excused?": the person's situation against the grounds the state's law or official court
 * page names (data/states.json, excuses.tags) and the age rule. Only lawful excusal and postponement:
 * the tool never suggests a way around a summons. Logic in lib/engine/jury.ts (excuseMatch).
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { excuseMatch, TAG_LABEL, type Tag } from '../../lib/engine/jury';
import { jurisOptions, find, PRIVACY, box } from './shared';

interface Props { idPrefix?: string; primary?: boolean; state?: string; age?: number; tags?: string }
const ASK: Tag[] = ['caregiver', 'medical', 'student', 'hardship', 'distance', 'military', 'breastfeeding', 'recent', 'responder', 'business'];

export default function ExcuseCheck({ idPrefix = 'exc', primary = false, state: s0 = 'TX', age: a0 = 45, tags: t0 = 'caregiver' }: Props) {
  const [code, setCode] = useState(s0);
  const [age, setAge] = useState(a0);
  const [tags, setTags] = useState<Tag[]>(t0 ? (t0.split(',') as Tag[]) : []);
  const j = find(code);
  const r = useMemo(() => excuseMatch(j, age, tags), [j, age, tags]);
  const p = (s: string) => `${idPrefix}-${s}`;
  const toggle = (t: Tag, on: boolean) => setTags((o) => (on ? [...o, t] : o.filter((x) => x !== t)));
  const head = r.age === 'exempt' ? 'Exempt by age: claim it on the form' : r.hits.length ? `${r.hits.length} ground${r.hits.length > 1 ? 's' : ''} named by ${j.kind === 'federal' ? 'federal rules' : 'the state'}` : r.age === 'may-ask' ? 'You may ask to be excused by age' : 'No ground named: ask to postpone';
  return (
    <div data-chrome className={box(primary)}>
      <p className="text-base font-semibold text-navy-900">Can I be excused or postpone?</p>
      <div className="mt-3 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <form className="grid min-w-0 grid-cols-1 content-start gap-3" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <SelectField id={p('st')} label="Court that summoned you" value={code} onChange={setCode} options={jurisOptions()} />
            <NumberField id={p('a')} label="Your age" value={age} onChange={(x) => setAge(Math.min(120, Math.round(x)))} unit="years" max={120} tag="en-US" />
          </div>
          <fieldset className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <legend className="mb-1 text-sm font-medium text-navy-700">What applies to you</legend>
            {ASK.map((t) => (
              <label key={t} htmlFor={p(t)} className="flex items-start gap-2 rounded-lg border border-navy-200 p-2 text-sm text-navy-800">
                <input id={p(t)} type="checkbox" checked={tags.includes(t)} onChange={(e) => toggle(t, e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-accent-600" />{TAG_LABEL[t]}
              </label>
            ))}
          </fieldset>
          <p className="text-xs text-navy-500">{PRIVACY}</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="self-start rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{j.name}</p>
          <p className="mt-1 text-2xl font-bold text-navy-900">{head}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            <tr><td className="py-1.5 pr-3 text-navy-600">Age rule</td><td className="py-1.5 text-right text-navy-900">{j.age.rule === 'not-specified' ? 'not specified by the state' : j.age.age === null ? 'none' : `${j.age.age}+, ${j.age.rule === 'automatic' ? 'exempt' : 'on request'}`}</td></tr>
            {r.hits.map((t) => <tr key={t}><td className="py-1.5 pr-3 text-navy-600">{TAG_LABEL[t]}</td><td className="py-1.5 text-right font-medium text-navy-900">named</td></tr>)}
            {r.misses.map((t) => <tr key={t}><td className="py-1.5 pr-3 text-navy-600">{TAG_LABEL[t]}</td><td className="py-1.5 text-right text-navy-700">not named; judge's discretion</td></tr>)}
          </tbody></table>
          <p className="mt-2 text-xs text-navy-600">{j.excuses.text} {j.deferral.text ?? ''}</p>
          <p className="mt-2 text-xs text-navy-600">A request is decided by the court, often with proof (a doctor's note, a school schedule). Ignoring a summons is not an excuse.</p>
        </div>
      </div>
    </div>
  );
}
