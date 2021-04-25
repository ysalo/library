import { useCallback, useContext, useState } from "react";
import { Button, Classes, Dialog, Intent, FormGroup, InputGroup } from "@blueprintjs/core";
import { AddUserDialogContext } from "src/utils/context";
import { validatePhoneNumber, validateEmail } from "src/utils/utils";

export default function AddUserDialog() {
    const [open, setOpen] = useContext(AddUserDialogContext);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const handleClose = useCallback(() => {
        setOpen(false);
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
    }, [setOpen]);

    return (
        <Dialog isOpen={open} enforceFocus={false} title="Додати Користувача" onClose={handleClose}>
            <div className={Classes.DIALOG_BODY}>
                <div className="form-group">
                    <FormGroup label="Ім'я" labelFor="text-input">
                        <InputGroup id="firstname" placeholder="" value={firstName} onChange={e => setFirstName(e.currentTarget.value)} />
                    </FormGroup>
                    <FormGroup label="Прізвище" labelFor="text-input">
                        <InputGroup id="lastname" placeholder="" value={lastName} onChange={e => setLastName(e.currentTarget.value)} />
                    </FormGroup>
                    <FormGroup label="По Батькові" labelFor="text-input">
                        <InputGroup id="middlename" placeholder="" value={middleName} onChange={e => setMiddleName(e.currentTarget.value)} />
                    </FormGroup>
                    <FormGroup label="Номер Телефону" labelFor="text-input">
                        <InputGroup id="phone-number" placeholder="(XXX)-XXX-XXXX" value={phoneNumber} onChange={e => setPhoneNumber(e.currentTarget.value)} />
                    </FormGroup>
                    <FormGroup label="Імейл" labelFor="text-input">
                        <InputGroup id="email" placeholder="username@example.com" value={email} onChange={e => setEmail(e.currentTarget.value)} />
                    </FormGroup>
                </div>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button text="Добавити" type="submit" intent={Intent.PRIMARY} disabled={!isValid(firstName, lastName, phoneNumber, email)} />
                    <Button text="Відмінити" onClick={handleClose} />
                </div>
            </div>
        </Dialog>
    );
}

const isValid = (firstname: string, lastname: string, phonenumber: string, email: string) => {
    return firstname !== "" && lastname !== "" && (validatePhoneNumber(phonenumber) || validateEmail(email));
};
