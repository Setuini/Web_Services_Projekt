import React from 'react';
import { Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'


import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';


export class Search extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment().add(1, "days"),
      includeDays: []
    };
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
  }

  setStart(date) {
    var days = [];
    for (var i=1; i < 120; i++) {
      days[i] = moment(this.state.endDate).add(i,"days");
    }
    this.setState({
      startDate: date,
      endDate: moment(date).add(1, "days"),
      includeDays: days
    });
  }

  setEnd(date){
     this.setState({
      endDate: date
    });
  }

  render() {
    return 
  }


  render() {
    return (
      <div>

        <h1 className="Heading-Main">PlaTra</h1>
        <p className="Heading-Sub">Let us help to plan your holiday</p>
        <p className="Heading-Sub">We create a timetable with restaurants and points of interest for you, which you can than edit and store.</p>

        <form id="search-form">
          <Row>
              <Col xs="12" lg="6">
                  <label for="arrivaltime">arrival time</label>
                  <DatePicker selected={this.state.startDate} onChange={this.setStart} className="Date-Input form-control" dateFormat="DD/MM/YYYY"/>
              </Col>
              <Col xs="12" lg="6">
                  <label for="departuretime">departure time</label>
                  <DatePicker selected={this.state.endDate} onChange={this.setEnd} className="Date-Input form-control" dateFormat="DD/MM/YYYY" includeDates={this.state.includeDays}/>
              </Col>
          </Row>

          <Row>
              <Col xs="12">
                  <div class="form-destination">
                      <div class="row row-destination">
                          <div class="col-1 my-auto mx-auto">
                              <i class="fa fa-search" aria-hidden="true"></i>
                          </div>
                          <div class="col-sm-11 col-lg-9 ">
                              <input id="autocomplete" class="input-destination" type="text" name="city" placeholder="Enter for example 'Innsbruck'"/>
                          </div>
                          <div class="col-lg-2 my-auto mx-auto hidden-lg-down">
                              <input class="btn btn-primary" type="submit" id="search-btn" value="Search"/>
                          </div>
                      </div>
                  </div>
              </Col>
          </Row>
        </form>
      </div>
    );
  }

}