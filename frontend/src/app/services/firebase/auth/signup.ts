import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const signUp = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { result: userCredential.user, error: null };
  } catch (error) {
    return { result: null, error };
  }
};

export default signUp;