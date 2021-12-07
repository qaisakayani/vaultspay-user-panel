import AuthMiddleware from "../middleware/Auth";
import CurrencyExchange from "../views/pages/CurrencyExchange/CurrencyExchange";

export default [
  {
    name: "currency-exchange",
    path: "/currency-exchange",
    component: CurrencyExchange,
    meta: { title: "Currency Exchange", middleware: [AuthMiddleware] },
  },
];
