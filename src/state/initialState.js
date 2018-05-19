import {DATA_LOADING_STATUS} from '../data-loading-status';
import {SearchStatus} from "../search/search.actions";

const initialState = {
    router: {"location": null},
    searchEngine: {
        status: SearchStatus.SEARCH_ENGINE_HAS_NOT_BEEN_USED,
    },
    blockSummary: {
        block: {
            hash: "",
            nrOfTrx: 0,
            number: 0,
            parentHash: "",
            size: 0,
            timestamp: 1,
            txTrieRoot: "",
            witnessAddress: "",
            witnessId: 0
        },
        transactions: [],
        statusOfDataLoading: DATA_LOADING_STATUS.DATA_HAVE_NOT_BEEN_LOADED,
    },
    accountSummary: {
        account: {
            address: "",
            balance: 0,
            name: "",
            tokenBalances: {}
        },
        transactions: [],
        statusOfDataLoading: DATA_LOADING_STATUS.DATA_HAVE_NOT_BEEN_LOADED,
    }
};

export default initialState;
