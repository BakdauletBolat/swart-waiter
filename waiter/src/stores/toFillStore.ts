
import {ref} from "vue";

interface Product {
    id: number;
    name: {
        kk: string;
        ru: string;
    };
}

interface Position {
    id: number;
    table_id: number;
    order_id: number;
    waiter_id: number;
    customer_id: number | null;
    product_id: number;
    status: number;
    price: number;
    quantity: number;
    created_at: number;
    updated_at: number;
    deleted_at: number | null;
    product: Product;
}

interface Table {
    id: number;
    cabin_id: number;
    name: string;
    created_at: number;
    updated_at: number;
}

export interface IToFillItem {
    table: Table;
    positions: Position[];
}



export const positions = ref<number[]>([]);

export function pushPositions(id: number) {
    positions.value.push(id)
}

export function removePositions(id: number) {
    const index = positions.value.findIndex((item: number)=>item==id)
    positions.value.splice(index, 1)
}