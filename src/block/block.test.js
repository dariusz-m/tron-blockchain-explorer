import React from 'react';
import renderer from 'react-test-renderer';

import {Block} from "./block.component";
import configureStore from "../state";
import {loadBlock} from "./block.actions";
import initialState from "../state/initialState";
import {waitForAsynchronousActions} from '../tests.support';

jest.mock('../services/tron-api');
import {TronBlockchainClient} from '../services/tron-api';

describe('Block tests', () => {
    let block = {};

    beforeEach(() => {
        block = {
            "number": 145518,
            "witnessId": 0,
            "hash": "831906F5AED9F8C27A02AFC283BE3F5D3977C7F3D3253EB6BE448373C0708382",
            "parentHash": "000000000002386D3AADF9A5E5C34D0DFE007E4D4184788CECDF05DBDBCF1CF2"
        };
    });

    it('Renders correctly', () => {
        const actions = {
            loadBlock: () => {},
        };
        const tree = renderer.create(<Block actions={actions} selectedBlock={block}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Block has been loaded', async () => {
        TronBlockchainClient.getLatestBlock.mockImplementationOnce(async () => await {...block});
        const store = configureStore();
        const expectedState = {...initialState, selectedBlock: {...block}};

        store.dispatch(loadBlock());

        await waitForAsynchronousActions().then(() => expect(store.getState()).toEqual(expectedState));
    });
});

