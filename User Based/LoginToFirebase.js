import { getAuth, signInWithCustomToken } from "firebase/auth";

async function loginToFirebase(uid) {
  try {
    const auth = getAuth();
    const userCredential = await signInWithCustomToken(auth, customToken);
    const user = userCredential.user;
    const idToken = await user.getIdToken(true);
    console.log("JWT ID Token:", idToken);
    return idToken;
  } catch (error) {
    console.error(`Error in login: ${error}`);
    return null;
  }
}

export { loginToFirebase };
