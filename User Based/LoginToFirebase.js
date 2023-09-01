import * as firebase from 'react-native-firebase';

async function loginToFirebase(uid) {
    try {
        const user = await firebase.auth().signInWithCustomToken(uid);
        return user;
    } catch (error) {
        console.error(`Error in login: ${error}`);
    }
}

export {loginToFirebase};

