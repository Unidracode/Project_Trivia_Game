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

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <div data-testid="feedback-text">{this.getFeedback()}</div>
        <div data-testid="feedback-total-score">{score}</div>
        <div data-testid="feedback-total-question">{assertions}</div>
        <Header />
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
