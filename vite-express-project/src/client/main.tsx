import ReactDOMClient from "react-dom/client";
const formLog = ReactDOMClient.createRoot(document.querySelector("#forForm")!);
import Login from "./Login";
import Registration from "./Registration";
const log = document.querySelector("#log");
const reg = document.querySelector("#reg");
import './index.css';

formLog.render(<Login />);

reg?.addEventListener("click", () => {
  formLog.render(<Registration />);
  log?.setAttribute("class", "light");
  reg?.setAttribute("class", "dark");
});

log?.addEventListener("click", () => {
  formLog.render(<Login />);
  reg?.setAttribute("class", "light");
  log?.setAttribute("class", "dark");
});