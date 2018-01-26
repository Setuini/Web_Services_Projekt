import React from 'react';
import {  } from 'reactstrap';
import { UserTimetableActivity } from './UserTimetableActivity.js';


export class UserTimetableDay extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            dayData: props.dayData,
            date: props.date,
            day: props.day
        }
    }

    render() {
        var timetableActivities = [];
        var before = 0;
        for (var i in this.state.dayData) {
            timetableActivities.push(<UserTimetableActivity key={i} data={this.state.dayData[i]} name={this.state.name} longitude={this.state.dayData[before].point_of_interest.longitude} latitude={this.state.dayData[before].point_of_interest.latitude}/>);
            before = i;
        }


        return (
            <div className="col-sm-4">
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