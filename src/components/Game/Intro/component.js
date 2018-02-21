// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form';
import { Button, Switch } from 'material-ui';

import { setGameState, setOnlyFirstNames } from '../actions';
import { gameState } from '../reducers';

import './styles.css';

type Props = {
  onlyFirstNames: boolean,

  handleStartGame: () => void,
  handleSetOnlyFirstNames: () => void,
};

class Intro extends Component<Props> {

  static mapStateToProps(state) {
    return {
      onlyFirstNames: state.settings.onlyFirstNames,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      handleStartGame: () => {
        dispatch(setGameState(gameState.MEMORIZE));
      },
      handleSetOnlyFirstNames: (_, isChecked) => {
        dispatch(setOnlyFirstNames(isChecked));
      },
    };
  }

  render() {
    const { onlyFirstNames, handleSetOnlyFirstNames, handleStartGame } = this.props;

    return (
      <div className="Intro">
        <div className="title">New game</div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Settings</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={onlyFirstNames}
                  onChange={handleSetOnlyFirstNames}
                />
              }
              label="Only show first names"
            />
          </FormGroup>
          <Button className="start" onClick={handleStartGame}>Start</Button>
        </FormControl>
      </div>
    );
  }

}

export default connect(Intro.mapStateToProps, Intro.mapDispatchToProps)(Intro);
