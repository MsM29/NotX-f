import ReactDOMClient from "react-dom/client";
import LogAndReg from "./reactComponents/LogAndReg";
import App from "./reactComponents/App";
const body = ReactDOMClient.createRoot(document.querySelector("div")!);
import "./styles/index.css";
import { BrowserRouter as Router} from "react-router-dom";

fetch("/home").then(async (res) => {
  if (res.status === 200) {
    const userData = await res.json();
    body.render(
      <Router>
        <App userData={userData[0]}/>
      </Router>
    );
  } else {
    body.render(<LogAndReg />);
  }
});
