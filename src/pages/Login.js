import React from 'react';
import { connect } from 'react-redux';

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
        >
          Play
        </button>
      </div>
    );
  }
}

export default connect()(Login);
