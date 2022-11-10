import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    return (
      <div>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${emailHash}` } alt="foto do usuário" />
        <h1 data-testid="header-player-name">{name}</h1>
        <h3 data-testid="header-score">{score}</h3>
      </div>
    );
  }
}

Header.propTypes = {}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
