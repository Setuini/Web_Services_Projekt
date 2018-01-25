import React from 'react';
import { Collapse,Navbar, NavbarToggler, Nav } from 'reactstrap';
import { Link } from 'react-router-dom'

export class NavbarPlatraLoggedIn extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      fireRedirect: false
    };
    this.onLogout = this.props.onLogout;

    this.save_button = "";
    console.log(this.props);
    //if(this.props.location === "/timetable") {
        //this.save_button = <Link className="btn btn-primary button-platra" onClick={this.saveTimetable} to="#">Save Timetable</Link>;
    //}
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
              {this.save_button}
              <Link className="nav-link" to="/timetable">Timetables</Link>
              <Link className="nav-link" to="/">Profile</Link>
              <Link className="nav-link" to="/" onClick={this.onLogout}>Logout</Link>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
