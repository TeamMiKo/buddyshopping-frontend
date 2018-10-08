import React, { Component } from "react";
import styled from "react-emotion";
import { SocketContext } from "./EcwidProvider";
import { Flipped } from "react-flip-toolkit";

export default class Cart extends Component {
  renderCart = ({ cart }) => {
    const { onClick } = this.props;
    return (
      <Flipped flipId="fullscreen">
        <Container onClick={onClick}>
          <Flipped inverseFlipId="fullscreen">
            <div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
              <div>cart</div>
            </div>
          </Flipped>
        </Container>
      </Flipped>
    );
  };
  render() {
    return <SocketContext.Consumer>{this.renderCart}</SocketContext.Consumer>;
  }
}

const Container = styled("div")`
  position: fixed;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;
  background: white;
  border: 1px solid gray;
  border-radius: 6px;
  z-index: 1;
`;
