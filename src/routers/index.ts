import WelcomeView from "../views/WelcomeView.vue";
import UserGuideView from '../views/UserGuideView.vue';
import AccessLocationView from '../views/AccessLocationView.vue';
import MainView from '../views/MainView.vue';
export const routes = [

    {
        path: '',
        name:  'welcome-page',
        component: WelcomeView,
    },
    {
        path: '/menu',
        name:  'menu',
        component: MainView,
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