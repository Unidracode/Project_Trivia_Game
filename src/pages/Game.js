import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaAPI from '../helpers/triviaAPI';

class Game extends Component {
  state = {
    response:{}
  }
  async componentDidMount () {
    const token = localStorage.getItem('token');
    const getAPI = await triviaAPI(token);
    this.setState({ response:getAPI });
    console.log(getAPI);
  }

  render() {
    return (
      <Header />
    );
  }
}

export default connect()(Game);
