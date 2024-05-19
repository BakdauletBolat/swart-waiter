import {ref} from "vue";

export const activeStatus = ref(0);
export const orderStatusRef = ref(null);
export function openOrderStatus(activeStatusValue: number) {
    activeStatus.value = activeStatusValue;
    //@ts-ignore
    orderStatusRef.value!.open();
}

export function closeOrderStatus() {
    //@ts-ignore
    orderStatusRef.value!.close();
}