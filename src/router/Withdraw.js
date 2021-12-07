import withdraw from "../views/pages/withdraw/list";
import withdraw_request from "../views/pages/withdraw/WithdrawRequest";
import AuthMiddleware from "../middleware/Auth";

export default [
    {
        path: "/withdraw",
        name: "withdraw",
        component: withdraw,
        meta: {
            title: "withdraw List",
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/withdraw-request",
        name: "withdraw-request",
        component: withdraw_request,
        meta: {
            title: "withdraw Request",
            middleware: [AuthMiddleware],
        },
    },
];
