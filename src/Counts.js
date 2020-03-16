import React, { Component, Fragment } from 'react';
import axios from 'axios';
import classNames from "classnames";

import "assets/scss/black-dashboard-react.scss";

import { Line, Bar } from 'react-chartjs-2';
import { 
  Card, 
  CardBody, 
  CardTitle, 
  Button, 
  ButtonGroup, 
  CardHeader, 
  Col, 
  Row 
} from 'reactstrap';

class Counts extends Component {
  state = {
    isLoading: true,
    todayCounts: [],
    lastCounts: [],
    dateList: []
  };

  intervalId = 0;

  render() {
    return (
      <Col className="ml-auto mr-auto text-center" md="12">
        <Card className="card-chart">
          <Fragment>
            <CardHeader>
              <Row>
                <Col className="text-left">
                  <h5 className="card-category">Total Data</h5>
                  <CardTitle tag="h4">
                    <i className="tim-icons icon-send text-success" />{" "}
                    Counts
                </CardTitle>
                </Col>
                <Col>
                  <ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                  >
                    <Button
                      tag="label"
                      className={classNames("btn-simple", {
                        active: this.state.bigChartData === "data1"
                      })}
                      color="info"
                      id="0"
                      size="sm"
                      onClick={e => e.preventDefault()}
                    >
                      <input
                        defaultChecked
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Accounts
                          </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-single-02" />
                      </span>
                    </Button>
                    <Button
                      color="info"
                      id="1"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: this.state.bigChartData === "data2"
                      })}
                      onClick={e => e.preventDefault()}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Purchases
                          </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-gift-2" />
                      </span>
                    </Button>
                    <Button
                      color="info"
                      id="2"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: this.state.bigChartData === "data3"
                      })}
                      onClick={e => e.preventDefault()}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Sessions
                          </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-tap-02" />
                      </span>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={this.data_counts_today} options={this.options_counts} />
                {/* <Line data={this.data_counts_last} options={this.options_counts} /> */}
              </div>
            </CardBody>
          </Fragment>
        </Card>
      </Col>
    )
  }

  getCounts = async () => {
    const date = (() => {
      const date = new Date()
      const yyyy = date.getFullYear().toString();
      const mm = (date.getMonth() + 1).toString();
      const dd = date.getDate().toString();
      return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]);
    })();

    const { data: { counts } } = await axios.get("/counts?date=" + date);

    //console.log(counts);

    const todayCounts = [];
    const lastCounts = [];
    const dateList = [];
    const todayYearMonth = date.slice(0, 8);

    counts.map((each) => {
      const yearMonth = each.issue_dt.slice(0, 8);
      const dateTime = each.issue_dt.slice(8, 10) + ":"
        + each.issue_dt.slice(10, 12);

      if (dateList.includes(dateTime) !== true) {
        dateList.push(dateTime);
      };

      if (todayYearMonth === yearMonth) {
        todayCounts.push(each.count);
      } else if ((todayYearMonth - 1).toString() === yearMonth) {
        lastCounts.push(each.count);
      }

    })
    this.setState({
      todayCounts: todayCounts,
      lastCounts: lastCounts,
      dateList: dateList,
      isLoading: false
    });
  }

  intervalFetch = () => {
    this.intervalId = setInterval(this.getCounts, 2500);
  }

  async componentDidMount() {
    this.getCounts();
    this.intervalFetch();
  }

  async componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  

  data_counts_today = (canvas) => {
    const ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    const todayValues = this.state.todayCounts;
    const lastValues = this.state.lastCounts;
    const labels = this.state.dateList;

    return {
      // input label
      labels: labels,
      datasets: [{
        label: "today",

        fill: true,
        backgroundColor: gradientStroke,
        borderColor: "#FFC11E",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#FFC11E",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#FFC11E",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,

        // input data
        data: todayValues
      }, {
        label: "yesterday",

        fill: true,
        backgroundColor: gradientStroke,
        borderColor: "#00d6b4",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#00d6b4",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#00d6b4",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,

        // input data
        data: lastValues
      }]
    }
  };

  options_counts = {
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
            suggestedMin: 0,
            suggestedMax: 15,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ],

      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(0,242,195,0.1)",
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

}

export default Counts;