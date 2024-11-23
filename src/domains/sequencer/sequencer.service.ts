import { getDefaultStore } from 'jotai';
import * as Tone from 'tone';

import { instruments } from '../instrument/instruments';
import { HALF_TONES } from './sequencer.constant';
import * as state from './sequencer.state';

const store = getDefaultStore();

const createTransport = () => {
  // output of the player
  const masterChannel = new Tone.Gain(0.7);
  masterChannel.toDestination();

  const transport = Tone.getTransport();
  transport.bpm.value = store.get(state.bpm);

  transport.scheduleRepeat(time => {
    const stepActivations = store.get(state.stepActivations);
    const currentStepIndex = (store.get(state.currentStep) + 1) % store.get(state.patternLength);

    if (stepActivations[currentStepIndex]) {
      const note = getNote(currentStepIndex);
      const { synth, volume } = instruments[store.get(state.currentInstrument)];
      synth.triggerAttackRelease(note, '16n', time, volume);
    }

    Tone.getDraw().schedule(() => {
      store.set(state.currentStep, currentStepIndex);
    }, time);
  }, '16n');

  return { transport };
};

const { transport } = createTransport();

export const play = () => {
  transport.start();
};

export const pause = () => {
  transport.stop();
};

export const setBpm = (bpm: number) => {
  store.set(state.bpm, bpm);
  transport.bpm.value = bpm;
};

export const getNote = (stepIndex: number, baseNote = 'C', baseOctave = 5) => {
  const stepOctaves = store.get(state.stepOctaves);
  const stepSemiTones = store.get(state.stepSemiTones);

  let octave = baseOctave + stepOctaves[stepIndex];

  let noteIdx = HALF_TONES.indexOf(baseNote) + stepSemiTones[stepIndex];
  if (noteIdx < 0) {
    octave -= 1;
    noteIdx = HALF_TONES.length + noteIdx;
  } else if (noteIdx >= HALF_TONES.length) {
    octave += 1;
    noteIdx %= HALF_TONES.length;
  }

  return `${HALF_TONES[noteIdx]}${octave}`;
};
