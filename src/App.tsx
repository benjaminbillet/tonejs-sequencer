import './theme.css';

import React from 'react';

import styles from './App.module.css';
import { BpmPicker } from './components/BpmPicker';
import { CurrentStepRow } from './components/CurrentStepRow';
import { HalfToneTranspositionRow } from './components/HalfToneTranspositionRow';
import { InstrumentPicker } from './components/InstrumentPicker';
import { LengthSelector } from './components/LengthSelector';
import { OctaveTranspositionRow } from './components/OctaveTranspositionRow';
import { PlayPauseButton } from './components/PlayPauseButton';
import { StepActivationRow } from './components/StepActivationRow';
import { FlexCell } from './ds/FlexCell';

const WavyBackground = () => {
  return <div className={styles.wavyBackground} />;
};

export const App = () => {
  return (
    <>
      <WavyBackground />
      <div className={styles.container}>
        <div className={styles.content}>
          <PlayPauseButton />
          <InstrumentPicker />
          <BpmPicker />
          <LengthSelector />
          <FlexCell orientation="vertical" className={styles.sequencer}>
            <CurrentStepRow />
            <StepActivationRow />
            <OctaveTranspositionRow />
            <HalfToneTranspositionRow />
          </FlexCell>
        </div>
      </div>
    </>
  );
};
