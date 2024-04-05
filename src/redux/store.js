import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

//userSlice.reducer ama khatrha default donc najm nbadl lesm kima nheeb

const rootReducer = combineReducers({user:userReducer});

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
/*
const persistedUser = localStorage.getItem('user');
const initialState = {
    user: persistedUser ? JSON.parse(persistedUser) : null,
};

 */


export const store = configureStore({
    //reducer: { user: userReducer },
    //preloadedState: initialState,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    })//.concat(socketMiddleware) // Include WebSocket middleware
})

export const persistor = persistStore(store); //tpersisiti store fl localstorage
