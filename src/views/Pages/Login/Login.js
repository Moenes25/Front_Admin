import React, { Component } from 'react';
import { Link , withRouter} from 'react-router-dom';
import { get } from 'lodash';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


const loginMutation = gql`
 mutation login($email: String! , $password: String!){ 
  login(email:$email password:$password){ 
    _id
    username
    email
    createDate
    type
    jwt
  }
}
`;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorInput: '',
    };
  }
  onSubmit = async () => {
    const { email, password } = this.state;
    const { history,login } = this.props;
    const result = await login(email, password);
    const token = get(result, 'data.login.jwt', '');

    if (!result.data.login.errors) {
      localStorage.setItem('jwt', token);
      const typeUser = await result.data.login.type;
      console.log('error in onsubmit')
      if (typeUser === 'admin') {
        history.push('/dashboard')
       console.log('welcome to hom')
      } 
    } else {
 
      this.setState({ errorInput: 'login ou mot de passe incorrect' });
    } console.log("you submit it")
  }
  
  
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }





  render() {
    const { className } = this.props;
    const { email, password, errorInput } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="email" iconPosition="right" placeholder="E-mail" onChange={this.handleChange} value={email} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="password" iconPosition="right" placeholder="Mot de passe" type="password" onChange={this.handleChange} value={password} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="danger" className="px-4" onClick={this.onSubmit}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Create Admin or User</p>
                      <Link to="/register">
                        <Button color="danger" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.array,
};

export default compose(graphql(loginMutation, {
  props: ({ mutate }) => ({
    login: (email, password) => mutate({
      variables: {
        email,
        password,
      },
    }),
  }),
}),
 withRouter)(Login);