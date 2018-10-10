import React, { Component, Fragment } from "react";
import ShopWithFriendsButton from "./ShopWithFriendsButton";
import StartUpModal from "./Containers/StartUpModal";
import Cart from "./Containers/Cart";
import styled from "react-emotion";


export default class Instance extends Component {
  state = {
    showModal: false,
    name: null,
    uid: null
  };

  setName = name => {
    this.connectionPromise.then(() => {
      this.setState({ name });
      this.props.startSession(name);
    });
  };

  showModal = () => {
    this.connectionPromise = this.props.connect();
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
    const {connectStatus} = this.props;
    return (
      <Container>
        <ShopWithFriendsButton onClick={this.showModal} />
        {connectStatus === 'authorized' && <Cart/>}
        <StartUpModal
          connectStatus={this.props.connectStatus}
          visible={this.state.showModal}
          onClose={this.hideModal}
          onSubmit={this.setName}
          sessionId={this.props.motherId}
        />
      </Container>
    );
  }
}

const Container = styled("div")`
  text-align: center;
  padding-bottom: 10px !important;
`;
