import React  from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
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
      errors: '',
      fetchInProgress: false
    };

    console.log(this.state);
    this.prevPage = this.props.prevPage;
    this.nextPage = this.props.nextPage;
    this.getDay = this.getDay.bind(this);
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
    var date = moment(this.state.startDate);
    var len = moment(this.state.endDate).diff(date, 'd');
    for (var i = 0; i < len; i++) {
        date = moment(this.state.startDate).add(i,'d').format("DD/MM/YYYY");
        var day = this.getDay(moment(this.state.startDate).add(i,'days').day());
        timetableDays.push(<TimetableDay day={day} date={date} key={i}/>);
    }

    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Button onClick={this.prevPage}>Prev</Button>
            </Col>
            <Col>
              <Button onClick={this.nextPage}>Next</Button>
            </Col>
          </Row>
          <Row>
              TimetablePage {this.state.pageNumber} Start {this.startDate} End {this.endDate}
              {timetableDays}
          </Row>
        </Container>
      </div>
    );
  }

}
