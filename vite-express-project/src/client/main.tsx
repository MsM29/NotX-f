import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./reactComponents/App";
const body = ReactDOMClient.createRoot(document.querySelector("div")!);
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./reactComponents/Main";

document.body.onload = async function () {
  body.render(
    <Router>
      <Main />
      <App />
    </Router>,
  );
};
