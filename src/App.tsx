import './theme.css';

import React from 'react';

import styles from './App.module.css';
import { InstrumentPicker } from './components/InstrumentPicker';
import { PlayPauseButton } from './components/PlayPauseButton';

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
        </div>
      </div>
    </>
  );
};
