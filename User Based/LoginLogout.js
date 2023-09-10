//import * as crypto from 'crypto';
import {FetchEndpointsFromKV} from "../utils/Endpoints.js";
import * as Alby from "../utils/Notifications/In-App/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";



import * as loginToFirebase from "./LoginToFirebase.js";

var endpoints;

async function InitializeEndpoints() {
  endpoints = await FetchEndpointsFromKV();
}

InitializeEndpoints();

//// used to decrypt all Alby data
/*function decryptAES256(encryptedText, key) {
    const iv = encryptedText.slice(0, 16);
    const content = encryptedText.slice(16);
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    
    let decrypted = decipher.update(content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}*/


async function login(token) {
    jwt = await loginToFirebase(token);
    const url = endpoints["/login"];
    const response = await AxiosSigned.get(url, {jwt});
    loginFuncCache = JSON.stringify(response.data)

    Alby.setupAlbyWithChannel(response.data.albyChannelId, handleAlbyData);
    if (response.data.deleted != undefined) {
        var deleteNow = response.data.deleted;
        if (deleteNow) {
            return logoutAndDelete()
        } else {
            /// TODO: handle requested deletion by showing screen
        }
    } else if (response.waiting) {
        var secondsWaiting = Int.asInt(response.secondsWaiting)

    // setup a timer
    setTimeout(() => {
        // this block of code will be executed when 'secondsWaiting' has passed
        /// TODO: invoke fetchPollsNow
    }, secondsWaiting * 1000); // setTimeout takes time in milliseconds
    } else if (response.data.polls == undefined) {
        /// TODO: show screen that says "add friends" bc no polls are avail.
    }
    return [response.data.polls,jwt];
  }

async function logout(jwt) {
    await AxiosSigned.post(endpoints["/logout"],jwt,null,null);
    Alby.removeListener();
}


const listeners = []
function addRealtimeListener(listener) {
    listeners.push(listener)
}

function removeRealtimeListener(listener) {
    listeners.pop(listener)
}

async function handleAlbyData(data) {
    data = decryptAES256(data, Cache.getString("albyDecryptionKey"))
    for (listener in listeners) listener(data)
}
export {login, logout, addRealtimeListener, removeRealtimeListener}