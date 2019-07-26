import React from 'react';
import withStyleLogin from './WithStyleLogin';

class Login extends React.Component {
 
  

 render() {
  
   return (
     <div className={className}>
       <Grid centered columns={1} className="Login">
         <Grid.Row centered columns={4}>
           <Grid.Column centered textAlign="center" width="50">
             <NavLink to="/register">
               <img src="/images/oyez.jpg" alt="oyez" width="70" height="70" />
             </NavLink>
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

export default ( 
 




withStyleLogin, withRouter)(Login);

