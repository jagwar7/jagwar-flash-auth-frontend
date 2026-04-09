import { signInWithPopup } from "firebase/auth";
import { getAuthInstance, getGoogleProvider } from "../FirebaseConfig";
import { SignInWithGoogle } from "@/APIs/GoogleAuthAPI";

export const SignInWithGoogleController = async () => {
  try {
    const auth = getAuthInstance();           
    const provider = getGoogleProvider();    

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    const data = await SignInWithGoogle(idToken);
    if(!data){
      throw new Error('NO AUTH TOKEN RECEIVED');
    }

    return data;
  } catch (error: any) {
    console.error("Google Sign-In Error:", error);
    return {
      success: false,
      message: error.message || "Failed to sign in with Google",
    };
  }
};