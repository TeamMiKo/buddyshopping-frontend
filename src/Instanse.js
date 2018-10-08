import React, { Component, Fragment } from "react";
import ShopWithFriendsButton from "./ShopWithFriendsButton";
import StartUpModal from "./Containers/StartUpModal";

export default class Instance extends Component {
  state = {
    showModal: false,
    name: null,
    uid: null
  };

  setName = name => {
    this.setState({ name });
    this.props.startSession(name);
  };

  showModal = () => {
    this.props.connect();
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  onConnectEstablished = uid => {
    this.setState({ connectEstablished: true, uid });
  };

  onConnectError = () => {};

  render() {
    return (
      <Fragment>
        <ShopWithFriendsButton onClick={this.showModal} />
        <StartUpModal
          connecting={this.props.connectStatus === "connecting"}
          visible={this.state.showModal}
          onClose={this.hideModal}
          onSubmit={this.setName}
          sessionId={this.props.motherId}
        />
      </Fragment>
    );
  }
}
