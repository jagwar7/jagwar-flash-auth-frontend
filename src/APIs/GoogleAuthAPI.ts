import dotenv from 'dotenv';
dotenv.config();

const serverURL = process.env.NEXT_PUBLIC_BASE_URL;
const debugMode = true;

export const SignInWithGoogle = async(googleToken:string)=>{
    const url = `${serverURL}/api/auth/signin`;

    try {
        const res = await fetch(url,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${googleToken}`,
                    'X-AuthProvider': `google`
                }
            }
        );
        const data = await res.json();
        // if(debugMode) console.log('Response data:', data); 

        return data;
    } catch (error) {
        console.error('Fetch error details:', error); 

        return {success: false, message: 'There is an error with Google Sign In'};
    }
}