import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;

            // Save user data to local storage
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;

            // Remove user data from local storage
            localStorage.removeItem('currentUser');
        }
    }
});

export const { signInStart, signInSuccess, signInFailure, signOut } = userSlice.actions;

export default userSlice.reducer;
