export default 
{
    getWithdrawLIst(state)
    {   
        return state.withdraw.list;
    },
    getDrawWallet(state)
    {   
        console.log(state.withdraw.wallet.data)
        return state.withdraw.wallet;
    },
    getUserWithdrawMethods(state)
    {
        return state.withdraw.UserWithdrawMethods
    },
    getCurrentMethod(state)
    {
        return state.currentMethod
    },
    
};
