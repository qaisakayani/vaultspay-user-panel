import AuthMiddleware from '../../middleware/Auth';
import notification_list from '../../views/pages/notification/notification_list';
import Home from '../../views/pages/dashboard/index';

export default[

    {
        name: 'home',
        path: '/dashboard',
        component: Home,
        meta:{title:'Dashboad',middleware:[AuthMiddleware]}
    }
    ,
    {
        name: 'notification_list',
        path: '/notification_list',
        component: notification_list,
        meta:{title:'Dashboad',middleware:[AuthMiddleware]}
    }
]