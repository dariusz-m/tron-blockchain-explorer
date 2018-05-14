import initialState from '../state/initialState';
import {BlockActionTypes} from './block.actions';

export default (state = initialState.selectedBlock, action) => {
    switch (action.type) {
        case BlockActionTypes.BLOCK_HAS_BEEN_LOADED:
            return {...action.block};
        default:
            return state;
    }
};
