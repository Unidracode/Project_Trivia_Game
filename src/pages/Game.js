import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaAPI from '../helpers/triviaAPI';

class Game extends Component {
  state = {
    response: [],
    questIndex: 0,
  };

  async componentDidMount() {
    this.handleResults();
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

  render() {
    const { response, questIndex } = this.state;
    return (
      <div>
        <Header />
        {response.map((element, index) => {
          if (index === questIndex) {
            return (
              <div key={ index + element }>
                <h2 data-testid="question-category">{element.category}</h2>
                <h3 data-testid="question-text">{element.question}</h3>
                <div data-testid="answer-options">
                  {this
                    .handleQuestArray([...element.incorrect_answers,
                      element.correct_answer])
                    .map((argument, i = 0) => (
                      <button
                        type="button"
                        key={ argument }
                        data-testid={
                          element
                            .correct_answer === argument
                            ? 'correct-answer' : `wrong-answer-${i}`
                        }
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
