import { observable, action } from 'mobx';
import Tone from 'tone';

import Instruments from './Instruments';

export default class Transport {
  @observable
  selectedInstrument = 0;

  @observable
  currentNote = 0;

  @observable
  bpm = 300;

  constructor(patternStore) {
    /*const sequence = [
      'C4', 'D#4', 'G4', 'A4', 'C5', 'D5', 'D#5',
      'F4', 'G#4', 'C5', 'D5', 'F5', 'G5', 'G#5',
      'C4', 'D#4', 'G4', 'A4', 'C5', 'D5', 'D#5',
      'B3', 'D4', 'F#4', 'G#4', 'B4', 'C#5', 'D5',
    ];*/
    this.patternStore = patternStore;

    this.transport = Tone.Transport;
    this.transport.bpm.value = this.bpm;
    // this.transport.timeSignature = TIME_STEPS;
    // this.transport.loop = true;
    // this.transport.setLoopPoints(0, '1m');
    this.transport.scheduleRepeat((time) => {
      const note = patternStore.getNote(this.currentNote);
      if (note != null) {
        const { synth, volume } = Instruments[this.selectedInstrument];
        synth.triggerAttackRelease(note, '4n', time, volume);
      }
      this.currentNote = (this.currentNote + 1) % patternStore.patternLength;
    }, '4n');
  }

  @action
  setInstrument(idx) {
    this.selectedInstrument = idx;
  }

  @action
  setBpm(bpm) {
    if (this.bpm !== bpm) {
      this.transport.bpm.value = bpm;
      this.bpm = bpm;
    }
  }

  start() {
    this.transport.start();
  }

  stop() {
    this.transport.stop();
  }
}
