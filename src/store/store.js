import { compose, applyMiddleware } from "redux";
//createStore has been deprecated
//Solution 1:
import { legacy_createStore as createStore } from "redux";
//Solution 2:
//import { configureStore } from '@reduxjs/toolkit'

import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

//Redux Persist Methods
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    //Which level you want to start storage
    key: 'root',
    //what type of storage, storage by default is local storage
    storage,
    //Items you dont want to keep in storage, since user is already coming from Off-shore storage (FireBase), we don't want it to clasj
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//Before action hits the reducer, it hits the middleware
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

const composedEnhancer = (
    process.env.NODE_ENV !== 'production' &&
     window && 
     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
     compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

//Reducer , value, enhancers
export const store = createStore(persistedReducer, undefined , composedEnhancers);

export const persistor = persistStore(store);

