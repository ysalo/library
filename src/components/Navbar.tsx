import { useContext, useState } from "react";
import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    InputGroup,
    Menu,
    MenuItem
} from "@blueprintjs/core";
import { ContextMenu2 } from "@blueprintjs/popover2";
import {
    AddUserDialogContext,
    CheckOutDialogContext,
    DarkThemeContext,
    ReturnDialogContext,
    SearchContext
} from "../utils/context";
import { useHistory } from "react-router-dom";
import HelpDrawer from "./HelpDrawer";

type Props = { toggleTheme: () => void };

export default function NavBar({ toggleTheme }: Props) {
    const dark = useContext(DarkThemeContext);
    const [activeIndex, setActiveIndex] = useState(0);
    const [openHelp, setOpenHelp] = useState(false);
    const [, setCheckoutDialogOpen] = useContext(CheckOutDialogContext);
    const [, setAddUserDialogOpen] = useContext(AddUserDialogContext);
    const [, setReturnDialogOpen] = useContext(ReturnDialogContext);
    const [search, setSearch] = useContext(SearchContext);
    const history = useHistory();
    return (
        <div className="navbar-container">
            <Navbar className={"bp3-navbar"} fixedToTop>
                <NavbarGroup align={Alignment.LEFT} className="left-group">
                    <NavbarHeading>Бібліотека</NavbarHeading>
                    <NavbarDivider />
                    <ContextMenu2
                        content={
                            <Menu>
                                <MenuItem
                                    key="add-book"
                                    icon="new-layer"
                                    text="Додати Книгу"
                                    onClick={() =>
                                        console.warn(
                                            "add book clicked. functionality not implemented yet."
                                        )
                                    }
                                />
                            </Menu>
                        }
                    >
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
                    </ContextMenu2>
                    <NavbarDivider />
                    <ContextMenu2
                        content={
                            <Menu>
                                <MenuItem
                                    key="add-user"
                                    icon="new-person"
                                    text="Додати Користувача"
                                    onClick={() => setAddUserDialogOpen(true)}
                                />
                            </Menu>
                        }
                    >
                        <Button
                            className={Classes.MINIMAL}
                            icon="person"
                            text="Користувачі"
                            active={activeIndex === 1}
                            onClick={() => {
                                setActiveIndex(1);
                                history.push("/members");
                            }}
                        />
                    </ContextMenu2>

                    <NavbarDivider />

                    <ContextMenu2
                        content={
                            <Menu>
                                <MenuItem
                                    key="add-loan"
                                    icon="add"
                                    text="Додати Позику"
                                    onClick={() => setCheckoutDialogOpen(true)}
                                />
                                <MenuItem
                                    key="return-loan"
                                    icon="remove"
                                    text="Повернути Позику"
                                    onClick={() => setReturnDialogOpen(true)}
                                />
                            </Menu>
                        }
                    >
                        <Button
                            className={Classes.MINIMAL}
                            icon="shopping-cart"
                            text="Позики"
                            active={activeIndex === 2}
                            onClick={() => {
                                setActiveIndex(2);
                                history.push("/checkout");
                            }}
                        />
                    </ContextMenu2>

                    <NavbarDivider />
                </NavbarGroup>
                <NavbarGroup align={Alignment.CENTER} className="center-group">
                    <InputGroup
                        className="search-input"
                        type="search"
                        value={search}
                        onChange={e => {
                            setSearch(e.currentTarget.value);
                        }}
                        leftIcon="search"
                        fill={true}
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
