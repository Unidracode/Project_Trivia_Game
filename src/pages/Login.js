import React from 'react';
import { connect } from 'react-redux';
import { getAPI, getName, getEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    btnDisabled: true,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.validateBtn());
  };

  validateBtn = () => {
    const { name, email } = this.state;
    const validateName = name.length > 0;
    const validateEmail = email.length > 0;
    if (validateName && validateEmail) {
      this.setState({ btnDisabled: false });
    }
  };

  handleClick = async () => {
    const { dispatch, history } = this.props;
    const { name, email } = this.state;
    // dispatch(getAPI());
    const url = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(url);
    const response = await request.json();
    localStorage.setItem('token', response.token);
    dispatch(getName(name));
    dispatch(getEmail(email));
    history.push('/game');
  };

  handleSettingsClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, btnDisabled } = this.state;
    return (
      <div>
        <input
          type="text"
          name="name"
          value={ name }
          placeholder="Nome"
          onChange={ this.handleChange }
          data-testid="input-player-name"
        />
        <input
          type="email"
          name="email"
          value={ email }
          placeholder="Email"
          onChange={ this.handleChange }
          data-testid="input-gravatar-email"
        />
        <button
          type="button"
          disabled={ btnDisabled }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettingsClick }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {}.isRequired;

export default connect()(Login);
