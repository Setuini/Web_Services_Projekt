import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Link } from 'react-router-dom'

export class SearchAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    }
    this.onChange = (address) => this.setState({ address })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: "Enter for Example Innsbrck"
    }

    return (

      <div onSubmit={this.handleFormSubmit}>

        <h1>{this.state.startDate} {this.state.endDate}</h1>
        <div className="row row-destination">
            <div className="col-1 my-auto mx-auto">
                <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <div className="col-sm-11 col-lg-9 ">
               <PlacesAutocomplete inputProps={inputProps} className="input-destination"/>
            </div>
            <div className="col-lg-2 my-auto mx-auto hidden-lg-down">
                <Link to="/timetable"><input className="btn btn-primary button-platra" type="submit" id="search-btn" value="Search"/></Link>
            </div>
        </div>
      </div>
    )
  }

}