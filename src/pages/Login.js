import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  render() {
    return(
      <div>
        <input type="text" name="" value="" placeholder='Nome' data-testid="input-player-name" />
        <input type="email" name="" value="" placeholder='Email' data-testid="input-gravatar-email" />
        <button type="button" >
          Play
        </button>
      </div>
    )
  }
}

export default connect()(Login);
