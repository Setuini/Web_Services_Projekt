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
      len: this.props.col,
      activities: this.props.activities
    }
  }

  render() {
    var activietesPerDay = 5;
    var timetableActivities = [];
    var activities = this.state.activities;
    Object.keys(activities).forEach(function(key) {
        console.log(activities[key]);
        var activity = activities[key];
        timetableActivities.push(<TimetableActivity key={key} time={activity["time"]} heading={activity["name"]} photo={activity["photos"][0]}/>);
    });
    console.log(timetableActivities);

    //var len = parseInt(this.state.len, 10);
    //var col = "col-sm-"+(12/len);

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
