export default 
{
    setDepositDetails(state, payload)
    {
        state.details = { ...state.details, ...payload }
    },
    
    setDepositTransaction(state, payload)
    {
        return state.depositTransaction = payload;
    }
};

