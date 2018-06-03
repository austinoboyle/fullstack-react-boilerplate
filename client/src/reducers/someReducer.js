export const initialState = {
    something: "TEST"
};

export function someReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
