const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
import { Storage } from "@/Storage/Storage";
import { jwtDecode } from "jwt-decode";


export async function GetCredentials():Promise<any | null>{
    const token = Storage.GetToken();
    if(!token){
        return {success: false, message: "No authentication token found. Please sign in"}
    }

    const url =  `http://localhost:5900/flashauth/credentials/update`;
    try {
        const res = await fetch(url, 
            {
                method: 'GET',
                headers: {
                    'Authorization': `local:${token}`
                },
            }
        )
        const data = await res.json();
        return data;
    } catch (error) {
        return {success: false, message: "Unknown Error"}
    }
}





export async function CreateOrUpdate(clientFrontEndURL:string, clientPublicKey:string, clientSecretKey:string, clientMongoDbUri:string, googleClientId:string, googleClientSecret:string, tokenExpiryDuration:string):Promise<any | null>{
    console.log("CREATED OR UPDATE CALLED");
    if(!clientFrontEndURL|| !clientPublicKey|| !clientSecretKey|| !clientMongoDbUri|| !googleClientId|| !googleClientSecret || !tokenExpiryDuration){
        return {success: false, message: "Missing credentials"};
    }
    const token = Storage.GetToken();
    
    if(!token){
        return {success: false, message: "You are not signed in yet. Please sign in"};
    }

    try {
        const url = `http://localhost:5900/flashauth/credentials/update`;
        console.log(url);
        const payload = {
            clientFrontEndURL,
            clientPublicKey,
            clientSecretKey,
            clientMongoDbUri,
            googleClientId,
            googleClientSecret,
            tokenExpiryDuration
        }
        const res = await fetch(url,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer local:${token}`
                },
                body: JSON.stringify(payload)
            }
        );

        const data = await res.json();
        return data;
    } catch (error) {
        return {success: false, message: "Unknown Error"}
    }

}