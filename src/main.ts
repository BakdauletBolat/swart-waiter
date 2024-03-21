import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routers';



const app = createApp(App);



const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

  
router.beforeEach((to, from) => {

    if (to.meta.isCoordsRequired && localStorage.getItem('accessLocation') == null) {
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
