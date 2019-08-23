import React, { Component } from 'react';
import { Button, Input,Card,Form, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row ,ButtonGroup} from 'reactstrap';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo'

const deleteOne = gql`
        mutation($_id: ID!){ 
          deleteUser(_id:$_id){_id}
        }
        `

const ADD_REGISTER = gql`
  mutation($id: ID! , $type: String!){
  updateUser(type:$type _id: $id){
    username
  }
}
`;


class UpAndDelete extends Component {
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
                <Mutation mutation={deleteOne} >
                  {(deleteUser, {loading, error }) => {
                    return (
                        <div> 
                        <form onSubmit={e => {
                             window.location.reload();
                             deleteUser({ variables: { _id: this.props.userId} });
                                }}>
                            <Button color='danger'>Delete</Button>
                            {console.log( error ? `read more about ${error}`: 'everything is good' )}
                        </form>    

                        </div>
                    )
                  }}
                </Mutation>
                  <Button color="success" onClick={this.togglePrimary} >Update</Button>
                </ButtonGroup>
                <Modal isOpen={this.state.primary}>
                  <ModalHeader className="bg-dark" >Change User Role</ModalHeader>
                  <Mutation mutation={ADD_REGISTER} variables={{ type}}>
                     {(updateUser, {data}) => (
                          <form onSubmit={e => {
                                   window.location.reload();
                                    updateUser({ variables: {  type, id: this.props.userId} });
                           }}>
                        <ModalBody>
                         <Input 
                           min={3}
                           max={15}
                           type="text" 
                           placeholder="Role...."
                           onChange={e => this.setState({ type: e.target.value })}
                           required
                            />
                        </ModalBody>
                        <ModalFooter>
                          <Button color="success">Update Role</Button>
                          <Button color="danger" onClick={this.togglePrimary}>Close</Button>
                        </ModalFooter>
                          </form>      
                     )}
                  </Mutation> 
                </Modal>       
      </div>
    );
  }
}
export default UpAndDelete;
