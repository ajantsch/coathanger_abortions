import "core-js";
import "raf/polyfill";

import React from "react";
import ReactDOM from "react-dom";

import "./styles/reset.css";
import "./styles/base.css";

import App from "./App";

const { NODE_ENV } = process.env;

const target = document.getElementById("root");
if (target) {
  ReactDOM.render(<App />, target);
}

if (NODE_ENV === "production" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.info("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.warn("SW registration failed: ", registrationError);
      });
  });
}
