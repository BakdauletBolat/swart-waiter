import axios, {InternalAxiosRequestConfig} from 'axios';

export const instance = axios.create({
    baseURL: 'https://smartwaiter-backend.kz',
    headers: {
        "content-type": "application/json"
    }
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig)=>{
    if (localStorage.getItem('multi_tenant_domain_name') != undefined) {
        const index = config.baseURL!.indexOf("smartwaiter-backend.kz");
        config.baseURL = config.baseURL!.slice(0, index) + localStorage.getItem('multi_tenant_domain_name') + "." + config.baseURL!.slice(index);
    }
    if (localStorage.getItem('table') != undefined) {
        config.headers['Table'] = localStorage.getItem('table')!
    }
    return config;
})