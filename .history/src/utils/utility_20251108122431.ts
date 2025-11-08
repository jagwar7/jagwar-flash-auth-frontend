import { jwtDecode } from "jwt-decode";


export function HandleTokenExpiry(token:string):boolean{
    try {
        const decoded = jwtDecode(token);
        if(!decoded.exp){
            return true;
        }     
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;  
    } catch (error) {
        return true;
    }
}