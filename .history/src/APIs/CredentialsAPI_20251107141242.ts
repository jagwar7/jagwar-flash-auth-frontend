const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
import { Storage } from "@/Storage/Storage";

export async function GetCredentials():Promise<void>{
    const token = Storage.GetToken();
    if(!token){
        throw new Error("No authentication found, Please sign in");
    }

    const url = `${serverURL}/api/credentials/get`;
    const res = await fetch(url, 
        {
            method: 'GET'
        }
    )


}