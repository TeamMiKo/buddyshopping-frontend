import React, { Component, Fragment } from "react";
import { Input, Form, Button, message } from "antd";
import styled from "react-emotion";
import Modal from "../Components/Modal";
import { UpdateQueryString } from "../utils";
import { prop } from "ramda";

const FormItem = Form.Item;

class ShopWithFriendsButton extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  state = {
    status: "input",
    error: false
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, { userName }) => {
      if (!err) {
        this.props.onSubmit(userName);

        if (this.props.isClientInstance) {
          this.props.onClose();
        } else {
          this.setState({ status: "link" });
        }
      }
    });
  };

  makeUrl() {
    return UpdateQueryString("buddyshoppingId", this.props.sessionId);
  }

  copyToClipboard = str => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }

    message.success("Successful copied");
  };

  renderContent() {
    const { getFieldDecorator } = this.props.form;
    switch (this.state.status) {
      case "input":
        return (
          <Form onSubmit={this.handleSubmit} layout="inline">
            <FormItem>
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  size="large"
                  name="userName"
                  placeholder="Your username"
                />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" size="large">
                Submit
              </Button>
            </FormItem>
          </Form>
        );

      case "link": {
        const url = this.makeUrl();
        return (
          <Form onSubmit={this.handleSubmit} layout="inline">
            <h4 className="h4">Скопируй и раздай друзьям</h4>
            <FormItem>
              <Input disabled value={url} size="large" />
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                size="large"
                onClick={() => this.copyToClipboard(url)}
                icon="copy"
              >
                Copy
              </Button>
            </FormItem>
          </Form>
        );
      }

      default:
        return null;
    }
  }

  renderFooter() {
    return (
      <button onClick={this.props.onClose} className="btn btn-primary">
        Close
      </button>
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onClose={this.props.onClose}
        title="пожалуйста представьтесь"
        footer={this.renderFooter()}
      >
        <div className="fieldsets-batch fieldsets-batch--with-single-field">
          {this.renderContent()}
        </div>
      </Modal>
    );
  }
}

export default Form.create()(ShopWithFriendsButton);
