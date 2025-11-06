
const serverURL = process.env.REACT_APP_SERVER_URL;

export const SignUpWithJWT =(name:string, email:string, password:string):=>{
    if(!name || !email || !password){
        throw new Error("CLIENT ERROR: Missing credentials");
    }
    try {
        const payload = {
            email, 
            name,
            password,
            authType : 'local'
        }
        const url = `${serverURL}/api/auth/signup`;
        const res = await fetch(url,{
            method:'GET',
            body : JSON.stringify(payload)
        });
        return res
    } catch (error) {
        
    }
}