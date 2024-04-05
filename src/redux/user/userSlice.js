import { createSlice } from '@reduxjs/toolkit';
import {toast} from "react-toastify";

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
            console.log("action : "+state.currentUser);
            state.loading = false;
            state.error = false;

            // Save user data to local storage
            //localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        updateUser: (state, action) => {
            // Merge the updated fields with the existing user data
            state.currentUser = { ...state.currentUser, ...action.payload };

            // Save updated user data to local storage
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Authentication failed'; // Provide a default error message
            //toast.error(state.error); // Display error message to the user
        },
        signOut: (state) => {
            state.currentUser = null;

            // Remove user data from local storage
            localStorage.removeItem('currentUser');
        }
    }
});

export const { signInStart, signInSuccess,updateUser, signInFailure, signOut } = userSlice.actions;

export default userSlice.reducer;
