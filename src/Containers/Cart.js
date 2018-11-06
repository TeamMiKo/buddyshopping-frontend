import React, { Component, Fragment } from "react";
import styled from "react-emotion";
import { isEmpty } from "ramda";
import { Collapse, Table, Icon, Divider, message } from "antd";
import Button from "../Components/Button";
import { SocketContext } from "../EcwidProvider";
import Modal from "../Components/Modal";
import EcwidService from "../EcwidService";
import CartService from "../CartService";
import { UpdateQueryString, copyToClipboard } from "../utils";

const Panel = Collapse.Panel;

const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
const round2 = n => round(n, 2);

const columns = [
  {
    title: "Name",
    dataIndex: "product.name",
    key: "product.name"
  },
  {
    title: "Price",
    dataIndex: "product.price",
    key: "product.price",
    width: 100
  },
  {
    title: "Price",
    dataIndex: "quantity",
    key: "quantity",
    width: 100
  }
];

export default class Cart extends Component {
  static defaultProps = {
    cart: []
  };

  state = {
    visible: false
  };

  onReadyToCheckOut(cart) {
    this.hideModal();
    EcwidService.clear();
    EcwidService.addProductsFromCart(cart);
  }

  renderFooter = cart => {
    const { name, isClientInstance } = this.props;
    const isDisabled =
      !isClientInstance && !CartService.allReadyToCheckout(cart);
    return (
      <Fragment>
        <Button
          onClick={() => {
            copyToClipboard(
              UpdateQueryString("buddyshoppingId", this.props.sessionId)
            );
            message.success("Successful copied");
          }}
        >
          Copy invite link
        </Button>
        <Button
          type="default"
          onClick={() =>
            this.props.onReadyToCheckout(true, this.props.customerId)
          }
        >
          Ready to checkout!
        </Button>

        {!isClientInstance && (
          <Button
            disabled={isDisabled}
            type="primary"
            onClick={() => this.onReadyToCheckOut(cart)}
          >
            Go to checkout
          </Button>
        )}
      </Fragment>
    );
  };

  renderPanelHeader = (name, amount, isReady) => {
    return (
      <PanelHeader>
        <span>
          <Icon
            type={isReady ? "smile" : "meh"}
            theme="twoTone"
            twoToneColor={isReady ? "#52c41a" : ""}
          />{" "}
          {name}
        </span>
        <span>{amount}</span>
      </PanelHeader>
    );
  };

  renderContent = cart => {
    const { name } = this.props;
    return (
      <Fragment>
        <Collapse defaultActiveKey={name}>
          {cart.map(({ owner, content }) => {
            if (isEmpty(content)) return null;

            return (
              <Panel
                header={this.renderPanelHeader(
                  owner.name,
                  round2(this.totalPriceForItems(content.items)),
                  owner.isReadyToCheckout
                )}
                key={owner.name}
                styled={{
                  padding: 0
                }}
              >
                <Table
                  columns={columns}
                  dataSource={content.items}
                  pagination={false}
                  size="small"
                  rowKey={record => record.name}
                  sortedInfo={null}
                />
              </Panel>
            );
          })}
        </Collapse>
        <Divider />
        Примерная общая сумма: {round2(this.totalPrice(cart))}
      </Fragment>
    );
  };

  totalPrice(cart) {
    if (!cart) return 0;
    return cart.reduce((a, c) => {
      return a + this.totalPriceForItems(c.content.items);
    }, 0);
  }

  totalPriceForItems = items => {
    if (!items) return 0;
    return items.reduce((a, c) => {
      return a + c.product.price * c.quantity;
    }, 0);
  };

  showModal = () => {
    this.setState({ visible: true });
  };
  hideModal = () => {
    this.setState({ visible: false });
  };

  renderCart = ({ cart }) => {
    if (!cart) return;
    return (
      <Fragment>
        <Button onClick={this.showModal} size="large" type="primary" ghost>
          Buddy Cart
        </Button>
        <Modal
          visible={this.state.visible}
          onClose={this.hideModal}
          title="Список совместных покупок"
          footer={this.renderFooter(cart)}
        >
          <div className="fieldsets-batch fieldsets-batch--with-single-field">
            {this.renderContent(cart)}
          </div>
        </Modal>
      </Fragment>
    );
  };
  render() {
    return <SocketContext.Consumer>{this.renderCart}</SocketContext.Consumer>;
  }
}

const PanelHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
`;
