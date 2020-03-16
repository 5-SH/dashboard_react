import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { Line, Bar } from 'react-chartjs-2';
import { Card, CardBody, CardTitle, Button, CardHeader, Col, Row } from 'reactstrap';
import "assets/scss/black-dashboard-react.scss";

class Data extends Component {
  state = {
    editing: false,
    data: [],
    seqs: []
  };

  intervalId = 0;

  render() {
    return (
      <Col className="ml-auto mr-auto text-center" md="4">
        <Card className="card-chart">
          {this.props.node_type === 'DB' ? (
            <Fragment>
              <CardHeader>
                <Row>
                <Col className="text-left">
                  <h5 className="card-category">{this.props.node_type}</h5>
                  <CardTitle tag="h4">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                    {" "}{this.props.node_nm}
                  </CardTitle>
                </Col>
                <Col>
                  <div className="text-right">
                      <Button 
                        onClick={() => {this.getData(this.props)}} 
                        color="primary">Get Data</Button>
                  </div>
                </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={this.data_db} options={this.options_db} />
                </div>
              </CardBody>
            </Fragment>
          ) : (
              <Fragment>
                <CardHeader>
                  <Row>
                  <Col className="text-left">
                  <h5 className="card-category">{this.props.node_type}</h5>
                  <CardTitle tag="h4">
                    <i className="tim-icons icon-delivery-fast text-primary" />
                    {" "}{this.props.node_nm}
                  </CardTitle>
                  </Col>
                  <Col>
                  <div className="text-right">
                  <Button 
                    onClick={() => {this.getData(this.props)}} 
                    color="primary">Get Data</Button>
                  </div>
                </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar data={this.data_plc} options={this.options_plc} />
                  </div>
                </CardBody>
              </Fragment>
            )}

        </Card>
      </Col>
    )
  }

  data_db = (canvas) => {
    const ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
    
    const values = this.state.data;
    const labels = this.state.seqs;
    
    // console.log(values);
    
    return {
      // input label
      labels: labels,
      datasets: [{
        label: "value",
        borderColor: "#1f8ef1",
        pointBackgroundColor: "#1f8ef1",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#1f8ef1",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        fill: true,
        backgroundColor: gradientStroke,
        borderWidth: 2,
        borderDashOffset: 0.0,
        
        // input data
        data: values
      }]
    }
  };
  options_db = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ]
    }
  };

  data_plc = (canvas) => {
    const ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

    const values = this.state.data;
    const labels = this.state.seqs;
    return {
      // input label
      labels: labels,
      datasets: [{
        label: "value",
        
        fill: true,
        backgroundColor: gradientStroke,
        hoverBackgroundColor: gradientStroke,
        borderColor: "#d048b6",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,

        // input data
        data: values
      }]
    }
  };
  options_plc = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ]
    }
  };

  getData = async (props) => {
    const node_cd = props.node_cd;
    const node_type = props.node_type;

    const url = "/data?node_cd=" + node_cd;
    const { data: { data } } = await axios.get(url);
    const size = (node_type === 'DB' ? 10 : 6);
    const values = data
                    .slice(((data.length - size) > 0 ? (data.length - 1) - size : 0), data.length - 1)
                    .map(each => (
                      each.data
                    ));
    const labels = data
                    .slice(((data.length - size) > 0 ? (data.length - 1) - size : 0), data.length - 1)
                    .map(each => (
                      each.data_seq
                    ));
    
    this.setState({
      data: values,
      seqs: labels
    })
  };

  intervalFetch = () => {
    this.intervalId = setInterval(() => {this.getData(this.props);}, 1000);
  }

  async componentDidMount() {
    this.getData(this.props);
    this.intervalFetch();
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  };

  
}

export default Data;