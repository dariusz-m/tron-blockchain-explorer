export const BlockActionTypes = {
    LOAD_BLOCK: "LOAD_BLOCK",
    BLOCK_HAS_BEEN_LOADED: "BLOCK_HAS_BEEN_LOADED",
    BLOCK_HAS_NOT_BEEN_LOADED: "BLOCK_HAS_NOT_BEEN_LOADED",
    LOAD_TRANSACTIONS_BY_BLOCK: "LOAD_TRANSACTIONS_BY_BLOCK",
    TRANSACTIONS_BY_BLOCK_HAVE_BEEN_LOADED: "TRANSACTIONS_BY_BLOCK_HAVE_BEEN_LOADED",
    TRANSACTIONS_BY_BLOCK_HAVE_NOT_BEEN_LOADED: "TRANSACTIONS_BY_BLOCK_HAVE_NOT_BEEN_LOADED",
};

export const loadBlock = (searchTerm) => {
    return {
        type: BlockActionTypes.LOAD_BLOCK,
        payload: searchTerm
    };
};

export const blockHasBeenLoaded = (block) => {
    return {
        type: BlockActionTypes.BLOCK_HAS_BEEN_LOADED,
        payload: block
    };
};

export const blockHasNotBeenLoaded = () => {
    return {
        type: BlockActionTypes.BLOCK_HAS_NOT_BEEN_LOADED,
    };
};

export const loadTransactionsByBlock = (searchTerm) => {
    return {
        type: BlockActionTypes.LOAD_TRANSACTIONS_BY_BLOCK,
        payload: searchTerm
    };
};

export const transactionsByBlockHaveBeenLoaded = (transactions) => {
    return {
        type: BlockActionTypes.TRANSACTIONS_BY_BLOCK_HAVE_BEEN_LOADED,
        payload: transactions
    };
};

export const transactionsByBlockHaveNotBeenLoaded = () => {
    return {
        type: BlockActionTypes.TRANSACTIONS_BY_BLOCK_HAVE_NOT_BEEN_LOADED,
    };
};
