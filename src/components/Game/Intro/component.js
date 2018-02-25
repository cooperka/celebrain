// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form';
import { Button, Switch, Checkbox } from 'material-ui';

import { setGameState, setOnlyFirstNames, setPopularity } from '../actions';
import { gameState } from '../reducers';

import './styles.css';

type Props = {
  onlyFirstNames: boolean,
  popularityGroups: Array<boolean>,

  handleStartGame: () => void,
  handleSetOnlyFirstNames: (boolean) => void,
  handleSetPopularity: (boolean, number) => void,
};

class Intro extends Component<Props> {

  static mapStateToProps(state) {
    return {
      onlyFirstNames: state.game.onlyFirstNames,
      popularityGroups: state.game.popularityGroups,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      handleStartGame: () => {
        dispatch(setGameState(gameState.MEMORIZE));
      },
      handleSetOnlyFirstNames: (isChecked) => {
        dispatch(setOnlyFirstNames(isChecked));
      },
      handleSetPopularity: (isChecked, groupIndex) => {
        dispatch(setPopularity(isChecked, groupIndex));
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
    const { onlyFirstNames, handleSetOnlyFirstNames, handleStartGame } = this.props;

    return (
      <div className="Intro">
        <div className="title">New game</div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Settings</FormLabel>
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

export default connect(Intro.mapStateToProps, Intro.mapDispatchToProps)(Intro);
