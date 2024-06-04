import {menuNavigation} from "./menuNavigation.ts";
import {Component} from "vue";
export {menuNavigation};


export interface Navigation {
    name: string;
    icon: Component;
    title: string;
    isFunction: boolean;
}