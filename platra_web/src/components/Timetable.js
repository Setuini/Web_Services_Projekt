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
    fetch("https://jsonplaceholder.typicode.com/photos/1",{
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    })
    .then((res) => {
      return res.json(); 
    })
    .then((resdata) => {
      this.setState({
        heading: "Goldenes Dachl",//JSON.stringify(resdata.title),
        //desc: JSON.stringify(resdata.body),
        img: resdata.url,
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
              <TimetableDay/>
              <TimetableDay/>
              <TimetableDay/>
          </Row>
        </Container>
      </div>
    );
  }

}