import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScore } from '../redux/actions';
import Timer from './Timer';

const stateObj = {
  perguntas: [],
  hasClassName: false,
  questDifficulty: '',
  seconds: 30,
  intervalId: '',
};

class Questions extends Component {
  state = { ...stateObj };

  componentDidMount() {
    this.handleQuestArray();
    this.handleDifficulty();
    this.renderTimer();
    this.setState({ seconds: 30 });
  }

  componentDidUpdate() {
    const { intervalId, seconds } = this.state;
    if (seconds === 0) {
      clearInterval(intervalId);
    }
  }

  renderTimer = () => {
    const ONE_SECOND = 1000;
    const intervalId = setInterval(() => {
      this.setState((prev) => ({ seconds: prev.seconds - 1 }));
    }, ONE_SECOND);
    this.setState({ intervalId });
  };

  handleQuestArray = () => {
    const { currentQuestion } = this.props;
    const arrayToSort = [...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer];
    const ZERO_POINT_FIVE = 0.5;
    const newArray = arrayToSort.sort(() => Math.random() - ZERO_POINT_FIVE);
    this.setState({ perguntas: newArray });
  };

  handleDifficulty = () => {
    const { currentQuestion: { difficulty } } = this.props;
    if (difficulty === 'hard') {
      this.setState({ questDifficulty: 3 });
    } else if (difficulty === 'medium') {
      this.setState({ questDifficulty: 2 });
    } else if (difficulty === 'easy') {
      this.setState({ questDifficulty: 1 });
    }
  };

  handleScoreClick = (event) => {
    const { value } = event.target;
    const { dispatch, updateCorrectAnswer } = this.props;
    const { questDifficulty, seconds } = this.state;
    const TEN = 10;
    if (value === 'correct') {
      const scoreValue = TEN + (seconds * questDifficulty);
      dispatch(getScore(scoreValue));
      updateCorrectAnswer();
    }
  };

  handleQuestClick = (event) => {
    this.setState({ hasClassName: true });
    this.handleScoreClick(event);
  };

  checkColors = (element) => {
    const { currentQuestion } = this.props;
    const { hasClassName } = this.state;
    if (hasClassName) {
      return currentQuestion.correct_answer === element ? 'green-border' : 'red-border';
    }
  };

  render() {
    const { currentQuestion, next } = this.props;
    const { perguntas, hasClassName, seconds } = this.state;
    return (
      <>
        <Timer seconds={ seconds } />
        <div data-testid="answer-options">
          {perguntas.map((element, i) => (
            <button
              key={ element }
              type="button"
              value={ element === currentQuestion.correct_answer
                ? 'correct' : 'wrong' }
              data-testid={ element === currentQuestion.correct_answer
                ? 'correct-answer' : `wrong-answer-${i}` }
              onClick={ this.handleQuestClick }
              className={ this.checkColors(element) }
              disabled={ seconds === 0 }
            >
              {element}

            </button>
          ))}
        </div>
        { hasClassName && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ next }
          >
            Next

          </button>
        ) }
      </>

    );
  }
}

Questions.propTypes = {}.isRequired;

export default connect()(Questions);
