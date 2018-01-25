import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'
//import { DropdownLogin } from './DropdownLogin.js';

export class NavbarPlatraLoggedIn extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    localStorage.clear();
    this.props.history.push('/')
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
              <Link className="nav-link" onClick={this.logout} to="/">Logout</Link>
             
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
