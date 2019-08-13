import React, { Component } from 'react';
import { Button, Card, CardBody,  Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_REGISTER = gql`
  mutation($username: String! , $password: String! , $email:String! , $type: String!){
  createAdmin(username: $username password: $password email:$email type: $type){
    username
    createDate
    email
  }
}
`;


class Register extends Component {
  state = {
    username:"",
    email:"",
    password:"",
    type:""

  }
  render() {
      const { password, username, email, type} = this.state
    
    return (
       <Mutation mutation={ADD_REGISTER} variables={{ password, username, email , type}}>
          {(createAdmin, {data}) => (
            <div className="app flex-row align-items-center">
                <Container>
                  <Row className="justify-content-center">
                    <Col md="9" lg="7" xl="6">
                      <Card className="mx-4">
                        <CardBody className="p-4">
                          <Form onSubmit={e => {
                                    window.location.reload();
                                    createAdmin({ variables: { password, username, email , type} });
                           }}>
                            <h1>Register</h1>
                            <p className="text-muted">Create your account</p>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                className="mb2"
                                value={username}
                                onChange={e => this.setState({ username: e.target.value })}
                                type="text"
                                placeholder="Username" 
                                autoComplete="username"
                                required
                              />
                            </InputGroup>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>@</InputGroupText>
                              </InputGroupAddon>
                              <Input
                                className="mb2"
                                value={email}
                                onChange={e => this.setState({ email: e.target.value })}
                                type="email"
                                placeholder="Email" 
                                autoComplete="email"
                                required
                              />
                            </InputGroup>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                className="mb2"
                                value={password}
                                onChange={e => this.setState({ password: e.target.value })}
                                type="password"
                                placeholder="**********"
                                autoComplete="new-password" 
                                required
                              />
                            </InputGroup>
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-people"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                className="mb2"
                                value={type}
                                onChange={e => this.setState({ type: e.target.value })}
                                type="text"
                                placeholder="Role"
                                autoComplete="Admin" 
                                required
                              />
                            </InputGroup>
                            <Button color="success" block>Create Account</Button>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
            </div>

         )}
      </Mutation>     

    );
  }
}

export default Register;

