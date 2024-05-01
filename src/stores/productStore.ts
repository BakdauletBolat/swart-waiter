import {Product} from "../api";
import {reactive} from "vue";
import {GetCasingData} from "../utils/getCasingData.ts";

export interface Category {
    id: number;
    name: string;
    image: string;
    children: Category[];
}

export interface CategoryData {
    data: Category[];
}

export interface ProductData {
    data: Product[];
    meta: {
        include: any[]; // Change this to a specific type if necessary
        custom: any[]; // Change this to a specific type if necessary
    };
}

export function getProducts() {
    return new GetCasingData().getData('/api/v1/products', 'products')
}

export function getCategories() {
    return new GetCasingData().getData('/api/v1/categories/tree', 'categories');
}

export interface IProductStore {
    isLoadingProduct: boolean;
    isLoadingCategory: boolean;
    products?: ProductData,
    categories?: CategoryData
}

export const menuStore = reactive<IProductStore>({
    products: undefined,
    categories: undefined,
    isLoadingCategory: false,
    isLoadingProduct: false
});




export function loadProducts() {
    menuStore.isLoadingProduct = true;
    getProducts().then((res)=>{
        menuStore.products = res;
    }).finally(()=>menuStore.isLoadingProduct = false);
}

export function loadCategories() {
    menuStore.isLoadingCategory = true;
    getCategories().then((res=>{
        menuStore.categories = res;
    })).finally(()=>menuStore.isLoadingCategory = false);
}