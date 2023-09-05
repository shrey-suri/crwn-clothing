import {CURRENCY_ACTION_TYPES} from './currency.types';

const INITIAL_STATE = {
    currency: 'USD'
}

export const currencyReducer = (state = INITIAL_STATE, action = {}) => {
    const {type , payload} = action;

    switch(type){
        case CURRENCY_ACTION_TYPES.SET_CURRENCY:
            return {
                ...state,
                currency: payload
            }
        default:
            return state;
    }
}