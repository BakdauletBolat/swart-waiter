import {computed, reactive} from "vue";

export interface IGood {
    product_id: string;
    name: string;
    quantity: number;
    price: number;
    url: string;
}
export interface IBasket {
    table_id: string;
    goods: IGood[];
    total_price: number;
}

type ChangeQuantityType = {
    quantity: number;
    product_id: string;
}

export const basket = reactive<IBasket>({
    table_id: '',
    goods: [],
    total_price: 0
});

export const isNotEmpty = computed(()=>basket.goods.length > 0);

function _calculate_total_price(goods: IGood[]): number {
    let total_price = 0
    goods.forEach((good)=>{
        total_price += good.price * good.quantity;
    });
    return total_price;
}

export function checkInBasket(product_id: string) {
    return basket.goods.filter(item=>item.product_id == product_id).length > 0;
}

export function getFromBasket(product_id: string) {
    return basket.goods.filter(item=>item.product_id == product_id)[0];
}

export function addGood(good: IGood) {
    basket.goods.push(good);
    basket.total_price = _calculate_total_price(basket.goods);
}

export function removeGood(product_id: string) {
    const index = basket.goods.findIndex((good)=>good.product_id == product_id);
    if (index != -1) {
        basket.goods.splice(index, 1);
        basket.total_price = _calculate_total_price(basket.goods);
    }
}

export function changeQuantity(body: ChangeQuantityType) {
    const index = basket.goods.findIndex((good)=>good.product_id == body.product_id);
    if (index != -1) {
        if (basket.goods[index].quantity <= basket.goods[index].quantity - body.quantity) {
            removeGood(body.product_id);
            return;
        }
        basket.goods[index].quantity = body.quantity;
        basket.total_price = _calculate_total_price(basket.goods);
        return basket.goods[index];
    }
}
