import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import styles from './StepActivationRow.css';
import PatternStore from './PatternStore';
import { observer } from 'mobx-react';
import { FormLabel } from '@material-ui/core';

@observer
class StepActivationItem extends PureComponent {
  static propTypes = {
    store: PropTypes.instanceOf(PatternStore).isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { index, store, onClick } = this.props;

    const disabled = index >= store.patternLength;
    const activated = store.stepActivations[index];

    let style = styles.notActivated;
    if (disabled) {
      style = styles.disabled;
    } else if (activated) {
      style = styles.activated;
    }

    return <div className={[styles.item, style].join(' ')} onClick={onClick} />;
  }
}

@observer
class StepActivationRow extends PureComponent {
  static propTypes = {
    store: PropTypes.instanceOf(PatternStore).isRequired,
  };

  onClick = (idx) => {
    const { store } = this.props;
    store.toggleStepActivation(idx);
  }

  render() {
    const { store } = this.props;

    const buttons = store.stepActivations.map((activated, i) => {
      return (
        <StepActivationItem
          key={i}
          store={store}
          index={i}
          onClick={() => this.onClick(i)}
        />
      );
    });
    return (
      <div className={styles.container}>
        <FormLabel component="legend" className={styles.label}>On</FormLabel>
        {buttons}
      </div>
    );
  }
}

export default StepActivationRow;
