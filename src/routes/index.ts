import WelcomeView from "../views/WelcomeView.vue";
import UserGuideView from '../views/UserGuideView.vue';
import AccessLocationView from '../views/AccessLocationView.vue';
import MainView from '../views/MainView.vue';
import BasketView from "../views/BasketView.vue";
import FoodDetailView from "../views/FoodDetailView.vue"
import OrderView from "../views/OrderView.vue";
import PaymentView from "../views/PaymentView.vue";
import ReviewView from "../views/ReviewView.vue";
import ReceiptView from "../views/ReceiptView.vue";
export const routes = [

    {
        path: '',
        name:  'welcome-page',
        component: WelcomeView,
    },
    {
        path: '/order',
        name: 'order-view',
        component: OrderView
    },
    {
        path: '/basket',
        name: 'basket-view',
        component: BasketView
    },
    {
        path: '/menu',
        name:  'menu',
        component: MainView,
        meta: {
            isCoordsRequired: true
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