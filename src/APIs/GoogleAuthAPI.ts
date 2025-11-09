import dotenv from 'dotenv';
dotenv.config();

const serverURL = process.env.NEXT_PUBLIC_BASE_URL;

export const SignInWithGoogle = async(googleToken:string)=>{

    const url =  `${serverURL}/api/auth/signin`;

    const payload = {
        authType : 'google'
    }
    try {
        const res = await fetch(url,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer google:${googleToken}`,
                },
                body: JSON.stringify(payload)
            }
        );

        const data = await res.json();
        return data;
    } catch (error) {
        return {success: false, message: 'There is an error with Google Sign In'};
    }
}