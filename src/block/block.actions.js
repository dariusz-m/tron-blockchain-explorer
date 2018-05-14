export const BlockActionTypes = {
    LOAD_BLOCK: "LOAD_BLOCK",
    BLOCK_HAS_BEEN_LOADED: "BLOCK_HAS_BEEN_LOADED",
    BLOCK_HAS_NOT_BEEN_LOADED: "BLOCK_HAS_NOT_BEEN_LOADED",
};

export const loadBlock = () => {
    return {
        type: BlockActionTypes.LOAD_BLOCK
    };
};

export const blockHasBeenLoaded = (block) => {
    return {
        type: BlockActionTypes.BLOCK_HAS_BEEN_LOADED,
        block
    };
};

export const blockHasNotBeenLoaded = () => {
    return {
        type: BlockActionTypes.BLOCK_HAS_NOT_BEEN_LOADED,
    };
};
