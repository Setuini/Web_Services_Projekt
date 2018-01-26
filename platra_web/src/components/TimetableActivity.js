import React from 'react';
import {  } from 'reactstrap';
import moment from 'moment';

export class TimetableActivity extends React.Component {
    constructor(){
        super();
        this.state = {
            heading: 'Placeholder Heading',
            img: '',
            time: '',
            errors: '',
            fetchInProgress: false
        };

    }

    componentDidMount(){

        var myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json')
        myHeaders.append('Content-Type', 'application/json');

        //console.log("TimetableActivity - Fetch");
        this.setState({
            heading: this.props.heading,
            img: this.props.photo,
            time: this.props.time
        });
    }

    render() {
        var image;
        if (this.state.fetchInProgress){
            image = <div className="activity-loading"></div>;
        } else {
            image = <img src={this.state.img} className="activity-img" alt=""/>;
        }
        var startTime = moment(this.state.time[0]).subtract(1, "h").format("kk:mm");
        var endTime = moment(this.state.time[1]).subtract(1, "h").format("kk:mm");

        return (
            <div>
            <h3 className="activitiy-time">{startTime} - {endTime}</h3>
            <div className="activity">
            <div className="activity-img-wrapper">
            {image}
            </div>
            <div className="activity-text-wrapper">
            <h3 className="activity-heading"> {this.state.heading} </h3>
            <p><a className="activity-link" href=""><i className="fa fa-info-circle fa-fw" aria-hidden="true"></i> More Information</a></p>
            <p><a className="activity-link" href=""><i className="fa fa-map-o fa-fw" aria-hidden="true"></i> Location</a></p>
            </div>
            </div>
            </div>
        );
    }

}
