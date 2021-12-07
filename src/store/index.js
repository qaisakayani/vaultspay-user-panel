import { createStore } from "vuex";
import { globalHelpers } from "@/mixins/globalHelpers";
import authModule from "./modules/auth/index.js";
import dashboard from "./modules/dashboard/index.js";
import notification from "./modules/notification/index.js";
import generalModule from "./modules/general/index";
import Transactionmodule from "./modules/transactions/index";
import Wallets from "./modules/Bootstrap/index";
import Filters from "./modules/Filters";
import SendMoney from "./modules/SendMoney/index";
import Deposit from "./modules/Deposit/index";
import WithDraw from "./modules/Withdraw/index";
import CurrencyExchange from "./modules/CurrencyExchange/index.js";
import RequestStore from "./modules/Request/index";


const store = createStore({
  modules: {
    auth: authModule,
    Dashboard: dashboard,
    notification: notification,
    general: generalModule,
    Transactionmodule,
    Wallets,
    Filters,
    SendMoney,
    Deposit,
    WithDraw,
    CurrencyExchange,
    RequestStore,
  },
  mixins: {
    globalHelpers,
  },
});

export default store;
