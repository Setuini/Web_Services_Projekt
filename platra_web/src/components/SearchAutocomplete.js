import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Link } from 'react-router-dom';

export class SearchAutocomplete extends Component {


  render() {
    const inputProps = {
      value: this.props.location,
      onChange: this.props.onChange,
      placeholder: "Enter for Example Innsbruck"
    }

    const timetable_to = {
        pathname: "/timetable",
        location: this.props.location,
        startDate: this.props.start,
        endDate: this.props.end
    }

    return (
      <div>
        <div className="row row-destination">
            <div className="col-1 my-auto mx-auto">
                <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <div className="col-sm-11 col-lg-9 ">
               <PlacesAutocomplete inputProps={inputProps} className="input-destination" required/>
            </div>
            <div className="col-lg-2 my-auto mx-auto hidden-lg-down">
                <Link to={timetable_to}><input className="btn btn-primary button-platra" type="submit" id="search-btn" value="Search"/></Link>
            </div>
        </div>
      </div>
    )
  }

}
