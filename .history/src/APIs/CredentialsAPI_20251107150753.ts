const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
import { Storage } from "@/Storage/Storage";

const resObj = {
    success: undefined,
    message: undefined,
    data: undefined
}

export async function GetCredentials():Promise<any | null>{
    const token = Storage.GetToken();
    if(!token){
        resObj.success = false;
        throw new Error("No authentication found, Please sign in");
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
        return data
    } catch (error) {
        return null;
    }
}





export async function CreateOrUpdate(credsObj):Promise<void | null>{
    const token = Storage.GetToken();
    if(!token){
        {success: false}
    }
}