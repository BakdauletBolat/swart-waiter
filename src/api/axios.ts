import axios, {InternalAxiosRequestConfig} from 'axios';

export const instance = axios.create({
    baseURL: 'https://5second.kz',
    headers: {
        "content-type": "application/json",
        "accept": "application/json"
    }
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig)=>{
    if (localStorage.getItem('table') != undefined) {
        config.headers['table'] = localStorage.getItem('table')!
    }
    if (localStorage.getItem('multi_tenant_domain_name') != undefined) {
        config.headers['X-Tenant'] = localStorage.getItem('multi_tenant_domain_name');
    }
    return config;
})
