export const CounterActionType = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT'
};

export const increment = () => {
    return {
        type: CounterActionType.INCREMENT
    };
};

export const decrement = () => {
    return {
        type: CounterActionType.DECREMENT
    };
};
