import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class InformationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            data: this.props.data
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        var data = this.state.data;
        var opening_hours = [];
        for(var i = 0; i < data.length; i++) {
            opening_hours.push(<div>{data[i]}</div>);
        }
        return (
            <div>
            <Button className="activity-link information-modal" onClick={this.toggle}><i className="fa fa-info-circle fa-fw" aria-hidden="true" ></i> More Information</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>
            More Information
            </ModalHeader>
            <ModalBody>
            {opening_hours}
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
            </Modal>
            </div>
        );
    }
}

