import dotenv from 'dotenv';
dotenv.config();

const serverURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function SignUpWithJWT (name:string, email:string, password:string): Promise<any>{
    if(!name || !email || !password){
        throw new Error("CLIENT ERROR: Missing credentials");
    }
    try {
        const payload = {
            email, 
            name,
            password,
        }
        const url = `${serverURL}/api/auth/signup`;
        const res = await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AuthProvider' : 'local'
            },
            body : JSON.stringify(payload)
        });
        
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("There is an error with sign up");
    }
}



export async function SignInWithJWT(email:string, password:string):Promise<any>{
    if(!email || !password){
        return {success: false, message: "CLIENT ERROR: Invalid Credentials"};
    }
    try {
        const payload = {email, password};
        const url = `${serverURL}/api/auth/signin`;

        const res = await fetch(url, {
            method: 'POST', 
            headers: {'Content-Type' : 'application/json', 'X-AuthProvider' : 'local'},
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        return data;
    } catch (error) {
        return {success: false, message: "UNKNOWN CLIENT ERROR"};
    }
}