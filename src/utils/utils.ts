import { compareAsc } from "date-fns";

export const validatePhoneNumber = (phoneNumber: string) => {
    const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
    return re.test(phoneNumber);
};

export const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const validateBarcode = (barcode: string) => {
    const re = /^[0-9]+$/;
    return re.test(barcode) && barcode.length === 8;
};

export const convertFromEpochTime = (epoch: string | null): string => {
    if (!epoch) {
        return "";
    }
    return new Date(+epoch).toLocaleDateString();
};

export const isPastDue = (due: string, returned: string | null) =>
    new Date() > new Date(+due) && !returned;


export const dateComparator = (d1: string | null, d2: string | null) => {

    if(d1 === null && d2 === null) {
        return 0;
    } 
    if(d1 === null) {
        return -1;
    }
    if(d2 === null) {
        return 1;
    }
    const p1 = d1.split("/");
    const p2 = d2.split("/");
    return compareAsc(new Date(+p1[2], +p1[0], +p1[1]),new Date(+p2[2], +p2[0], +p2[1]) );
    
}