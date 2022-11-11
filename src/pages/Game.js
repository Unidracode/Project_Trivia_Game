import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import Timer from '../components/Timer';
import triviaAPI from '../helpers/triviaAPI';

class Game extends Component {
  state = {
    response: [],
    questIndex: 0,
    seconds: 30,
  };

  async componentDidMount() {
    this.handleResults();
    this.renderTimer();
  }

  componentWillUnmount() {
    clearInterval(this.renderTimer);
  }

  renderTimer = () => {
    const ONE_SECOND = 1000;
    setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState((prev) => ({ seconds: seconds > 0 ? prev.seconds - 1 : 0 }));
      }
    }, ONE_SECOND);
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

  render() {
    const { response, questIndex, seconds } = this.state;
    console.log(response);
    return (
      <div>
        <Header />
        <Timer seconds={ seconds } />
        {response.map((element, index) => {
          if (index === questIndex) {
            return (
              <div key={ index + element }>
                <h2 data-testid="question-category">{element.category}</h2>
                <h3 data-testid="question-text">{element.question}</h3>

                <Questions currentQuestion={ element } seconds={ seconds } />

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
