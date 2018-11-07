import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import EcwidProvider from "./EcwidProvider";
import registerServiceWorker from "./registerServiceWorker";

function setupApp() {
  // window.EcwidApp.init({
  //   app_id: "buddy-shopping-dev",
  //   autoloadedflag: true,
  //   autoheight: false
  // });

  window.Ecwid.OnAPILoaded.add();

  window.Ecwid.OnPageLoaded.add(renderApp);

  // const timer = setInterval(() => {
  //   const storeData = getStoreData();
  //   debugger; //eslint-disable-line
  //   if (storeData) {
  //     clearInterval(timer);
  //     renderApp(storeData);
  //   }
  // }, 200);
}

function renderApp(page) {
  if (page.type === "PRODUCT") {
    let div = document.getElementById("buddy-shopping");

    if (!div) {
      div = document.createElement("div");
      div.id = "buddy-shopping";
      const container = document.querySelector(
        ".ecwid-productBrowser-backgroundedPanelInner"
      );
      container.appendChild(div);
    }

    ReactDOM.render(<EcwidProvider />, div);
  }
}

// renderApp();
setupApp();
registerServiceWorker();
