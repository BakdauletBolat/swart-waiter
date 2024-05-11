import Pusher, {Channel} from "pusher-js";
import {basket} from "../stores";
import {loadOrder, orderStore} from "../stores/orderStore.ts";

var pusher = new Pusher("9763cb0b172b1a9ee194", {
    cluster: 'eu'
});

let channel: Channel | undefined  = undefined;
export function start() {
    const channel_name = localStorage.getItem('multi_tenant_domain_name');
    channel = pusher.subscribe(channel_name!);

    channel.bind('cart.customer.create', (event: any)=>{
        basket.value.data?.push(event);
    });
    channel.bind('cart.customer.update', (event: any)=>{
        if (basket.value.data != undefined) {
            const index = basket.value.data?.findIndex((item)=>event.id == item.id);
            if (index != -1) {
                basket.value.data[index] = event;
            }
        }
    });
    channel.bind('order.products.create', (event: any)=>{
        orderStore.products?.push(event);
        loadOrder();
    });
    channel.bind('order.products.update', (event: any)=>{
        if (orderStore.products != undefined) {
            console.log(event);
            const index = orderStore.products?.findIndex((item)=>event.id == item.id);
            console.log(index);
            if (index != -1) {
                orderStore.products[index] = event;
                loadOrder();
            }
        }
    });
    channel.unsubscribe();
}

export function stop() {
    if (channel != undefined) {
        channel.unsubscribe();
    }
}