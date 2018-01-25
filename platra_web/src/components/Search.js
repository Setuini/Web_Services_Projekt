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
      endDate: moment().add(1, "d"),
      includeDays: [],
      location: ''
    };
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  setStart(date) {
    console.log("Search - Set Start Date:"+moment(date).format("DD/MM/YYYY"));
    this.setState({
      startDate: date
    });
    this.setEnd(moment(date).add(1, "d"));
  }

  setEnd(date){
    console.log("Search - Set End Date:"+moment(date).format("DD/MM/YYYY"));
    this.setState({
      endDate: date
    });
  }

  setLocation(location){
    console.log("Search - Set Location:"+location);
    this.setState({
      location: location
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
                    <SearchAutocomplete location={this.state.location} start={this.state.startDate} end={this.state.endDate} onChange={this.setLocation}/>
                  </div>
              </Col>
          </Row>
        </form>
      </div>
    );
  }

  

}
