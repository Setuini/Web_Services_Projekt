import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Landing } from './Landing.js';
import { Timetable } from './Timetable.js';
import App from '../App.js';


export class Routes extends Component {

  render() {
    return (
  		<div>
  			<Route exact path="/" component={Landing}/>
  			<Route path="/timetable" component={Timetable}/>
  		</div>
    );
  }

}

