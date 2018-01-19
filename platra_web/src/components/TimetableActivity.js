import React from 'react';
import {  } from 'reactstrap';

export class TimetableActivity extends React.Component {

	constructor(){
		super();
		this.state = {
     	heading: 'Placeholder Heading',
     	desc: 'Placeholder Description',
     	img: '',
      errors: ''
		};

	}

	componentDidMount(){

		var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json');

    console.log("Fetch");

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
      	heading: JSON.stringify(resdata.title),
      	//desc: JSON.stringify(resdata.body),
      	img: resdata.url
      });

    })
    .catch( (ex) => {
      console.log("Fetch failed" + ex);
      this.setState( {errors : ex } );
    });

	}

  render() {
    return (
      <div>
      	<img className="activity-img" src={this.state.img} alt=""/>
      	<h3 className="activity-heading"> {this.state.heading} </h3>
      	<p className="activity-description">{this.state.desc}</p>
      </div>
    );
  }

}