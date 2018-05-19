import React from 'react';
import renderer from 'react-test-renderer';

import configureStore from "../state";
import {Search} from "./search.component";
import {search, SearchStatus} from "./search.actions";
import initialState from "../state/initialState";
import {mockSearchRequests} from "./search.epics.test";


describe('Search tests', () => {
    let store;

    beforeEach(() => {
        store = configureStore();
    });

    it('Renders correctly', () => {
        const actions = {
            search: jest.fn(),
        };

        const tree = renderer.create(
            <Search
                actions={actions}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Search engine should not find anything', (done) => {
        expect.hasAssertions();
        const searchTerm = "dummyValue";
        mockSearchRequests({searchTerm: searchTerm});
        const expectedState = {
            ...initialState,
            searchEngine: {
                ...initialState.searchEngine,
                status: SearchStatus.NOTHING_WAS_FOUND
            }
        };

        store.dispatch(search(searchTerm));

        store.subscribe(() => {
            expect(store.getState()).toEqual(expectedState);
            done();
        });
    });
});

