import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem } from '@material-ui/core';

import styles from './SemiToneTranspositionRow.css';
import PatternStore from './PatternStore';
import { observer } from 'mobx-react';
import { FormLabel } from '@material-ui/core';

@observer
class SemiToneTranspositionRow extends PureComponent {
  static propTypes = {
    store: PropTypes.instanceOf(PatternStore).isRequired,
  };

  handleChange = (idx, e) => {
    const { store } = this.props;
    store.setSemiToneTransposition(idx, e.target.value);
  }

  render() {
    const { store } = this.props;
    const formClasses = {
      root: styles.form,
    };
    const selectClasses = {
      root: styles.select,
    };

    const buttons = store.stepTranspositions.map((halfTone, i) => {
      const disabled = i >= store.patternLength;
      return (
        <FormControl variant="outlined" key={i} classes={formClasses}>
          <Select
            classes={selectClasses}
            value={halfTone}
            onChange={e => this.handleChange(i, e)}
            IconComponent={() => null}
            disabled={disabled}
          >
            <MenuItem value={11}>+11</MenuItem>
            <MenuItem value={10}>+10</MenuItem>
            <MenuItem value={9}>+9</MenuItem>
            <MenuItem value={8}>+8</MenuItem>
            <MenuItem value={7}>+7</MenuItem>
            <MenuItem value={6}>+6</MenuItem>
            <MenuItem value={5}>+5</MenuItem>
            <MenuItem value={4}>+4</MenuItem>
            <MenuItem value={3}>+3</MenuItem>
            <MenuItem value={2}>+2</MenuItem>
            <MenuItem value={1}>+1</MenuItem>
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={-1}>-1</MenuItem>
            <MenuItem value={-2}>-2</MenuItem>
            <MenuItem value={-3}>-3</MenuItem>
            <MenuItem value={-4}>-4</MenuItem>
            <MenuItem value={-5}>-5</MenuItem>
            <MenuItem value={-6}>-6</MenuItem>
            <MenuItem value={-7}>-7</MenuItem>
            <MenuItem value={-8}>-8</MenuItem>
            <MenuItem value={-9}>-9</MenuItem>
            <MenuItem value={-10}>-10</MenuItem>
            <MenuItem value={-11}>-11</MenuItem>
          </Select>
        </FormControl>
      );
    });
    return (
      <div className={styles.container}>
        <FormLabel component="legend" className={styles.label}>Half-tone</FormLabel>
        {buttons}
      </div>
    );
  }
}

export default SemiToneTranspositionRow;
