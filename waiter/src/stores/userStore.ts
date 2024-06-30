import {reactive} from "vue";
import {instance} from "../api";


interface IUserStore  {
    user?: User;
    isLoading: boolean

}

type LoginData = {
    login: string;
    password: string;
}

interface UserAttributes {
    logo: string;
    first_name: string;
    last_name: string;
    login: string;
    status: string;
    gender: string;
}

interface UserMeta {
    include: any[];
    custom: any[];
}

export interface User {
    type: string;
    id: number;
    attributes: UserAttributes;
    included: any | null;
    meta: UserMeta;
}

const userStore = reactive<IUserStore>({
    user: undefined,
    isLoading: false
});


export function setUser(user: any) {
    userStore.user = user;
}

export async function loginUser(data: LoginData) {
    return (await instance.post('/api/v1/login', data)).data;
}

export async function getProfile() {
    return (await instance.get('/api/v1/user/profile')).data
}

export async function loadProfile(router: any) {
    if (localStorage.getItem('access_token') == undefined) {
        return;
    }
    userStore.isLoading = true;
    getProfile().then((data)=>{
        userStore.user = data;
    }).finally(()=>{
        userStore.isLoading=false
    }).catch((_: any)=>{
        router!.push({
            name: 'login-view'
        })
    })
}

export default userStore;