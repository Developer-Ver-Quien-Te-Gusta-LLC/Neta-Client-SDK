//const Endpoints = require("../Endpoints.js");
//import * as Alby from "../utils/Notifications/In-App/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";
import { FetchEndpointsFromKV } from "../utils/Endpoints.js";

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
async function inviteUser(uid, context = "add",isOnboarding,jwt = null) {
    try {
       
        // Fetch jwt from cache
        if (!jwt) {
            console.error("No jwt in the cache");
            return;
        }

        // Prepare request url
        const url = endpoints["/invitations/invite"];

        // Prepare axios configuration
        const axiosConfig = {
            headers: {
                Authorization: 'Bearer ' + jwt
            },
            params: {
                invitee : uid,
                context
            }
        };

        // Send get request
        const response = await AxiosSigned.get(url, axiosConfig);

        if (response.data.success) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response.data.message || "An error occurred while inviting the user" };
        }

    } catch (error) {
        console.error(error);
        return { success: false, message: error.message || "An error occurred while inviting the user" };
    }
}
async function fetchInvite(UID,isOnboarding,jwt = null) {
    try {
       
        // Fetch jwt from cache
       
        if (!jwt) {
            console.error("No jwt in the cache");
            return;
        }

        // Prepare request url
        const url = endpoints["/invitations/fetch"];

        // Prepare axios configuration
        const axiosConfig = {
            headers: {
                Authorization: 'Bearer ' + jwt
            },
            params: {
               uid:UID
            }
        };

        // Send get request
        const response = await AxiosSigned.get(url, axiosConfig);

        if (response.data.success) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response.data.message || "An error occurred while fetching the invite" };
        }

    } catch (error) {
        console.error(error);
        return { success: false, message: error.message || "An error occurred while fetching the invitation" };
    }
}
async function OnPollReveal(messageUID,answerFirstLetter,jwt = null) {
    const QueryString = { messageUID: messageUID, firstLetter: answerFirstLetter };
    const endpoint = endpoints["/OnPollRevealed"];
    const res = await AxiosSigned.get(endpoint, jwt, QueryString, null);
    return res;
}

async function ReadInbox(separator, messageID,jwt = null) {
    const QueryString = { uid: messageID, separator: separator };
    const endpoint = endpoints["/readInbox"];
    const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
    return res;
}

/// TODO: impl
async function DispatchVote(Answer,asset, question, jwt = null) {
    const endpoint = endpoints["/DispatchVote"];
    //const jwt = Cache.getString("jwt");
    const res = await AxiosSigned.post(endpoint, jwt, null, {polls: JSON.stringify([{"uid":Answer,"question":question,"asset":asset}])});
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
async function queryProfile(uid) {
    const endpoint = endpoints["/refresh"];
    const res = await AxiosSigned.post(endpoint, null, {requestedProfile: uid,requestedScreen:"profile"});
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

async function UpdateFCMNotificationToken(jwt,token){
    const url = endpoints["setToken"];
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
    fetchInvite,
    DisableDeletion,
    RequestDeletion,
    checkUsernameUniqueness,
    UpdateFCMNotificationToken
}