import { compose, applyMiddleware } from "redux";
//createStore has been deprecated
//Solution 1:
import { legacy_createStore as createStore } from "redux";
//Solution 2:
//import { configureStore } from '@reduxjs/toolkit'

import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

//Before action hits the reducer, it hits the middleware
const middleWares = [logger];


const composedEnhancers = compose(applyMiddleware(...middleWares));

//Reducer , value, enhancers
export const store = createStore(rootReducer, undefined , composedEnhancers);

