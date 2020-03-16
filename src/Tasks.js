import React, { Fragment, Component } from "react";
import axios from 'axios';

import "assets/scss/black-dashboard-react.scss";
import "assets/css/nucleo-icons.css";

import {
  Button,
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
} from "reactstrap";

class Tasks extends Component {
  state = {
    isLoading: false,
    tasks: []
  };
  
  intervalId = 0;

  getTasks = async (props) => {
    const url = "/tasks";
    const { data: { tasks } } = await axios.get(url);

    this.setState({
      isLoading: true,
      tasks: tasks
    })
  };

  intervalFetch = () => {
    this.intervalId = setInterval(this.getTasks(), 20000);
  }

  async componentDidMount() {
    this.getTasks();
    this.intervalFetch();
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  };

  render() {
    return (
      <Card className="card-tasks">
        <CardHeader>
          <h6 className="title d-inline">Tasks({this.state.tasks.length})</h6>
          <p className="card-category d-inline"> today</p>
          <UncontrolledDropdown>
            <DropdownToggle
              caret
              className="btn-icon"
              color="link"
              data-toggle="dropdown"
              type="button"
            >
              <i className="tim-icons icon-settings-gear-63" />
            </DropdownToggle>
            <DropdownMenu aria-labelledby="dropdownMenuLink" right>
              <DropdownItem
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                Action
                      </DropdownItem>
              <DropdownItem
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                Another action
                      </DropdownItem>
              <DropdownItem
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                Something else
                      </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardHeader>
        <CardBody>
          <div className="table-full-width table-responsive">
            <Table className="card-tasks-table">
              <tbody>
                {this.state.tasks.map(task => (
                  <div>
                    <tr>
                      <td>
                        <FormGroup check>
                          <Label check>
                            <Input defaultValue="" type="checkbox" />
                            <span className="form-check-sign">
                              <span className="check" />
                            </span>
                          </Label>
                        </FormGroup>
                      </td>
                      <td>
                        <p className="title">{task.title}</p>
                        <p className="text-muted">
                          {task.content}
                        </p>
                      </td>
                      <td className="td-actions text-right">
                        <Button
                          color="link"
                          id="tooltip636901683"
                          title=""
                          type="button"
                        >
                          <i className="tim-icons icon-pencil" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip636901683"
                          placement="right"
                        >
                          Edit Task
                              </UncontrolledTooltip>
                      </td>
                    </tr>
                  </div>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>

      </Card>
    )
  }
}

export default Tasks;