import ReactDOMClient from "react-dom/client";
import LogAndReg from "./reactComponents/LogAndReg";
import Header from "./reactComponents/Header";
const body = ReactDOMClient.createRoot(document.querySelector("div")!);
import "./index.css";

fetch("/home").then((res) => {
  if (res.status === 200) {
    body.render(<Header />);
  } else {
    body.render(<LogAndReg />);
  }
});
