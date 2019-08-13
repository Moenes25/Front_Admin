import React, { Component } from 'react';
import { Button, Input,Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row ,ButtonGroup} from 'reactstrap';


class UpAndDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      primary: false,
      open: false
      
    };
    this.togglePrimary = this.togglePrimary.bind(this);
  }
  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }
  render() {
    const { open, dimmer } = this.state
    return (
      <div className="animated fadeIn">
       

                <ButtonGroup >
                  <Button color='danger'>Delete</Button>
                  <Button color="success" onClick={this.togglePrimary} >Update</Button>
                </ButtonGroup>
                <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                       className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.togglePrimary}>Change User Role</ModalHeader>
                  <ModalBody>
                   <Input placeholder="username" />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={this.togglePrimary}>Update Role</Button>{' '}
                    <Button color="danger" onClick={this.togglePrimary}>Close</Button>
                  </ModalFooter>
                </Modal>

            
      </div>
    );
  }
}

export default UpAndDelete;
