import React from 'react';
import renderer from 'react-test-renderer';
import nock from 'nock';

import configureStore from "../state";
import initialState from "../state/initialState";
import {DATA_LOADING_STATUS} from "../data-loading-status";
import {AccountSummary} from "./account-summary.component";
import {loadAccountDetails, loadTransactionsByAccount} from "./account-summary.actions";
import {TRON_ORGIN} from "../config/tron-api.config";

jest.mock('react-list', () => 'div');


describe('Account summary tests', () => {
    let store;
    let accountDetails = {};
    let transactions = [];

    beforeEach(() => {
        store = configureStore();
        accountDetails = {
            address: "27d3byPxZXKQWfXX7sJvemJJuv5M65F3vjS",
            balance: 41935732000000000,
            name: "Devaccount",
            tokenBalances: {Evan: 88999}
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
            loadTransactions: jest.fn(),
            loadAccountDetails: jest.fn(),
        };
        const match = {params: {address: 1}};

        const tree = renderer.create(
            <AccountSummary
                actions={actions}
                transactions={transactions}
                account={accountDetails}
                statusOfDataLoading={DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED}
                match={match}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Account details has been loaded', (done) => {
        expect.hasAssertions();
        nock(TRON_ORGIN)
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get(`/api/account?sort=-balance&limit=1&address=${accountDetails.address}`)
            .reply(200, {data: [accountDetails]});
        const expectedState = {
            ...initialState,
            accountSummary: {
                ...initialState.accountSummary,
                statusOfDataLoading: DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED,
                account: accountDetails
            }
        };

        store.dispatch(loadAccountDetails(accountDetails.address));

        store.subscribe(() => {
            expect(store.getState()).toEqual(expectedState);
            done();
        });
    });

    it('Transactions for account have been loaded', (done) => {
        expect.hasAssertions();
        nock(TRON_ORGIN)
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get(`/api/transaction?sort=-timestamp&address=${accountDetails.address}`)
            .reply(200, {data: [...transactions]});
        const expectedState = {
            ...initialState,
            accountSummary: {
                ...initialState.accountSummary,
                transactions: [...transactions]
            }
        };

        store.dispatch(loadTransactionsByAccount(accountDetails.address));

        store.subscribe(() => {
            expect(store.getState()).toEqual(expectedState);
            done();
        });
    });

});

