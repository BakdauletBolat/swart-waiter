import {computed, ref} from "vue";
import {isLoading} from "./index.ts";
import {instance} from "../api";
import userStore from "./userStore.ts";


type AddToCardType = {
    quantity: number;
    product_id: number;
}

type ChangeQuantityType = {
    quantity: number;
    cart_id: number;
    table_id?: number;
}

export interface ICardItem {
    id: number;
    attributes: {
        table_id: number;
        customer_id: number;
        waiter_id: number | null;
        product_id: number;
        quantity: number;
        price: number;
    };
    included: {
        waiter?: {
            id: number
        }
        customer?: {
            id: number
            attributes: {
                full_name: string,
                uuid: string
            }
        }
        product?: {
            id: number;
            attributes: {
                images: any[];
                name: {
                    kk: string;
                    ru: string;
                },
                price: number;

            }
        }
    }
}




interface ICartData {
    data?: ICardItem[];
    addCardLoading: boolean;
    removeCardLoading: boolean;
    isLoading: boolean;
    toCreateTableId: number | undefined
}

export const basket = ref<ICartData>({
    isLoading: false,
    addCardLoading: false,
    removeCardLoading: false,
    toCreateTableId: undefined,
    data: []
});


export const customerBasket = computed<ICardItem[]>(()=>{
    if (basket.value.data == undefined || basket.value.data!.length <= 0) {
        return [];
    }
    return basket.value.data.filter(item=>{
        return item.included.waiter?.id == userStore.user?.id;
    });
});


export const otherBaskets = computed<any | undefined>(()=>{
    if (basket.value.data == undefined || basket.value.data.length <= 0) {
        return [];
    }
    else {
        const customerProducts = basket.value.data?.filter((item)=>item.attributes.customer_id != null);
        return customerProducts.reduce((groups, item) => ({
            ...groups,
            //@ts-ignore
            [item.included.customer.attributes.uuid]: [...(groups[item.included.customer.attributes.uuid!] || []), item]
        }), {});
    }
});

export const isHaveCart = computed(()=>basket.value != undefined && basket.value!.data!.length > 0);
export const totalAmount = computed(()=>{
    const returnValue = {
        totalAmount: 0,
        totalLength: 0
    };
    if (basket.value != undefined) {
        basket.value!.data!.forEach((item)=>{
            returnValue.totalLength += item.attributes.quantity;
            returnValue.totalAmount += item.attributes.quantity * item.attributes.price;
        })
    }
    return returnValue;
});

export const checkInBasket = (id: number) => {
    if (basket.value.data != undefined) {
        const index = basket.value.data!.findIndex(item=>item.included.product?.id == id);
        if (index != -1) {
            return basket.value.data![index!];
        }
    }
    return false;
}

export const getFromBasket = (id: number) => {
    const index = basket.value.data?.findIndex(item=>item.included.product?.id == id);
    return basket.value.data![index!];
}







export function loadBasket() {
    basket.value.isLoading = true;
    instance.get(`/api/v1/carts/waiter/${basket.value.toCreateTableId}/table?include=customer,waiter,product`).then(res=>{
        basket.value.data = res.data.data;
    }).catch(e=>console.log(e,  'asdas')).finally(()=>{
        basket.value.isLoading = false;
    });
}




export function removeFromBasket(pk: number) {
    basket.value.removeCardLoading = true;
    isLoading.value = true;
    instance.delete(`/api/v1/carts/${pk}/user`, {
        data: {
            table_id: basket.value.toCreateTableId
        }
    }).then((_)=>{
        loadBasket();
    }).catch((e)=>console.log(e)).finally(()=>
    {
        basket.value.removeCardLoading=false
        isLoading.value = false
    });
}


export function changeQuantityFromBasket(data: ChangeQuantityType) {
    isLoading.value = true;
    instance.put('/api/v1/carts/quantity/user', data).then((_)=>{
        loadBasket();
    }).catch((e)=>console.log(e)).finally(()=>
    {
        isLoading.value = false
    });
}

export function addOrCreate(data: AddToCardType) {
    basket.value.addCardLoading = true;
    isLoading.value = true;
    instance.post('/api/v1/carts/waiter', {
        table_id: basket.value.toCreateTableId!,
        ...data
    }).then((_)=>{
        loadBasket();
    }).catch((e)=>console.log(e)).finally(()=>{
        basket.value.addCardLoading=false;
        isLoading.value = false;
    });
}
