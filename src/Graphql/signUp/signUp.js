import gql from 'graphql-tag';

const updateUserStateMutation = gql`
  mutation updateUsersStates($type: String )  {
    updateUsersStates(type: $type)  @client{ 
      type ,
    }
  }
`;
export default updateUserStateMutation;
