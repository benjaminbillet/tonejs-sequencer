import { atom } from 'jotai';

import { MAX_STEPS } from './sequencer.constant';

export const bpm = atom(60);
export const currentInstrument = atom(2);
export const currentStep = atom(-1);

export const patternLength = atom(8);

export const stepActivations = atom<boolean[]>(new Array(MAX_STEPS).fill(true));
export const stepOctaves = atom<number[]>(new Array(MAX_STEPS).fill(0)); // octave transpositions, [-2, 2]
export const stepSemiTones = atom<number[]>(new Array(MAX_STEPS).fill(0)); // semi-tone transpositions [-11, 11]
