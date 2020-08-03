import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { observer } from 'mobx-react';

import styles from './InstrumentPicker.css';
import Instruments from './Instruments';
import Transport from './Transport';

@observer
class InstrumentPicker extends PureComponent {
  static propTypes = {
    transport: PropTypes.instanceOf(Transport).isRequired,
  };

  handleChange = (e) => {
    const { transport } = this.props;
    transport.setInstrument(e.target.value);
  }

  render() {
    const { transport } = this.props;
    const options = Instruments.map(({ name }, i) => {
      return <MenuItem value={i} key={i}>{name}</MenuItem>;
    });
    return (
      <FormControl classes={{ root: styles.form }} variant="outlined" fullWidth>
        <Select
          value={transport.selectedInstrument}
          onChange={this.handleChange}
        >
          {options}
        </Select>
      </FormControl>
    );
  }
}

export default InstrumentPicker;
