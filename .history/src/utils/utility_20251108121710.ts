import { jwtDecode } from "jwt-decode";


export function IsTokenExpired(token:string):boolean{
    try {
        
    } catch (error) {
        
    }
    const decoded = jwtDecode(token);
    if(!decoded.exp){
        return true;
    }



}