import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {
  render() {
    return (
      <div data-testid="settings-title">Settings</div>
    );
  }
}
export default connect()(Settings);
