import {computed, reactive} from "vue";
import {instance, IRestoran, Product} from "../api";
import userStore from "./userStore.ts";

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
        token: string;
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
        customer: {
            attributes: any
            data: any[]
        }
        positions: {
            data: IOrderProduct[]
        }
        restaurant: IRestoran,
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

interface TableAttributes {
    cabin_id: number;
    name: string;
}

export interface ITable {
    type: string;
    id: number;
    attributes: TableAttributes;
    included: {
        order: IOrder
    }
}

export interface IOrderStore {
    isLoadingOrderProducts: boolean;
    products: IOrderProduct[],
    order?: IOrder,
    receiptOrder?: IOrder,
    tables: ITable[],
    isLoadingOrder: boolean;
    isLoadingTables: boolean;
}

export const orderStore = reactive<IOrderStore>({
    isLoadingOrderProducts: false,
    products: [],
    tables: [],
    isLoadingOrder: false,
    isLoadingTables: false,
    order: undefined
});



export const waiterProducts = computed<IOrderProduct[]>(()=>{
    if (orderStore.products == undefined || orderStore.products!.length <= 0) {
        return [];
    }
    else {
        let customersCart: IOrderProduct[] = [];

        orderStore.products.forEach((item) => {
            if (item.attributes.waiter_id == userStore?.user?.id) {
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
        const otherWaiterProducts = orderStore.products.filter((item)=>item.attributes.waiter_id != null);
        const customerProducts = orderStore.products.filter((item)=>item.attributes.customer_id != null);
        const cP = customerProducts.reduce((groups, item) => ({
            ...groups,
            //@ts-ignore
            [item.included.customer.attributes.uuid]: [...(groups[item.included.customer.attributes.uuid!] || []), item]
        }), {});
        const wP = otherWaiterProducts.reduce((groups, item) => ({
            ...groups,
            //@ts-ignore
            [item.included.waiter.id]: [...(groups[item.included.waiter.id] || []), item]
        }), {});
        return {...cP, ...wP};
    }
});





export function loadOrder(id: number) {
    orderStore.isLoadingOrder = true;
    instance.get(`/api/v1/order/${id}/waiter?include=status,customer,comments,waiter`)
        .then(res=>{
            orderStore.order=res.data;
            orderStore.products = orderStore.order!.included.positions.data;
        })
        .finally(()=>orderStore.isLoadingOrder=false);
}

export function loadTables(status: number) {
    switch (status) {
        case 0:
            orderStore.isLoadingTables = true;
            instance.get('/api/v1/tables/list/active')
                .then(res=>orderStore.tables=res.data.data)
                .finally(()=>orderStore.isLoadingTables=false);
            break;
        case 1:
            orderStore.isLoadingTables = true;
            instance.get('/api/v1/tables/list/free')
                .then(res=>orderStore.tables=res.data.data)
                .finally(()=>orderStore.isLoadingTables=false);
            break;
        case 2:
            orderStore.isLoadingTables = true;
            instance.get('/api/v1/tables/list/reserve')
                .then(res=>orderStore.tables=res.data.data)
                .finally(()=>orderStore.isLoadingTables=false);
            break;
    }

}

export function loadReceiptOrder(token: string) {
    orderStore.isLoadingOrder = true;
    instance.get('/api/v1/order/receipt?include=status,customer,comments,restaurant', {
        headers: {
            order: token
        }
    })
        .then(res=>orderStore.receiptOrder=res.data)
        .finally(()=>orderStore.isLoadingOrder=false);
}