import React, { Component, Fragment } from 'react';
import axios from 'axios';

import {} from 'reactstrap';

class Product extends Component {
  state = {
    isLoading: true,
    positions: []
  };
  intervalId = 0;
  componentDidMount() {
    this.getProductsPosition();
    this.intervalFetch();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidUpdate() {
    this.state.positions.map(pos => {
      this.drawProducts(pos);
    });
  }

  getProductsPosition = async () => {
    const url = '/positions?node_cd=' + this.props.node_cd;
    // console.log(await axios.get(url));
    const {
      data: { positions }
    } = await axios.get(url);

    positions.map(pos => pos.canvas);
    this.setState({
      positions: positions,
      isLoading: false
    });
  };

  intervalFetch = () => {
    this.intervalId = setInterval(this.getProductsPosition, 3000);
  };

  drawProducts = pos => {
    const ctx = pos.canvas.getContext('2d');

    const posX = pos.pos_x;
    const posY = pos.pos_y;

    ctx.clearRect(0, 0, 1000, 1000);
    ctx.beginPath();
    ctx.fillRect(posX, posY, 30, 30);
    ctx.closePath();
  };

  render() {
    return (
      <Fragment>
        {this.state.positions.map(pos => (
          <canvas ref={ref => (pos.canvas = ref)} width="800px" height="600px" />
        ))}
      </Fragment>
    );
  }
}

export default Product;
