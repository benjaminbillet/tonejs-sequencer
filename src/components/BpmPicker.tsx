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
    <FlexCell orientation="horizontal" className={styles.container} alignItems="center">
      <Legend>BPM</Legend>
      <Slider
        min={45}
        max={145}
        step={5}
        orientation="horizontal"
        value={bpm}
        onChange={value => sequencerActions.setBpm(value)}
        sliderClassName={styles.slider}
      />
    </FlexCell>
  );
}
