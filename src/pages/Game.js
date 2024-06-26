import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
// import Timer from '../components/Timer';
import triviaAPI from '../helpers/triviaAPI';
import { getCorrectAnswer } from '../redux/actions';

class Game extends Component {
  state = {
    response: [],
    questIndex: 0,
    // seconds: 30,
    localCorrectAnswer: 0,
    // intervalId: '',
  };

  async componentDidMount() {
    this.handleResults();
    // this.renderTimer();
  }

  // componentWillUnmount() {
  //   const { intervalId } = this.state;
  //   clearInterval(intervalId);
  // }

  updateCorrectAnswer = () => {
    this.setState((prev) => ({
      localCorrectAnswer: prev.localCorrectAnswer + 1,
    }));
  };

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

  handleNextQuestionClick = () => {
    const { questIndex, localCorrectAnswer } = this.state;
    const { history, dispatch } = this.props;
    const NUMBER = 3;
    this.setState((prev) => ({ questIndex: prev.questIndex + 1 }));
    if (questIndex > NUMBER) {
      dispatch(getCorrectAnswer(localCorrectAnswer));
      history.push('/feedback');
    }
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

                <Questions
                  currentQuestion={ element }
                  next={ this.handleNextQuestionClick }
                  updateCorrectAnswer={ this.updateCorrectAnswer }
                />

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
