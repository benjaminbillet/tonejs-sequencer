import React from 'react';
import { Slider as AntdSlider } from 'antd';
import { useAtom } from 'jotai';

import * as sequencerActions from '../domains/sequencer/sequencer.service';
import * as sequencerState from '../domains/sequencer/sequencer.state';
import { FlexCell } from '../ds/FlexCell';
import { Legend } from '../ds/Legend';
import styles from './LengthSelector.module.css';

export function LengthSelector() {
  const [patternLength, setPatternLength] = useAtom(sequencerState.patternLength);

  const onChange = React.useCallback(
    (value: number) => {
      if (patternLength !== value) {
        setPatternLength(value);
      }
    },
    [patternLength],
  );

  return (
    <div className={styles.container}>
      <div className={styles.label}></div>
      <div
        className={styles.lengthIndicator}
        style={{
          transform: `translateX(${(patternLength - 1) * 45.3}px)`,
        }}
      ></div>
      <AntdSlider
        min={1}
        max={16}
        step={1}
        onChange={onChange}
        value={patternLength}
        className={styles.slider}
        tooltip={{
          open: false,
        }}
        classNames={{
          rail: styles.rail,
          track: styles.track,
          handle: styles.handle,
        }}
      />
    </div>
  );
}
