import React, { Component } from "react";
import styled from "react-emotion";
import { Flipped } from "react-flip-toolkit";
import { SocketContext } from "./EcwidProvider";

export default class CarButton extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <Flipped flipId="fullscreen">
        <Container onClick={onClick}>
          <Flipped inverseFlipId="fullscreen">
            <div>
              <Title>Coop cart:</Title>
              <div>items: 14</div>
              <div>amount: 50$</div>
            </div>
          </Flipped>
        </Container>
      </Flipped>
    );
  }
}

const Container = styled("div")`
  background: #009933;
  position: fixed;
  width: 100px;
  height: 100px;
  bottom: 10px;
  right: 10px;
  border-radius: 6px;
  padding: 5px;
  color: white;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background: #00cc66;
  }
`;

const Title = styled("h3")`
  padding: 0;
  margin: 0;
  margin-bottom: 5px;
`;
