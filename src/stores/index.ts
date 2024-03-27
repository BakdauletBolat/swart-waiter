import {categories, ICategory, IFood} from "./categoriesStore.ts";
import {basket, IBasket, IGood,isNotEmpty, addGood, removeGood, changeQuantity, checkInBasket} from "./basketStore.ts";
import {restorantStore} from "./restorantStore.ts";

export {categories,basket,isNotEmpty,addGood, removeGood, checkInBasket, changeQuantity,
    type IBasket, type IGood, type ICategory, type IFood, restorantStore};