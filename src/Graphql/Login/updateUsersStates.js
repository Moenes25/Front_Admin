
import gql from 'graphql-tag';

const updateUsersStates = gql`
    {
	  getAdminByType(type:String){
	  type
}
}

`;
export default updateUsersStates;
