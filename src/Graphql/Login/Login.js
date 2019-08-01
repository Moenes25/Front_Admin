import gql from 'graphql-tag';

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
export default loginMutation;
