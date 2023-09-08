import { getAuth, signInWithCustomToken } from 'firebase/auth';

async function loginToFirebase(uid) {
    try {
        const auth = getAuth();
        const user = await signInWithCustomToken(auth, uid);
        return user;
    } catch (error) {
        console.error(`Error in login: ${error}`);
    }
}

export {loginToFirebase};