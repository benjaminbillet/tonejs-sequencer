import { getDefaultStore } from 'jotai';
import * as Tone from 'tone';

import { instruments } from '../instrument/instruments';
import { HALF_TONES } from './sequencer.constant';
import * as state from './sequencer.state';

class SequencerService {
  private readonly store: ReturnType<typeof getDefaultStore>;
  private readonly transport: ReturnType<typeof Tone.getTransport>;

  constructor() {
    this.store = getDefaultStore();

    this.transport = Tone.getTransport();
    this.transport.bpm.value = this.store.get(state.bpm);

    // output of the player
    const masterChannel = new Tone.Gain(0.7);
    masterChannel.toDestination();

    this.transport.scheduleRepeat(time => this.onNextTick(time), '16n');
  }

  private onNextTick(time: number) {
    const stepActivations = this.store.get(state.stepActivations);
    const currentStepIndex =
      (this.store.get(state.currentStep) + 1) % this.store.get(state.patternLength);

    if (stepActivations[currentStepIndex]) {
      const note = this.getNote(currentStepIndex);
      const { synth, volume } = instruments[this.store.get(state.currentInstrument)];
      synth.triggerAttackRelease(note, '16n', time, volume);
    }

    Tone.getDraw().schedule(() => {
      this.store.set(state.currentStep, currentStepIndex);
    }, time);
  }

  play() {
    this.transport.start();
  }

  pause() {
    this.transport.stop();
  }

  setBpm(bpm: number) {
    this.store.set(state.bpm, bpm);
    this.transport.bpm.value = bpm;
  }

  getNote = (stepIndex: number, baseNote = 'C', baseOctave = 5) => {
    const stepOctaves = this.store.get(state.stepOctaves);
    const stepSemiTones = this.store.get(state.stepSemiTones);

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
}

export const sequencerService = new SequencerService();
