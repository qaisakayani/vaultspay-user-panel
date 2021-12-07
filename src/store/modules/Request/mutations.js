export default 
{
    setmyRequest(state, payload)
    {
        state.request.myRequest = { ...payload }
    },
    setuserRequest(state,payload)
    {
        state.request.userRequest = { ...payload }
        
    },
    
    
};
