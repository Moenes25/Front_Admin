import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from "react-apollo";
import gql from "graphql-tag";


import UpAndDelete from "../semantic-ui/Button/button"


import usersData from './UsersData'

class UserRow extends Component {

  render() {
    const { name, id, type } = this.props
    const userLink = `/users/${id}`
  
    return (
    <tr key={id.toString()}>
      <th scope="row"><a href={userLink}>{id}</a></th>
      <td><a href={userLink}>{name}</a></td>
      <td>{type}</td>
      <td><UpAndDelete userId={id}/></td>
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
        }
      }
      `;

class Users extends Component {

  render() {

    const userList = usersData.filter((user) => user.id )

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
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
                       return data.FindAllAdmin.map(({ username, _id, type}) =>
                        <UserRow key={_id} id={_id} name={username} type={type}/>)
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
