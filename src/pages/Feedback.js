import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  getFeedback = () => {
    const THREE = 3;
    const { correctAnswer } = this.props;
    if (correctAnswer < THREE) {
      return 'Could be better...';
    }
    return 'Well Done!';
  };

  render() {
    return (
      <div>
        <div data-testid="feedback-text">{this.getFeedback()}</div>
        <div data-testid="feedback-total-score">{this.getFeedback()}</div>
        <Header />
      </div>
    );
  }
}

Feedback.propTypes = {}.isRequired;

const mapStateToProps = (state) => ({
  correctAnswer: state.player.correctAnswer,
});

export default connect(mapStateToProps)(Feedback); //
