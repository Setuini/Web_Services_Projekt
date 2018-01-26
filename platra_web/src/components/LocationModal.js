import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const google=window.google
const { compose, withProps, lifecycle } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} = require("react-google-maps");

export class LocationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            lat: this.props.lat,
            lng: this.props.lng,
            directions: ''
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            lat: this.props.lat,
            lng: this.props.lng,
        });
    }

    render() {

        console.log("TEST: " + this.props.lat + " " + this.props.lng);
        var lat = this.props.lat2;
        var lng = this.props.lng2;
        var lat2 = this.props.lat;
        var lng2 = this.props.lng;
        const MapWithADirectionsRenderer = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDXKuWJmiXiD1yBY5qOsZDyg7Y3pVHtkC0&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `400px` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                componentDidMount() {
                    console.log(lng + " " + lat);
                    const DirectionsService = new google.maps.DirectionsService();
                    DirectionsService.route({
                        origin: new google.maps.LatLng(lat, lng),
                        destination: new google.maps.LatLng(lat2, lng2),
                        travelMode: google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directions: result,
                            });
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    });
                }
            })
        )(props =>
            <GoogleMap
            defaultZoom={10}
            defaultCenter={new google.maps.LatLng(lat, lng)}
            >
            {props.directions && <DirectionsRenderer directions={props.directions} />}
            </GoogleMap>
        );
        return (
            <div>
            <Button className="activity-link" onClick={this.toggle}><i className="fa fa-map-o fa-fw" aria-hidden="true" ></i> Location</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className="location-modal">
            <ModalHeader toggle={this.toggle}>
            Location
            </ModalHeader>
            <ModalBody>
            {this.state.data}
            <MapWithADirectionsRenderer />
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
            </Modal>
            </div>
        );
    }
}

