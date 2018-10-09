import nanoid from "nanoid";
import React, { Component } from "react";
import { print } from "./utils";
import Instance from "./Instanse";
import sessionStorageService from "./sessionStorageService";

const serverUrl = "wss://buddyshopping.now.sh";
const protocols = ["a9c06a4168967c89b1a54ee802f6a507"];

export const SocketContext = React.createContext(2);

export default class EcwidProvider extends Component {
  constructor(props) {
    super(props);

    this.motherId = this.getMotherId();
    this.state = {
      connectStatus: "offline",
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
        this.setSocketStatus("authorized");
        window.Ecwid.OnCartChanged.add(this.onCartChange);
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
    const motherId = sessionStorageService.get("motherId");

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

  startSession = name => {
    this.sendToSocket({
      event: "startSession",
      payload: { customerName: name }
    });
    print.blue("Стартую сессию", this.connectUrl);
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
    print.yellow("sendToSocket", event.type);
    console.log(event.payload);
    this.socket.send(JSON.stringify(event));
  };

  onCartChange = cart => {
    print.yellow("onCartChange");
    this.sendToSocket({
      event: "updateCart",
      payload: cart
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
          connectStatus={connectStatus}
          connect={this.establishConnect}
          motherId={this.motherId}
          startSession={this.startSession}
        />
      </SocketContext.Provider>
    );
  }
}
