import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import {Navbar_Platra} from './components/Navbar.js';
import {Routes} from './components/Routes.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar_Platra/>
            <Routes/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
