import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import userInformationStore from "./stores/userInformationStore.ts";
import {start} from './api/pusher.ts';

if (localStorage.getItem('multi_tenant_domain_name') != undefined) {
    start();
}
const app = createApp(App);



const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

  
router.beforeEach((to, _) => {
    if (to.meta.isCoordsRequired && userInformationStore.store.value?.location == undefined) {
        return {
            name: 'access-location',
            query: {
                redirect: to.fullPath
            }
        }
    }
})

app.use(router);
app.mount('#app');
