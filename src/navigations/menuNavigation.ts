import MenuIcon from "../assets/svg/MenuIcon.vue";
import OrderIcon from "../assets/svg/OrderIcon.vue";
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
        icon: MenuIcon,
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
        icon: OrderIcon,
        title: 'Позвать официанта',
        isFunction: true,
        onClick: () => {
            openWaiterCall();
        }
    }
];