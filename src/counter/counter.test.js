import React from 'react';
import renderer from 'react-test-renderer';
import {Counter} from "./counter";

describe('Counter tests', () => {
    it('renders correctly', () => {
        const actions = {
            increment: () => {},
            decrement: () => {},
        };
        const tree = renderer.create(<Counter actions={actions} counter={1}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

