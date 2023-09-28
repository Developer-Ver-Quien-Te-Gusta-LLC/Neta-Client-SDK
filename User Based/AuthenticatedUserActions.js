//const Endpoints = require("../Endpoints.js");
//import * as Alby from "../utils/Notifications/In-App/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";
import { FetchEndpointsFromKV } from "../utils/Endpoints.js";
//const TestJWT="eyJhbGciOiJSUzI1NiIsImtpZCI6ImFhMDhlN2M3ODNkYjhjOGFjNGNhNzJhZjdmOWRkN2JiMzk4ZjE2ZGMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSGFzc2FuMTIzIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL25ldGEtMjllNGUiLCJhdWQiOiJuZXRhLTI5ZTRlIiwiYXV0aF90aW1lIjoxNjk1MDYzMjgwLCJ1c2VyX2lkIjoiMTNjMzk4MjItNGEzNy00MDk2LTlmNzctNmNiMWQzMmVhYWE3Iiwic3ViIjoiMTNjMzk4MjItNGEzNy00MDk2LTlmNzctNmNiMWQzMmVhYWE3IiwiaWF0IjoxNjk1MDYzMjgyLCJleHAiOjE2OTUwNjY4ODIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnt9LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.a5dYpX59gGu08zCG_TJSTvqKHFBFrXpw0xkB7Q7gZpzg9fxrp8XCxGq2S_Vtvcy95k2KksNe0kvGaMgN7RGtHDNE9S5oRgyw4M0DL5UPckPaOm_aaAMP48tr9seKOU-rUTQ6cf7PTAhwanzcevFk97_JSnGZ3v9sqGesY3e6jAIOt-i8EIZMoRT2s3JTh2Pv7U-H8gwX0wSNpm-C6MlpZfDbbDy4ENUbQixI0v6SYuWqHm7nwbL4LtAnZu6HZy-C1056WXiSA9xRQHFH-x9AriplhN4QZ3rvPPtXHzNjF5dZDNrCBMmJhocDptnmz7LxSDP7irlLCyyk25oiJ7EhPg"
// Variable to store endpoints
var endpoints;



// Function to initialize endpoints
async function InitializeEndpoints() {
  // Fetching endpoints from KV
  endpoints = await FetchEndpointsFromKV();
  /*await submitProfileChange("eyJhbGciOiJSUzI1NiIsImtpZCI6ImFhMDhlN2M3ODNkYjhjOGFjNGNhNzJhZjdmOWRkN2JiMzk4ZjE2ZGMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSGFzc2FuMTIzIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL25ldGEtMjllNGUiLCJhdWQiOiJuZXRhLTI5ZTRlIiwiYXV0aF90aW1lIjoxNjk0NzIwMjY3LCJ1c2VyX2lkIjoiZjg2Njk1NmMtZDQwNy00Mzg5LWI0OGQtYjVjZGRjZTYxMGZkIiwic3ViIjoiZjg2Njk1NmMtZDQwNy00Mzg5LWI0OGQtYjVjZGRjZTYxMGZkIiwiaWF0IjoxNjk0NzIwMjY4LCJleHAiOjE2OTQ3MjM4NjgsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnt9LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.MbpTFQAp5dviHNLmhL5PraGg8Ba_LCy-11UVX8YFIyMVxtu3oH1SIq3zk7rGqswYRkZ_GYb56T-_9dPWgeTN91jIXegNe4-hwowmeeIZCN4m3UQEB5qU-5LwBbkiHdJBZRbm0hbOHUYyvhsOLgOeXZmyPN36wUXM9RJ8ctiuVdM2Ct-myl6-LOACrOcpW3zxyKd4AXPyZbueX4J7ww01g6S3dNESf0q9_yGlFouOnzs64MapPLtxavOL9YCD63aQvJyLVutgT4jhqOFP0X4h_NDPdsye0UAoJXMk80qwnj2bW85IDK60baB9ZMVHJE3nngRjl_sC-X6Y8NAFWX3sdg"
  ,undefined,
  "Hassan2",
  undefined,
  undefined,
  false,
  false,
  false,
  false,
  false);*/
 // await DispatchVote("d910773d-ca20-4a2e-89d8-73cdb7b4d7ce","https://assets.descarganeta.com/570ece0d-a6e7-4616-9b8b-16bf18d94d7c.png","Quiere robarlos de su novio novia","033e86e6-f92b-4103-bcd3-ca662e8fe1d8",TestJWT);
 //await OnPollReveal("d25dfd89-1e64-40e9-a1dc-e43fe5dbbbbb",true,TestJWT);
}
// Calling the function to initialize endpoints
InitializeEndpoints();

async function submitPFP(fileBuffer, fileName, jwt) {
    try {
      const file = fileBuffer;
      const buffer = Buffer.from(file, "base64");
      const filename = path.basename(filePath);
      const mimetype = mime.lookup(filePath);
  
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
  
      if (!response.data || response.error) {
        onError.forEach((func) => func(response));
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
async function DispatchVote(Answer,asset, question,pollid, jwt = null) {
    const endpoint = endpoints["/dispatchVote"];
    //const jwt = Cache.getString("jwt");
    const res = await AxiosSigned.post(endpoint, jwt, {polls: JSON.stringify([{"uid":Answer,"question":question,"asset":asset,"pollid":pollid}])},null);
    console.log(res);
    return res;
}

async function submitProfileChange(jwt,gender, fname, lname, username, reduceNotifications, hideTopStars, takeBreak, nameInpolls, anonymousMode) {
    const res = await AxiosSigned.post(endpoints["/submitProfileChange"], jwt, {gender, fname, lname, username, reduceNotifications, hideTopStars, takeBreak, nameInpolls, anonymousMode}, null);
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