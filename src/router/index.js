import { createWebHistory, createRouter } from "vue-router";
// Auth middleware
import AuthMiddleware from "../middleware/Auth";
// routes 
import Auth from "./Auth.js";

import VueRouteMiddleware from "vue-route-middleware";
import dashboard from "./Notification/notification-route";
// views
import Home from "../views/pages/dashboard/index";
import Transactions from "./Transactions";
import SendMoney from "./SendMoney";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import CurrencyExchange from "./CurrencyExchange";
import RequestRoute from "./Request";

let routes = [
  {
    name: "home",
    path: "/",
    component: Home,
    meta: { title: "Home", middleware: [AuthMiddleware] },
  },
  {
    name: "/",
    path: "/",
    component: Home,
    meta: { title: "Home", middleware: [AuthMiddleware] },
  },
  ...Auth,
  ...dashboard,
  ...Transactions,
  ...SendMoney,
  ...Deposit,
  ...Withdraw,
  ...CurrencyExchange,
  ...RequestRoute
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes: routes,
});
// dynamic title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
router.beforeEach(VueRouteMiddleware({ AuthMiddleware }));
export default router;
