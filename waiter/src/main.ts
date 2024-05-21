import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import {IMaskDirective} from "vue-imask";

const app = createApp(App);

//@ts-ignore
app.directive('mask', IMaskDirective);

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

  
router.beforeEach((to, _) => {
    if (to.meta.isLoginRequired && localStorage.getItem('access_token') == undefined) {
        return {
            name: 'login-view',
            query: {
                redirect: to.fullPath
            }
        }
    }
})

app.use(router);
app.mount('#app');
