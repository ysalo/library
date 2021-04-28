import { useCallback, useContext, useState } from "react";
import { Button, Classes, Dialog, Intent, FormGroup, InputGroup } from "@blueprintjs/core";
import { CheckOutDialogContext } from "src/utils/context";
import {
    convertFromEpochTime,
    validateBarcode,
    validateEmail,
    validatePhoneNumber
} from "src/utils/utils";
import { useMembers } from "src/hooks/useMembers";
import { AddLoanToaster } from "./Toaster";
import { useItems } from "src/hooks/useItems";
import { CREATE_LOAN } from "src/graphql/Mutations";
import { useMutation } from "@apollo/client";
import { GET_ALL_ITEMS, GET_ALL_LOANS } from "src/graphql/Queries";

// this is discouraged by the docs
const toastTimeoutMS = 0;

export default function CheckOutDialog() {
    const [open, setOpen] = useContext(CheckOutDialogContext);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [barcode, setBarcode] = useState("");
    const [members] = useMembers();
    const [items] = useItems();
    const [createLoan, { error, loading }] = useMutation(CREATE_LOAN);
    const handleClose = useCallback(() => {
        setOpen(false);
        setPhoneNumber("");
        setEmail("");
        setBarcode("");
    }, [setOpen]);

    const handleSubmit = useCallback(() => {
        let member;
        if (email) {
            member = members.find(m => m.Email === email);
        }
        if (phoneNumber) {
            member = members.find(m => m.Phone_Number === phoneNumber);
        }
        if (!member) {
            AddLoanToaster.show({
                message: `Не вдалося додати позику! Користувач не існує.`,
                intent: Intent.DANGER,
                timeout: toastTimeoutMS
            });
            return;
        }
        const item = items.find(i => i.Barcode === barcode);

        if (!item || !item.Status) {
            AddLoanToaster.show({
                message: `Не вдалося додати позику! Штрих-код не існує, або книга не повернута.`,
                intent: Intent.DANGER,
                timeout: toastTimeoutMS
            });
            return;
        }

        createLoan({
            variables: {
                Member_Id: +member.Member_Id,
                Barcode: item.Barcode
            },
            refetchQueries: [
                {
                    query: GET_ALL_LOANS
                },
                {
                    query: GET_ALL_ITEMS
                }
            ]
        })
            .then(res => {
                AddLoanToaster.show({
                    message: `Успішно додано позику. Дата повернення: ${convertFromEpochTime(
                        res.data.createLoan.Due
                    )}`,
                    intent: Intent.SUCCESS,
                    timeout: toastTimeoutMS
                });
            })
            .catch(err => {
                AddLoanToaster.show({
                    message: `Не вдалося додати позику! Зв’яжіться з адміністратором.`,
                    intent: Intent.DANGER,
                    timeout: toastTimeoutMS
                });
            });
    }, [barcode, createLoan, email, items, members, phoneNumber]);

    return (
        <Dialog isOpen={open} enforceFocus={false} title="Позика Книги" onClose={handleClose}>
            <div className={Classes.DIALOG_BODY}>
                <div className="form-group">
                    <FormGroup label="Номер Телефону" labelFor="text-input">
                        <InputGroup
                            id="phone-number"
                            placeholder="(XXX)-XXX-XXXX"
                            value={phoneNumber}
                            disabled={email.length > 0}
                            onChange={e => setPhoneNumber(e.currentTarget.value)}
                        />
                    </FormGroup>
                    <FormGroup label="Імейл" labelFor="text-input">
                        <InputGroup
                            id="email"
                            placeholder="username@example.com"
                            value={email}
                            disabled={phoneNumber.length > 0}
                            onChange={e => setEmail(e.currentTarget.value)}
                        />
                    </FormGroup>
                    <FormGroup label="Штрих-код" labelFor="text-input">
                        <InputGroup
                            id="barcode"
                            placeholder="XXXXXXXX"
                            value={barcode}
                            onChange={e => setBarcode(e.currentTarget.value)}
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
                        disabled={!isValid(barcode, email, phoneNumber)}
                        loading={loading}
                        onClick={handleSubmit}
                    />
                    <Button text="Відмінити" onClick={handleClose} />
                </div>
            </div>
        </Dialog>
    );
}

const isValid = (barcode: string, email: string, phonenumber: string) => {
    return validateBarcode(barcode) && (validatePhoneNumber(phonenumber) || validateEmail(email));
};
