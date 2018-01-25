import React from 'react';
import { Row, Col } from 'reactstrap';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { SearchAutocomplete } from './SearchAutocomplete.js'



export class Search extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment().add(1, "days"),
      includeDays: [],
      location: ''
    };
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.setLocation = this.setLocation.bind(this);
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

  setLocation(event){
    console.log("SET LOCATION:"+event);
    this.setState({
      location: event
    });
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
                  <label>arrival time</label>
                  <DatePicker selected={this.state.startDate} onChange={this.setStart} className="Date-Input form-control" dateFormat="DD/MM/YYYY"/>
              </Col>
              <Col xs="12" lg="6">
                  <label>departure time</label>
                  <DatePicker selected={this.state.endDate} onChange={this.setEnd} className="Date-Input form-control" dateFormat="DD/MM/YYYY"/>
              </Col>
          </Row>
          <Row>
              <Col xs="12">
                  <div className="form-destination">
                    <SearchAutocomplete location={this.state.location} onChange={this.setLocation}/>
                  </div>
              </Col>
          </Row>
        </form>
      </div>
    );
  }

  

}