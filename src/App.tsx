import React, { useEffect, useState } from "react";
import { HashRouter, Route } from "react-router-dom";
import { FocusStyleManager } from "@blueprintjs/core";
import { useLocalBoolState } from "./hooks/useLocalBoolState";
import { ApolloClient, InMemoryCache, ApolloProvider, NormalizedCacheObject } from "@apollo/client";

import Navbar from "./components/Navbar/Navbar";
import BooksPage from "./pages/BooksPage";
import LoansPage from "./pages/LoansPage";

import {
    AddUserDialogContext,
    CheckOutDialogContext,
    DarkThemeContext,
    ReturnDialogContext,
    SearchContext
} from "./utils/context";

import CheckOutDialog from "./components/CheckoutDialog";
import AddMemberDialog from "./components/AddMemberDialog";
import MembersPage from "./pages/MembersPage";
import ReturnDialog from "./components/ReturnDialog";

FocusStyleManager.onlyShowFocusOnTabs();

export default function App() {
    console.log("hi from liz");
    const [dark, setDark] = useLocalBoolState("dark-mode", true);
    const [client] = useState<ApolloClient<NormalizedCacheObject>>(
        new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache()
        })
    );
    const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
    const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
    const [returnDialogOpen, setReturnDialogOpen] = useState(false);
    const [search, setSearch] = useState("");

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
                    <CheckOutDialogContext.Provider
                        value={[checkoutDialogOpen, setCheckoutDialogOpen]}
                    >
                        <AddUserDialogContext.Provider
                            value={[addUserDialogOpen, setAddUserDialogOpen]}
                        >
                            <ReturnDialogContext.Provider
                                value={[returnDialogOpen, setReturnDialogOpen]}
                            >
                                <SearchContext.Provider value={[search, setSearch]}>
                                    <HashRouter>
                                        <Navbar toggleTheme={() => setDark(d => !d)} />
                                        <CheckOutDialog />
                                        <AddMemberDialog />
                                        <ReturnDialog />
                                        <Route exact path="/" component={BooksPage} />
                                        <Route path="/checkout" component={LoansPage} />
                                        <Route path="/members" component={MembersPage} />
                                    </HashRouter>
                                </SearchContext.Provider>
                            </ReturnDialogContext.Provider>
                        </AddUserDialogContext.Provider>
                    </CheckOutDialogContext.Provider>
                </DarkThemeContext.Provider>
            </ApolloProvider>
        </div>
    );
}
