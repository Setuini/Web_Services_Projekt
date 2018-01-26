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
    var previous_activity = null;
    Object.keys(activities).forEach(function(key) {
        var activity = activities[key];
        if(previous_activity == null)  {
            previous_activity = activity;
        }
        var opening_hours = "";
        if(activity["opening_hours"] != null) {
            opening_hours = activity["opening_hours"].weekday_text;
        }
        console.log("Timetableday: " + activity["lat"] + " " + activity["lng"]);
        timetableActivities.push(<TimetableActivity key={key} lat={activity["lat"]} lng={activity["lng"]} lat2={previous_activity["lat"]} lng2={previous_activity["lng"]} hours={opening_hours} time={activity["time"]} heading={activity["name"]} photo={activity["photos"][0]}/>);
        previous_activity = activity;
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
