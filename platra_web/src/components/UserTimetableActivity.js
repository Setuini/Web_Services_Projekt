import React from 'react';
import {  } from 'reactstrap';

export class UserTimetableActivity extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            data: props.data,
            heading: props.data.point_of_interest.name,
            desc: props.data.point_of_interest.type,
            begin: new Date(props.data.begin),
            end: new Date(props.data.end),
            img: '',
            errors: '',
            fetchInProgress: false
        };
        this.delete = this.delete.bind(this);
    }

    /*componentDidMount(){

        var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json');

    //console.log("TimetableActivity - Fetch");

    this.setState({fetchInProgress: true});
        fetch("https://jsonplaceholder.typicode.com/photos/1",{
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    })
    .then((res) => {
      return res.json();
    })
    .then((resdata) => {
      this.setState({
          //heading: "Goldenes Dachl",//JSON.stringify(resdata.title),
          //desc: JSON.stringify(resdata.body),
          img: resdata.url,
        fetchInProgress: false
      });

    })
    .catch( (ex) => {
      console.log("Fetch failed" + ex);
      this.setState({
        errors : ex,
        fetchInProgress: false
      });
    });

    }*/

    delete(){
        var myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json')
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('jwt')));
        //console.log("Timetable.js - Fetch");

        this.setState({fetchInProgress: true});
        fetch("http://localhost:3000/api/v1/deleteEntry",{
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify({
                name: this.state.name,
                place_id: this.state.data.point_of_interest.place_id,
                begin: this.state.data.begin,
                end: this.state.data.end,
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((resdata) => {
                Object.keys(resdata).forEach(function(key) {
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
    render() {
        var image;
        if (this.state.fetchInProgress){
            image = <div className="activity-loading"></div>;
        } else {
            var p = this.state.data.point_of_interest.params;
            if(typeof p !== 'undefined'){
                var i = JSON.parse(p);
                if(i != null && typeof i !== 'undefined' && i.photos.length >0){
                    this.state.img = i.photos[0]
                }
            }
            image = <img src={this.state.img} className="activity-img" alt=""/>;
        }
        return (
            <div>
                <h3 className="activitiy-time">{this.state.begin.toTimeString()} - {this.state.end.toTimeString()}</h3>
                <div className="activity">
                    <div className="activity-img-wrapper">
                        {image}
                    </div>
                    <div className="activity-text-wrapper">
                        <h3 className="activity-heading"> {this.state.heading} </h3>
                        <p className="activity-description">{this.state.desc}</p>
                        <p><a className="activity-link" href=""><i className="fa fa-info-circle fa-fw" aria-hidden="true"></i> More Information</a></p>
                        <p><a className="activity-link" href=""><i className="fa fa-map-o fa-fw" aria-hidden="true"></i> Location</a></p>
                        <button onClick={this.delete}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }

}