import React, { Component, Fragment } from "react";
import './Map.css';

import Product from './Product';
import axios from 'axios';

import AssemblyIcon1 from "./icon/assemblyIcon1.png"
import AssemblyIcon2 from "./icon/assemblyIcon2.png"
import AssemblyIcon3 from "./icon/assemblyIcon3.png"
import AssemblyIcon4 from "./icon/assemblyIcon4.png"

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
} from "reactstrap";

class Map extends Component {
  state = {
    isLoading: true,
    nodes: []
  }
  intervalId = 0;
  componentDidMount() {
    

    this.drawAssemblyLine();
    this.getNodes();
    this.intervalFetch();
    // console.log(this.intervalId);
  }

  componentWillUnmount() {
    console.log('unmount');
    console.log(this.intervalId);
    clearInterval(this.intervalId);
  }

  // shouldComponentUpdate(prevProps, prevState) {
  //   clearInterval(this.intervalFetch);

  //   const drawNodes = prevState.nodes.filter((node) => {
  //     return !(JSON.stringify(this.state.nodes).indexOf(node.node_cd) > -1);
  //   });
       
  //   return drawNodes.length !== 0;
  // }

  getNodes = async () => {
    const { data: { nodes } } = await axios.get("/nodes");
    this.setState({
      nodes: nodes,
      isLoading: false
    });
  }

  intervalFetch = () => {
    this.intervalId = setInterval(this.getNodes, 1000);
    console.log(this.intervalId);
  }

  drawCanvas = (nodes) => {
    // console.log(nodes);
    return (
      nodes.map(node => (
        <Product node_cd={node.node_cd}></Product>
      ))
    );
  }

  render() {
    return (
      <Fragment>
        <div className="content">
          <Row>
            <Col>
              <div className="canvas-wrap">
                {this.drawCanvas(this.state.nodes)}
                <canvas ref={ref => (this.assemblyLine = ref)} width="800px" height="600px" />
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>
    )
  }

  drawAssemblyLine = () => {
    let ctx = this.assemblyLine.getContext('2d');

    const assemblyIcon1 = new Image();
    assemblyIcon1.src = AssemblyIcon1;
    assemblyIcon1.onload = () => {
      ctx.drawImage(assemblyIcon1, 120, 65, 35, 35);
      ctx.drawImage(assemblyIcon1, 250, 65, 35, 35);
      ctx.drawImage(assemblyIcon1, 380, 65, 35, 35);
      ctx.drawImage(assemblyIcon1, 510, 65, 35, 35);
      ctx.drawImage(assemblyIcon1, 120, 170, 35, 35);
      ctx.drawImage(assemblyIcon1, 250, 170, 35, 35);
      ctx.drawImage(assemblyIcon1, 380, 170, 35, 35);
      ctx.drawImage(assemblyIcon1, 510, 170, 35, 35);
    }

    const assemblyIcon2 = new Image();
    assemblyIcon2.src = AssemblyIcon2;
    assemblyIcon2.onload = () => {
      ctx.drawImage(assemblyIcon2, 190, 230, 30, 30);
      ctx.drawImage(assemblyIcon2, 320, 230, 30, 30);
      ctx.drawImage(assemblyIcon2, 450, 230, 30, 30);
      ctx.drawImage(assemblyIcon2, 570, 230, 30, 30);
      ctx.drawImage(assemblyIcon2, 190, 345, 30, 30);
      ctx.drawImage(assemblyIcon2, 320, 345, 30, 30);
      ctx.drawImage(assemblyIcon2, 450, 345, 30, 30);
      ctx.drawImage(assemblyIcon2, 570, 345, 30, 30);
    }

    const assemblyIcon3 = new Image();
    assemblyIcon3.src = AssemblyIcon3;
    assemblyIcon3.onload = () => {
      ctx.drawImage(assemblyIcon3, 15, 95, 70, 70);
      ctx.drawImage(assemblyIcon3, 710, 440, 70, 70);
    }

    const assemblyIcon4 = new Image();
    assemblyIcon4.src = AssemblyIcon4;
    assemblyIcon4.onload = () => {
      ctx.drawImage(assemblyIcon4, 190 + 60, 400, 30, 30);
      ctx.drawImage(assemblyIcon4, 320 + 60, 400, 30, 30);
      ctx.drawImage(assemblyIcon4, 450 + 60, 400, 30, 30);
      ctx.drawImage(assemblyIcon4, 570 + 60, 400, 30, 30);

      ctx.drawImage(assemblyIcon4, 190 + 60, 400 + 120, 30, 30);
      ctx.drawImage(assemblyIcon4, 320 + 60, 400 + 120, 30, 30);
      ctx.drawImage(assemblyIcon4, 450 + 60, 400 + 120, 30, 30);
      ctx.drawImage(assemblyIcon4, 570 + 60, 400 + 120, 30, 30);
    }

    ctx.beginPath();
    ctx.strokeStyle = "#FFC11E";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "bevel";

    // upper line
    ctx.moveTo(100, 100);
    ctx.lineTo(620, 100);
    ctx.arc(620, 170, 70, (Math.PI / 180) * 270, 0, false);

    ctx.lineTo(690, 270);
    ctx.arc(620, 270, 70, 0, (Math.PI / 180) * 90, false);

    ctx.lineTo(170, 340);
    ctx.lineTo(170, 440);

    ctx.lineTo(690, 440);

    // under line
    ctx.moveTo(100, 170);
    ctx.lineTo(620, 170);

    ctx.lineTo(620, 270);
    ctx.lineTo(170, 270);

    ctx.arc(170, 340, 70, (Math.PI / 180) * 270, (Math.PI / 180) * 180, true);
    ctx.lineTo(100, 440);
    ctx.arc(170, 440, 70, (Math.PI / 180) * 180, (Math.PI / 180) * 90, true);
    ctx.lineTo(690, 510);

    ctx.stroke();
    ctx.closePath();
  }
}

export default Map;