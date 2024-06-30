import LoginView from "../views/LoginView.vue";
import UserGuideView from '../views/UserGuideView.vue';
import AccessLocationView from '../views/AccessLocationView.vue';
import MainView from '../views/MainView.vue';
import BasketView from "../views/BasketView.vue";
import FoodDetailView from "../views/FoodDetailView.vue"
import OrderView from "../views/OrderView.vue";
import PaymentView from "../views/PaymentView.vue";
import ReviewView from "../views/ReviewView.vue";
import ReceiptView from "../views/ReceiptView.vue";
import SearchView from "../views/SearchView.vue";
import MenuView from "../views/MenuView.vue";
import TableView from "../views/TableView.vue";
import ToFillView from "../views/ToFillView.vue";
import NotificationView from "../views/NotificationView.vue";
import ProfileIndexView from '../views/Profile/index.vue';
import CreateOrderView from "../views/CreateOrderView.vue";
import ChangePasswordView from "../views/Profile/ChangePasswordView.vue";
import ProfileInfoView from "../views/Profile/ProfileInfoView.vue";
import OrderPayView from "@/views/OrderPayView.vue";

export const routes = [

    {
        path: '/login',
        name:  'login-view',
        component: LoginView
    },
    {
        path: '/search',
        name: 'search-view',
        component: SearchView
    },
    {
        path: '/order/:id',
        name: 'order-view',
        component: OrderView
    },
    {
        path: '/create-order-view/:tableId',
        name: 'create-order-view',
        component: CreateOrderView
    },
    {
        path: '/order-pay-view/:id',
        name: 'order-pay-view',
        component: OrderPayView
    },
    {
        path: '/basket/:tableId',
        name: 'basket-view',
        component: BasketView
    },
    {
        path: "/profile",
        children: [{
            name: 'profile-view',
            component: ProfileIndexView,
            path: ''
        },{
            name: 'change-password-view',
            component: ChangePasswordView,
            path: 'change-password'
        },{
            name: 'profile-info-view',
            component: ProfileInfoView,
            path: 'info'
        }]
    },
    {
        path: '',
        name:  'main-view',
        component: MainView,
        children: [{
            name: 'menu-view',
            component: MenuView,
            path: ''
        },{
            name: 'table-view',
            component: TableView,
            path: '/tables'
        },{
            name: 'fill-view',
            component: ToFillView,
            path: '/to-fill'
        },{
            name: 'notification-view',
            component: NotificationView,
            path: '/notifications'
        }],
        meta: {
            isLoginRequired: true
        }
    },
    {
        path: '/food/:id',
        name:  'food-detail',
        component: FoodDetailView,
        meta: {
            isCoordsRequired: true
        }
    },
    {
        path: '/user-guide',
        name: 'user-guide',
        component: UserGuideView,
        meta: {
            isCoordsRequired: true
        }
    },
    {
        path: '/access-location',
        name: 'access-location',
        component: AccessLocationView
    },
    {
        path: '/payment/:pay/:orderId',
        name: 'payment-view',
        component: PaymentView
    },
    {
        path: '/review/:orderId',
        name: 'review-view',
        component: ReviewView
    },
    {
        path: '/receipt',
        name: 'receipt-view',
        component: ReceiptView
    }
];