import {reactive} from "vue";
import {instance} from "../api";


interface IUserStore  {
    user?: undefined;
    isLoading: boolean

}

type LoginData = {
    login: string;
    password: string;
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

export async function loadProfile() {
    userStore.isLoading = true;
    getProfile().then((data)=>{
        userStore.user = data;
    }).finally(()=>{
        userStore.isLoading=false
    });
}

export default userStore;