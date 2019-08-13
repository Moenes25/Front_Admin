import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from 'react-apollo';


import UpAndDelete from "../semantic-ui/Button/button"


import usersData from './UsersData'



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

class Users extends Component {

  render() {

    const userList = usersData.filter((user) => user.id )

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">role</th>
                      <th scope="col">Update or Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                  <Query query={GET_ALL_ADMIN}>
                   {
                     ({ loading, error, data }) => {
                        console.log(data)
                        if (loading) return "Loading...";
                        if (error) return error;
                      return data.FindAllAdmin.map(( {_id, username, type}) =>
                        <UserRow key={_id} id={_id} name={username} type={type}/>
                       )
                      }
                    }
                    </Query>
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
