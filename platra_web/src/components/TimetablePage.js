import React  from 'react';
import { Container, Row } from 'reactstrap';
import { TimetableDay } from './TimetableDay.js';
import { Link } from 'react-router-dom'
import moment from 'moment';

export class TimetablePage extends React.Component {
  constructor(props){
    super(props);
    console.log(this.state);
    this.state = {
      pageNumber: this.props.activePage,
      startDate: this.props.start,
      endDate: this.props.end,
      location: this.props.location,
      jsonData: '',
      errors: '',
      fetchInProgress: false
    };
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
    for (var i = 0; i < 3; i++) {
        var date = moment(this.state.startDate).add(i,'days').format("DD/MM/YYYY");
        var day = this.getDay(moment(this.state.startDate).add(i,'days').day());
        timetableDays.push(<TimetableDay day={day} date={date} key={i}/>);
    }
    return (
      <div>
        <Container>
          <Row>
              TimetabelPage {this.state.pageNumber}
              {timetableDays}
          </Row>
        </Container>
      </div>
    );
  }

}
