import MenuIcon from "../assets/svg/MenuIcon.vue";
import OrderIcon from "../assets/svg/OrderIcon.vue";
import BasketIcon from "../assets/svg/BasketIcon.vue";
import WaiterCallIcon from "../assets/svg/WaiterCallIcon.vue";
import {openWaiterCall} from "../components/SidebarModal/index.ts";
export const menuNavigation = [
    {
        name: 'menu',
        icon: MenuIcon,
        title: 'Меню',
        isFunction: false
    },
    {
        name: 'basket-view',
        icon: BasketIcon,
        title: 'Корзина',
        isFunction: false
    },
    {
        name: 'order-view',
        icon: OrderIcon,
        title: 'Мой заказ',
        isFunction: false
    },
    {
        name: 'waiter-call',
        icon: WaiterCallIcon,
        title: 'Позвать официанта',
        isFunction: true,
        onClick: () => {
            openWaiterCall();
        }
    }
];