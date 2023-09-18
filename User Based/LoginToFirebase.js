import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
import {FetchEndpointsFromKV}  from "../utils/Endpoints.js";
import {_post} from "../utils/AxiosSigned.js";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: " AIzaSyCJ-pIfMEyavmWK9DcK1c2es78NCqSunhU ",
  authDomain: "project-755055790640.firebaseapp.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Variable to store endpoints
var endpoints;

// Function to initialize endpoints
async function InitializeEndpoints() {
  // Fetching endpoints from KV
  endpoints = await FetchEndpointsFromKV();
  console.log(loginToFirebase(null, "+923004133379"));
}
// Calling the function to initialize endpoints
InitializeEndpoints();

async function loginToFirebase(customToken,phoneNumber) {
  try {
    const auth = getAuth(app);
    const userCredential = await signInWithCustomToken(auth, customToken);
    const user = userCredential.user;
    const idToken = await user.getIdToken(true);
    console.log("JWT ID Token:", idToken);
    return {jwt:idToken};
  } catch (error) {
    console.error(`customToken has expired , generating new one`);

    const url = endpoints["/generateNewCustomToken"];
    const qString = {phoneNumber:phoneNumber};
    const response = await _post({ uri: url, queryString: qString });
    console.log(response);
    const res = await loginToFirebase(response.customToken,phoneNumber);
 
    return{jwt:res.jwt,customToken:response.customToken};
  }
}

async function Logout(){
  const auth = getAuth(app);
  await signOut(auth);
  return true;
}

//loginToFirebase("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY5NDUwMTAyMiwiZXhwIjoxNjk0NTA0NjIyLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay04MG1rYUBuZXRhLTI5ZTRlLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstODBta2FAbmV0YS0yOWU0ZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IjQ3ZTg4MzkxLTMxODItNDlmMC1hYmM2LTY2MDFlYjgxOTgwMyJ9.hV2XmmoL6niplUOb7TMFZi5AOAzMgbm3M5QmkXHk69nQFpQCq6UGjOSCagkMxQOJ4HCDCCMxCzTsYWL7jmoOa9DGy6phpHle_Wv6oBzy-S0WPMZswLYg8orBI4GbDhRMuGi62CM5j7hZNQ-yRDeWTRlZmlruh5Ixfb3Iu5pbQDgZSLGYJZI3-9KbzJP60zdHZmjRG89AfgzZbEAm99Y0qBxltDeFcDwA3niYAHai6hxVOFd7qGppqD7zec0R1qGaUpRZroZhhemCYVAque1KEN68pzgKy0SsTineJFsdxAMKcLWzDSh4A_CgXAEr83Rtj-Yo7UXfTVCb8ey1O3cE5A")
export { loginToFirebase,Logout };
