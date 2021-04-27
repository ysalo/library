import { useCallback, useContext, useState } from "react";
import { Button, Classes, Dialog, Intent, FormGroup, InputGroup } from "@blueprintjs/core";
import { ReturnDialogContext } from "src/utils/context";
import { useItems } from "src/hooks/useItems";
import { convertFromEpochTime, validateBarcode } from "src/utils/utils";
import { ReturnLoanToaster } from "./Toaster";
import { RETURN_LOAN } from "src/graphql/Mutations";
import { useMutation } from "@apollo/client";
import { GET_ALL_ITEMS, GET_ALL_LOANS } from "src/graphql/Queries";

// this is discouraged by the docs
const toastTimeoutMS = 0;
export default function ReturnDialog() {
    const [open, setOpen] = useContext(ReturnDialogContext);
    const [barcode, setBarcode] = useState("");
    const [items] = useItems();
    const handleClose = useCallback(() => {
        setOpen(false);
        setBarcode("");
    }, [setOpen]);

    const [returnLoan, { error, loading }] = useMutation(RETURN_LOAN);

    const handleSubmit = useCallback(() => {
        const item = items.find(i => i.Barcode === barcode);
        console.log(item);
        if (!item || item.Status) {
            ReturnLoanToaster.show({
                message: `Не вдалося повернути позику! Штрих-код не існує, або книга повернута.`,
                intent: Intent.DANGER,
                timeout: toastTimeoutMS
            });
            return;
        }

        returnLoan({
            variables: {
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
                ReturnLoanToaster.show({
                    message: `Успішно поверна книга. Дата повернення: ${convertFromEpochTime(
                        res.data.returnLoan.Due
                    )}`,
                    intent: Intent.SUCCESS,
                    timeout: toastTimeoutMS
                });
            })
            .catch(err => {
                console.log("error: ", err);
                ReturnLoanToaster.show({
                    message: `Не вдалося повернути! Зв’яжіться з адміністратором.`,
                    intent: Intent.DANGER,
                    timeout: toastTimeoutMS
                });
            });
    }, [barcode, items, returnLoan]);
    return (
        <Dialog isOpen={open} enforceFocus={false} title="Повернути Позику" onClose={handleClose}>
            <div className={Classes.DIALOG_BODY}>
                <div className="form-group">
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
                        text="Повернути"
                        type="submit"
                        intent={Intent.PRIMARY}
                        disabled={!isValid(barcode)}
                        onClick={handleSubmit}
                        loading={loading}
                    />
                    <Button text="Відмінити" onClick={handleClose} />
                </div>
            </div>
        </Dialog>
    );
}

const isValid = (barcode: string) => validateBarcode(barcode);
