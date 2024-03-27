import {ref} from "vue";

interface ILocation {
    lat: string;
    lng: string;
}
interface IUserInformation {
    uuid: string;
    location?: ILocation;
    name: string;
    errorLocation?: string;
}
class UserInformationStore {
    store = ref<IUserInformation | undefined>(undefined);
    constructor() {
        const userStore = localStorage.getItem('userStore');
        if (userStore != null) {
            this.store.value = JSON.parse(localStorage.getItem('userStore')!);
        }
        else {
            this.store.value = {
                uuid: crypto.randomUUID(),
                location: undefined,
                name: '',
                errorLocation: undefined
            }
        }
    }


    setErrorLocation(error: string) {
        this.store.value!.errorLocation = error;
        this.store.value!.location = undefined;
        this.save();
    }
    setName(name: string) {
        this.store.value!.name = name;
        this.save();
    }

    setLocation(location?: ILocation) {
        this.store.value!.location = location;
        this.save();
    }



    save() {
        localStorage.setItem('userStore', JSON.stringify(this.store.value))
    }
}

export default new UserInformationStore();