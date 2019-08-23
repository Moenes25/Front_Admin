import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from "react-apollo";
import gql from "graphql-tag";


import UpAndDelete from "../Client_Manage/Button/button"
import Manage from "../Client_Manage/Client_Manage_/manage"

import usersData from './UsersData'

class UserRow extends Component {

  render() {
    const { name, id, type ,client} = this.props
    const userLink = `/users/${id}`
  
    return (
    <tr key={id.toString()}>
      <th scope="row"><a href={userLink}>{id}</a></th>
      <td><a href={userLink}>{name}</a></td>
      <td>{type}</td>
      <td><UpAndDelete userId={id}/></td>
      <td><Manage userId={client}/></td>

    </tr>)

    
   
  }
}
const GET_ALL_ADMIN = gql`
        {
        FindAllAdmin{
          _id
          username
          email
          password
          createDate
          type
          company_client
        }
      }
      `;

class Users extends Component {

  render() {

    const userList = usersData.filter((user) => user.id )

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12" md={{ size: 7, offset: 3 }}>
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
                      <th scope="col">Company Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                  <Query query={GET_ALL_ADMIN}>
                   {
                     ({ loading, error, data }) => {
                        console.log(data)
                        if (loading) return "Loading...";
                        if (error) return error;
                       return data.FindAllAdmin.map(({ username, _id, type, company_client}) =>
                        <UserRow key={_id} id={_id} name={username} type={type} client={company_client}/>)
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