import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import styles from './TieRow.css';
import PatternStore from './PatternStore';
import { observer } from 'mobx-react';
import { FormLabel } from '@material-ui/core';

@observer
class TieRow extends PureComponent {
  static propTypes = {
    store: PropTypes.instanceOf(PatternStore).isRequired,
  };

  onClick = (idx) => {
    const { store } = this.props;
    store.toggleStepTie(idx);
  }

  render() {
    const { store } = this.props;
    const buttonClasses = {
      root: styles.button,
      disabled: styles.buttonDisabled,
    };

    const buttons = store.stepTies.map((tied, i) => {
      const disabled = i >= store.patternLength;
      const color = tied ? 'secondary' : 'default';
      return (
        <Button
          key={i}
          variant="contained"
          onClick={() => this.onClick(i)}
          disabled={disabled}
          color={color}
          classes={buttonClasses}
        />
      );
    });
    return (
      <div className={styles.container}>
        <FormLabel component="legend" className={styles.label}>Tie</FormLabel>
        {buttons}
      </div>
    );
  }
}

export default TieRow;
