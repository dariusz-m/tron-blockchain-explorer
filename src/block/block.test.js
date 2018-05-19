import React from 'react';
import renderer from 'react-test-renderer';
import nock from 'nock';

import {Block} from "./block.component";
import configureStore from "../state";
import {loadBlock, loadTransactionsByBlock} from "./block.actions";
import initialState from "../state/initialState";
import {DATA_LOADING_STATUS} from "../data-loading-status";
import {TRON_ORGIN} from "../config/tron-api.config";

jest.mock('react-list', () => 'div');


describe('Block tests', () => {
    let store;
    let block = {};
    let transactions = [];

    beforeEach(() => {
        store = configureStore();
        block = {
            number: 11,
            hash: "88dc76d2e76872190edaa55c1d024c321c49b077224c0c5d5dbfd89da165a3a9",
            size: 172,
            timestamp: 1526652720000,
            txTrieRoot: "11111111111111111111111111111111273Yts",
            parentHash: "000000000000000ae49bf11781254f84f20e88ca281dc919a999892cac0e7d98",
            witnessId: 0,
            witnessAddress: "27mAGvEWMHdiEg3xPyQXJZiPko4E7DaNyNW",
            nrOfTrx: 0,
        };

        transactions = [
            {
                hash: "532c288aab0b5a8355e5baaef8c77891b4a9ef1feaf44202ce2ddfff54903930",
                block: 0,
                timestamp: 0,
                transferFromAddress: "7YxAaK71utTpYJ8u4Zna7muWxd1pQwimpGxy8",
                transferToAddress: "27d3byPxZXKQWfXX7sJvemJJuv5M65F3vjS",
                amount: 75000000000000000,
                tokenName: "TRX",
            },
            {
                hash: "5d5bbc7a256058e15887342fba8388cfdbc7d00dbde800e5a29204efe2b15a13",
                block: 0,
                timestamp: 0,
                transferFromAddress: "7YxAaK71utTpYJ8u4Zna7muWxd1pQwimpGxy8",
                transferToAddress: "27WtBq2KoSy5v8VnVZBZHHJcDuWNiSgjbE3",
                amount: 9223372036854776000,
                tokenName: "TRX",
            },
        ];
    });

    it('Renders correctly', () => {
        const actions = {
            loadBlock: jest.fn(),
            loadTransactionsByBlock: jest.fn(),
        };

        const tree = renderer.create(
            <Block
                actions={actions}
                selectedBlock={block}
                transactions={transactions}
                statusOfDataLoading={DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Block has been loaded', (done) => {
        expect.hasAssertions();
        nock(TRON_ORGIN)
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get(`/api/block?sort=-number&limit=1&number=${block.number}`)
            .reply(200, {data: [block]});
        nock(TRON_ORGIN)
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get(`/api/block?sort=-number&limit=1&hash=${block.number}`)
            .reply(200, {data: [block]});
        const expectedState = {
            ...initialState,
            blockSummary: {
                ...initialState.blockSummary,
                statusOfDataLoading: DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED,
                block
            }
        };

        store.dispatch(loadBlock(block.number));

        store.subscribe(() => {
            expect(store.getState()).toEqual(expectedState);
            done();
        });
    });

    it('Transactions for block have been loaded', (done) => {
        expect.hasAssertions();
        nock(TRON_ORGIN)
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get(`/api/transaction?sort=-timestamp&limit=100&start=0&block=${block.number}`)
            .reply(200, {data: [...transactions]});
        const expectedState = {
            ...initialState,
            blockSummary: {
                ...initialState.blockSummary,
                statusOfDataLoading: DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED,
                transactions: [...transactions]
            }
        };

        store.dispatch(loadTransactionsByBlock(block.number));

        store.subscribe(() => {
            expect(store.getState()).toEqual(expectedState);
            done();
        });
    });

});

