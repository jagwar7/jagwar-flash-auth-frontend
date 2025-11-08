import { jwtDecode } from "jwt-decode";


export function IsTokenExpired(token:string):boolean{
    try {
        const decoded = jwtDecode(token);
        if(!decoded.exp){
            return true;
        }     
        const currentTime = Math.floor(Date.now())  
    } catch (error) {
        
    }




}