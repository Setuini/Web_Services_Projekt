import React from 'react';
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap';
import { Link } from 'react-router-dom'

export class NavbarPlatra extends React.Component {
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
         <Link to="/" className="navbar-brand">Platra</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}