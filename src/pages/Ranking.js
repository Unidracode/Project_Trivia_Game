import React, { Component } from 'react';

class Ranking extends Component {
  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>

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
