import React, { Component } from 'react';
import Uploader from './Uploader'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Uploader />
        </header>
      </div>
    );
  }
}

export default App;
