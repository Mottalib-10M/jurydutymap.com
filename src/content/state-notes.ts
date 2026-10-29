/**
 * Handwritten text of each state page (RECETTE §6.2): the intro, the citable block (one paragraph of 130 words or
 * more, built only on the facts of data/states.json) and two sections on what is distinctive in that state.
 * Not marked data-chrome: this is the part that makes each page unique.
 */
export interface StateNote { intro: string; resume: string; body?: string; days?: number }
import { NOTES_A } from './notes-a';
import { NOTES_B } from './notes-b';
export const NOTES: Record<string, StateNote> = { ...NOTES_A, ...NOTES_B };
