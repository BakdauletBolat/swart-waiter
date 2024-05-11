import {computed, reactive} from "vue";
import {instance} from "../api";
import {Product} from "../api";
import userInformationStore from "./userInformationStore.ts";

interface IComment {
    attributes: {
        customer_id: number;
        waiter_id: number;
        comment: number;
    }
}
interface IOrder {
    type: string;
    id: number;
    attributes: {
        table_id: number;
        number: string;
        created_at: string;
        status: {
          value: number;
          label: string;
          name: string
        },
        computation: {
            summa: number;
            prepayment: number;
            service: number;
            discount: number;
            total: number;
        };
    };
    included: {
        customer: any;
        comments: {
            data: IComment[]
        }
    };
    meta: {
        include: any[];
        custom: any[];
    };
}

interface Customer {
    type: string;
    id: number;
    attributes: {
        full_name: string;
        phone: string | null;
        uuid: string;
        data: {
            ip: string;
            device: string;
            browser: string;
        };
    };
    included: any[] | null;
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
    table_id: number;
    quantity: number;
    waiter_id: number;
    customer_id: number;
    comment: string | null;
    status: Status;
}

export interface IOrderProduct {
    type: string;
    id: number;
    attributes: IOrderProductAttributes;
    included: {
        product: Product;
        customer: Customer;
        statuses: {
            data: any[]
        }
    };
}

export interface IOrderStore {
    isLoadingOrderProducts: boolean;
    products: IOrderProduct[],
    order?: IOrder,
    isLoadingOrder: boolean;
}

export const orderStore = reactive<IOrderStore>({
    isLoadingOrderProducts: false,
    products: [],
    isLoadingOrder: false,
    order: undefined
});



export const customerProducts = computed<IOrderProduct[]>(()=>{
    if (orderStore.products == undefined || orderStore.products!.length <= 0) {
        return [];
    }
    else {
        let customersCart: IOrderProduct[] = [];
        orderStore.products.forEach((item) => {
            if (item.included.customer?.attributes.uuid == userInformationStore.store.value?.uuid) {
                customersCart.push(item);
            }
        });
        return customersCart;
    }
});




export const otherProducts = computed<any | undefined>(()=>{
    if (orderStore.products == undefined || orderStore.products!.length <= 0) {
        return [];
    }
    else {
        const waiterProducts = orderStore.products.filter((item)=>item.attributes.waiter_id != null);
        const customerProducts = orderStore.products.filter((item)=>item.attributes.customer_id != null);
        const cP = customerProducts.reduce((groups, item) => ({
            ...groups,
            //@ts-ignore
            [item.included.customer.attributes.uuid]: [...(groups[item.included.customer.attributes.uuid!] || []), item]
        }), {});
        const wP = waiterProducts.reduce((groups, item) => ({
            ...groups,
            //@ts-ignore
            [item.included.waiter.id]: [...(groups[item.included.waiter.id] || []), item]
        }), {});
        return {...cP, ...wP};
    }
});





export function loadOrderProducts() {
    orderStore.isLoadingOrderProducts = true;
    instance.get('/api/v1/order/products/customer?include=product,customer,waiter,statuses')
        .then(res=>orderStore.products=res.data.data)
        .finally(()=>orderStore.isLoadingOrderProducts=false);
}

export function loadOrder() {
    orderStore.isLoadingOrder = true;
    instance.get('/api/v1/order/customer?include=status,customer,comments')
        .then(res=>orderStore.order=res.data)
        .finally(()=>orderStore.isLoadingOrder=false);
}