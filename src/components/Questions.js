import React, { Component } from 'react';

class Questions extends Component {
  state = {
    perguntas: [],
    timer: 30,
    color: false,
    disable: false,
    nextBtn: false };

  render() {
    return (
      <div>Questions</div>
    );
  }
}

export default Questions;
