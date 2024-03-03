// Define action type constants
export const SET_USER = 'SET_USER';

// Action creator to set user data
export const setUser = (userData) => ({
    type: SET_USER,
    payload: userData,
});
