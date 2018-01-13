import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'

export class Navbar_Platra extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg">
            <a className="navbar-brand" href="#">
                <img className="logo" src="img/logo.svg" alt=""/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Register
                        </a>
                        <form className="dropdown-menu dropdown-menu-right p-4">
                            <div className="form-group">
                                <label for="exampleDropdownFormEmail2">Email address</label>
                                <input type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com"/>
                            </div>
                            <div className="form-group">
                                <label for="exampleDropdownFormPassword2">Password</label>
                                <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <label for="exampleDropdownFormPassword2">Confirm Password</label>
                                <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Password"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Login
                        </a>
                        <form className="dropdown-menu dropdown-menu-right p-4">
                            <div className="form-group">
                                <label for="exampleDropdownFormEmail2">Email address</label>
                                <input type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com"/>
                            </div>
                            <div className="form-group">
                                <label for="exampleDropdownFormPassword2">Password</label>
                                <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Password"/>
                            </div>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input"/>
                                    Remember me
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </li>

                </ul>

            </div>
        </nav>
    );
  }

}