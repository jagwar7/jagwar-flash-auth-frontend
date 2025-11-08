


export const SignInWithGoogle = async(googleToken:string)=>{

    const url =  `http://localhost:5900/api/auth/signin`;

    try {
        const res = await fetch(url,
            {
                method: 'POST',
                headers:{
                    
                }
            }
        )
    } catch (error) {
        
    }
}