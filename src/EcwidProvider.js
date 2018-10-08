import nanoid from "nanoid";
import React, { Component } from "react";
import { print } from "./utils";
import Instance from "./Instanse";
import sessionStorageService from "./sessionStorageService";

const serverUrl = "wss://buddyshopping.now.sh";
const protocols = ["86aa6d449d3de20132e08d77b909547d"];

export const SocketContext = React.createContext(2);

export default class EcwidProvider extends Component {
  constructor(props) {
    super(props);

    this.motherId = this.getMotherId();
    this.state = {
      connectStatus: "offline",
      connectEstablished: false,
      cart: {}
    };

    this.connectUrl = `${serverUrl}/${this.state.motherId}`;
  }

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
  };

  onOpenSocket() {
    this.socket.onopen = () => {
      print.green("Соединение установленно", this.connectUrl);
      this.setSocketStatus("connected");
      this.startSession();
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
      this.setSocketStatus("disconnect");
    };
  }

  onErrorSocket() {
    this.socket.onerror = error => {
      console.log(error.message);
      print.red("Ошибка соединение", error.message);
      this.setSocketStatus(false);
    };
  }

  onMessage(event) {
    console.log(event);

    this.setState = {
      cart: event.data
    };
  }

  sendToSocket = event => {
    this.socket.send(JSON.stringify(event));
  };

  render() {
    const { connectEstablished, cart, connectStatus } = this.state;
    return (
      <SocketContext.Provider
        value={{
          cart,
          connectEstablished,
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
