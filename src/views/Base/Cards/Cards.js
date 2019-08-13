
import React from "react";

import gql from "graphql-tag";
import { Query } from "react-apollo";
import Delete from '../../../views/semantic-ui/Button/button'





const GET_ALL_ADMIN = gql`
        {
        FindAllAdmin{
          _id
          username
          email
          password
          createDate
          type
        }
      }
      `;

class Cards extends React.Component {
  render(props){
    return(
      <div>
        <Query query={GET_ALL_ADMIN}>
            {
                  ({ loading, error, data }) => {
                    console.log(data)
                    if (loading) return "Loading...";
                    if (error) return error;
                   return data.FindAllAdmin.map(({email, username, _id, type}) => <li key={_id}>username: {username} email :{email} id :{_id}  role:{type}</li> )   
                     
                  }
                }
             </Query>
            </div>
      )
  }
  
};



export default Cards;
