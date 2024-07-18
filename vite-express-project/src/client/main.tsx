import ReactDOMClient from "react-dom/client";
import LogAndReg from "./reactComponents/LogAndReg";
import MyPage from "./reactComponents/MyPage";
import Header from "./reactComponents/Header"
const body = ReactDOMClient.createRoot(document.querySelector("div")!);
const header = ReactDOMClient.createRoot(document.querySelector("header")!)
import "./styles/index.css";

fetch("/home").then((res) => {
  if (res.status === 200) {
    header.render(<Header />)
    body.render(<MyPage />);
  } else {
    body.render(<LogAndReg />);
  }
});
