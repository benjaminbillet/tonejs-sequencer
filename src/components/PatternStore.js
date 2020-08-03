import { observable, action } from 'mobx';
import Tone from 'tone';


export const MAX_STEPS = 16;

const HALF_TONES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

export default class PatternStore {

  @observable
  patternLength = 8;

  @observable
  stepActivations = new Array(MAX_STEPS).fill(true);

  @observable
  stepTies = new Array(MAX_STEPS).fill(false);

  @observable
  stepOctaves = new Array(MAX_STEPS).fill(0); // octave transpositions, [-2, 2]

  @observable
  stepTranspositions = new Array(MAX_STEPS).fill(0); // semi-tone transpositions [-11, 11]

  @action
  setPatternLength(patternLength) {
    if (patternLength < 1) {
      patternLength = 1;
    } else if (patternLength > MAX_STEPS) {
      patternLength = MAX_STEPS;
    }
    this.patternLength = patternLength;
  }

  @action
  setStepActivation(stepIndex, activated) {
    this.stepActivations[stepIndex] = activated;
  }

  @action
  toggleStepActivation(stepIndex) {
    this.stepActivations[stepIndex] = !this.stepActivations[stepIndex];
  }

  @action
  setStepTie(stepIndex, tied) {
    this.stepTies[stepIndex] = tied;
  }

  @action
  toggleStepTie(stepIndex) {
    this.stepTies[stepIndex] = !this.stepTies[stepIndex];
  }

  @action
  setOctaveTransposition(stepIndex, octaveTransposition) {
    this.stepOctaves[stepIndex] = octaveTransposition;
  }

  @action
  setSemiToneTransposition(stepIndex, semiToneTransposition) {
    this.stepTranspositions[stepIndex] = semiToneTransposition;
  }

  getNote(stepIndex, baseNote = 'C', baseOctave = 5) {
    if (this.stepActivations[stepIndex] === false) {
      return null;
    }

    let octave = baseOctave + this.stepOctaves[stepIndex];

    let noteIdx = HALF_TONES.indexOf(baseNote) + this.stepTranspositions[stepIndex];
    if (noteIdx < 0) {
      octave -= 1;
      noteIdx = HALF_TONES.length + noteIdx;
    } else if (noteIdx >= HALF_TONES.length) {
      octave += 1;
      noteIdx %= HALF_TONES.length;
    }

    // console.log(noteIdx, `${HALF_TONES[noteIdx]}${octave}`);
    return `${HALF_TONES[noteIdx]}${octave}`;
  }

  isTied(stepIndex) {
    if (this.stepActivations[stepIndex] === false) {
      return false;
    }
    return this.stepTies[stepIndex];
  }
}
