import React, { PureComponent } from 'react';
import { ThemeProvider, StylesProvider, createMuiTheme } from '@material-ui/core/styles';
import styles from './App.css';

import Transport from './components/Transport';
import PlayPauseButton from './components/PlayPauseButton';
import PatternStore from './components/PatternStore';
import StepActivationRow from './components/StepActivationRow';
import InstrumentPicker from './components/InstrumentPicker';
import OctaveTranspositionRow from './components/OctaveTranspositionRow';
import SemiToneTranspositionRow from './components/SemiToneTranspositionRow';
import CurrentNoteRow from './components/CurrentNoteRow';
import LengthSelector from './components/LengthSelector';
import BpmSelector from './components/BpmSelector';

class WavyBackground extends PureComponent {
  render() {
    return <div className={styles.wavyBackground} />;
  }
}

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        '&:hover $notchedOutline': {
          borderColor: '#b4006f',
        },
        '&$focused $notchedOutline': {
          borderColor: '#b4006f',
        },
        backgroundColor: '#222',
        color: '#fff',
      },
      notchedOutline: {
        color: '#fff',
      },
    },
    MuiSelect: {
      icon: {
        color: '#fff',
      },
    },
    MuiSlider: {
      root: {
        color: '#b4006f',
      },
    },
  },
});

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.patternStore = new PatternStore();
    this.transport = new Transport(this.patternStore);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <WavyBackground />
          <div className={styles.container}>
            <div className={styles.content}>
              <PlayPauseButton source={this.transport} />
              <InstrumentPicker transport={this.transport} />
              <BpmSelector transport={this.transport} />
              <LengthSelector store={this.patternStore} />
              <CurrentNoteRow transport={this.transport} />
              <StepActivationRow store={this.patternStore} />
              <OctaveTranspositionRow store={this.patternStore} />
              <SemiToneTranspositionRow store={this.patternStore} />
            </div>
          </div>
        </StylesProvider>
      </ThemeProvider>
    );
  }
}
