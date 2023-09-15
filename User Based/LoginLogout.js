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


async function login(platform,jwt) {
    const url = endpoints["/login"];
    const response = await AxiosSigned.post(url,jwt,{platform:platform},null);
    console.log(response);
    return response;
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