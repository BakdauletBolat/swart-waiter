import UI from './index.vue';
import {ref} from "vue";

export const showModal = ref<boolean>(false);

export const showWaiterCall = ref(null)

export const openWaiterCall = () => {
    //@ts-ignore
    showWaiterCall!.value!.open();
}



//@ts-ignore
export const closeWaiterCall = () => {
    //@ts-ignore
    showWaiterCall!.value!.close();
}


export const openModal = () => {
    showModal.value = true;
}

export const closeModal = () => {
    showModal.value = false;
}
export default UI;