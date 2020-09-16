import React from 'react';
import './App.css';
import Header from './header/Header.js';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './BaseRouter.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserTypeProvider} from "./static/UserType";

class App extends React.Component {
    render() {
        return (
            <UserTypeProvider>
                <div className="App">
                    <Router>
                        <Header/>
                        <BaseRouter/>
                    </Router>
                </div>
            </UserTypeProvider>
        )
    }
}

export default App;
