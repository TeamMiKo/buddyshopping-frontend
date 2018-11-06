import React, { Component } from "react";
import { Modal } from "antd";
import "rc-dialog/assets/index.css";

export default class ShopWithFriendsButton extends Component {
  render() {
    return (
      <Modal
        title={this.props.title}
        onCancel={this.props.onClose}
        visible={this.props.visible}
        {...this.props}
      >
        {this.props.children}
      </Modal>
    );
  }
}
