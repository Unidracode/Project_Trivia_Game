import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    const { name, gravatarEmail, score } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    const gravatarImage = `https://www.gravatar.com/avatar/${emailHash}`;
    const playerObject = { name, gravatarImage, score };
    const checkRanking = localStorage.getItem('ranking');
    if (checkRanking) {
      console.log(checkRanking);
      const parseRanking = JSON.parse(checkRanking);
      parseRanking.push(playerObject);
      parseRanking.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(parseRanking));
    } else {
      localStorage.setItem('ranking', JSON.stringify([playerObject]));
    }
  }

  getFeedback = () => {
    const THREE = 3;
    const { assertions } = this.props;
    if (assertions < THREE) {
      return 'Could be better...';
    }
    return 'Well Done!';
  };

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <div data-testid="feedback-text">{this.getFeedback()}</div>
        <div data-testid="feedback-total-score">{score}</div>
        <div data-testid="feedback-total-question">{assertions}</div>
        <button
          type="button"
          onClick={ this.playAgain }
          data-testid="btn-play-again"
        >
          Play Again
        </button>

        <button
          type="button"
          onClick={ this.goToRanking }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback); //
