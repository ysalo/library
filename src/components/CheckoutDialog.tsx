import { useContext } from "react";
import { Button, Classes, Dialog, Intent, FormGroup, InputGroup } from "@blueprintjs/core";
import { CheckOutDialogContext } from "src/utils/context";
import { useQuery } from "@apollo/client";
import { GET_ALL_LOANS } from "../graphql/Queries";

export default function CheckOutDialog() {
    const [open, setOpen] = useContext(CheckOutDialogContext);
    const { data } = useQuery(GET_ALL_LOANS);
    console.log("books: ", data);
    return (
        <Dialog isOpen={open} enforceFocus={false} title="Позика Книги" onClose={() => setOpen(false)}>
            <div className={Classes.DIALOG_BODY}>
                <div className="form-group">
                    <FormGroup label="Номер Телефону" labelFor="text-input">
                        <InputGroup id="text-input" placeholder="(XXX)-XXX-XXXX" />
                    </FormGroup>
                    <FormGroup label="Штрих-код" labelFor="text-input">
                        <InputGroup id="text-input" placeholder="XXXXXXXX" />
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
