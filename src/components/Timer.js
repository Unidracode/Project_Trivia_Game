import React, { Component } from 'react';
import { connect } from 'react-redux';

class Timer extends Component {
  render() {
    const { seconds } = this.props;
    return (
      <div>
        <h1>{ seconds }</h1>
      </div>
    );
  }
}

Timer.propTypes = {}.isRequired;

export default connect()(Timer);
