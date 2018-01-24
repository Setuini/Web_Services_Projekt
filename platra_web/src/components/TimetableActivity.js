import React from 'react';
import {  } from 'reactstrap';

export class TimetableActivity extends React.Component {

	constructor(){
		super();
		this.state = {
     	heading: 'Placeholder Heading',
     	desc: 'Placeholder Description',
     	img: '',
      errors: '',
      fetchInProgress: false
		};

	}

	componentDidMount(){

		var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json');

    console.log("Fetch");

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
      	heading: "Goldenes Dachl",//JSON.stringify(resdata.title),
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

	}

  render() {
    var image;
    if (this.state.fetchInProgress){
      image = <div className="activity-loading"></div>;
    } else {
      image = <img src={this.state.img} className="activity-img" alt=""/>;
    }
    return (
      <div>
        <h3 className="activitiy-time">09:00 - 12:00</h3>
        <div className="activity">
          <div className="activity-img-wrapper">
            {image}
          </div>
          <div className="activity-text-wrapper">
          	<h3 className="activity-heading"> {this.state.heading} </h3>
          	<p className="activity-description">{this.state.desc}</p>
            <p><a className="activity-link" href=""><i className="fa fa-info-circle fa-fw" aria-hidden="true"></i> More Information</a></p>
            <p><a className="activity-link" href=""><i className="fa fa-map-o fa-fw" aria-hidden="true"></i> Location</a></p>
          </div>
        </div>
      </div>
    );
  }

}