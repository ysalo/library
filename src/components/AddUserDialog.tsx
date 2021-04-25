import { useContext } from "react";
import { Button, Classes, Dialog, Intent, FormGroup, InputGroup } from "@blueprintjs/core";
import { AddUserDialogContext } from "src/utils/context";

export default function AddUserDialog() {
    const [open, setOpen] = useContext(AddUserDialogContext);
    return (
        <Dialog isOpen={open} enforceFocus={false} title="Додати Користувача" onClose={() => setOpen(false)}>
            <div className={Classes.DIALOG_BODY}>
                <div className="form-group">
                    <FormGroup label="Ім'я" labelFor="text-input">
                        <InputGroup id="firstname" placeholder="Ім'я" />
                    </FormGroup>
                    <FormGroup label="Прізвище" labelFor="text-input">
                        <InputGroup id="lastname" placeholder="Прізвище" />
                    </FormGroup>
                    <FormGroup label="Номер Телефону" labelFor="text-input">
                        <InputGroup id="phone-number" placeholder="(XXX)-XXX-XXXX" />
                    </FormGroup>
                    <FormGroup label="Імейл" labelFor="text-input">
                        <InputGroup id="email" placeholder="username@example.com" />
                    </FormGroup>
                </div>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button text="Добавити" type="submit" intent={Intent.PRIMARY} />
                    <Button text="Відмінити" onClick={() => setOpen(false)} />
                </div>
            </div>
        </Dialog>
    );
}
