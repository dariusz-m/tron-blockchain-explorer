export const TokensActionTypes = {
    LOAD_TOKENS: "LOAD_TOKENS",
    TOKENS_HAVE_BEEN_LOADED: "TOKENS_HAVE_BEEN_LOADED",
    TOKENS_HAVE_NOT_BEEN_LOADED: "TOKENS_HAVE_NOT_BEEN_LOADED",
};

export const loadTokens = () => {
    return {
        type: TokensActionTypes.LOAD_TOKENS
    };
};

export const tokensHaveBeenLoaded = (tokens) => {
    return {
        type: TokensActionTypes.TOKENS_HAVE_BEEN_LOADED,
        tokens
    };
};

export const tokensHaveNotBeenLoaded = () => {
    return {
        type: TokensActionTypes.TOKENS_HAVE_NOT_BEEN_LOADED,
    };
};
