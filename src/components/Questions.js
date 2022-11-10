import React, { Component } from 'react';
import { connect } from 'react-redux';

class Questions extends Component {
  componentDidUpdate () {
    const { response: { response_code } } = this.props;
    const { history } = this.props;
    const THREE = 3;
    if (response_code === THREE) {
      history.push('/');
      localStorage.removeItem('token');
    }
  }

  render() {
    return (
      <div>PERGUNTAS</div>
    );
  }
}

export default connect()(Questions);
