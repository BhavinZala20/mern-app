import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./Redux/store";
import "./index.css";

// Create a root using createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // Use root.render to render the application
  <Provider store={Store}>
    <App />
  </Provider>
);
