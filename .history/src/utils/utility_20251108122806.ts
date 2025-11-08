import { Storage } from "@/Storage/Storage";
import { jwtDecode } from "jwt-decode";


export function HandleTokenExpiry():void{
    try {
        const token = Storage.GetToken();
        if(!token) return;

        const decoded = jwtDecode(token);
        if(!decoded.exp){
            return;
        }     
        const currentTime = Math.floor(Date.now() / 1000);
        if(decoded.exp < currentTime) 
    } catch (error) {
        return true;
    }
}