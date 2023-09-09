import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: " AIzaSyCJ-pIfMEyavmWK9DcK1c2es78NCqSunhU ",
  authDomain: "project-755055790640.firebaseapp.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

async function loginToFirebase(customToken) {
  try {
    const auth = getAuth(app);
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

//loginToFirebase("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY5NDIxNzM2MCwiZXhwIjoxNjk0MjIwOTYwLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay04MG1rYUBuZXRhLTI5ZTRlLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstODBta2FAbmV0YS0yOWU0ZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IjBmNGU1MjgxLWI0MmYtNDdiNy1hZGZmLThjYTdiZDEzNjZmMiJ9.eyvCFC98Om19_Z0tqL3yEVt_4W7Updr_6BPrcLYXvBMxLwsrN2TuJrkNm78zsRWrJZ6U3OV70FeJfh4O3yIth6rZmiMDy5BZKCQguSe9hDOSL3tPN9XPgtbhBsELPla24ayRPcc6nPK0unstuXXRIHuJp71fIQZGB634YOpTG1Ev7-50NWQuGroJ9gDFRd0uR3ZuMfYdUHYNOFJsBVc7pdJFoX5j_MLa6lnGyesLClq4wem_AURnIPDs8R_cNcBdjSM8kwhXTHJqvScTYpVWOcsueru4rILWx2IhHJGUUKWRrOQCup_wC9h0DNqtxpfYZhwIbLiVx9XCp17hWIwUqw");

export { loginToFirebase };
