import AuthMiddleware from "../middleware/Auth";
import SendMoney from "../views/pages/SendMoney/SendMoney";

export default [
  {
    name: "send_money",
    path: "/send-money",
    component: SendMoney,
    meta: { title: "Send Money", middleware: [AuthMiddleware] },
  },
];
