import { jwtDecode } from "jwt-decode";


export function IsTokenExpired(token:string):boolean{
    const decoded = jwtDecode(token);
    if(!decoded.exp){
        return true;
    }

    

}