import { useCallback, useContext, useState } from "react";
import { Button, Classes, Dialog, Intent, FormGroup, InputGroup } from "@blueprintjs/core";
import { AddUserDialogContext } from "src/utils/context";
import { validatePhoneNumber, validateEmail } from "src/utils/utils";
import { useMutation } from "@apollo/client";
import { CREATE_MEMBER } from "src/graphql/Mutations";
import { AddMemberToaster } from "./Toaster";
import { GET_ALL_MEMBERS } from "src/graphql/Queries";

const toastTimeoutMS = 15000;

export default function AddMemberDialog() {
    const [open, setOpen] = useContext(AddUserDialogContext);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const [createUser, { error, loading }] = useMutation(CREATE_MEMBER);
    const handleClose = useCallback(() => {
        setOpen(false);
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
    }, [setOpen]);

    const handleSubmit = useCallback(() => {
        createUser({
            variables: {
                First_Name: firstName,
                Last_Name: lastName,
                Middle_Name: middleName,
                Email: email !== "" ? email : null,
                Phone_Number: phoneNumber !== "" ? phoneNumber : null
            },
            refetchQueries: [
                {
                    query: GET_ALL_MEMBERS
                }
            ]
        })
            .then(res => {
                AddMemberToaster.show({
                    message: `Успішно додано користувача.`,
                    intent: Intent.SUCCESS,
                    timeout: toastTimeoutMS
                });
            })
            .catch(err => {
                AddMemberToaster.show({
                    message: `Не вдалося додати користувача! Зв’яжіться з адміністратором.`,
                    intent: Intent.DANGER,
                    timeout: toastTimeoutMS
                });
            });
    }, [createUser, email, firstName, lastName, middleName, phoneNumber]);

    return (
        <Dialog isOpen={open} enforceFocus={false} title="Додати Користувача" onClose={handleClose}>
            <div className={Classes.DIALOG_BODY}>
                <div className="form-group">
                    <FormGroup label="Ім'я" labelFor="text-input">
                        <InputGroup
                            id="firstname"
                            placeholder=""
                            value={firstName}
                            onChange={e => setFirstName(e.currentTarget.value)}
                        />
                    </FormGroup>
                    <FormGroup label="Прізвище" labelFor="text-input">
                        <InputGroup
                            id="lastname"
                            placeholder=""
                            value={lastName}
                            onChange={e => setLastName(e.currentTarget.value)}
                        />
                    </FormGroup>
                    <FormGroup label="По Батькові" labelFor="text-input">
                        <InputGroup
                            id="middlename"
                            placeholder=""
                            value={middleName}
                            onChange={e => setMiddleName(e.currentTarget.value)}
                        />
                    </FormGroup>
                    <FormGroup label="Номер Телефону" labelFor="text-input">
                        <InputGroup
                            id="phone-number"
                            placeholder="(XXX)-XXX-XXXX"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.currentTarget.value)}
                        />
                    </FormGroup>
                    <FormGroup label="Імейл" labelFor="text-input">
                        <InputGroup
                            id="email"
                            placeholder="username@example.com"
                            value={email}
                            onChange={e => setEmail(e.currentTarget.value)}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button
                        text="Добавити"
                        type="submit"
                        intent={Intent.PRIMARY}
                        disabled={!isValid(firstName, lastName, phoneNumber, email)}
                        onClick={handleSubmit}
                        loading={loading}
                    />
                    <Button text="Закрити" onClick={handleClose} />
                </div>
            </div>
        </Dialog>
    );
}

const isValid = (firstname: string, lastname: string, phonenumber: string, email: string) => {
    return (
        firstname !== "" &&
        lastname !== "" &&
        (validatePhoneNumber(phonenumber) || validateEmail(email))
    );
};
