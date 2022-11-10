import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import triviaAPI from '../helpers/triviaAPI';

class Game extends Component {

  state = {
    response:{}
  }

  componentDidMount () {
    const token = localStorage.getItem('token');
    console.log(token);
    const getAPI = triviaAPI(token).then((dado) => this.setState({
      response: dado
    }));
  }

  render() {
    const { response } = this.state;

    return (
      <div>
        <Header />
        <Questions response={ response } />
      </div>
    );
  }
}

export default connect()(Game);
