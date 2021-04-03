import { useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import { FocusStyleManager } from "@blueprintjs/core";

import { useLocalBoolState } from "./hooks/useLocalBoolState";
import Navbar from "./components/Navbar";
import BooksPage from "./pages/BooksPage";
import CheckoutPage from "./pages/CheckoutPage";

import { DarkThemeContext } from "./utils/context";

FocusStyleManager.onlyShowFocusOnTabs();

export default function App() {
    const [dark, setDark] = useLocalBoolState("dark-mode", true);
    useEffect(() => {
        if (dark) {
            document.body.classList.add("bp3-dark");
        } else {
            document.body.classList.remove("bp3-dark");
        }
    }, [dark]);

    return (
        <div id="app" className={dark ? "bp3-dark" : ""}>
            <DarkThemeContext.Provider value={dark}>
                <HashRouter>
                    <Navbar toggleTheme={() => setDark(d => !d)} />
                    <Route exact path="/" component={BooksPage} />
                    <Route exact path="/checkout" component={CheckoutPage} />
                </HashRouter>
            </DarkThemeContext.Provider>
        </div>
    );
}
