


export const SignInWithGoogle = async(googleToken:string)=>{

    const url =  `http://localhost:5900/api/auth/signin`;

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
                }
            }
        );

        const data = await res.json();
        return data;
    } catch (error) {
        return {success: false, message: 'There is an error with Google Sign In'};
    }
}