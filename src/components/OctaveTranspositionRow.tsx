import React from 'react';
import { useAtom } from 'jotai';

import { MAX_STEPS } from '../domains/sequencer/sequencer.constant';
import * as sequencerState from '../domains/sequencer/sequencer.state';
import { Legend } from '../ds/Legend';
import { Select } from '../ds/Select';
import styles from './OctaveTranspositionRow.module.css';

interface OctaveTranspositionItemProps {
  onChange: (value: string) => void;
  disabled: boolean;
  value: string;
}

const octaveOptions = [
  { value: '2', label: '+2' },
  { value: '1', label: '+1' },
  { value: '0', label: '0' },
  { value: '-1', label: '-1' },
  { value: '-2', label: '-2' },
];

function OctaveTranspositionItem({ onChange, value, disabled }: OctaveTranspositionItemProps) {
  return (
    <Select
      options={octaveOptions}
      value={value}
      onChange={onChange}
      disabled={disabled}
      noArrow
      className={styles.step}
    />
  );
}

export function OctaveTranspositionRow() {
  const [stepOctaves, setStepOctaves] = useAtom(sequencerState.stepOctaves);
  const [patternLength] = useAtom(sequencerState.patternLength);

  const onChange = React.useCallback(
    (value: string, idx: number) => {
      const transpositions = [...stepOctaves];
      transpositions[idx] = Number(value);
      setStepOctaves(transpositions);
    },
    [stepOctaves, patternLength],
  );

  const steps = new Array(MAX_STEPS).fill(null).map((_, i) => {
    const disabled = i >= patternLength;
    return (
      <OctaveTranspositionItem
        disabled={disabled}
        value={`${stepOctaves[i]}`}
        onChange={v => onChange(v, i)}
        key={i}
      />
    );
  });

  return (
    <div className={styles.container}>
      <Legend className={styles.label}>Octave</Legend>
      {steps}
    </div>
  );
}
