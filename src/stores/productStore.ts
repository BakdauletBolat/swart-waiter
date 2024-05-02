import {Product} from "../api";
import {computed, reactive, ref} from "vue";
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


function  addTo(categories: Category[], toReturn: any[]) {
    categories.forEach(category=>{
        const products = menuStore.products!.data.filter(product=>product.attributes.category_id == category.id);
        if (products.length > 0) {
            toReturn.push({
                category: category,
                products: products
            });
        }

        if (category.children.length > 0) {
            addTo(category.children, toReturn);
        }
    });
}
export const productsGroupedByCategory = computed<{
    category: Category,
    products: Product[]
}[]>(()=>{
    if (menuStore.categories != undefined && menuStore.products != undefined) {
        const toReturn: {
            category: Category,
            products: Product[]
        }[] = []
        addTo(menuStore.categories.data, toReturn);
        return toReturn;
    }
    return [];
});


export const searchText = ref('');

export const searched = computed<{
    category: Category,
    products: Product[]
}[]>(()=>{
    if (searchText.value == '') {
        return productsGroupedByCategory.value;
    }
    const toReturnList: {
        category: Category,
        products: Product[]
    }[] = []

    productsGroupedByCategory.value.forEach(item=>{
        const toReturn: {
            category: Category,
            products: Product[]
        } = {
            products: [],
            category: item.category
        }
        item.products.forEach((product)=>{
            if (product.attributes.name.ru.startsWith(searchText.value)) {
                toReturn.products.push(product)
            }
        })
        if (toReturn.products.length > 0) {
            toReturnList.push(toReturn);
        }

    });
    console.log(searched);
    return toReturnList;
});