
import { SignInWithGoogle } from "@/APIs/GoogleAuthAPI";
import { auth, googleProvider } from "../FirebaseConfig";
import { signInWithPopup } from "firebase/auth";


export const SignInWithGoogleController = async()=>{
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        const data = 
    } catch (error) {
        
    }
}