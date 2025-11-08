import { Storage } from "@/Storage/Storage";
import { jwtDecode } from "jwt-decode";


export function HandleTokenExpiry():void{
    try {
        const token = Storage.GetToken();
        const tokenStr = token?.toString()
        const decoded = jwtDecode(token);
        if(!decoded.exp){
            return;
        }     
        const currentTime = Math.floor(Date.now() / 1000);

    } catch (error) {
        return true;
    }
}