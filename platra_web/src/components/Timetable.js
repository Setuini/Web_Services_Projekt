import React  from 'react';
import { Container, Row } from 'reactstrap';
import { TimetableDay } from './TimetableDay.js';
import moment from 'moment';

export class Timetable extends React.Component {
    constructor(props){
    super(props);
    this.state = {
      startDate: props.location.startDate,
      endDate: props.location.endDate,
      location: props.location.location,
      jsonData: '',
      errors: '',
      fetchInProgress: false
    };
    console.log("Timetable - startDate: "+moment(this.state.startDate).format("DD/MM/YYYY"));
    console.log("Timetable - endDate: "+moment(this.state.endDate).format("DD/MM/YYYY") );
    console.log("Timetable - Location: "+this.state.location);
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

/*
    var a = moment(this.state.startDate.format("DD/MM/YYYY"));
    var b = moment(this.state.startDate.format("DD/MM/YYYY"));
    var len = a.diff(b, 'days');
    console.log(len);*/


    
    

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
