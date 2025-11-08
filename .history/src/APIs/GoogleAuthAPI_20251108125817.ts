


export const SignInWithGoogle = async(googleToken:string)=>{

    const url =  `http://localhost:5900/flashauth/credentials/get`;

    try {
        const res = await fetch(url,
            {}
        )
    } catch (error) {
        
    }
}