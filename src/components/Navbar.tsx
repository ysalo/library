import { useContext, useState } from "react";
import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, InputGroup } from "@blueprintjs/core";

import { DarkThemeContext } from "../utils/context";
import { useHistory } from "react-router-dom";
import HelpDrawer from "./HelpDrawer";

type Props = { toggleTheme: () => void };

export default function NavBar({ toggleTheme }: Props) {
    const dark = useContext(DarkThemeContext);
    const [activeIndex, setActiveIndex] = useState(0);
    const [openHelp, setOpenHelp] = useState(false);
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
                        icon="shopping-cart"
                        text="Позики"
                        active={activeIndex === 1}
                        onClick={() => {
                            setActiveIndex(1);
                            history.push("/checkout");
                        }}
                    />
                    <NavbarDivider />
                </NavbarGroup>
                <NavbarGroup align={Alignment.CENTER} className="center-group">
                    <InputGroup
                        className="search-input"
                        type="search"
                        value={""}
                        leftIcon="search"
                        fill={true}
                        // onChange={e => {
                        //     setSearch(e.currentTarget.value);
                        // }}
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

{
    /* <Button className={Classes.MINIMAL} icon="settings" onClick={() => setOpen(!open)} /> */
}
{
    /* <SettingDrawer open={open} setOpen={setOpen} /> */
}

{
    /* <Button
minimal
icon="history"
text="Runs"
active={activeIndex === 1}
onClick={() => {
    setActiveIndex(1);
    history.push("/runs");
}}
/> */
}
