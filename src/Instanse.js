import React, { Component } from "react";
import Button from "./Components/Button";
import StartUpModal from "./Containers/StartUpModal";
import Cart from "./Containers/Cart";
import styled from "react-emotion";
import { Popover, Badge } from "antd";
import "./App.css";
import { evolve, not } from "ramda";

export default class Instance extends Component {
  state = {
    showModal: false,
    name: null,
    uid: null,
    page: "LOGIN"
  };

  componentDidMount() {
    if (this.props.isClientInstance) {
      this.showModal();
    }
  }

  setName = name => {
    this.connectionPromise = this.props.connect();
    this.connectionPromise.then(() => {
      this.props.startSession(name);
      this.setState({ name });
      this.setState({ page: "LINK" });
      if (this.props.isClientInstance) {
        this.hideModal();
      }
    });
  };

  showModal = () => {
    this.setModalVisibility(true);
  };

  isPage = page => {
    return this.state.page === page;
  };

  hideModal = () => {
    this.setModalVisibility(false);
  };

  setModalVisibility = showModal => {
    if (!showModal && this.isPage("LINK")) {
      this.setState({ page: "CART" });
    }

    if (
      this.props.isClientInstance &&
      !showModal &&
      this.isPage("LOGIN") &&
      !this.state.name
    ) {
      return;
    }
    this.setState({ showModal });
  };

  onConnectEstablished = uid => {
    this.setState({ connectEstablished: true, uid });
  };

  onConnectError = () => {};

  renderButtonText = () => {
    const { page } = this.state;

    switch (page) {
      case "LOGIN":
      case "LINK":
        return "Shop with friends";
      case "CART":
        return "Buddy Cart";
      default:
        return null;
    }
  };
  renderTitle = () => {
    const { page } = this.state;

    switch (page) {
      case "LOGIN":
        return "Please tell us your name";
      case "LINK":
        return "Share link";
      case "CART":
        return "Buddy Cart";
      default:
        return null;
    }
  };

  renderContent = () => {
    const { page } = this.state;

    switch (page) {
      case "LOGIN":
      case "LINK":
        return (
          <StartUpModal
            isClientInstance={this.props.isClientInstance}
            connectStatus={this.props.connectStatus}
            visible={this.state.showModal}
            onClose={this.hideModal}
            onSubmit={this.setName}
            sessionId={this.props.motherId}
            connecting={
              this.props.connectStatus === "startSession" ||
              this.props.connectStatus === "connecting"
            }
          />
        );

      case "CART":
        return (
          <Cart
            name={this.state.name}
            customerId={this.props.customerId}
            onReadyToCheckout={this.props.onReadyToCheckout}
            isClientInstance={this.props.isClientInstance}
            sessionId={this.props.motherId}
            hideModal={this.hideModal}
          />
        );
      default:
        return null;
    }
  };

  handleVisibleChange = showModal => {
    this.setState({ showModal });
  };

  render() {
    return (
      <Container>
        <Popover
          visible={this.state.showModal}
          overlayStyle={{ width: 500 }}
          onVisibleChange={this.setModalVisibility}
          trigger="click"
          placement="topLeft"
          title={this.renderTitle()}
          content={this.renderContent()}
          getPopupContainer={node => node}
        >
          <Badge
            count={this.props.usersCount}
            style={{
              backgroundColor: this.props.allReadyToCheckout ? "#52c41a" : null
            }}
          >
            <Button type="primary" size="large" icon="shopping-cart">
              {this.renderButtonText()}
            </Button>
          </Badge>
        </Popover>
        {/* <Popover
          trigger="click"
          content={}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button type="primary" size="large" icon="shopping-cart">
            Shop with friends
          </Button>
        </Popover> */}
        {/* {connectStatus !== "authorized" && (
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
         */}
      </Container>
    );
  }
}

const Container = styled("div")`
  position: fixed;
  left: 20px;
  bottom: 20px;
  text-align: center;
  padding-bottom: 10px !important;
`;
