export default 
{
    setAllowedCurrencies(state, payload) 
    {
        state.allowedCurrencies = payload;
    },
    setAllowedPaymentMethods(state, payload) 
    {
        state.allowedPaymentMethods = payload;
    },
    setActiveCurrencyId(state, payload) 
    {
        state.currencyId = payload;
    },
    setBalanceAndLimits(state, payload)
    {
        state.balanceAndLimits = payload;
    },
    setIsLoading(state, value) 
    {
        state.isLoading = value;
    },
    setLastFetch(state, value) 
    {
        state.lastFetch = value;
    },


};