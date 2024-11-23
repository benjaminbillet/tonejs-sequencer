import React from 'react';
import { useAtom } from 'jotai';

import { MAX_STEPS } from '../domains/sequencer/sequencer.constant';
import * as sequencerState from '../domains/sequencer/sequencer.state';
import { Legend } from '../ds/Legend';
import { Select } from '../ds/Select';
import styles from './HalfToneTranspositionRow.module.css';

interface HalfToneTranspositionItemProps {
  onChange: (value: string) => void;
  disabled: boolean;
  value: string;
}

const halfToneOptions = [
  { value: '11', label: '+11' },
  { value: '10', label: '+10' },
  { value: '9', label: '+9' },
  { value: '8', label: '+8' },
  { value: '7', label: '+7' },
  { value: '6', label: '+6' },
  { value: '5', label: '+5' },
  { value: '4', label: '+4' },
  { value: '3', label: '+3' },
  { value: '2', label: '+2' },
  { value: '1', label: '+1' },
  { value: '0', label: '0' },
  { value: '-1', label: '-1' },
  { value: '-2', label: '-2' },
  { value: '-3', label: '-3' },
  { value: '-4', label: '-4' },
  { value: '-5', label: '-5' },
  { value: '-6', label: '-6' },
  { value: '-7', label: '-7' },
  { value: '-8', label: '-8' },
  { value: '-9', label: '-9' },
  { value: '-10', label: '-10' },
  { value: '-11', label: '-11' },
];

function HalfToneTranspositionItem({ onChange, value, disabled }: HalfToneTranspositionItemProps) {
  return (
    <Select
      options={halfToneOptions}
      value={value}
      onChange={onChange}
      disabled={disabled}
      noArrow
      className={styles.step}
    />
  );
}

export function HalfToneTranspositionRow() {
  const [stepSemiTones, setStepSemiTones] = useAtom(sequencerState.stepSemiTones);
  const [patternLength] = useAtom(sequencerState.patternLength);

  const onChange = React.useCallback(
    (value: string, idx: number) => {
      const transpositions = [...stepSemiTones];
      transpositions[idx] = Number(value);
      setStepSemiTones(transpositions);
    },
    [stepSemiTones, patternLength],
  );

  const steps = new Array(MAX_STEPS).fill(null).map((_, i) => {
    const disabled = i >= patternLength;
    return (
      <HalfToneTranspositionItem
        disabled={disabled}
        value={`${stepSemiTones[i]}`}
        onChange={v => onChange(v, i)}
        key={i}
      />
    );
  });

  return (
    <div className={styles.container}>
      <Legend className={styles.label}>Half-tone</Legend>
      {steps}
    </div>
  );
}
