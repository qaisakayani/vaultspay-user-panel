export default 
{
    setNotifications(state, payload)
    {
        state.notifications = payload;
        state.totalNotifications = payload.data.length;
    },
    setToast(state, payload)
    {
        state.toasts.push(payload);
    },
    removeToast(state, id)
    {
        state.toasts = state.toasts.filter( (toast) => {
            if(toast.id != id)
                return toast;
        });
    }
};