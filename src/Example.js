import React, { Component, Fragment } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
const chartColor = '#FFFFFF';



class Example extends React.Component{
    state = {
        editing: false,
        data: [],
        seqs: []
    };

    data = (canvas) => {
        var ctx = canvas.getContext("2d");
    
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, chartColor);
    
        var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
        const values = this.state.data;
        const labes = this.state.seqs;
        return {
            labels: labes,
            datasets: [{
                label: "value",
                borderColor: "#f96332",
                pointBorderColor: "#FFF",
                pointBackgroundColor: "#f96332",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                backgroundColor: gradientFill,
                borderWidth: 2,
                data: values
            }]
        }
    };
    options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        tooltips: {
            bodySpacing: 4,
            mode:"nearest",
            intersect: 0,
            position:"nearest",
            xPadding:10,
            yPadding:10,
            caretPadding:10
        },
        responsive: 1,
        scales: {
            yAxes: [{
                display:0,
                ticks: {
                    display: false
                },
                gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks: false,
                    display: false,
                    drawBorder: false
                }
            }],
            xAxes: [{
                display:0,
                ticks: {
                    display: false
                },
                gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks: false,
                    display: false,
                    drawBorder: false
                }
            }]
        },
        layout:{
            padding:{left:0,right:0,top:15,bottom:15}
        }
    };

    getData = async () => {
        const url = "/data?node_cd=db_001";
        const { data: { data }} = await axios.get(url);
        const values = data.slice((data.length - 10) > 0 ? data.length - 10 : 0).map(each => (
            each.data
        ));
        const labels = data.slice((data.length - 10) > 0 ? data.length - 10 : 0).map(each => (
            each.data_seq
        ));
        this.setState({
            data: values,
            seqs: labels
        })
    }

    intervalFetch = setInterval(() => {
        this.getData()    
    }, 5000);

    async componentDidMount() {
        this.getData();
        this.intervalFetch();
    };
    
    render(){
        // const { data } = this.state;
        return(
            <Fragment>
                
                <Line data={this.data} options={this.options} />
                
            </Fragment>
        );
    }
}

export default Example;