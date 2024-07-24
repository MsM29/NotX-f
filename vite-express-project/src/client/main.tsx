import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./reactComponents/App";
const body = ReactDOMClient.createRoot(document.querySelector("div")!);
import "./styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";

body.render(
  <Router>
    <App />
  </Router>,
);
