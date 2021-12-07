export default 
{
    getWallets(state)
    {
        return state.wallets;
    },
    getCurrentWallet(state)
    {
        return state.currentWallet;
    },
    getCurrentCurrency(state)
    {
        return state.currentCurrency;
    },
    getWalletByCurrencyId: (state) => (currencyId) =>
    {
        for(let index in state.wallets)
        {
            if( state.wallets[index]?.currency_id == currencyId )
            {
                return state.wallets[index];
            }
        }
        return {};
    },
    getDashboardFeatures(state)
    {
        return state.dashboardFeatures;
    },
};