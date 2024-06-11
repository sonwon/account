const isCellPhoneNumber = (phoneNumber) =>
/^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{4})$/.test(phoneNumber);

const isUndergradeNumber = (undergradeNumber) =>
/^[0-9]{6}$/.test(undergradeNumber);

const isEmailString = (emailString) => {
const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

return re.test(emailString);
};

const isConfirmationString = (confirmationString) =>
/확인했습니다/.test(confirmationString);

export const isEmail = (email) => {
const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

return re.test(email);
};

export const isPassword = (password) => {
const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
return re.test(password);
};

// export type ValidatorType =
// | "cellPhoneNumber"
// | "undergradeNumber"
// | "emailString"
// | "confirmationString";

export const validator = (value, type) => {
switch (type) {
    case "cellPhoneNumber":
        return isCellPhoneNumber(value);
    case "undergradeNumber":
        return isUndergradeNumber(value);
    case "emailString":
        return isEmailString(value);
    case "confirmationString":
        return isConfirmationString(value);
    default:
        return false;
}
};

export const isApplicationQuestion = (question) => {
return "nodes" in question;
};
