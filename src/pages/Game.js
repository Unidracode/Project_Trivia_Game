import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaAPI from '../helpers/triviaAPI';

class Game extends Component {
  state = {
    response: {},
  };

  async componentDidMount () {
    const { response } = this.state;
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const getAPI = await triviaAPI(token);
    this.setState({ response: getAPI });
    if (!response.results) {
      setTimeout(() => {
        history.push('/');
        localStorage.removeItem('token');
      }, 200);
    }
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

Game.propTypes = {}.isRequired;

export default connect()(Game);
