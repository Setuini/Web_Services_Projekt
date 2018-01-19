import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Landing } from './Landing.js';
import { Timetable } from './Timetable.js';
import { LoginPage } from './LoginPage.js';
import { RegisterPage } from './RegisterPage.js';


export class Routes extends Component {

  render() {
    return (
  		<div>
  			<Route exact path="/" component={Landing}/>
  			<Route path="/timetable" component={Timetable}/>
  			 <Route path="/login" component={LoginPage}/>
  			<Route path="/register" component={RegisterPage}/>

  		</div>
    );
  }

}

