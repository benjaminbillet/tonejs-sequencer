import React from 'react';
import { useAtom } from 'jotai';

import { instruments } from '../domains/instrument/instruments';
import * as sequencerState from '../domains/sequencer/sequencer.state';
import { Select } from '../ds/Select';
import styles from './InstrumentPicker.module.css';

const options = instruments.map(({ name }, i) => ({ value: `${i}`, label: name }));

export function InstrumentPicker() {
  const [currentInstrument, setCurrentInstrument] = useAtom(sequencerState.currentInstrument);

  const handleChange = React.useCallback((value: string) => {
    setCurrentInstrument(Number(value));
  }, []);

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={`${currentInstrument}`}
      className={styles.select}
    />
  );
}
