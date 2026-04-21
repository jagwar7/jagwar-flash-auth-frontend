import { Storage } from "@/Storage/Storage";
import { jwtDecode } from "jwt-decode";


export function IsTokenExpired():boolean{
    try {
        const token = Storage.GetToken();
        if(!token) return false;

        const decoded = jwtDecode(token);
        if(!decoded.exp){
            return false;
        }     
        const currentTime = Math.floor(Date.now() / 1000);
        if(decoded.exp < currentTime){
            // console.log('EXPIRY STATE');
        }else{
            // console.log("DONT EXPIRE")
        }
        return decoded.exp < currentTime; 
    
    } catch (error) {
        return false;
    }
}