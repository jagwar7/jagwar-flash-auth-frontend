
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function SignUpWithJWT (name:string, email:string, password:string): Promise<any>{
    if(!name || !email || !password){
        throw new Error("CLIENT ERROR: Missing credentials");
    }
    console.log("server: ", serverURL);
    try {
        const payload = {
            email, 
            name,
            password,
            authType : 'local'
        }
        const url = `${serverURL}/api/auth/signup`;
        const res = await fetch(url,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify(payload)
        })
        
        const data = await res.json();
        console.log(data);
        return data.token;
    } catch (error) {
        throw new Error("There is an error with sign up");
    }
}



export async function SignInWithJWT(email:string, password:string):Promise<any>{
    if(!email || !password){
        throw new Error("Missing email or password");
    }
    try {
        const payload = {email, password, authType: 'local'};
        const url = `${serverURL}/api/auth/signin`;

        const res = await fetch(url, {
            method: 'GET', 
            body: JSON.stringify(payload)
        });
        return res;
    } catch (error) {
        throw new Error("There is an error with sign in");
    }
}