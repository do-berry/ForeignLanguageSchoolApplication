import React from 'react';
import './App.css';
import Header from './header/Header.js';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './BaseRouter.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <BaseRouter />
        </Router>
      </div>
    )
  }
}

export default App;
