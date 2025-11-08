const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
import { Storage } from "@/Storage/Storage";

export async function GetCredentials():Promise<void | null>{
    const token = Storage.GetToken();
    if(!token){
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





export async funcio