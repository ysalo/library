import { useContext, useState } from "react";
import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, InputGroup } from "@blueprintjs/core";

import { AddUserDialogContext, CheckOutDialogContext, DarkThemeContext, SearchContext } from "../utils/context";
import { useHistory } from "react-router-dom";
import HelpDrawer from "./HelpDrawer";

type Props = { toggleTheme: () => void };

export default function NavBar({ toggleTheme }: Props) {
    const dark = useContext(DarkThemeContext);
    const [activeIndex, setActiveIndex] = useState(0);
    const [openHelp, setOpenHelp] = useState(false);
    const [, setCheckoutDialogOpen] = useContext(CheckOutDialogContext);
    const [, setAddUserDialogOpen] = useContext(AddUserDialogContext);
    const [search, setSearch] = useContext(SearchContext);
    const history = useHistory();
    return (
        <div className="navbar-container">
            <Navbar className={"bp3-navbar"} fixedToTop>
                <NavbarGroup align={Alignment.LEFT} className="left-group">
                    <NavbarHeading>Бібліотека</NavbarHeading>
                    <NavbarDivider />
                    <Button
                        className={Classes.MINIMAL}
                        icon="book"
                        text="Книги"
                        active={activeIndex === 0}
                        onClick={() => {
                            setActiveIndex(0);
                            history.push("/");
                        }}
                    />
                    <NavbarDivider />
                    <Button
                        className={Classes.MINIMAL}
                        icon="person"
                        text="Користувачі"
                        active={activeIndex === 2}
                        onClick={() => {
                            setActiveIndex(2);
                            history.push("/users");
                        }}
                    />

                    <Button
                        minimal
                        icon="plus"
                        intent="primary"
                        onClick={() => {
                            setAddUserDialogOpen(true);
                        }}
                    />

                    <NavbarDivider />

                    <Button
                        className={Classes.MINIMAL}
                        icon="shopping-cart"
                        text="Позики"
                        active={activeIndex === 1}
                        onClick={() => {
                            setActiveIndex(1);
                            history.push("/checkout");
                        }}
                    />

                    <Button
                        minimal
                        icon="plus"
                        intent="primary"
                        onClick={() => {
                            setCheckoutDialogOpen(true);
                        }}
                    />

                    <NavbarDivider />
                </NavbarGroup>
                <NavbarGroup align={Alignment.CENTER} className="center-group">
                    <InputGroup
                        className="search-input"
                        type="search"
                        value={search}
                        leftIcon="search"
                        fill={true}
                        onChange={e => {
                            setSearch(e.currentTarget.value);
                        }}
                        placeholder="Пошук..."
                    />
                </NavbarGroup>

                <NavbarGroup align={Alignment.RIGHT} className="right-group">
                    <NavbarDivider />
                    <Button icon={dark ? "flash" : "moon"} minimal onClick={toggleTheme} />
                    <Button icon={"help"} minimal onClick={() => setOpenHelp(true)} />
                </NavbarGroup>
            </Navbar>
            <HelpDrawer open={openHelp} setOpen={setOpenHelp} />
        </div>
    );
}
