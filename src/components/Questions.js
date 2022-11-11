import React, { Component } from 'react';

const stateObj = {
  perguntas: [],
  hasClassName: false,
  // timer: 30,
  // color: false,
  // disable: false,
  // nextBtn: false,
};

class Questions extends Component {
  state = { ...stateObj };

  componentDidMount() {
    this.handleQuestArray();
  }

  handleQuestArray = () => {
    const { currentQuestion } = this.props;
    const arrayToSort = [...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer];
    console.log(arrayToSort);
    const ZERO_POINT_FIVE = 0.5;
    const newArray = arrayToSort.sort(() => Math.random() - ZERO_POINT_FIVE);
    console.log(newArray);
    this.setState({ perguntas: newArray });
  };

  handleQuestClick = () => {
    this.setState({ hasClassName: true });
  };

  checkColors = (element) => {
    const { currentQuestion } = this.props;
    const { hasClassName } = this.state;
    if (hasClassName) {
      return currentQuestion.correct_answer === element ? 'green-border' : 'red-border';
    }
  };

  render() {
    const { currentQuestion, seconds } = this.props;
    console.log(currentQuestion);
    const { perguntas } = this.state;
    return (
      <div data-testid="answer-options">
        {perguntas.map((element, i = 0) => (
          <button
            key={ element }
            type="button"
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
    );
  }
}

Questions.propTypes = {}.isRequired;

export default Questions;

// {this
//   .handleQuestArray([...element.incorrect_answers,
//     element.correct_answer])
//   .map((argument, i = 0) => (

//     <button
//       type="button"
//       onClick={ this.handleQuestClick }
//       className={ this.checkColors(element, argument) }
//       key={ argument }
//       value={ element.correct_answer === argument
//         ? 'correct' : 'wrong' }
//       data-testid={
//         element
//           .correct_answer === argument
//           ? 'correct-answer' : `wrong-answer-${i}`
//       }
//       disabled={ seconds === 0 }
//     >
//       {argument}
//     </button>

//   ))}
