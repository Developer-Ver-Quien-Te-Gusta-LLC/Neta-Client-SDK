//const Endpoints = require("../Endpoints.js");
//import * as Alby from "../utils/Notifications/In-App/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";
import { FetchEndpointsFromKV } from "../utils/Endpoints.js";
var endpoints;
import axios from 'axios';
import FormData from 'form-data';
import path from 'path';
import mime from 'mime';



// Function to initialize endpoints
async function InitializeEndpoints() {
  // Fetching endpoints from KV
  endpoints = await FetchEndpointsFromKV();
 
}
// Calling the function to initialize endpoints
InitializeEndpoints();


async function submitPFP(fileBuffer, fileName, jwt) {
    try {
        const buffer = Buffer.from(fileBuffer, "base64");
        const mimetype = mime.getType(fileName);

        const data = new FormData();
        data.append("file", buffer, {
            filename: fileName,
            contentType: mimetype || "application/octet-stream",
        });

        const response = await axios({
            method: "POST",
            url: endpoints["/uploadpfp"],
            data: data,
            headers: {
                ...data.getHeaders(),
                Authorization: jwt,
            },
        });

        if (!response.data || response.data.error) {
            console.error("Error in response: ", response.data);
            return;
        }

        console.log("File uploaded successfully: ", response.data);
    } catch (error) {
        console.error("Error uploading file: ", error);
    }
}
async function checkUsernameUniqueness(requestedUsername){
    const endpoint = endpoints["/checkUsername"];
    const res = await AxiosSigned.post(endpoint, null,{username:requestedUsername},null);
    return res;
}
async function inviteUser(
    inviteeFname,
    inviteeLname,
    inviteephoneNumber,
    SendingDestination,
    invitescreen,
    jwt) {
    try {
       
        // Fetch jwt from cache
        if (!jwt) {
            console.error("No jwt in the cache");
            return;
        }
        // Prepare request url
        const url = endpoints["/invitations/request"];
        const QueryString = {inviteeFname:inviteeFname,
            inviteeLname : inviteeLname,
            inviteephoneNumber : inviteephoneNumber,
            SendingDestination : SendingDestination,
            invitescreen : invitescreen};

        // Send get request
        const response = await AxiosSigned.post(url, jwt,QueryString,null);

        if (response.data.success) {
            return { success: true, data: response.inviteuid };
        } else {
            return { success: false, message: response.error || "An error occurred while inviting the user" };
        }

    } catch (error) {
        console.error(error);
        return { success: false, message: error.message || "An error occurred while inviting the user" };
    }
}
async function fetchInvite(inviteuid) {
    try {
       
        // Fetch jwt from cache
       
        if (!jwt) {
            console.error("No jwt in the cache");
            return;
        }

        // Prepare request url
        const url = endpoints["/invitations/fetch"];

       const QueryString={inviteuid:inviteuid};

        // Send get request
        const response = await AxiosSigned.post(url,jwt,QueryString,null);

        if (response.data.success) {
            return { success: true, data: response.invite};
        } else {
            return { success: false, message: response.error || "An error occurred while fetching the invite" };
        }

    } catch (error) {
        console.error(error);
        return { success: false, message: response.error || "An error occurred while fetching the invitation" };
    }
}
async function OnPollReveal(messageUID,answerFirstLetter,jwt = null) {
    const QueryString = { messageUID: messageUID, firstLetter: answerFirstLetter };
    const endpoint = endpoints["/OnPollRevealed"];
    //const endpoint = "http://localhost:3000/revealPoll"
    const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
    console.log(res);
    return res;
}

async function ReadInbox(separator, messageID,jwt = null,pushedTime) {
    const QueryString = { uid: messageID, separator: separator ,pushedTime:pushedTime};
    const endpoint = endpoints["/readInbox"];
    const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
    return res;
}

/// pass in UID for Answer
async function DispatchVote(Answer,pollid, jwt = null,skipped=false) {
    const endpoint = endpoints["/dispatchVote"];
    const res = await AxiosSigned.post(endpoint, jwt, {"uid":Answer,"pollid":pollid,"skipped":skipped},null);
    console.log(res);
    return res;
}

async function submitProfileChange(jwt,gender, fname, lname, username, reduceNotifications, hideTopStars, takeBreak, nameInpolls, anonymousMode,highschool,grade) {
    const res = await AxiosSigned.post(endpoints["/submitProfileChange"], jwt, {gender, fname, lname, username, reduceNotifications, hideTopStars, takeBreak, nameInpolls, anonymousMode,highschool,grade}, null);
    if (res.success === false) {
        return false;
        
        //TODO; DISPLAY!
    }
    return res;
}

/// data = username, grade, username, numberOfStars
async function queryProfile(uid,jwt) {
    const endpoint = endpoints["/refresh"];
    const res = await AxiosSigned.post(endpoint, jwt, {requestedProfile: uid,requestedScreen:"profile"});
    return res;
}


async function RequestDeletion(jwt = null) {
    if (!jwt) {
        console.error("No jwt in the cache");
        return;
    }
    const url = endpoints["/requestDeletion"];
    const res = await AxiosSigned.post(url, jwt, null, null);
    return res;
}
async function DisableDeletion(jwt = null) {
   // const jwt = Cache.getString("jwt");
    if (!jwt) {
        console.error("No jwt in the cache");
        return;
    }
    const url = endpoints["/disableDeletion"];
    const res = await AxiosSigned.post(url, jwt, null, null);
    return res;
}

async function FetchPollsNow(jwt = null) {
    const endpoint = endpoints["/forceFetchPolls"];
   // const jwt = Cache.getString("jwt");
    const res = await AxiosSigned.post(endpoint, jwt, null, null);
    return res;
}

async function HideActivity(uids, jwt = null) {
    const endpoint = endpoints["/hideActivvity"];
    if (!Array.isArray(uids) || !uids.every(uid => typeof uid === 'string')) {
        throw new Error('uids must be an array of strings');
    }
    const uidsString = uids.join(',');
    
    const res = await AxiosSigned.post(endpoint, jwt, {uid: uidsString}, null);
    return res;
}

async function UpdateFCMNotificationToken(jwt,token){
    const url = endpoints["/setToken"];
    const res = await AxiosSigned.post(url,jwt,{token:token},null);
    return res;
}

export{
    queryProfile,
    inviteUser,
    submitPFP,
    submitProfileChange,
    OnPollReveal,
    ReadInbox,
    DispatchVote,
    FetchPollsNow,
    HideActivity,
    fetchInvite,
    DisableDeletion,
    RequestDeletion,
    checkUsernameUniqueness,
    UpdateFCMNotificationToken
}