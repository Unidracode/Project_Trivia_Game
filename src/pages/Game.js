import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import triviaAPI from '../helpers/triviaAPI';

class Game extends Component {
  state = {
    response: [],
    questIndex: 0,
    className: false,
    seconds: 30,
  };

  async componentDidMount() {
    this.handleResults();
    this.renderTimer();
  }

  renderTimer = () => {
    const ONE_SECOND = 1000;
    setInterval(() => {
      const { seconds } = this.state;
      this.setState((prev) => ({ seconds: seconds > 0 ? prev.seconds - 1 : 0 }));
    }, ONE_SECOND)
  }

  handleResults = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const getAPI = await triviaAPI(token);
    if (getAPI.response_code !== 0) {
      history.push('/');
      localStorage.removeItem('token');
    }
    this.setState({ response: getAPI.results });
  };

  handleQuestArray = (array) => {
    const ZERO_POINT_FIVE = 0.5;
    const newArray = array.sort(() => Math.random() - ZERO_POINT_FIVE);
    return newArray;
  };

  handleQuestClick = () => {
    this.setState({ className: true });
  };

  checkColors = (element, argument) => {
    const { className } = this.state;
    if (className) {
      return element.correct_answer === argument ? 'green-border' : 'red-border';
    }
  };

  render() {
    const { response, questIndex, seconds } = this.state;
    console.log(response);
    return (
      <div>
        <Header />
        {response.map((element, index) => {
          if (index === questIndex) {
            return (
              <div key={ index + element }>
                <Timer seconds={seconds} />
                <h2 data-testid="question-category">{element.category}</h2>
                <h3 data-testid="question-text">{element.question}</h3>
                <div data-testid="answer-options">
                  {this
                    .handleQuestArray([...element.incorrect_answers,
                      element.correct_answer])
                    .map((argument, i = 0) => (
                      <button
                        type="button"
                        onClick={ this.handleQuestClick }
                        className={ this.checkColors(element, argument) }
                        key={ argument }
                        value={ element.correct_answer === argument
                          ? 'correct' : 'wrong' }
                        data-testid={
                          element
                            .correct_answer === argument
                            ? 'correct-answer' : `wrong-answer-${i}`
                        }
                        disabled={seconds === 0 ? true : false}
                      >
                        {argument}
                      </button>
                    ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
}

Game.propTypes = {}.isRequired;

export default connect()(Game);
