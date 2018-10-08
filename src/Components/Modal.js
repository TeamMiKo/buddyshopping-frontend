import React, { Component } from "react";
import styled from "react-emotion";
import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css";

export default class ShopWithFriendsButton extends Component {
  render() {
    return (
      <Dialog
        title={this.props.title}
        onClose={this.props.onClose}
        visible={this.props.visible}
        {...this.props}
      >
        {this.props.children}
      </Dialog>
    );
  }
}
