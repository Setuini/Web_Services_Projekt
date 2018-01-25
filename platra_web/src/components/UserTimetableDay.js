import React from 'react';
import {  } from 'reactstrap';
import { UserTimetableActivity } from './UserTimetableActivity.js';


export class UserTimetableDay extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dayData: props.dayData,
            date: props.date,
            day: props.day
        }
    }

    render() {
        var timetableActivities = [];
        for (var i in this.state.dayData) {
            console.log(this.state.dayData[i]);
            timetableActivities.push(<UserTimetableActivity key={i} data={this.state.dayData[i]}/>);
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