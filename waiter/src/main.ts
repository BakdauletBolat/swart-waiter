import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import {IMaskDirective} from "vue-imask";

const app = createApp(App);


// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('firebase-messaging-sw.js')
//         .then(reg => {
//             console.log(`Service Worker Registration (Scope: ${reg.scope})`);
//         })
//         .catch(error => {
//             const msg = `Service Worker Error (${error})`;
//             console.error(msg);
//         });
// } else {
//     // happens when the app isn't served over HTTPS or if the browser doesn't support service workers
//     console.warn('Service Worker not available');
// }

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
                redirect: to.fullPath,
                ...to.query
            }
        }
    }
})

app.use(router);
app.mount('#app');
