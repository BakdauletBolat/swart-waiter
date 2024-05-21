import UI from './index.vue';
import {ref} from "vue";
//@ts-ignore
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import {instance} from "../../api";
import userInformationStore from "../../stores/userStore.ts";


interface IWaiter {
    type: string;
    id: number;
    attributes: {
        logo: string;
        first_name: string;
        last_name: string;
        login: string;
        status: string;
        gender: string;
    };
    included: null;
    meta: {
        include: any[]; // You can replace any with a more specific type if necessary
        custom: any[]; // You can replace any with a more specific type if necessary
    };
}


export const showModal = ref<boolean>(false);

export const waiter = ref<IWaiter | undefined>(undefined);

export function loadWaiter() {
    instance.get("/api/v1/user/table/waiter").then((res)=>{
        waiter.value = res.data;
    });
}

function callWaiter() {
    instance.post('/api/v1/user/notifications/call_waiter', {
        customer_uuid: userInformationStore.store.value?.uuid
    });
}

export const waiterCallBottomSheet = ref<InstanceType<typeof VueBottomSheet>>()

export const openWaiterCall = () => {
    //@ts-ignore
    waiterCallBottomSheet!.value!.open();
    callWaiter();
    loadWaiter();
}





//@ts-ignore
export const closeWaiterCall = () => {
    //@ts-ignore
    waiterCallBottomSheet!.value!.close();
}


export const openModal = () => {
    showModal.value = true;
}

export const closeModal = () => {
    showModal.value = false;
}
export default UI;