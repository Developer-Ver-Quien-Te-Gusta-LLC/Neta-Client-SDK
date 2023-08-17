//import * as crypto from 'crypto';
import {FetchEndpointsFromKV} from "../utils/Endpoints.js";
import * as Alby from "../utils/Notifications/In-App/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";



import * as LoginToCognito from "./LoginToCognito.js";

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


async function login(phoneNumber,otp) {
    jwt = await LoginToCognito(phoneNumber,otp);
    const url = endpoints["/login"];
    const response = await AxiosSigned.get(url, {jwt});
    loginFuncCache = JSON.stringify(response.data) /// cache login resp
  //  Cache.set("loginFuncCache", loginFuncCache)
   // Cache.set("unreadCount", JSON.parse(loginFuncCache).unreadCount)
    //Cache.set("albyChannelId", response.data.albyChannelId);
  //  Cache.set("albyDecryptionKey", response.data.albyDecryptionKey);
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
    isOnboarding = false;
    onboardingScreenIndex = 0;
    //Cache.set("isOnboarding", isOnboarding)
    //Cache.set("onboardingScreenIndex", onboardingScreenIndex)
   // const jwt = Cache.getString("jwt");
    await AxiosSigned.post(endpoints["/logout"],jwt,null,null);
    Alby.removeListener();
}


async function logoutAndDelete() {
    logout();
    /// reset isOnboarding to false and onboardingIndex to 0
    /// as well as jwt, otp and anything else set in cache
    isOnboarding = false;
    onboardingScreenIndex = 0;
    Cache.set("isOnboarding", isOnboarding)
    Cache.set("onboardingScreenIndex", onboardingScreenIndex)
    Cache.set("otp", undefined)
    Cache.set("phoneNumber", undefined)
    Cache.set("firstName", undefined)
    Cache.set("lastName", undefined)
    Cache.set("jwt", undefined)
    Cache.set("loginFuncCache", undefined);
    Cache.set("schools", undefined)
    Cache.set("requestPolls", undefined)
    Cache.set("pageKey", undefined)
    Cache.set("addPageKey", undefined)
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
export {login, logout, logoutAndDelete, addRealtimeListener, removeRealtimeListener}