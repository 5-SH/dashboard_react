import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Data from './Data';
import Tasks from './Tasks';
import Counts from './Counts';

import './App.css';
import 'assets/scss/black-dashboard-react.scss';
import 'assets/css/nucleo-icons.css';

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from 'reactstrap';

class Node extends Component {
  state = {
    isLoading: true,
    nodes: [],
    counts: []
  };

  intervalId = 0;

  getNodes = async () => {
    const {
      data: { nodes }
    } = await axios.get('/nodes');
    this.setState({ nodes: nodes });
  };

  intervalFetch = () => {
    this.intervalId = setInterval(this.getNodes, 20000);
    this.setState({ isLoading: false });
  };

  async componentDidMount() {
    this.getNodes();
    this.intervalFetch();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    let id = 0;
    return (
      <Fragment>
        {this.state.isLoading ? (
          <Fragment>
            <span>Loading...</span>
          </Fragment>
        ) : (
          <Fragment>
            <div className="content">
              <Row>
                <Col lg="6" md="12">
                  <Tasks></Tasks>
                </Col>
                <Col lg="6" md="12">
                  <Card className="card-tasks">
                    <CardHeader>
                      <CardTitle tag="h4">Node List</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="table-full-width table-responsive">
                        <Table className="tablesorter">
                          <thead className="text-primary">
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Type</th>
                              <th>Code</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.nodes.map(node => (
                              <tr>
                                <th scope="row">{++id}</th>
                                <td>{node.node_nm}</td>
                                <td>{node.node_type}</td>
                                <td>{node.node_cd}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                {/* count */}
                <Counts></Counts>
              </Row>
              <Row>
                {this.state.nodes
                  .filter(node => node.node_type === 'DB')
                  .map(node => (
                    <Data
                      node_cd={node.node_cd}
                      node_nm={node.node_nm}
                      node_type={node.node_type}
                    />
                  ))}
              </Row>
              <Row>
                {this.state.nodes
                  .filter(node => node.node_type === 'PLC')
                  .map(node => (
                    <Data
                      node_cd={node.node_cd}
                      node_nm={node.node_nm}
                      node_type={node.node_type}
                    />
                  ))}
              </Row>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Node;
