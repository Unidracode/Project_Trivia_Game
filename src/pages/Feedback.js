import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
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
      </div>
    );
  }
}

Feedback.propTypes = {}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback); //
