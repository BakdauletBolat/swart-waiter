import MenuIcon from "./BottomBarIcons/MenuIcon.vue";
import TableIcon from "./BottomBarIcons/TableIcon.vue";
import ToFillIcon from "./BottomBarIcons/ToFillIcon.vue";
import NotificationIcon from "./BottomBarIcons/NotificationIcon.vue";
export const bottomBarNavigation = [
    {
        name: 'menu-view',
        icon: MenuIcon,
        title: 'Меню',
        isFunction: false
    },
    {
        name: 'table-view',
        icon: TableIcon,
        title: 'Столы',
        isFunction: false
    },
    {
        name: 'fill-view',
        icon: ToFillIcon,
        title: 'К подаче',
        isFunction: false
    },
    {
        name: 'notification-view',
        icon: NotificationIcon,
        title: 'Уведемление',
        isFunction: false
    },

];