import {reactive} from "vue";
import {instance} from "../api";

interface IDiscount {
    type: string;
    id: number;
    attributes: {
        title: string;
        start_at: string; // Consider using Date type if dates need to be manipulated
        end_at: string;   // Consider using Date type if dates need to be manipulated
    };
    included: any; // Change this to the appropriate type if 'included' has a defined structure
}
interface IDiscountStore {
    data: IDiscount[],
    isLoading: boolean
}

export const discountStore = reactive<IDiscountStore>({
    data: [],
    isLoading: false
});


export function loadDiscounts() {
    instance.get<{
        data: IDiscount[]
    }>('/api/v1/discounts').then((response)=>{
        discountStore.data = response.data.data
    })
}