import { getDefaultStore } from 'jotai';
import * as Tone from 'tone';

import { instruments } from '../instrument/instruments';
import * as state from './sequencer.state';

const store = getDefaultStore();

const createTransport = () => {
  // output of the player
  const masterChannel = new Tone.Gain(0.7);
  masterChannel.toDestination();

  const transport = Tone.getTransport();
  transport.bpm.value = store.get(state.bpm);

  transport.scheduleRepeat(time => {
    const currentNoteIndex = store.get(state.currentNote);
    const note = 'C4'; // patternStore.getNote(currentNoteIndex);
    if (note != null) {
      const { synth, volume } = instruments[store.get(state.currentInstrument)];
      synth.triggerAttackRelease(note, '4n', time, volume);
    }
    store.set(state.currentNote, (currentNoteIndex + 1) % store.get(state.patternLength));
  }, '4n');

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
