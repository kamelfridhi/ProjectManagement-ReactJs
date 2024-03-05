import {createSlice} from '@reduxjs/toolkit'

const initialState={
    currentUser:null,
    loading:false,
    error:false
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state) => {
            state.loading=true;
        },
        signInSuccess: (state,action) => {
            state.currentUser=action.payload;
            state.loading = false;
            state.error = false;
            // Save user data to local storage
            //localStorage.setItem('user', JSON.stringify(action.payload));
        },
        signInFailure: (state,action) => {
            state.loading=false;
            state.error=action.payload;
        }
    }
});

export const {signInStart,signInSuccess,signInFailure} = userSlice.actions;

export default userSlice.reducer;