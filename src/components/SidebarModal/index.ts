import UI from './index.vue';
import {ref} from "vue";

export const showModal = ref<boolean>(false);

export const showWaiterCall = ref(null)

export const openWaiterCall = () => {
    showWaiterCall!.value!.open();
}

export const closeWaiterCall = () => {
    showWaiterCall!.value!.close();
}


export const openModal = () => {
    showModal.value = true;
}

export const closeModal = () => {
    showModal.value = false;
}
export default UI;