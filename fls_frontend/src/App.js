import React from 'react';
import './App.css';
import Header from './header/Header.js';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Redirect from "./routes";

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
