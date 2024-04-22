import {checkTTL} from "./index.ts";
import {instance} from "../api";
//@ts-ignore
import CryptoJS from 'crypto-js';

export class GetCasingData {

    private localKey: string = '';
    private password = 'bagu123F';
    private ttl: number = 0;

    constructor(ttl: number = 12)  {
        this._update_ttl(ttl);
    }

    _update_ttl(ttl: number) {
        this.ttl = ttl * 60 * 60 * 1000;
    }

    encode(plaintext: string) {
        return CryptoJS.AES.encrypt(plaintext, this.password).toString();
    }

    decode(ciphertext: string) {
        const bytes = CryptoJS.AES.decrypt(ciphertext, this.password);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    async getData(url: string, key: string, ttl?: number) {
        let response;
        let data;
        this.localKey = key;
        if (ttl != undefined) {
            this._update_ttl(ttl);
        }

        if (localStorage.getItem(this.localKey) != undefined ) {
            const rest = JSON.parse(this.decode(localStorage.getItem(this.localKey)!));
            if (checkTTL(rest.ttl)) {
                return rest.data;
            }
        }

        response = await instance.get(url);
        data = response.data;
        localStorage.setItem(this.localKey, this.encode(JSON.stringify({
            ttl: new Date(new Date().getTime()+this.ttl),
            data: data
        })));
        return data
    }
}