import ReactDOMClient from "react-dom/client";
import LogAndReg from "./reactComponents/LogAndReg";
import MyPage from "./reactComponents/MyPage";
const body = ReactDOMClient.createRoot(document.querySelector("div")!);
import "./index.css";

fetch("/home").then((res) => {
  if (res.status === 200) {
    body.render(<MyPage />);
  } else {
    body.render(<LogAndReg />);
  }
});
