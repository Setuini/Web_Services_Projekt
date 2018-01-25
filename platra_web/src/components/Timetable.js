import React  from 'react';
import { Container, Row } from 'reactstrap';
import { TimetableDay } from './TimetablePage.js';
import { Link } from 'react-router-dom'
import moment from 'moment';
import { TimetablePage } from './TimetablePage.js';

export class Timetable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activePage: 1,
      startDate: props.location.startDate,
      endDate: props.location.endDate,
      location: props.location.location,
      jsonData: '',
      errors: '',
      fetchInProgress: false
    };

    console.log(this.state);
    /*console.log("Timetable - startDate: "+moment(this.state.startDate).format("DD/MM/YYYY"));
    console.log("Timetable - endDate: "+moment(this.state.endDate).format("DD/MM/YYYY") );
    console.log("Timetable - Location: "+this.state.location);*/
  }

  // Fetch Data for given Time (startDate -> endDate)
  componentDidMount(){
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json');
    
    //console.log("Timetable.js - Fetch");

    this.setState({fetchInProgress: true});
    fetch("http://localhost:3000/api/v1/places",{
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
      console.log("Timetable - Fetch failed: " + ex);
      this.setState({
        errors : ex,
        fetchInProgress: false 
      });
    });
  }

  // save timetable
  saveTimeTable() {
    console.log("Save timetable");
    console.log(this.state);
  }

  // create timetable according to days of the fetch
  render() {

    var len = 0;
    if(this.state.startDate !== undefined && this.state.endDate !== undefined){
      var a = this.state.startDate;
      var b = this.state.endDate;
      len = b.diff(a, 'days');
    }

    /*console.log("Timetable - Length: "+len);
    console.log(this.state);

    var timetableDays = [];
    for (var i = 0; i < len; i++) {
        var date = moment(this.state.startDate).add(i,'days').format("DD/MM/YYYY");
        var day = this.getDay(moment(this.state.startDate).add(i,'days').day());
        timetableDays.push(<TimetableDay day={day} date={date} key={i}/>);
    }*/

    return (
      <div>
        <Link onClick={this.saveTimeTable} to="#">Save Timetable</Link>
        <TimetablePage pagenumber={this.state.activePage} start={this.startDate} end={this.endDate} location={this.state.location}/>
      </div>
    );
  }

}
