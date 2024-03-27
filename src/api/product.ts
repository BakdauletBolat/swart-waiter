import {instance} from "./axios.ts";
export interface Product {
    type: string;
    id: number;
    attributes: {
        category_id: number;
        name: {
            kk: string;
            ru: string;
        };
        description: {
            kk: string;
            ru: string;
        };
        images: string[];
        tag: string;
        measurement: string;
        type: string;
        essence: string;
        max: number;
        min: number;
        quantity: number;
        price: number;
        old_price: number | null;
    };
    included: {
        modifiers: {
            data: Modifier[];
        };
        recommendations: {
            data: Product[];
        };
        recipes: {
            data: Recipe[];
        };
    };
    meta: {
        include: string[];
        custom: any[];
    };
}

interface Modifier {
    type: string;
    id: number;
    attributes: {
        category_id: number | null;
        name: {
            kk: string;
            ru: string;
        };
        description: {
            kk: string;
            ru: string;
        };
        images: string[];
        tag: string;
        measurement: string;
        type: string;
        essence: string;
        max: number;
        min: number;
        quantity: number;
        price: number;
        old_price: number | null;
    };
    included: null;
}

interface Recipe {
    type: string;
    id: number;
    attributes: {
        slug: string;
        name: string;
        measurement: string;
        type: string;
        stock: number;
        price: number;
    };
    included: null;
}

export async function getProduct(id:number) {
    return instance.get<Product>('/api/v1/products/'+id.toString()+'?include=recipes,modifiers,recommendations');
}