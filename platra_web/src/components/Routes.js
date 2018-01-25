import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Landing } from './Landing.js';
import { Timetable } from './Timetable.js';
import { UserTimetable } from './UserTimetable.js';
import { LoginPage } from './LoginPage.js';
import { RegisterPage } from './RegisterPage.js';
import { AuthTest } from './AuthTest.js';
import {NavbarPlatra} from './Navbar.js';
import {NavbarPlatraLoggedIn} from './NavbarLoggedIn.js';

export class Routes extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            navbar: <NavbarPlatra/>
        };
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(event){
        this.setState({
            navbar: <NavbarPlatra/>,
            loggedIn: false
        });
    }

    onLogin(event){
        this.setState({
            navbar: <NavbarPlatraLoggedIn onLogout={this.onLogout}/>,
            loggedIn: true
        });
    }

    render() {
        return (
            <div>
            {this.state.navbar}
            <Route exact path="/" component={Landing}/>
            <Route path="/timetable" component={Timetable}/>
                <Route path="/usertimetable" component={UserTimetable}/>
            <Route path="/register" component={RegisterPage}/>
            <Route  path="/auth" component={AuthTest}/>

            <Route path="/login" render={(props) => (
                <LoginPage {...props} onLogin={this.onLogin}/>
            )}/>

            </div>
        );
    }

}

