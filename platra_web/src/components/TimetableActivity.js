import React from 'react';
import { Modal } from 'reactstrap';
import moment from 'moment';
import { LocationModal } from './LocationModal.js';
import { InformationModal } from './InformationModal.js';

export class TimetableActivity extends React.Component {
    constructor(){
        super();
        this.state = {
            heading: 'Placeholder Heading',
            img: '',
            hours: '',
            time: '',
            lat: '',
            lng: '',
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
            time: this.props.time,
            hours: this.props.hours,
            lat: this.props.lat,
            lng: this.props.lng
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
        var information = "";
        if(this.props.hours) {
            information = <InformationModal data={this.props.hours} />
        }

        return (
            <div>
            <h3 className="activitiy-time">{startTime} - {endTime}</h3>
            <div className="activity">
            <div className="activity-img-wrapper">
            {image}
            </div>
            <div className="activity-text-wrapper">
            <h3 className="activity-heading"> {this.state.heading} </h3>
            {information}
            <LocationModal lat={this.props.lat} lng={this.props.lng} lat2={this.props.lat2} lng2={this.props.lng2} /> 
            </div>
            </div>
            </div>
        );
    }

}
