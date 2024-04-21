import {reactive} from "vue";
import {instance, Product} from "../api";
interface IOrder {
    type: string;
    id: number;
    attributes: {
        number: string;
        created_at: string;
        computation: {
            summa: number;
            prepayment: number;
            service: number;
            discount: number;
            total: number;
        };
    };
    included: any[] | null;
    meta: {
        include: any[];
        custom: any[];
    };
}


interface Status {
    value: number;
    label: string;
    name: string;
}

interface IOrderProductAttributes {
    order_id: number;
    product_id: number;
    price: number;
    quantity: number;
    comment: string | null;
    status: Status;
}

interface IOrderProduct {
    type: string;
    id: number;
    attributes: IOrderProductAttributes;
    included: {
        product: Product;
    };
}

export interface IOrderStore {
    isLoadingOrderProducts: boolean;
    products: IOrderProduct[],
    order?: IOrder
}

export const orderStore = reactive<IOrderStore>({
    isLoadingOrderProducts: false,
    products: [],
    order: undefined
});



// export const customerBasket = computed<ICardItem[] | undefined>(()=>{
//     if (basket.value.data == undefined || basket.value.data!.length <= 0) {
//         return undefined;
//     }
//     else {
//         let customersCart: ICardItem[] = [];
//         basket.value.data.forEach((item) => {
//             if (item.included.customer?.attributes.uuid == userInformationStore.store.value?.uuid) {
//                 customersCart.push(item);
//             }
//         });
//         return customersCart;
//     }
// });



export function loadOrderProducts() {
    orderStore.isLoadingOrderProducts = true;
    instance.get('/api/v1/order/products/customer?include=product')
        .then(res=>orderStore.products=res.data.data)
        .finally(()=>orderStore.isLoadingOrderProducts=false);
}

export function loadOrder() {
    instance.get('/api/v1/order/customer')
        .then(res=>orderStore.order=res.data)
}