const isLoggedInReducer = (state = initialState, action) => {
    if (action.type === 'IS_LOGGED_IN') {
        return {
            ...state,
            payload: !action.payload
        }
    }
};

const initialState = {
    type: 'IS_LOGGED_IN',
    payload: false
}

export default isLoggedInReducer;