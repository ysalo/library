import { createContext } from "react";

export const DarkThemeContext = createContext(true);
export const CheckOutDialogContext = createContext<
    [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => console.warn("CheckOutDialogContext not provided")]);
export const AddUserDialogContext = createContext<
    [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => console.warn("AddUserDialogContext not provided")]);
export const ReturnDialogContext = createContext<
    [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => console.warn("ReturnDialogContext not provided")]);
export const SearchContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([
    "",
    () => console.warn("SearchContext not provided")
]);
