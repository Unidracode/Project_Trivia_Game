import React, { Component } from 'react';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = localStorage.getItem('ranking');
    this.setState({ ranking: JSON.parse(ranking) });
  }

  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking?.map((element, index) => (
          <>
            <img src={ element.gravatarImage } alt="player" />
            <h2 data-testid={ `player-name-${index}` }>{element.name}</h2>
            <h2 data-testid={ `player-score-${index}` }>{element.score}</h2>
          </>
        )) }
        <button
          type="button"
          onClick={ this.goToHome }
          data-testid="btn-go-home"
        >
          Início
        </button>
      </>
    );
  }
}

Ranking.propTypes = {}.isRequired;

export default Ranking;
