import React, { Component } from "react";
import { Button } from "antd";
import styled from "react-emotion";

export default class ShopWithFriendsButton extends Component {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Button
        style={{
          padding: "0 15px"
        }}
        {...rest}
      >
        <Label>{children}</Label>
      </Button>
    );
  }
}

const Label = styled("span")`
  margin-left: 8px !important;
`;
