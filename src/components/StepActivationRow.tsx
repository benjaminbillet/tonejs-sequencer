import React from 'react';
import clsx from 'clsx';
import { useAtom } from 'jotai';

import { MAX_STEPS } from '../domains/sequencer/sequencer.constant';
import * as sequencerState from '../domains/sequencer/sequencer.state';
import { Legend } from '../ds/Legend';
import styles from './StepActivationRow.module.css';

interface StepActivationItemProps {
  onClick: () => void;
  disabled: boolean;
  activated: boolean;
}

function StepActivationItem({ onClick, disabled, activated }: StepActivationItemProps) {
  let style = styles.stepInactivated;
  if (disabled) {
    style = styles.stepDisabled;
  } else if (activated) {
    style = styles.stepActivated;
  }

  return <div className={clsx(styles.step, style)} onClick={onClick} />;
}

export function StepActivationRow() {
  const [stepActivations, setStepActivations] = useAtom(sequencerState.stepActivations);
  const [patternLength] = useAtom(sequencerState.patternLength);

  const toggleActivation = React.useCallback(
    (idx: number) => {
      const activations = [...stepActivations];
      activations[idx] = !activations[idx];
      setStepActivations(activations);
    },
    [stepActivations, patternLength],
  );

  const steps = new Array(MAX_STEPS).fill(null).map((_, i) => {
    const disabled = i >= patternLength;
    const activated = stepActivations[i];
    return (
      <StepActivationItem
        disabled={disabled}
        activated={activated}
        onClick={() => toggleActivation(i)}
        key={i}
      />
    );
  });

  return (
    <div className={styles.container}>
      <Legend className={styles.label}>On</Legend>
      {steps}
    </div>
  );
}
