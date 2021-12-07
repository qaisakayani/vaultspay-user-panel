import AuthMiddleware from '../middleware/Auth';
import Deposit from "../views/pages/deposit/Deposit";

export default[
    {
        name: 'deposit',
        path: '/deposit',
        component: Deposit,
        meta:{title:'deposit',middleware:[AuthMiddleware]}
    },
]