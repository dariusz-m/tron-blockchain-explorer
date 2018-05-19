export const AccountSummaryActionTypes = {
    ACCOUNT_DETAILS_HAVE_BEEN_LOADED: "ACCOUNT_DETAILS_HAVE_BEEN_LOADED",
    ACCOUNT_DETAILS_HAVE_NOT_BEEN_LOADED: "ACCOUNT_DETAILS_HAVE_NOT_BEEN_LOADED",
    LOAD_ACCOUNT_DETAILS: "LOAD_ACCOUNT_DETAILS",
    LOAD_TRANSACTIONS_BY_ACCOUNT: "LOAD_TRANSACTIONS_BY_ACCOUNT",
    TRANSACTION_BY_ACCOUNT_HAVE_BEEN_LOADED: "TRANSACTION_BY_ACCOUNT_HAVE_BEEN_LOADED",
    TRANSACTION_BY_ACCOUNT_HAVE_NOT_BEEN_LOADED: "TRANSACTION_BY_ACCOUNT_HAVE_NOT_BEEN_LOADED",
};


export const loadAccountDetails = (address) => {
    return {
        type: AccountSummaryActionTypes.LOAD_ACCOUNT_DETAILS,
        payload: address
    };
};

export const accountDetailsHaveBeenLoaded = (accountDetails) => {
    return {
        type: AccountSummaryActionTypes.ACCOUNT_DETAILS_HAVE_BEEN_LOADED,
        payload: accountDetails
    };
};

export const accountDetailsHaveNotBeenLoaded = () => {
    return {
        type: AccountSummaryActionTypes.ACCOUNT_DETAILS_HAVE_NOT_BEEN_LOADED,
    };
};

export const loadTransactionsByAccount = (address) => {
    return {
        type: AccountSummaryActionTypes.LOAD_TRANSACTIONS_BY_ACCOUNT,
        payload: address
    };
};

export const transactionsByAccountHaveBeenLoaded = (transactions) => {
    return {
        type: AccountSummaryActionTypes.TRANSACTION_BY_ACCOUNT_HAVE_BEEN_LOADED,
        payload: transactions
    };
};

export const transactionsByAccountHaveNotBeenLoaded = () => {
    return {
        type: AccountSummaryActionTypes.TRANSACTION_BY_ACCOUNT_HAVE_NOT_BEEN_LOADED,
    };
};
