import {createAction} from '../../utils/reducer/reducer.utils';
import {CURRENCY_ACTION_TYPES} from './currency.types';

export const setCurrency = (currency) => createAction(CURRENCY_ACTION_TYPES.SET_CURRENCY, currency);