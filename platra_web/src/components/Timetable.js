import React  from 'react';
import moment from 'moment';
import { TimetableDay } from './TimetableDay.js';
import { InputGroup, InputGroupAddon, Input, Container, Row, Col, Button } from 'reactstrap';
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
      data: '',
      errors: '',
      timetable_name: '',
      fetchInProgress: false
    };

    /*
    console.log(this.state);
    console.log("Timetable - startDate: "+moment(this.state.startDate).format("DD/MM/YYYY"));
    console.log("Timetable - endDate: "+moment(this.state.endDate).format("DD/MM/YYYY") );
    */
    this.getDay = this.getDay.bind(this);
    this.saveTimetable = this.saveTimetable.bind(this);
    this.setTimetableName = this.setTimetableName.bind(this);
    console.log("Timetable - Location: "+this.state.location);

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
        mode: 'cors',
        body: JSON.stringify({
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            location: this.state.location
        })
    })
    .then((res) => {
      return res.json(); 
    })
    .then((resdata) => {
      this.setState({
        jsonData: JSON.stringify(resdata),
        data: resdata,
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

  // save timetable
  saveTimetable() {
    console.log("Save timetable");
    var data = this.state.data;
      //console.log(this.state.timetable_name);

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('jwt')));

    this.setState({fetchInProgress: true});
    fetch("http://localhost:3000/api/v1/places/save",{
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        body: JSON.stringify({
            start: this.state.startDate,
            end: this.state.endDate,
            timetable: data,
            name: this.state.timetable_name,
            location: this.state.location
        })
    })
    .then((res) => {
      return res.json(); 
    })
    .then((resdata) => {
      this.setState({
        jsonData: JSON.stringify(resdata),
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

  setTimetableName(name){
    console.log("Search - Set Name:"+name.target.value);
    this.setState({
      timetable_name: name.target.value
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

  render() {
    var timetableDays = [];
    //var date = moment(this.state.startDate);
    //var len = moment(this.state.endDate).diff(date, 'd');
    //console.log(len);
    var data = this.state.data;
    Object.keys(data).forEach(function(key, day) {
        var date = moment(key).format("DD/MM/YYYY");
        var weekday = moment(key).format("dddd");
        timetableDays.push(<TimetableDay activities={data[key]} day={weekday} date={date} />);
    });

    this.loadAnimation;
    if(this.state.fetchInProgress == true){
      console.log("loader");
      this.loadAnimation = <div className="loader-wrapper"><div className="loader"><div className="largeBox"></div><div className="smallBox"></div></div></div>;
    }else{
      this.loadAnimation = null;
    }

    return (
        <Container>
          <Row>
            <Col>
              <InputGroup>
              <Input ref="input" type="text" placeholder="Name" onChange={this.setTimetableName}/> 
                <InputGroupAddon className='input-group-append'><Button className="button-platra" onClick={this.saveTimetable}>Save Timetable</Button></InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            {this.loadAnimation}
            <OwlCarousel className="owl-theme" margin={10} nav>
              {timetableDays}
            </OwlCarousel>
          </Row>
        </Container>
    );
  }

}
