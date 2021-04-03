import { Drawer, Classes, Callout } from "@blueprintjs/core";

import "./HelpDrawer.scss";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HelpDrawer({ open, setOpen }: Props) {
    return (
        <Drawer isOpen={open} size={"200px"} hasBackdrop={true} enforceFocus={false} title="Допомога" icon={"help"} onClose={() => setOpen(false)}>
            <div className="help-drawer">
                <Callout>З питанням, будь ласка, зв’яжіться зі Славіком Сало.</Callout>
            </div>

            <div className={Classes.DRAWER_FOOTER}>
                <div className="footer-info">
                    <div className="header">First Ukranian Baptist Church of Seattle</div>
                </div>
            </div>
        </Drawer>
    );
}
