export const SearchActionTypes = {
    SEARCH: "SEARCH",
    NOTHING_FOUND: "NOTHING_FOUND",
    FOUND_SOMETHING: "FOUND_SOMETHING",
};

export const SearchStatus = {
    SEARCH_ENGINE_HAS_NOT_BEEN_USED: "SEARCH_ENGINE_HAS_NOT_BEEN_USED",
    PENDING: "PENDING",
    FOUND_SOMETHING: "FOUND_SOMETHING",
    NOTHING_WAS_FOUND: "NOTHING_WAS_FOUND",
};

export const search = (value) => {
    return {
        type: SearchActionTypes.SEARCH,
        payload: value
    };
};

export const nothingFound = () => {
    return {
        type: SearchActionTypes.NOTHING_FOUND,
    };
};

export const foundSomething = () => {
    return {
        type: SearchActionTypes.FOUND_SOMETHING,
    };
};
