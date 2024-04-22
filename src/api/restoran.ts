import {GetCasingData} from "../utils/getCasingData.ts";

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

export const  getRestoran = async () => {
    return await new GetCasingData().getData('/api/v1/restaurants/me', 'restoran_key');
}
