import React, { Component } from "react";
import styled from "react-emotion";

export default class CartButton extends Component {
  render() {
    return (
      <Button
        onClick={this.props.onClick}
        className="ecwid-btn ecwid-btn--primary"
      >
        <i className="fas fa-cart-plus" /> Buddy Cart <br/>
      </Button>
    );
  }
}

const Button = styled("button")``;
