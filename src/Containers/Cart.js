import React, { Component, Fragment } from "react";
import styled from "react-emotion";
import { isEmpty } from "ramda";
import { SocketContext } from "../EcwidProvider";
import Modal from "../Components/Modal";
import CartButton from "../Components/CartButton";

export default class Cart extends Component {
  state = {
    visible: false
  };

  renderFooter = () => {
    return "kek";
  };

  renderContent = cart => {
    if (!cart) return;
    return (
      <table>
        <tbody>
          {cart.map(({ owner, content }) => {
            if (isEmpty(content)) return null;
            return (
              <Fragment>
                <tr>
                  <td>{owner.name}</td>
                  <td>{this.totalpriceForItems(content.items)}</td>
                </tr>
                {content.items.map(({ quantity, product }) => {
                  return (
                    <tr>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{quantity}</td>
                    </tr>
                  );
                })}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    );
  };

  totalpriceForItems = items => {
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
    console.log(cart);

    return (
      <Fragment>
        <CartButton onClick={this.showModal} />
        <Modal
          visible={this.state.visible}
          onClose={this.hideModal}
          title="Список совместных покупок"
          footer={this.renderFooter()}
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

const Container = styled("div")``;
