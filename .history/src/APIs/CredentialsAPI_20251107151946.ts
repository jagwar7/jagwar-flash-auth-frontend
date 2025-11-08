const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
import { Storage } from "@/Storage/Storage";

interface ApiResponse<T=any>{
    success: boolean;
    message: string;
    data: T;
}

export async function GetCredentials():Promise<ApiResponse>{
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