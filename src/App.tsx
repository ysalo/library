import { useEffect, useState } from "react";
import { HashRouter, Route } from "react-router-dom";
import { FocusStyleManager } from "@blueprintjs/core";
import { useLocalBoolState } from "./hooks/useLocalBoolState";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Navbar from "./components/Navbar";
import BooksPage from "./pages/BooksPage";
import LoansPage from "./pages/LoansPage";

import { CheckOutDialogContext, DarkThemeContext } from "./utils/context";

import CheckOutDialog from "./components/CheckoutDialog";

FocusStyleManager.onlyShowFocusOnTabs();

export default function App() {
    const client = new ApolloClient({
        uri: "http://localhost:4000/graphql",
        cache: new InMemoryCache()
    });
    const [dark, setDark] = useLocalBoolState("dark-mode", true);
    const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
    useEffect(() => {
        if (dark) {
            document.body.classList.add("bp3-dark");
        } else {
            document.body.classList.remove("bp3-dark");
        }
    }, [dark]);

    return (
        <div id="app" className={dark ? "bp3-dark" : ""}>
            <ApolloProvider client={client}>
                <DarkThemeContext.Provider value={dark}>
                    <CheckOutDialogContext.Provider value={[checkoutDialogOpen, setCheckoutDialogOpen]}>
                        <HashRouter>
                            <Navbar toggleTheme={() => setDark(d => !d)} />
                            <CheckOutDialog />
                            <Route exact path="/" component={BooksPage} />
                            <Route exact path="/checkout" component={LoansPage} />
                        </HashRouter>
                    </CheckOutDialogContext.Provider>
                </DarkThemeContext.Provider>
            </ApolloProvider>
        </div>
    );
}
