import {instance} from "../api";
import {reactive} from "vue";

export interface Product {
    type: string;
    id: number;
    attributes: {
        category_id: number;
        name: {
            kk: string;
            ru: string;
        };
        description: {
            kk: string;
            ru: string;
        };
        images: string[];
        tag: string;
        measurement: string;
        type: string;
        essence: string;
        max: number;
        min: number;
        quantity: number;
        price: number;
        old_price: number;
    };
    included: null;
}

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
    return instance.get<ProductData>('/api/v1/products')
}

export function getCategories() {
    return instance.get<CategoryData>('/api/v1/categories/tree');
}

export interface IProductStore {
    isLoadingProduct: boolean;
    products?: ProductData,
    categories?: CategoryData
}

export const menuStore = reactive<IProductStore>({
    products: undefined,
    categories: undefined,
    isLoadingProduct: false
});




export function loadProducts() {
    menuStore.isLoadingProduct = true;
    getProducts().then((res)=>{
        menuStore.products = res.data;
    }).finally(()=>menuStore.isLoadingProduct = false);
}

export function loadCategories() {
    getCategories().then((res=>{
        menuStore.categories = res.data;
    }));
}