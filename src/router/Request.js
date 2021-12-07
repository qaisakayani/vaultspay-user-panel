import RequestView from "../views/pages/request/List";
import SendRequest from "../views/pages/request/sendRequest";
import AuthMiddleware from "../middleware/Auth";

export default [
    {
        path: "/request",
        name: "request",
        component: RequestView,
        meta: {
            title: "Request ",
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/send-request",
        name: "send-request",
        component: SendRequest,
        meta: {
            title: "Request send ",
            middleware: [AuthMiddleware],
        },
    },
    
];
