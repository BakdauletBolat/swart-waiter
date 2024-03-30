import {reactive} from "vue";
import {instance} from "../api";


type AddToCardType = {
    quantity: number;
    product_id: number;
    uuid: string;
}



interface Customer {
    id: number;
    table_id: number;
    customer_id: number;
    waiter_id: number | null;
    product_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    customer: {
        id: number;
        uuid: string;
    };
    waiter: any | null; // You can specify the type of waiter data if needed
}

export interface Cart {
    customers: {
        [key: number]: Customer[];
    };
    waiter: any[]; // You can specify the type of waiter data if needed
}


interface ICartData {
    data?: Cart;
    isLoading: boolean;
}

export const basket = reactive<ICartData>({
    isLoading: false,
    data: undefined
});


export function addOrCreate(data: AddToCardType) {
    instance.post('/api/v1/carts/customer', data).then((_)=>{
        instance.get('/api/v1/carts/customer').then(res=>{
            basket.data = res.data;
        }).catch(e=>console.log(e,  'asdas'));
    }).catch((e)=>console.log(e));
}
