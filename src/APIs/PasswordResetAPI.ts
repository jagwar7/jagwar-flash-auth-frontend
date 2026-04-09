import dotenv from 'dotenv';
dotenv.config();


const serverURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function RequestPasswordReset(email:string):Promise<any | null>{
    const url = `${serverURL}/api/auth/password-reset-request`;
    const payload = {
        email: email
    }
    try {
        const res:any = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        );
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}


export async function UpdatePassword(data:any, token:string) {
    const url = `${serverURL}/api/auth/reset-password`;
    const payload = {
        email: data.email,
        newPassword: data.password,
        token: token
    }
    console.log('PAYLOADS: ', payload);
    try {
        const res = await fetch(url, 
            {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            }
        );
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}