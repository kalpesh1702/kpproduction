import React, { Component } from 'react';
import Router from './routing.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router />
      </div>
    );
  }
}

export default App;
