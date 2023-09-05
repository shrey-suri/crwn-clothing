import { createSelector } from "reselect";

const selectCurrencyReducer = (state) => state.currency;

const selectCurrency = createSelector(
    [selectCurrencyReducer],
    (currencySlice) => currencySlice.currency
)

export const selectCurrentCurrency = createSelector(
    [selectCurrency],
    (currency) => currency
)