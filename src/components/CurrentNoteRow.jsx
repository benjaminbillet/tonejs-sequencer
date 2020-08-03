import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { FormLabel, Typography } from '@material-ui/core';

import styles from './CurrentNoteRow.css';
import { MAX_STEPS } from './PatternStore';
import Transport from './Transport';

@observer
class CurrentNoteItem extends PureComponent {
  static propTypes = {
    transport: PropTypes.instanceOf(Transport).isRequired,
    value: PropTypes.number.isRequired,
  };

  render() {
    const { value, transport } = this.props;

    let statusStyle = styles.disabled;
    if ((value - 1) === transport.currentNote) {
      statusStyle = styles.activated;
    }
    return (
      <div className={[styles.item, statusStyle].join(' ')}>
        <Typography variant="button">{`${value}`}</Typography>
      </div>
    );
  }
}

class CurrentNoteRow extends PureComponent {
  static propTypes = {
    transport: PropTypes.instanceOf(Transport).isRequired,
  };

  render() {
    const { transport } = this.props;
    const buttons = new Array(MAX_STEPS).fill(null).map((_, i) => {
      return (
        <CurrentNoteItem
          key={i}
          value={i + 1}
          transport={transport}
        />
      );
    });
    return (
      <div className={styles.container}>
        <FormLabel component="legend" className={styles.label} />
        {buttons}
      </div>
    );
  }
}

export default CurrentNoteRow;
