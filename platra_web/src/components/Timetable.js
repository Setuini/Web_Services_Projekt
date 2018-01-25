import React  from 'react';
//import { Link } from 'react-router-dom'
import moment from 'moment';
import { TimetablePage } from './TimetablePage.js';
import { TimetableDay } from './TimetableDay.js';
import { Container, Row, Col } from 'reactstrap';
import OwlCarousel from 'react-owl-carousel';

export class Timetable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activePage: 0,
      pages: 1,
      startDate: props.location.startDate,
      endDate: props.location.endDate,
      location: props.location.location,
      jsonData: '',
      errors: '',
      fetchInProgress: false
    };
    /*
    console.log(this.state);
    console.log("Timetable - startDate: "+moment(this.state.startDate).format("DD/MM/YYYY"));
    console.log("Timetable - endDate: "+moment(this.state.endDate).format("DD/MM/YYYY") );
    */
    //this.getDay = this.getDay.bind(this);
    //this.saveTimetable = this.saveTimetable.bind(this);
    console.log("Timetable - Location: "+this.state.location);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.hasNext = this.hasNext.bind(this);
    this.hasPrev = this.hasPrev.bind(this);
    this.getDay = this.getDay.bind(this);
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

  nextPage(){
    this.setState({
      activePage: this.state.activePage+1
    });
  }

  hasNext(){
    if (this.state.activePage < this.state.pages) {
      return true;
    }
    return false;
  }

  hasPrev(){
    if (this.state.activePage > 0) {
      return true;
    }
    return false;
  }

  prevPage(){
    this.setState({
      activePage: this.state.activePage-1
    });
  }

  getDay(weekday){
    if (weekday === 1) {
      return "Monday";
    }else if(weekday === 2){
      return "Tuesday";
    }else if(weekday === 3){
      return "Wednesday";
    }else if(weekday === 4){
      return "Thursday";
    }else if(weekday === 5){
      return "Friday";
    }else if(weekday === 6){
      return "Saturday";
    }else if(weekday === 0){
      return "Sunday";
    }else{
      return undefined;
    }
  }

  // create timetable according to days of the fetch
  render() {
    //var len = 0;
    //var numPages = 1;
    //if(this.state.startDate !== undefined && this.state.endDate !== undefined){
      //var a = this.state.startDate;
      //var b = this.state.endDate;
      //len = b.diff(a, 'd');
    //}

    //numPages = len/3;
    //var pages=[];
    //var start = this.state.startDate;
    //var end = moment(start, 'DD/MM/YYYY').add(3, 'd');
    //for (var i=0; i < numPages; i++){
      //console.log("Create Page");
      //pages.push(<TimetablePage key={i} pageNumber={i} prevPage={this.prevPage} nextPage={this.nextPage} hasNext={this.hasNext} hasPrev={this.hasPrev} start={start} end={end} location={this.state.location}/>);
      //start = end;
      //end = moment(start, 'DD/MM/YYYY').add(3, 'd');

      //if (moment(end).isAfter(this.state.endDate)) {
        //end = moment(this.state.endDate);
      //}
    //}
    var timetableDays = [];
    var date = moment(this.state.startDate);
    var len = moment(this.state.endDate).diff(date, 'd');
    console.log(len);
    for (var i=0; i < len; i++) {
        date = moment(this.state.startDate).add(i,'d').format("DD/MM/YYYY");
        var day = this.getDay(moment(this.state.startDate).add(i,'days').day());
        timetableDays.push(<TimetableDay day={day} date={date} col={len} key={i}/>);
    }

    return (
        <Container>
          <Row>
            <OwlCarousel className="owl-theme" margin={10} nav>
              {timetableDays}
            </OwlCarousel>
          </Row>
        </Container>
    );
  }

}
