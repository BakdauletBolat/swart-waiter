import {ref} from "vue";
import {IRestoran} from "../api";

export const restorantStore = ref<IRestoran | null>(null);