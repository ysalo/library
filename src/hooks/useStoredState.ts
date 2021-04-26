import { useState } from "react";

export function useStoredState<T = string>(
    key: string,
    fallbackValue: T
): [T, (v: React.SetStateAction<T>, skipLocal?: boolean) => void] {
    const [localValue, setLocalValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key) || "";
            return JSON.parse(item) || fallbackValue;
        } catch (error) {
            return fallbackValue;
        }
    });

    function setAllValues(action: React.SetStateAction<T>, skipLocal?: boolean): void {
        setLocalValue(prevValue => {
            const newValue =
                typeof action === "function" ? (action as (prevState: T) => T)(prevValue) : action;

            try {
                window.localStorage.setItem(key, JSON.stringify(newValue));
            } catch (error) {
                console.log("error storing value", error);
            }

            return !skipLocal ? newValue : prevValue;
        });
    }

    return [localValue, setAllValues];
}
