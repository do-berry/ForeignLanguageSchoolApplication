export const isLoggedIn = (val) => {
    return {
        type: 'IS_LOGGED_IN',
        payload: val
    };
};