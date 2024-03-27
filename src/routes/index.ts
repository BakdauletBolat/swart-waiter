import WelcomeView from "../views/WelcomeView.vue";
import UserGuideView from '../views/UserGuideView.vue';
import AccessLocationView from '../views/AccessLocationView.vue';
import MainView from '../views/MainView.vue';
import BasketView from "../views/BasketView.vue";
import FoodDetailView from "../views/FoodDetailView.vue"
export const routes = [

    {
        path: '',
        name:  'welcome-page',
        component: WelcomeView,
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
    }
];