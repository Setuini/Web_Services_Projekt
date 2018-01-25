import React from 'react';
import {  } from 'reactstrap';
import { TimetableActivity } from './TimetableActivity.js';

export class TimetableDay extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      jsonData: this.props.jsonData,
      date: this.props.date,
      day: this.props.day,
      len: this.props.col
    }
  }

  render() {
    var activietesPerDay = 5;
    var timetableActivities = [];
    for (var i = 0; i < activietesPerDay; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        timetableActivities.push(<TimetableActivity key={i}/>);
    }

    var len = parseInt(this.state.len, 10);
    var col = "col-sm-"+(12/len);

    return (
      <div>
        <h2 className="day-heading">{this.state.day} {this.state.date}</h2>
        <div className="card">
          <div className="activities">
            {timetableActivities}
          </div>
        </div>
      </div>
    );
  }

}
