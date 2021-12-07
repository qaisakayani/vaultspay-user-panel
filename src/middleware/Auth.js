import store from "../store";
export default (to, from, next) => 
{
    var auth = JSON.parse((sessionStorage.auth && sessionStorage.auth !=''?sessionStorage.auth:'{"authenticated":false}'));
    if( auth.authenticated == true && auth.user.user_type==2)
    // if( auth.authenticated == true)
    {   
        
        next();
    }
    else
    {   store.dispatch("logout", {})
        next({ name: "verifyEmail" });
    }
};
