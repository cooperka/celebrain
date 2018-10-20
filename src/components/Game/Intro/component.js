// @flow

import * as R from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withStyles,
  Button, Switch, Checkbox, TextField,
  FormLabel, FormControl, FormGroup, FormControlLabel,
} from 'material-ui';

import { setNumCelebs, setOnlyFirstNames, setPopularity, setGameState } from '../actions';
import { gameState } from '../reducers';

import './styles.css';

type Props = {
  numCelebs: number,
  onlyFirstNames: boolean,
  popularityGroups: Array<boolean>,

  handleSetNumCelebs: (number) => void,
  handleSetOnlyFirstNames: (boolean) => void,
  handleSetPopularity: (boolean, number) => void,
  handleStartGame: () => void,
};

class Intro extends Component<Props> {

  static mapStateToProps(state) {
    return {
      numCelebs: state.game.numCelebs,
      onlyFirstNames: state.game.onlyFirstNames,
      popularityGroups: state.game.popularityGroups,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      handleSetNumCelebs: (numCelebs) => {
        dispatch(setNumCelebs(numCelebs));
      },
      handleSetOnlyFirstNames: (isChecked) => {
        dispatch(setOnlyFirstNames(isChecked));
      },
      handleSetPopularity: (isChecked, groupIndex) => {
        dispatch(setPopularity(isChecked, groupIndex));
      },
      handleStartGame: () => {
        dispatch(setGameState(gameState.MEMORIZE));
      },
    };
  }

  renderPopularityControls() {
    const { popularityGroups, handleSetPopularity } = this.props;

    const labels = [
      '75th percentile (popular)',
      '50-75th percentile',
      '25-50th percentile',
      '0-25th percentile (uncommon)',
    ];

    return (
      <FormGroup>
        {popularityGroups.map((isChecked, index) => (
          <FormControlLabel
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            control={
              <Checkbox
                checked={isChecked}
                onChange={(_, checked) => handleSetPopularity(checked, index)}
              />
            }
            label={labels[index]}
          />
        ))}
      </FormGroup>
    );
  }

  render() {
    const { numCelebs, onlyFirstNames, handleSetOnlyFirstNames, handleSetNumCelebs, handleStartGame } = this.props;

    return (
      <div className="Intro">
        <div className="title">New game</div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Settings</FormLabel>
          <FormControlLabel
            control={
              <TextField
                value={numCelebs}
                onChange={(event) => handleSetNumCelebs(event.target.value)}
                type="number"
                margin="normal"
                className="num-celebs"
              />
            }
            label="Number of celebrities"
          />
          <FormControlLabel
            control={
              <Switch
                checked={onlyFirstNames}
                onChange={(_, isChecked) => handleSetOnlyFirstNames(isChecked)}
              />
            }
            label="Only learn first names"
          />
          <FormLabel component="label">Celebrity popularity</FormLabel>
          {this.renderPopularityControls()}
          <Button className="start" onClick={handleStartGame}>Start</Button>
        </FormControl>
      </div>
    );
  }

}

const styles = () => ({
});

export default R.compose(
  withStyles(styles),
  connect(Intro.mapStateToProps, Intro.mapDispatchToProps),
)(Intro);
