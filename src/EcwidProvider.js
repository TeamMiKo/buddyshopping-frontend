import nanoid from "nanoid";
import React, { Component } from "react";
import { print, getParameterByName } from "./utils";
import Instance from "./Instanse";
import sessionStorageService from "./sessionStorageService";
import CartService from "./CartService";

// const serverUrl = "wss://buddyshopping.now.sh";
// const protocols = ["a9c06a4168967c89b1a54ee802f6a507"];
const serverUrl = "ws://localhost:8080";
const protocols = ["secret"];

export const SocketContext = React.createContext(2);

export default class EcwidProvider extends Component {
  constructor(props) {
    super(props);

    this.motherId = this.getMotherId();
    this.isClientInstance = !!getParameterByName("buddyshoppingId");

    this.state = {
      connectStatus: "offline",
      customerId: undefined,
      connectEstablished: false,
      cart: null
    };

    this.connectUrl = `${serverUrl}/${this.motherId}`;
    this.resolveConnectionPromise = Function.prototype;
    this.rejectConnectionPromise = Function.prototype;
  }

  eventHandler = async ({ data }) => {
    const { event, payload } = await JSON.parse(data);
    print.blue("event: ", event);
    console.log(payload);

    switch (event) {
      case "startSession":
      case "joinSession":
        this.setSocketStatus("authorized");
        this.setCustomerId(payload.customerId);
        window.Ecwid.OnCartChanged.add(this.onCartInit(payload.customerId));
        break;
      case "multicartUpdate":
        this.setSocketStatus("authorized");
        this.setState({ cart: payload.multicartContent });
        break;

      default:
        break;
    }
  };

  getMotherId() {
    const motherId =
      getParameterByName("buddyshoppingId") ||
      sessionStorageService.get("motherId");

    if (motherId) return motherId;
    return sessionStorageService.set("motherId", nanoid());
  }

  establishConnect = () => {
    print.blue("Устанавливаю соединение", this.connectUrl);
    this.setSocketStatus("connecting");
    this.socket = new WebSocket(this.connectUrl, protocols);
    this.setupSocket();
    return new Promise((resolve, reject) => {
      this.resolveConnectionPromise = resolve;
      this.rejectConnectionPromise = reject;
    });
  };

  setupSocket() {
    this.onOpenSocket();
    this.onCloseSocket();
    this.onCloseSocket();
  }

  setSocketStatus(connectStatus) {
    this.setState({ connectStatus });
  }
  setCustomerId(customerId) {
    this.setState({ customerId });
  }

  startSession = name => {
    this.sendToSocket({
      event: "startSession",
      payload: { customerName: name }
    });
    print.blue("Стартую сессию", this.connectUrl);
  };

  joinSession = name => {
    this.sendToSocket({
      event: "joinSession",
      payload: { customerName: name }
    });
    print.blue("Коннект к сессии", this.connectUrl);
  };

  onOpenSocket() {
    this.socket.onopen = () => {
      print.green("Соединение установленно", this.connectUrl);
      this.resolveConnectionPromise();
      this.setSocketStatus("connected");
    };

    this.socket.onmessage = this.onMessage;
  }

  onCloseSocket() {
    this.socket.onclose = event => {
      if (event.wasClean) {
        print.blue("Соединение закрыто чисто");
      } else {
        print.red("Обрыв соединение");
      }
      print.brown("Код: " + event.code + " причина: " + event.reason);
      this.rejectConnectionPromise(event);
      this.setSocketStatus("disconnect");
    };
  }

  onErrorSocket() {
    this.socket.onerror = error => {
      console.log(error.message);
      print.red("Ошибка соединение", error.message);
      this.setSocketStatus("error");
    };
  }

  onMessage = event => {
    this.eventHandler(event);
  };

  sendToSocket = event => {
    print.yellow("sendToSocket", event.event);
    console.log(event.payload);
    this.socket.send(JSON.stringify(event));
  };

  onCartInit = customerId => cartContent => {
    const { cart } = this.state;
    if (CartService.allReadyToCheckout(cart)) {
      return;
    }
    print.yellow("onCartInit");
    this.sendToSocket({
      event: "updateCart",
      payload: {
        customerId,
        cartContent
      }
    });
  };

  onCartChange = cartContent => {
    print.yellow("onCartChange");
    this.sendToSocket({
      event: "updateCart",
      payload: {
        customerId: this.state.customerId,
        cartContent
      }
    });
  };

  onReadyToCheckout = customerReadyToCheckout => {
    print.yellow("customerReadyToCheckout");
    this.sendToSocket({
      event: "customerReadyToCheckout",
      payload: {
        customerId: this.state.customerId,
        customerReadyToCheckout
      }
    });
  };

  render() {
    const { connectEstablished, cart, connectStatus } = this.state;
    return (
      <SocketContext.Provider
        value={{
          cart,
          authorized: connectStatus === "authorized",
          addToCart: this.sendToSocket
        }}
      >
        <Instance
          onReadyToCheckout={this.onReadyToCheckout}
          customerId={this.state.customerId}
          isClientInstance={this.isClientInstance}
          connectStatus={connectStatus}
          connect={this.establishConnect}
          motherId={this.motherId}
          startSession={
            this.isClientInstance ? this.joinSession : this.startSession
          }
        />
      </SocketContext.Provider>
    );
  }
}
