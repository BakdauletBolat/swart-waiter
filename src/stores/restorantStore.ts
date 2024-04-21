import {ref} from "vue";
import {getRestoran, IRestoran} from "../api";


export const restorantStore = ref<IRestoran | null>(null);


export function loadRestaurant() {
    getRestoran().then((res)=>{
        restorantStore.value = res.data;
    }).catch((e)=>console.log(e));
}