import {instance} from "./index.ts";

export interface  IRestoranAttributes {
    name:  string;
    address: string;
    description: string;
    attachments: any[];
}

export interface IRestoran {
    type: string;
    id: number;
    attributes:IRestoranAttributes
}

export const getRestoran = () => {
    return instance.get<IRestoran>('/api/v1/restaurants/me')
}