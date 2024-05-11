import {reactive} from "vue";
import {GetCasingData} from "../utils/getCasingData.ts";

interface IDiscount {
    type: string;
    id: number;
    attributes: {
        attachments: string[];
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
    new GetCasingData(12,false).getData('/api/v1/discounts', 'discounts').then((response)=>{
        discountStore.data = response.data
    });
}