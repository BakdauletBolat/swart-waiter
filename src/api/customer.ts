import {instance} from "./axios.ts";

export interface CustomerCreateData {
    uuid: string;
    full_name: string;
    phone?: string;
    location: {
        lat: string;
        lng: string;
    }
    data?: {
        ip: string;
        device: string;
        browser: string;
    }

}
export function createCustomer(data: CustomerCreateData) {
    return instance.post('/api/v1/customer', data);
}