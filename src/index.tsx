import { render } from "react-dom";
import App from "./App";

import "./index.scss";
const root = document.getElementById("root");
if (root) {
    render(<App />, root);
}
