import {computed, ref} from "vue";
import userInformationStore from "./userInformationStore.ts";
import {isLoading} from "./index.ts";
import {instance} from "../api";


type AddToCardType = {
    quantity: number;
    product_id: number;
    uuid: string;
}

type ChangeQuantityType = {
    quantity: number;
    cart_id: number;
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
}

export const basket = ref<ICartData>({
    isLoading: false,
    addCardLoading: false,
    removeCardLoading: false,
    data: []
});



export const customerBasket = computed<ICardItem[]>(()=>{
    if (basket.value.data == undefined || basket.value.data!.length <= 0) {
        return [];
    }
    else {
        let customersCart: ICardItem[] = [];
        basket.value.data.forEach((item) => {
            if (item.included.customer?.attributes.uuid == userInformationStore.store.value?.uuid) {
                customersCart.push(item);
            }
        });
        return customersCart;
    }
});

export const isHaveCart = computed(()=>customerBasket.value != undefined && customerBasket.value?.length > 0);

export const totalAmount = computed(()=>{
    const returnValue = {
        totalAmont: 0,
        totalLength: 0
    };
    customerBasket.value?.forEach((item)=>{
        returnValue.totalLength += item.attributes.quantity;
        returnValue.totalAmont += item.attributes.quantity * item.attributes.price;
    })
    return returnValue;
});

export const checkInBasket = (id: number) => {
    console.log(id);
    if (customerBasket.value != undefined) {
        const index = customerBasket.value?.findIndex(item=>item.included.product?.id == id);
        if (index != -1) {
            return customerBasket.value![index!];
        }
    }
    return false;
}

export const getFromBasket = (id: number) => {
    const index = customerBasket.value?.findIndex(item=>item.included.product?.id == id);
    return customerBasket.value![index!];
}


export function addOrCreate(data: AddToCardType) {
    basket.value.addCardLoading = true;
    isLoading.value = true;
    instance.post('/api/v1/carts/customer', data).then((_)=>{
        instance.get('/api/v1/carts/customer?include=customer,product').then(res=>{
            basket.value.data = res.data.data;
        }).catch(e=>console.log(e,  'asdas'));
    }).catch((e)=>console.log(e)).finally(()=>{
        basket.value.addCardLoading=false;
        isLoading.value = false;
    });
}

export function removeFromBasket(pk: number) {
    basket.value.removeCardLoading = true;
    isLoading.value = true;
    instance.delete(`/api/v1/carts/${pk}/customer`).then((_)=>{
        instance.get('/api/v1/carts/customer?include=customer,product').then(res=>{
            basket.value.data = res.data.data;
        }).catch(e=>console.log(e,  'asdas'));
    }).catch((e)=>console.log(e)).finally(()=>
    {
        basket.value.removeCardLoading=false
        isLoading.value = false
    });
}


export function changeQuantityFromBasket(data: ChangeQuantityType) {
    isLoading.value = true;
    instance.put('/api/v1/carts/quantity/customer', data).then((_)=>{
        instance.get('/api/v1/carts/customer?include=customer,product').then(res=>{
            basket.value.data = res.data.data;
        }).catch(e=>console.log(e,  'asdas'));
    }).catch((e)=>console.log(e)).finally(()=>
    {
        isLoading.value = false
    });
}



export function loadBasket() {
    instance.get('/api/v1/carts/customer?include=customer,product').then(res=>{
        basket.value.data = res.data.data;
    }).catch(e=>console.log(e,  'asdas'));
}
