import React, { Component } from "react";
import styled from "react-emotion";

export default class ShopWithFriendsButton extends Component {
  render() {
    return (
      <Button onClick={this.props.onClick} className="btn btn-primary">
        Shop with friends
      </Button>
    );
  }
}

const Button = styled("button")``;
