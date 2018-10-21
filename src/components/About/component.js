// @flow

import * as R from 'ramda';
import React, { Component } from 'react';
import { withStyles } from 'material-ui';

import './styles.css';

type Props = {
};

class About extends Component<Props> {

  render() {
    return (
      <div className="About page">
        <div className="title">About</div>

        <div className="section">
          <div className="subtitle">Inspiration</div>
          <div className="description">
            {' I\'ve always had a difficult time remembering peoples names --'
            + ' especially movie characters and celebrities --'
            + ' so I\'ve recently been trying harder to improve.'
            + ' This game is a fun attempt at solving two problems at once.'}
          </div>
        </div>

        <div className="section">
          <div className="subtitle">Which celebrities?</div>
          <div className="description">
            {'Currently, the pool of celebrities comes from the Wikipedia categories for American '}
            <a href="https://en.wikipedia.org/wiki/Category:American_male_film_actors">actors</a>
            {' and '}
            <a href="https://en.wikipedia.org/wiki/Category:American_film_actresses">actresses</a>
            {'. It includes every person in each of those categories for whom a picture is available --'
            + ' about 5300 men and 4200 women. This will be expanded soon.'}
          </div>
        </div>

        <div className="section">
          <div className="subtitle">How is popularity determined?</div>
          <div className="description">
            {'The '}
            <a href="https://www.mediawiki.org/wiki/API:Main_page">Wikimedia API</a>
            {' provides monthly Wikipedia pageview metrics which I used to determine popularity.'}
          </div>
        </div>

        <div className="section">
          <div className="subtitle">Attribution</div>
          <div className="description">
            {'Images are sourced from Wikipedia and may be subject to copyright.'
            + ' Click on the images to find their original source and licensing on the Wikimedia Commons.'}
          </div>
        </div>
      </div>
    );
  }

}

const styles = () => ({
});

export default R.compose(
  withStyles(styles),
)(About);
