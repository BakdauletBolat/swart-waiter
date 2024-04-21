import {categories, ICategory, IFood} from "./categoriesStore.ts";
import {basket, addOrCreate} from "./basketStore.ts";
import {restorantStore} from "./restorantStore.ts";
import {ref} from "vue";

export {categories,basket,addOrCreate, type ICategory, type IFood, restorantStore};
export const isLoading = ref(false);