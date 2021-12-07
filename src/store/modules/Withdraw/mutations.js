export default 
{
    setAllWithdraw(state, payload)
    {
        state.withdraw.list = { ...payload }
    },
    setDrawWallet(state,payload)
    {
        state.withdraw.wallet={...payload}
    },
    setUserWithdrawMethods(state,payload)
    {
        state.withdraw.UserWithdrawMethods={...payload}
        state.currentMethod=payload?.data[0]?.id
    },
    setUserMethod(state,id)
    {
        state.currentMethod=id
    },
    
};
