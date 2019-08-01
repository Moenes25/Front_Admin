
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { get } from 'lodash';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Grid, Form, Button } from 'semantic-ui-react';

import withStyleLogin from './WithStyleLogin';
import loginMutation from '../../Graphql/Login/Login';
// import updateUsersStates  from '../../Graphql/Login/updateUsersStates';




class Login extends React.Component {
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
        history.push('/Home')
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
    // eslint-disable-next-line react/prop-types
    const { className } = this.props;
    const { email, password, errorInput } = this.state;
    return (
      <div className={className}>
        <Grid centered columns={1} className="Login">
          <Grid.Row centered columns={4}>
            <Grid.Column centered textAlign="center" width="50">
              <NavLink to="/register">
                <img src="/images/barac.png" alt="barac" width="70" height="70" />
              </NavLink>
              <Form>
                <Form.Input icon="user" id="email" iconPosition="right" placeholder="E-mail" onChange={this.handleChange} value={email} />
                <Form.Input icon="lock" id="password" iconPosition="right" placeholder="Mot de passe" type="password" onChange={this.handleChange} value={password} />
                <p>{errorInput}</p>
<<<<<<< HEAD
                <Button className="ui negative button" secondary fluid onClick={this.onSubmit}>Login</Button>

=======
                <Button className="ui negative button"  onClick={this.onSubmit}>Login</Button>
>>>>>>> c3d64df2dca7326fdbfd98259304a351fb69ffd1
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
withStyleLogin, withRouter)(Login);
