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

export const convertFromEpochTime = (epoch: string | null) => {
    if (!epoch) {
        return null;
    }
    return new Date(+epoch).toLocaleDateString();
};

export const isPastDue = (due: string, returned: string | null) =>
    new Date() > new Date(+due) && !returned;
