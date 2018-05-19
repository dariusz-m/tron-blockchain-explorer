import nock from 'nock';
import { ActionsObservable } from 'redux-observable';
import {push} from "react-router-redux";
import {toArray} from 'rxjs/operators';

import {search as searchEpic} from "./search.epics";
import {foundSomething, search} from "./search.actions";
import {blockHasBeenLoaded} from "../block/block.actions";
import {TRON_ORGIN} from "../config/tron-api.config";
import {accountDetailsHaveBeenLoaded} from "../account-summary/account-summary.actions";


describe('Test search engine epic', () => {
    let block;
    let accountDetails;

    beforeEach(() => {
        accountDetails = {
            address: "27d3byPxZXKQWfXX7sJvemJJuv5M65F3vjS",
            balance: 41935732000000000,
            name: "Devaccount",
            tokenBalances: {Evan: 88999}
        };
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
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('Block by number has been found', (done) => {
        expect.hasAssertions();
        mockSearchRequests({blockByNumber: [block], searchTerm: block.number});
        const expectedOutputActions = [
            blockHasBeenLoaded(block),
            foundSomething(),
            push(`/block/${block.number}`),
        ];
        const action$ = ActionsObservable.of(
            search(block.number)
        );

        searchEpic(action$).pipe(
            toArray()
        ).subscribe(actualOutputActions => {
            expect(actualOutputActions).toEqual(expectedOutputActions);
            done();
        });
    });

    it('Block by hash has been found', (done) => {
        expect.hasAssertions();
        mockSearchRequests({blockByHash: [block], searchTerm: block.hash});
        const expectedOutputActions = [
            blockHasBeenLoaded(block),
            foundSomething(),
            push(`/block/${block.hash}`),
        ];
        const action$ = ActionsObservable.of(
            search(block.hash)
        );

        searchEpic(action$).pipe(
            toArray()
        ).subscribe(actualOutputActions => {
            expect(actualOutputActions).toEqual(expectedOutputActions);
            done();
        });
    });

    it('Account has been found', (done) => {
        expect.hasAssertions();
        mockSearchRequests({account: [accountDetails], searchTerm: accountDetails.address});
        const expectedOutputActions = [
            accountDetailsHaveBeenLoaded(accountDetails),
            foundSomething(),
            push(`/account/${accountDetails.address}`),
        ];
        const action$ = ActionsObservable.of(
            search(accountDetails.address)
        );

        searchEpic(action$).pipe(
            toArray()
        ).subscribe(actualOutputActions => {
            expect(actualOutputActions).toEqual(expectedOutputActions);
            done();
        });
    });
});


export const mockSearchRequests = ({searchTerm, blockByNumber=[], blockByHash=[], account=[], transactions=[]}) => {
    nock(TRON_ORGIN)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/api/block?sort=-number&limit=1&number=${searchTerm}`)
        .reply(200, {data: blockByNumber});
    nock(TRON_ORGIN)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/api/block?sort=-number&limit=1&hash=${searchTerm}`)
        .reply(200, {data: blockByHash});
    nock(TRON_ORGIN)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/api/transaction?sort=-timestamp&limit=1&hash=${searchTerm}`)
        .reply(200, {data: transactions});
    nock(TRON_ORGIN)
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(`/api/account?sort=-balance&limit=1&address=${searchTerm}`)
        .reply(200, {data: account});
};
