import Transactions from "../views/pages/transactions/Transactions";
import TransactionsDetails from "../views/pages/transactions/TransactionDetail";
import TransactionAttempts from "../views/pages/transactions/TransactionAttempts";
import AuthMiddleware from "../middleware/Auth";

export default [
    {
        path: "/transactions",
        name: "Transaction",
        component: Transactions,
        meta: {
            title: "Transactoion",
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/transaction-details/:uuid",
        name: "TransactionDetails",
        component: TransactionsDetails,
        meta: {
            title: "Transactoion Details",
            middleware: [AuthMiddleware],
        },
    },
    {
        path: "/transaction-attempts/:uuid",
        name: "TransactionAttempts",
        component: TransactionAttempts,
        meta: {
            title: "Transaction Attempts",
            middleware: [AuthMiddleware],
        },
    },
];
