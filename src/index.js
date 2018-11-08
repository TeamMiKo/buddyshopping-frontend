import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import EcwidProvider from "./EcwidProvider";
import registerServiceWorker from "./registerServiceWorker";

function setupApp() {
  window.Ecwid.OnAPILoaded.add();

  window.Ecwid.OnPageLoaded.add(renderApp);
}

function renderApp(page) {
  let div = document.getElementById("buddy-shopping");

  if (!div) {
    div = document.createElement("div");
    div.id = "buddy-shopping";
    const container = document.body;
    container.appendChild(div);
  }

  ReactDOM.render(<EcwidProvider />, div);
}

setupApp();
registerServiceWorker();
