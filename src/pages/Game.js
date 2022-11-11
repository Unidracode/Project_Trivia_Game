import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import triviaAPI from '../helpers/triviaAPI';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
    };
  }

  async componentDidMount() {
    this.handleResults();
  }

  handleResults = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const getAPI = await triviaAPI(token);
    console.log(getAPI);
    if (getAPI.response_code !== 0) {
      history.push('/');
      localStorage.removeItem('token');
    }
    this.setState({ response: getAPI.results });
  };

  render() {
    const { response } = this.state;
    console.log(response);
    return (
      <Header />
    );
  }
}

Game.propTypes = {}.isRequired;

export default connect()(Game);
