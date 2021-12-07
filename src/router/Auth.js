import verifyEmail from "../views/Auth/Pages/verifyEmail";
import verifyOtp from "../views/Auth/Pages/verifyOtp";
import Login from "../views/Auth/Pages/Login";
import Register from "../views/Auth/Pages/Register";
import Setpasscode from "../views/Auth/Pages/Set_passcode";
import Passcode_login from "../views/Auth/Pages/Passcode_login";
import ResetPassword from "../views/Auth/Pages/ResetPassword";
import ResetPasscode from "../views/Auth/Pages/ResetPasscode";

export default[
    {
        name: 'verifyEmail',
        path: '/verify-email',
        component: verifyEmail,
        meta:{title:'Verify Email',hideNavigation: true}
    },
    {
        name: 'verifyOtp',
        path: '/verify-otp',
        component: verifyOtp,
        meta:{title:'Verify Otp',hideNavigation: true}
    },
    {
        name: 'Login',
        path: '/login',
        component: Login,
        meta:{title:'login',hideNavigation: true,}
    },
    {
        name: 'Register',
        path: '/register',
        component: Register,
        meta:{title:'Register',hideNavigation: true}
    },
    {
        name: 'setpasscode',
        path: '/setpasscode',
        component: Setpasscode,
        meta:{title:'set passcode',hideNavigation: true}
    },
   
    {
        name: 'login_passcode',
        path: '/login_passcode',
        component: Passcode_login,
        meta:{title:'login passcode',hideNavigation: true}
    },
    {
        name: 'ResetPassword',
        path: '/resetpassword',
        component: ResetPassword,
        meta:{title:'Reset Password',hideNavigation: true}
    },
    {
        name: 'ResetPasscode',
        path: '/resetpasscode',
        component: ResetPasscode,
        meta:{title:'Reset Password',hideNavigation: true}
    },
]


