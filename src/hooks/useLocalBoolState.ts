import { Dispatch, SetStateAction, useCallback, useState } from "react";

export function useLocalBoolState(key: string, initialState: boolean): [boolean, Dispatch<SetStateAction<boolean>>] {
    const [value, setValueInternal] = useState<boolean>(() => {
        const localValue = localStorage.getItem(key);
        if (typeof localValue === "string") {
            return localValue === "true";
        } else {
            return initialState;
        }
    });

    const setValue: Dispatch<SetStateAction<boolean>> = useCallback(
        ssa => {
            if (typeof ssa === "function") {
                setValueInternal(cv => {
                    const nv = ssa(cv);
                    localStorage.setItem(key, JSON.stringify(nv));
                    return nv;
                });
            } else {
                localStorage.setItem(key, JSON.stringify(ssa));
                setValueInternal(ssa);
            }
        },
        [key]
    );

    return [value, setValue];
}
