


export const SignInWithGoogle = async(googleToken:string)=>{

    const url =  `http://localhost:5900/api/auth/get`;

    try {
        const res = await fetch(url,
            {}
        )
    } catch (error) {
        
    }
}