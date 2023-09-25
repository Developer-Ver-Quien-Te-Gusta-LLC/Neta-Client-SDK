// Importing necessary modules and functions
import { FetchEndpointsFromKV } from "../utils/Endpoints.js";
import {setupInAppNotifications} from "../utils/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";
import * as KV from "../utils/KV.js";
import * as path from "path";
import * as mime from "mime-types";
import ngeohash from "ngeohash";


import FormData from "form-data";


var onError = []; /// should take in one param which is the response obj

var endpoints;

let fetchedSchools = [];
let nextPageToken = null;
let lastSchoolName = null;

async function InitializeEndpoints() {
  // Fetching endpoints from KV
  endpoints = await FetchEndpointsFromKV();
  //submitPhoneNumber("+918989830517");
  //submitOTP("+918989830517","0000");
  //SubmitProfile("male","Daxx","Daksh","Dhakad","+918989830517","RWKHS",15,"0000",10,"ios");
}
// Calling the function to initialize endpoints
InitializeEndpoints();

// Function to fetch schools based on geolocation and optional school name
async function fetchSchools(
  schoolName = undefined,
  latitude,
  longitude,
  pageSize = 12
) {
 
  const url = endpoints["/registration/fetchSchools"];
  const geohash = ngeohash.encode(latitude, longitude);
  
  const qstring = { geohashValue:geohash, pageSize };
  if (schoolName != undefined) qstring["queryname"] = schoolName;
  const response = await AxiosSigned.post(url, undefined,qstring,undefined );
  if (!response.data || !response.data.success || response.error != undefined) {
    onError.forEach((func) => func(response));
  }

  // Returning the data received from the response
  return response.data;
}


async function fetchSchoolsPaginated(
  schoolName = undefined,
  latitude,
  longitude,
  pageSize = 10
) {
  if (lastSchoolName != null && lastSchoolName != schoolName) {
    // CASE: school name changed, reset stored pagination token
    nextPageToken = null;
    fetchedSchools = [];
  }
  lastSchoolName = schoolName;


  const url = endpoints["/registration/fetchSchools"];

  const qstring = { pageSize, latitude, longitude };
  console.log(url + qstring);

  if (schoolName != undefined) qstring["queryname"] = schoolName;

  if (nextPageToken != null) qstring["nextPageToken"] = nextPageToken;

  const response = await AxiosSigned.post(url, undefined, qstring);
  // Check if the response has an error
  if (!response.data) {
    onError.forEach((func) => func(response));
    return;
  }

  // Update nextPageToken for the next page
  if (response.data.nextPageToken) {
    nextPageToken = response.data.nextPageToken;
  } else {
    nextPageToken = null;
  }
  // Add the fetched schools to the fetchedSchools array
  fetchedSchools = [...fetchedSchools, ...response.data];

  // Returning the fetched schools
  return fetchedSchools;
}

function clearFetchSchools() {
  // Clear the fetched schools and reset the nextPageToken
  fetchedSchools = [];
  nextPageToken = null;
}

async function isGeofenced(latitude, longitude) {
  var geohashPolygon = await KV._fetch("geohashPolygon");
  geohashPolygon = parseStringToArray(geohashPolygon);

  const point = turf.point([longitude, latitude]);
  const coordinates = geohashPolygon.map((gh) => {
    const decodedCoord = ngeohash.decode(gh);
    return [decodedCoord.longitude, decodedCoord.latitude];
  });

  coordinates.push(coordinates[0]);

  const polygon = turf.polygon([coordinates]);

  return turf.booleanPointInPolygon(point, polygon);
}

async function submitPhoneNumber(phoneNumber) {
  const url = endpoints["/verifypn/sendotp"];
  const qstring = { phoneNumber: phoneNumber };
  const response = await AxiosSigned._post({ uri: url, queryString: qstring });
  if (!response.data || response.error) {
    onError.forEach((func) => func(response));
    return;
  }
  return response.success;
}

async function submitOTP(phoneNumber, otp) {
  const url = endpoints["/verifypn/verifyotp"];
  const qstring = { otp: otp, phoneNumber: phoneNumber };
  const response = await AxiosSigned._post({ uri: url, queryString: qstring });
  console.log(response);
  if (response.verified) {
    return true;
  } else {
    return false;
  }
}

async function verifyStatus(phoneNumber) {
  const url = endpoints["/verifypn/fetchStatus"];
  const qString = { phoneNumber };
  const response = await AxiosSigned._post({ uri: url, queryString: qString });
  if (response.error || !response.data) {
    onError.forEach((func) => func(response));
  }
  return response.success;
}

//@hassan please call SetupInAppNotifications.js after you get a response from this function , pass in the functions too
async function SubmitProfile(gender, username, firstname, lastname, phonenumber, highschool, age, otp, grade, os) {
  const url = endpoints["/submitProfile"];
  const qstring = { username: username, firstName: firstname, lastName: lastname, phoneNumber: phonenumber, highschool: highschool, gender: gender, age: age, otp: otp, platform: os, grade: grade };
  const response = await AxiosSigned._post({ uri: url, queryString: qstring });
  console.log(response);
  //if (!response.data || response.error) { onError.forEach((func) => func(response)); return; }
  const topicName = response.albyTopicId;
  return topicName;
}

async function checkSubmitProfile(phoneNumber) {
  const url = endpoints["/submitProfile/fetchStatus"];
  const qstring = { phoneNumber: phoneNumber };
  const response = await AxiosSigned._post({ uri: url, queryString: qstring });
  if (!response.data || response.error) {
    onError.forEach((func) => func(response));
    return;
  }

  if (!response.success) {
    
  }

  return response.data.resolved;
}

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

async function fetchAddFriendsOnboarding(
  page_peopleYouMayKnow = 1,
  page_peopleInContacts = 1,
  jwt,
  grade,
  highschool
) {
  const url = endpoints["/onboarding/addfriends"];
  const response = await AxiosSigned.post(
    url,
    jwt,
    {
      page_peopleYouMayKnow: page_peopleYouMayKnow,
      page_peopleInContacts: page_peopleInContacts,
      grade: grade,
      highschool: highschool,
    },
    null
  );
  if (!response.data || response.error) {
    onError.forEach((func) => func(response));
    return;
  }
  return response.data;
}

async function fetchAllAddFriendsOnboardingPages(jwt) {
  let pagenumber = 1;
  let data = [];

  while (true) {
    const pageData = await fetchAddFriendsOnboarding(pagenumber, jwt);

    if (!pageData || pageData.length === 0) {
      break;
    }

    data = data.concat(pageData);
  }
  return data;
}

async function uploadUserContacts(phoneNumber, contactsList) {
  const url = endpoints["/uploadUserContacts"];
try {
  const queryParams = {
    phoneNumber: phoneNumber,
    contactsList: JSON.stringify(contactsList),
  };

  const response = await AxiosSigned.put(url, null, queryParams,null);

  if (response.error) {
    onError.forEach((func) => func(response));
  }

  console.log("Server response:", response);
  return response;
} catch (error) {
  console.error("Error sending contact list:", error);
}
}

export {
  submitPFP,
  fetchAddFriendsOnboarding,
  verifyStatus,
  isGeofenced,
  fetchSchools,
  fetchAllAddFriendsOnboardingPages,
  submitPhoneNumber,
  submitOTP,
  SubmitProfile,
  checkSubmitProfile,
  uploadUserContacts,
  fetchSchoolsPaginated,
  clearFetchSchools,
};
