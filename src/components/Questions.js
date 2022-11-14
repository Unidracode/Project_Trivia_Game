import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScore } from '../redux/actions';

const stateObj = {
  perguntas: [],
  hasClassName: false,
  questDifficulty: '',
  // timer: 30,
  // color: false,
  // disable: false,
  // nextBtn: false,
};

class Questions extends Component {
  state = { ...stateObj };

  componentDidMount() {
    this.handleQuestArray();
    this.handleDifficulty();
  }

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
    const { seconds, dispatch, updateCorrectAnswer } = this.props;
    const { questDifficulty } = this.state;
    const TEN = 10;
    if (value === 'correct') {
      const scoreValue = TEN + (seconds * questDifficulty);
      console.log(scoreValue);
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
    const { currentQuestion, seconds, next } = this.props;
    console.log(currentQuestion);
    const { perguntas, hasClassName } = this.state;
    return (
      <>
        <div data-testid="answer-options">
          {perguntas.map((element, i = 0) => (
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

const mapStateToProps = (state) => ({
  correctAnswer: state.player.correctAnswer,
});

Questions.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Questions);
