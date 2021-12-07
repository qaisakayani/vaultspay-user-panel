export default 
{
    setTransactions(state, payload)
    {
        state.transactions.data = payload.data;
        state.transactions.pagination = payload.paginationData;
        
        state.transaction = payload.data[0] ?? null;
    },
};
