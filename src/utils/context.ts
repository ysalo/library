import { createContext } from "react";

export const DarkThemeContext = createContext(true);
export const CheckOutDialogContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => console.warn("CheckOutDialogContext not provided")]);
