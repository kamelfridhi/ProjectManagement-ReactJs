import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
//userSlice.reducer ama khatrha default donc najm nbadl lesm kima nheeb

export const store = configureStore({
    reducer: {user: userReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    }),
})

export default store;
