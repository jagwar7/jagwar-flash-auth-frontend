import { jwtDecode } from "jwt-decode";


export function HandleTokenExpiry():void{
    try {
        const token = Storage
        const decoded = jwtDecode();
        if(!decoded.exp){
            return;
        }     
        const currentTime = Math.floor(Date.now() / 1000);

    } catch (error) {
        return true;
    }
}