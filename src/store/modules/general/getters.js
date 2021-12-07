export default 
{
    getIsLoading(state)
    {
        return state.isLoading;
    },
    getLastFetch(state)
    {
        return state.lastFetch;
    },
    getAllowedCurrencies(state)
    {
        return state.allowedCurrencies;
    },
    getAllowedPaymentMethods(state)
    {
        return state.allowedPaymentMethods;
    },
    getSelectedCurrencyId(state)
    {
        return state.currencyId;
    },
    getBalanceAndLimits(state)
    {
        return state.balanceAndLimits;
    },
    getCurrencyById: (state) => (currencyId) =>
    {
        for(let index in state.allowedCurrencies)
        {
            if( state.allowedCurrencies[index]?.id == currencyId )
            {
                return state.allowedCurrencies[index];
            }
        }
        return {};
    },
    getPaymentMethodById: (state) => (currencyId) =>
    {
        for(let index in state.allowedPaymentMethods)
        {
            if( state.allowedPaymentMethods[index]?.id == currencyId )
            {
                return state.allowedPaymentMethods[index];
            }
        }
        return {};
    }
};