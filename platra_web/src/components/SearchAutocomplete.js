import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete'
import { Link } from 'react-router-dom'

export class SearchAutocomplete extends Component {

  render() {
    const inputProps = {
      value: this.props.location,
      onChange: this.props.onChange,
      placeholder: "Enter for Example Innsbrck"
    }
    return (
      <div onSubmit={this.handleSubmit}>
        <div className="row row-destination">
            <div className="col-1 my-auto mx-auto">
                <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <div className="col-sm-11 col-lg-9 ">
               <PlacesAutocomplete inputProps={inputProps} className="input-destination"/>
            </div>
            <div className="col-lg-2 my-auto mx-auto hidden-lg-down">
                <Link to="/timetable"><input type="submit" id="search-btn" className="btn btn-primary button-platra" value="Search"/></Link>
            </div>
        </div>
      </div>
    )
  }

}