//const Endpoints = require("../Endpoints.js");
//import * as Alby from "../utils/Notifications/In-App/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";

async function submitPFP(filePath) {
    // if (onboardingScreenIndex != 9) return;
     //onboardingScreenIndex++;
    // Cache.set("onboardingScreenIndex", onboardingScreenIndex);
     try {
       const file = await fs.readFile(filePath, { encoding: "base64" }); // read file as base64
       const buffer = Buffer.from(file, "base64"); // convert base64 to buffer
       const filename = path.basename(filePath); // get the filename with extension
       const mimetype = mime.lookup(filePath); // get the MIME type of the file
   
       const data = new FormData(); // create form data
       data.append("file", buffer, {
         filename: filename, // provide actual file name
         contentType: mimetype || "application/octet-stream", // provide actual file type or default to 'application/octet-stream'
       });
   
       const response = await axios({
         method: "POST",
         url: endpoints["/uploadpfp"],
         data: data,
         headers: {
           ...data.getHeaders(), // append form-data specific headers
           Authorization: Cache.getString("jwt"), // your custom authorization header
         },
       });
   
       console.log("File uploaded successfully: ", response.data);
     } catch (error) {
       console.error("Error uploading file: ", error);
     }
   }

/// invoked to invite a user
/// context = "add", "invite", "share"
async function inviteUser(phoneNumber, context = "add",isOnboarding,jwt = null) {
    try {
        // Check if onboarding is still happening
        if (isOnboarding) {
            console.error("User is still onboarding");
            return;
        }

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
                invitee : phoneNumber,
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
        // Check if onboarding is still happening
        if (isOnboarding) {
            console.error("User is still onboarding");
            return;
        }

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
   // const jwt = Cache.getString("jwt");
    const res = await AxiosSigned.get(endpoint, jwt, QueryString, null);
    return res;
}

async function ReadInbox(separator, messages,jwt = null) {
    const QueryString = { messages: messages, separator: separator };
    const endpoint = endpoints["/readInbox"];
    //const jwt = Cache.getString("jwt");
    const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
    return res;
}

/// TODO: impl
async function DispatchVote(polls,jwt = null) {
    const endpoint = endpoints["/registerPolls"];
    //const jwt = Cache.getString("jwt");
    const QueryString = { polls: polls };
    const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
    return res;
}

async function submitProfileChange(gender, fname, lname, username, reduceNotifications, hideTopStars, takeBreak, nameInpolls, anonymousMode) {
    const res = await AxiosSigned.post(endpoints["/submitProifleChange"], null, null, {gender, fname, lname, username, reduceNotifications, hideTopStars, takeBreak, nameInpolls, anonymousMode});
    return res;
}

async function submitPFP(filePath) {
 // if (onboardingScreenIndex != 9) return;
  //onboardingScreenIndex++;
 // Cache.set("onboardingScreenIndex", onboardingScreenIndex);
  try {
    const file = await fs.readFile(filePath, { encoding: "base64" }); // read file as base64
    const buffer = Buffer.from(file, "base64"); // convert base64 to buffer
    const filename = path.basename(filePath); // get the filename with extension
    const mimetype = mime.lookup(filePath); // get the MIME type of the file

    const data = new FormData(); // create form data
    data.append("file", buffer, {
      filename: filename, // provide actual file name
      contentType: mimetype || "application/octet-stream", // provide actual file type or default to 'application/octet-stream'
    });

    const response = await axios({
      method: "POST",
      url: endpoints["/uploadpfp"],
      data: data,
      headers: {
        ...data.getHeaders(), // append form-data specific headers
        Authorization: Cache.getString("jwt"), // your custom authorization header
      },
    });

    console.log("File uploaded successfully: ", response.data);
  } catch (error) {
    console.error("Error uploading file: ", error);
  }
}

async function RequestDeletion(jwt = null) {
   // const jwt = Cache.getString("jwt");
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
    const endpoint = endpoints["/fetchPollsNow"];
   // const jwt = Cache.getString("jwt");
    const res = await AxiosSigned.post(endpoint, jwt, null, null);
    return res;
}
export{
    inviteUser,
    submitPFP,
    submitProfileChange,
    OnPollReveal,
    ReadInbox,
    DispatchVote,
    FetchPollsNow,
    fetchInvite,
    DisableDeletion,
    RequestDeletion
}