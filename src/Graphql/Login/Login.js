import gql from 'graphql-tag';

const loginMutation = gql`
  mutation{ 
    login(email:String password:String){
      username
      _id
      password
      jwt
    
      
  }
}
`;
export default loginMutation;
