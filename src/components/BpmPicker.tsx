import React from 'react';
import { useAtom } from 'jotai';

import * as sequencerActions from '../domains/sequencer/sequencer.service';
import * as sequencerState from '../domains/sequencer/sequencer.state';
import { FlexCell } from '../ds/FlexCell';
import { Legend } from '../ds/Legend';
import { Slider } from '../ds/Slider';
import styles from './BpmPicker.module.css';

export function BpmPicker() {
  const [bpm] = useAtom(sequencerState.bpm);

  return (
    <FlexCell orientation="horizontal">
      <Legend>BPM</Legend>
      <Slider
        min={50}
        max={400}
        step={5}
        orientation="horizontal"
        value={bpm}
        onChange={value => sequencerActions.setBpm(value)}
        sliderClassName={styles.container}
        marks={{
          45: <span className={styles.mark}>45 bpm</span>,
          145: <span className={styles.mark}>145 bpm</span>,
        }}
      />
    </FlexCell>
  );
}
