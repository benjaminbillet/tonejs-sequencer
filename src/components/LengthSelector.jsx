import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { FormLabel, Slider } from '@material-ui/core';

import styles from './LengthSelector.css';
import PatternStore, { MAX_STEPS } from './PatternStore';


@observer
class LengthSelector extends PureComponent {
  static propTypes = {
    store: PropTypes.instanceOf(PatternStore).isRequired,
  };

  handleChange = (_, value) => {
    const { store } = this.props;
    store.setPatternLength(value);
  }

  render() {
    const { store } = this.props;
    return (
      <div className={styles.container}>
        <FormLabel component="legend" className={styles.label}>Length</FormLabel>
        <Slider
          step={1}
          marks
          min={0}
          max={MAX_STEPS}
          value={store.patternLength}
          onChange={this.handleChange}
          classes={{ root: styles.slider }}
        />
      </div>
    );
  }
}

export default LengthSelector;
