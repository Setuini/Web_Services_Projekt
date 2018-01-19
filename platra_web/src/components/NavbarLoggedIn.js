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
import { DropdownLogin } from './DropdownLogin.js';

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

  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand><Link to="/">Platra</Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

              <NavLink><li><Link to="/timetable">Timetables</Link></li></NavLink>
              <NavLink><li><Link to="/">Profile</Link></li></NavLink>
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}