import React, { Component, Fragment } from "react";
import Button from "./Components/Button";
import StartUpModal from "./Containers/StartUpModal";
import Cart from "./Containers/Cart";
import styled from "react-emotion";
import "./App.css";

export default class Instance extends Component {
  state = {
    showModal: false,
    name: null,
    uid: null
  };

  componentDidMount() {
    if (this.props.isClientInstance) {
      this.showModal();
    }
  }

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
    const { connectStatus } = this.props;
    return (
      <Container>
        {connectStatus !== "authorized" && (
          <Button
            onClick={this.showModal}
            type="primary"
            size="large"
            icon="shopping-cart"
          >
            Shop with friends
          </Button>
        )}
        {connectStatus === "authorized" && (
          <Cart
            name={this.state.name}
            customerId={this.props.customerId}
            onReadyToCheckout={this.props.onReadyToCheckout}
            isClientInstance={this.props.isClientInstance}
            sessionId={this.props.motherId}
          />
        )}
        <StartUpModal
          isClientInstance={this.props.isClientInstance}
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
