import { render } from "react-dom";
import App from "./App";

import "./index.scss";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css";
const root = document.getElementById("root");
if (root) {
    render(<App />, root);
}
