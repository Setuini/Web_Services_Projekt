import React, { Component } from 'react';
import {  } from 'reactstrap';


export class TimetableDay extends React.Component {

  render() {
    return (
      <div className="col-sm-3">
        <div className="card">
          <img className="card-img-top" src="http://www.kunst-designmarkt.at/wp-content/uploads/2015/10/Goldenes-Dachl-mit-Nordkette-Innsbruck-1024x586.jpg" alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    );
  }

}