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
    included: {
        setting: {
            attributes: {
                lang: string,
                serv_percent_waiter: number,
                serv_percent_pick_up: number
            }
        }
    };
    attributes:IRestoranAttributes
}

export const  getRestoran = async () => {
    return await new GetCasingData().getData('/api/v1/restaurants/me?include=setting', 'restoran_key');
}
