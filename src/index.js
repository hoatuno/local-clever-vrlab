import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ConfirmProvider } from "./provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ConfirmProvider>
      <App />
    </ConfirmProvider>
  </BrowserRouter>
);
