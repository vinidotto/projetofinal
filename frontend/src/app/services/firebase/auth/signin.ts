import { firebase_app } from "../firebaseConfiguration";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email: string, password: string) {
  let result = null;
  let error = null;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken(); 
    result = { ...userCredential, token }; 
  } catch (e) {
    error = e;
  }
  return { result, error };
}
