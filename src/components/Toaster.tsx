import { Position, Toaster } from "@blueprintjs/core";

export const AddMemberToaster = Toaster.create({
    className: "add-user-toaster",
    position: Position.TOP
});

export const AddLoanToaster = Toaster.create({
    className: "add-loan-toaster",
    position: Position.TOP
});
