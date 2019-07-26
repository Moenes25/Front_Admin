
import React from 'react';





import { Grid, Form, Button } from 'semantic-ui-react';


import WithStyleLogin from './WithStyleLogin';


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
    const { history, login, updateUsersStates } = this.props;
    const result = await login(email, password);
   

    if (!result.data.login.errors) {
     const typeUser = result.data.login.user.type;
      await updateUsersStates(typeUser);
      if (typeUser === 'admin') {
        history.push('/app/Home');
      } else if (typeUser === 'rh') {
        history.push('/app/planetes-list');
      // eslint-disable-next-line no-empty
      } else if (typeUser === 'Recuiteur') {

      } else {
        history.push('/');
      }
    } else {
      this.setState({ errorInput: 'login ou mot de passe incorrect' });
    }
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
             
                <img src="/images/barac.jpg" alt="barac" width="70" height="70" />
            
              <Form>
                <Form.Input icon="user" id="email" iconPosition="right" placeholder="E-mail" onChange={this.handleChange} value={email} />
                <Form.Input icon="lock" id="password" iconPosition="right" placeholder="Mot de passe" type="password" onChange={this.handleChange} value={password} />
               
                <p>{errorInput}</p>
                <Button secondary fluid onClick={this.onSubmit}>Login</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}



export default WithStyleLogin (Login);