import React from 'react';
import clsx from 'clsx';
import { useAtom } from 'jotai';

import { MAX_STEPS } from '../domains/sequencer/sequencer.constant';
import * as sequencerService from '../domains/sequencer/sequencer.service';
import * as sequencerState from '../domains/sequencer/sequencer.state';
import styles from './CurrentStepRow.module.css';

export function CurrentStepRow() {
  const [currentStep] = useAtom(sequencerState.currentStep);
  const [patternLength] = useAtom(sequencerState.patternLength);
  useAtom(sequencerState.stepOctaves);
  useAtom(sequencerState.stepSemiTones);

  const steps = new Array(MAX_STEPS).fill(null).map((_, i) => {
    const disabled = i >= patternLength;
    const active = currentStep === i;
    return (
      <div
        className={clsx(styles.step, active && styles.activeStep, disabled && styles.disabledStep)}
        key={i}
      >
        {sequencerService.getNote(i)}
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.label}></div>
      {steps}
    </div>
  );
}
