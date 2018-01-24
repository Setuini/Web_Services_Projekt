import React  from 'react';
import { Container, Row } from 'reactstrap';

import { TimetableDay } from './TimetableDay.js';


export class Timetable extends React.Component {
    constructor(props){
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      jsonData: '',
      errors: '',
      fetchInProgress: false
    };
  }

  // Fetch Data for given Time (startDate -> endDate)
  componentDidMount(){
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json');
    console.log("Timetable.js - Fetch");

    this.setState({fetchInProgress: true});
    fetch("http://localhost:3000/api/places",{
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    })
    .then((res) => {
      console.log("Res "+res[0]);
      return res.json(); 
    })
    .then((resdata) => {
      console.log(resdata);
      console.log("Name "+resdata[1]);
      this.setState({
        jsonData: JSON.stringify(resdata),
        //desc: JSON.stringify(resdata.body),
        //img: resdata.url,
        fetchInProgress: false
      });

    })
    .catch( (ex) => {
      console.log("Fetch failed" + ex);
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