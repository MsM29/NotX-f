import ReactDOMClient from "react-dom/client";
const formLog = ReactDOMClient.createRoot(document.querySelector("form")!);
import Login from "./Login.tsx";
import Registration from "./Registration.tsx";
const log = document.querySelector("#log");
const reg = document.querySelector("#reg");

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
