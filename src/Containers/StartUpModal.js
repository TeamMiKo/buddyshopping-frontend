import React, { Component, Fragment } from "react";
import styled from "react-emotion";
import Modal from "../Components/Modal";
import Input from "../Components/Input";
import { UpdateQueryString } from "../utils";

export default class ShopWithFriendsButton extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  state = {
    status: "input"
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  handleSubmit = () => {
    const input = this.textInput.current;
    const value = input.state.value;
    if (value.length === 0) {
      input.setError();
    } else {
      this.setState({ status: "link" });
      this.props.onSubmit(value);
    }
  };

  makeUrl() {
    return UpdateQueryString("id", this.props.sessionId);
  }

  renderContent() {
    switch (this.state.status) {
      case "input":
        return (
          <Fragment>
            <div className="fieldset fieldset--select">
              <div>
                <Input ref={this.textInput} />
              </div>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}>
              Success button
            </button>
          </Fragment>
        );

      case "link":
        return (
          <div className="a-card a-card--normal">
            <div className="a-card__paddings">
              <h4 className="h4">Скопируй и раздай друзьям</h4>
              <div className="text-default">{this.makeUrl()}</div>
            </div>
          </div>
        );

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
