import React from 'react';
import { Collapse,Navbar, NavbarToggler, Nav } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom'
//import { DropdownLogin } from './DropdownLogin.js';

export class NavbarPlatraLoggedIn extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      fireRedirect: false
    };

    this.onLogout = this.props.onLogout;
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <Link className="nav-link" to="/">Platra</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

              <Link className="nav-link" to="/timetable">Timetables</Link>
              <Link className="nav-link" to="/">Profile</Link>

              <a className="nav-link" onClick={this.onLogout}>Logout</a>
             
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
