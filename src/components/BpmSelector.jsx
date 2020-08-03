import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { FormLabel, Slider } from '@material-ui/core';

import styles from './BpmSelector.css';
import Transport from './Transport';

@observer
class BpmSelector extends PureComponent {
  static propTypes = {
    transport: PropTypes.instanceOf(Transport).isRequired,
  };

  handleChange = (_, value) => {
    const { transport } = this.props;
    transport.setBpm(value);
  }

  render() {
    const { transport } = this.props;
    return (
      <div className={styles.container}>
        <FormLabel component="legend" className={styles.label}>Bpm</FormLabel>
        <Slider
          value={transport.bpm}
          onChange={this.handleChange}
          min={100}
          max={400}
          step={5}
          valueLabelDisplay="auto"
          classes={{ root: styles.slider }}
        />
      </div>
    );
  }
}

export default BpmSelector;
