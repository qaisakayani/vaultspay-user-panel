export default 
{
    auth(state)
    {
        return state;
    },
    isAuthenticated(state)
    {
        return state.authenticated;
    },
    shouldFetch(state)
    {
        const lastFetch = state.lastFetch;
        if(!lastFetch)
            return true;
        
        const currentTimestamp = new Date().getTime();
        return (currentTimestamp - lastFetch ) / 1000 > (60 * 1);   // 1 Minute(s) Ago
    }
};