import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import {NavbarPlatra} from './components/Navbar.js';
import {NavbarPlatraLoggedIn} from './components/NavbarLoggedIn.js';
import {Routes} from './components/Routes.js';

class App extends Component {


  constructor(props){
    super(props);
    this.navbar = null; 
    if(localStorage.getItem('jwt')) {
        this.navbar = <NavbarPlatraLoggedIn />
    } else {
        this.navbar = <NavbarPlatra />
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            {this.navbar}
            <Routes/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
