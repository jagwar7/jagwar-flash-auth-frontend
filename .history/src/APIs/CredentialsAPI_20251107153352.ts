const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
import { Storage } from "@/Storage/Storage";

// const resObj = {
//     success: boolean,
//     message: undefined,
//     data: undefined
// }

export async function GetCredentials():Promise<any | null>{
    const token = Storage.GetToken();
    if(!token){
        return {success: false, message: "No authentication token found. Please sign in"}
    }

    const url = `${serverURL}/api/credentials/get`;
    try {
        const res = await fetch(url, 
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer jwt:${token}`
                },
            }
        )
        const data = await res.json();
        return data;
    } catch (error) {
        return null;
    }
}





export async function CreateOrUpdate(clientFrontEndURL:string, clientPublicKey:string, clientSecretKey:string, clientMongoDbUri:string, googleClientId:string, googleClientSecret:string):Promise<any | null>{
    if(!clientFrontEndURL|| !clientPublicKey|| !clientSecretKey|| !clientMongoDbUri|| !googleClientId|| !googleClientSecret){
        return 
    }
    const token = Storage.GetToken();
    if(!token){
        return {success: false, message: "You are not signed in yet. Please sign in"};
    }

    const url = `${serverURL}/api/credentials/update`;
    const payload = {
        clientFrontEndURL: credsObj.clientFrontEndURL,
        clientPublicKey: credsObj.clientPublicKey,
    }
    const res = await fetch(url,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer jwt:${token}`
            }
        }
    )
}