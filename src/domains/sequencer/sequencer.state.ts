import { atom } from 'jotai';

import { MAX_STEPS } from './sequencer.constant';

export const bpm = atom(200);
export const currentInstrument = atom(0);
export const currentNote = atom(0);

export const patternLength = atom(8);

export const stepActivations = atom(new Array(MAX_STEPS).fill(true));
export const stepTies = atom(new Array(MAX_STEPS).fill(false));
export const stepOctaves = atom(new Array(MAX_STEPS).fill(0)); // octave transpositions, [-2, 2]
export const stepTranspositions = atom(new Array(MAX_STEPS).fill(0)); // semi-tone transpositions [-11, 11]
