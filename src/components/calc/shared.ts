/** Options shared by the jury tools: every jurisdiction of `data/states.json`, states first, then the federal courts. */
import { ALL, STATES, FEDERAL, type Juris } from '../../lib/engine/jury';
export const jurisOptions = (withFederal = true) => [
  ...STATES.map((j) => ({ value: j.code, label: j.name })),
  ...(withFederal ? [{ value: FEDERAL.code, label: 'Federal court (any state)' }] : []),
];
export const find = (c: string): Juris => ALL.find((j) => j.code === c) ?? STATES[0];
export const PRIVACY = 'Everything you enter stays in this browser: nothing is sent or stored.';
export const box = (primary: boolean) => `not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`;
