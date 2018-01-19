import React, { Component } from 'react';
import {Map, MapContainer, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export class SearchAutocomplete extends Component {
  constructor(props) {
    super(props)
    this.state = { address: 'San Francisco, CA' }
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
    }

    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="row row-destination">
            <div className="col-1 my-auto mx-auto">
                <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <div className="col-sm-11 col-lg-9 ">
               <PlacesAutocomplete inputProps={inputProps} className="input-destination"/>
            </div>
            <div className="col-lg-2 my-auto mx-auto hidden-lg-down">
                <input className="btn btn-primary" type="submit" id="search-btn" value="Search"/>
            </div>
        </div>
      </form>
    )
  }

}