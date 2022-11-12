import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <div data-testid="feedback-text">Feedback</div>
        <Header />
      </div>
    );
  }
}

export default Feedback;
