import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import EcwidProvider from "./EcwidProvider";
import registerServiceWorker from "./registerServiceWorker";

function renderApp() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  ReactDOM.render(<EcwidProvider />, container);
}

renderApp();
registerServiceWorker();
