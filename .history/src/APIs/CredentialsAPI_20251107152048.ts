const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
import { Storage } from "@/Storage/Storage";

const resObj = {
    success: boolean,
    message: undefined,
    data: undefined
}

export async function GetCredentials():Promise<any | null>{
    const token = Storage.GetToken();
    if(!token){
        return
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