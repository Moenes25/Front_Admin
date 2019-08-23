import React, { Component } from 'react';
import { Button, Input,Card,Form, CardBody, ListGroupItem, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row ,ButtonGroup} from 'reactstrap';
import gql from "graphql-tag";
import { Query , Mutation} from 'react-apollo'


// import UpAndDelete from "../Dropdowns/Dropdowns"

const GET_ALL_ADMIN = gql`
       query($company_client: String!){
  getUserByCompany_Manage(company_client:$company_client){ 
    _id
    username
  }
}`;


class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      primary: false,
      open: false,
      type:""
    };
    this.togglePrimary = this.togglePrimary.bind(this);
  }
  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }
  render() {
    const { open, dimmer , type} = this.state
    return (
      <div className="animated fadeIn">
                <ButtonGroup >
                            <Button color='primary'onClick={this.togglePrimary}>Client</Button>
                </ButtonGroup>
                <Modal isOpen={this.state.primary}>
                  <ModalHeader className="bg-dark" >Find by Company ID</ModalHeader>
                        <ModalBody>
                        <Query variables = {{ company_client: this.props.userId }} query={GET_ALL_ADMIN} >
                               {
                                 ({ loading, error, data }) => {
                                    if (loading) return "Loading...";
                                    if (error) return error;
                                   return data.getUserByCompany_Manage.map(({ username}) =>
                                    <ListGroupItem>name: {username} </ListGroupItem>)
                                  }
                                }
                         </Query>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" onClick={this.togglePrimary}>Close</Button>
                        </ModalFooter>     
                </Modal>       
      </div>
    );
  }
}
export default Manage;