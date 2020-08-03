import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react';

import styles from './OctaveTranspositionRow.css';
import PatternStore from './PatternStore';


@observer
class OctaveTranspositionRow extends PureComponent {
  static propTypes = {
    store: PropTypes.instanceOf(PatternStore).isRequired,
  };

  handleChange = (idx, e) => {
    const { store } = this.props;
    store.setOctaveTransposition(idx, e.target.value);
  }

  render() {
    const { store } = this.props;

    const buttons = store.stepOctaves.map((octave, i) => {
      const disabled = i >= store.patternLength;
      return (
        <FormControl variant="outlined" key={i} classes={{ root: styles.form }}>
          <Select
            classes={{ root: styles.select }}
            value={octave}
            onChange={e => this.handleChange(i, e)}
            IconComponent={() => null}
            disabled={disabled}
          >
            <MenuItem value={2}>+2</MenuItem>
            <MenuItem value={1}>+1</MenuItem>
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={-1}>-1</MenuItem>
            <MenuItem value={-2}>-2</MenuItem>
          </Select>
        </FormControl>
      );
    });

    return (
      <div className={styles.container}>
        <FormLabel component="legend" className={styles.label}>Octave</FormLabel>
        {buttons}
      </div>
    );
  }
}

export default OctaveTranspositionRow;
