
// Define initial state
const initialState = {
    user: null,
};

// Define reducer function
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'CLEAR_USER':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export default userReducer;
