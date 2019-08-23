import React, { Component } from 'react';
import { Badge, Button, Card,ListGroupItem , CardBody, CardFooter, CardHeader, Col, Collapse, Fade, Row } from 'reactstrap';
import { Query , Mutation} from 'react-apollo'
import gql from "graphql-tag";


import UpAndDeleteManage from "./UpAndDeleteManage"


const GET_ALL_ADMIN = gql`
  query($company_client: String!){
  getUserByCompany_Manage(company_client:$company_client){ 
    _id
    username
    email
    company_client
    type
  }
}
`;
class Call_By_Manage_Id extends Component {

  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      open:true,
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false],
      status: 'Open',
      fadeIn: true,
      timeout: 300,
      count : 0
    };
  }

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Close' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Open' });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  toggleCustom(tab) {

    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state,
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Company Manage</strong>
              </CardHeader>
              <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                <CardBody className="text-center">
                        <Query variables = {{ company_client: "abcd" }} query={GET_ALL_ADMIN} >
                               {
                                 ({ loading, error, data }) => {
                                    if (loading) return "Loading...";
                                    if (error) return error;
                                    const lengths = data.getUserByCompany_Manage.length
                                    if (lengths === 0) return <i>No Client Was Found !</i>
                                      if(localStorage.getItem("jwt")) {
                                        console.log(data)
                                  return data.getUserByCompany_Manage.map(({type, username,_id, company_client, email}) =>
                                    <div key={_id}>
                                      <ListGroupItem >Role : {type}</ListGroupItem >                                      
                                      <ListGroupItem >name : {username}</ListGroupItem >                                      
                                      <ListGroupItem > Company ID : {company_client}</ListGroupItem >
                                      <ListGroupItem > Email : {email}</ListGroupItem >
                                      <UpAndDeleteManage userId={_id}/>
                                      <br />
                                    </div> 
                                    )}else{
                                    return <i>You Don't Have Access !</i>
                                  }
                                  }
                                }
                        </Query>
                </CardBody>
              </Collapse>
              <CardFooter>
                <Button color="primary"  onClick={this.toggle}  className="btn  float-right" id="toggleCollapse1">{this.state.status }</Button>
                <hr/>
                <h5>Admin Status</h5>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Call_By_Manage_Id;
