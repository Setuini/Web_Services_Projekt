import React  from 'react';
import { InputGroup, InputGroupAddon, Input, Container, Row, Col, Button } from 'reactstrap';
import { TimetableDay } from './TimetableDay.js';
import moment from 'moment';

export class TimetablePage extends React.Component {
  constructor(props){
    super(props);
    //console.log(this.state);
    this.state = {
      pageNumber: this.props.pageNumber,
      startDate: this.props.start,
      endDate: this.props.end,
      location: this.props.location,
      jsonData: '',
      data: this.props.data,
      errors: '',
      fetchInProgress: false,
      timetable_name: ''
    };

    console.log(this.state);
    this.prevPage = this.props.prevPage;
    this.nextPage = this.props.nextPage;
    this.hasNext = this.props.hasNext;
    this.hasPrev = this.props.hasPrev;
    this.getDay = this.getDay.bind(this);
    this.saveTimetable = this.saveTimetable.bind(this);
    this.setName = this.setName.bind(this);
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
    //var data = this.props.data;
      var data="";
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

  setName(name){
    this.setState({
      timetable_name: name
    });
  }

  render() {
    var timetableDays = [];
    var date = moment(this.state.startDate);
    var len = moment(this.state.endDate).diff(date, 'd');
    console.log(len);
    for (var i=0; i < len; i++) {
        date = moment(this.state.startDate).add(i,'d').format("DD/MM/YYYY");
        var day = this.getDay(moment(this.state.startDate).add(i,'days').day());
        timetableDays.push(<TimetableDay day={day} date={date} col={len} key={i}/>);
    }

    this.buttonNext = null;
    this.buttonPrev = null;

    if(this.hasNext()){
      this.buttonNext = <Button className="button-next" onClick={this.nextPage}>Next</Button>
    }

    if(this.hasPrev()){
      this.buttonPrev = <Button className="button-prev" onClick={this.prevPage}>Prev</Button>
    }

    return (
      <div>
        <Container>
          <Row>
             <Col>
                <InputGroup>
                <Input placeholder="Name" onChange={this.setName}  /> 
                  <InputGroupAddon className='input-group-append'><Button className="button-platra" onClick={this.saveTimetable}>Save Timetable</Button></InputGroupAddon>
                </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={this.prevPage}>Prev</Button>
            </Col>
            <Col className="col-sm-2">
              {this.buttonPrev}
            </Col>
            <Col className="col-sm-8">
              TimetablePage {this.state.pageNumber} Len={len} Start {moment(this.state.startDate).format('DD/MM/YYYY')} End {moment(this.state.endDate).format('DD/MM/YYYY')}
            </Col>
            <Col className="col-sm-2">
              {this.buttonNext}
            </Col>
          </Row>
          <Row>
              {timetableDays}
          </Row>
        </Container>
      </div>
    );
  }

}
