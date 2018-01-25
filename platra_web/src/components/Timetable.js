import React  from 'react';
import { Container, Row } from 'reactstrap';

import { TimetableDay } from './TimetableDay.js';


export class Timetable extends React.Component {
    constructor(props){
    super(props);
    this.state = {
      startDate: props.match.params.startDate,
      endDate: props.match.params.endDate,
      location: props.match.params.location,
      jsonData: '',
      errors: '',
      fetchInProgress: false
    };console

    console.log("Timetable - startDate:"+props.location.startDate);
    console.log("Timetable - endDate:"+props.location.endDate);
    console.log("Timetable - Location:"+props.location.location);
  }


  // Fetch Data for given Time (startDate -> endDate)
  componentDidMount(){

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json');
    console.log("Timetable.js - Fetch");

    this.setState({fetchInProgress: true});
    fetch("http://localhost:3000/api/places",{
        method: 'POST',
        headers: myHeaders,
        mode: 'cors'
    })
    .then((res) => {
      return res.json(); 
    })
    .then((resdata) => {
      Object.keys(resdata).forEach(function(key) {
      });
      this.setState({
        jsonData: JSON.stringify(resdata),
        //desc: JSON.stringify(resdata.body),
        //img: resdata.url,
        fetchInProgress: false
      });
    })
    .catch( (ex) => {
      console.log("Timetable - Fetch failed" + ex);
      this.setState({
        errors : ex,
        fetchInProgress: false 
      });
    });
  }

  // create timetable according to days of the fetch
  render() {
    return (
      <div>
        <Container>
          <Row>
              <TimetableDay jsonData={this.state.jsonData}/>
              <TimetableDay jsonData={this.state.jsonData}/>
              <TimetableDay jsonData={this.state.jsonData}/>
          </Row>
        </Container>
      </div>
    );
  }

}
