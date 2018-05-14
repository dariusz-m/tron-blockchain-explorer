import React from 'react';
import renderer from 'react-test-renderer';

import {Tokens} from "./tokens.component";
import configureStore from "../state";
import {loadTokens} from "./tokens.actions";
import initialState from "../state/initialState";
import {waitForAsynchronousActions} from '../tests.support';

jest.mock('../services/tron-api');
import {TronBlockchainClient} from '../services/tron-api';

describe('Tokens tests', () => {
    let tokens = [];

    beforeEach(() => {
        tokens = [
            {
                name: 'Feefree',
                ownerAddress: '27VvyqLSrvqhRnWSDETwUc9zxF7QWLgKJEG',
                totalSupply: 1000000,
                startTime: 1526242493000,
                endTime: 1534018253000,
                description: 'Free Smartphone with Free monthly plan. Over 90 million qualify!',
                num: 2,
                trxNum: 1000000,
                price: 500000
            },
            {
                name: 'BABA',
                ownerAddress: '27g5kEhMeaSD6vZ4KX5QUCwR6XfYax7xswY',
                totalSupply: 100000,
                startTime: 1526360443000,
                endTime: 1534050043000,
                description: 'Test',
                num: 10,
                trxNum: 1000000,
                price: 100000
            },
        ];
    });

    it('Renders correctly without tokens', () => {
        const actions = {
            loadTokens: () => {},
        };
        const tree = renderer.create(<Tokens actions={actions} tokens={[]}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders correctly with tokens', () => {
        const actions = {
            loadTokens: () => {},
        };
        const tree = renderer.create(<Tokens actions={actions} tokens={tokens}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Tokens have been loaded', async () => {
        TronBlockchainClient.getAssetIssueList.mockImplementationOnce(async () => await [...tokens]);
        const store = configureStore();
        const expectedState = {...initialState, tokens: [...tokens]};

        store.dispatch(loadTokens());

        await waitForAsynchronousActions().then(() => expect(store.getState()).toEqual(expectedState));

    });
});

