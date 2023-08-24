import {FetchEndpointsFromKV} from "../utils/Endpoints.js";
import * as Alby from "../utils/Notifications/In-App/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";
import * as KV from "../utils/KV.js";
//const Geolocation = require("@react-native-community/geolocation");
import * as geohash from "latlon-geohash";
import * as path from 'path';
import * as mime from 'mime-types';

var endpoints;



async function InitializeEndpoints() {
  endpoints = await FetchEndpointsFromKV();
}

InitializeEndpoints();

/// TODO: get encoded geolocation from qparam 'clientlocation'
/// and also support paging via param pageToken and use return val nextPageToken
async function fetchSchools(schoolName = undefined, latitude, longitude) {
  // if (onboardingScreenIndex != 2) return;
  // fetch the geolocation
  //const { latitude, longitude } = info.coords;

  const geohashValue = geohash.encode(latitude, longitude);
  //Cache.set("geohash", geohashValue);

  // use the geohash value to get the schools
  const url = endpoints["/registration/fetchSchools"];
  const qstring = { clientlocation: geohashValue };
  if (schoolName != undefined) qString["queryname"] = schoolName;
  const response = await AxiosSigned.get(url, undefined, qstring);
  // Cache.set("schools", JSON.stringify(response.data.rows));
  return response.data.rows;
}

async function isGeofenced(latitude, longitude) {
  var geohashPolygon = await KV._fetch("geohashPolygon");
  geohashPolygon = parseStringToArray(geohashPolygon);

  const point = turf.point([longitude, latitude]);
  // Decode geohashes of the polygon to latitude/longitude
  const coordinates = geohashPolygon.map((gh) => {
    const decodedCoord = ngeohash.decode(gh);
    return [decodedCoord.longitude, decodedCoord.latitude];
  });

  // Close the polygon by adding the first point at the end
  coordinates.push(coordinates[0]);

  const polygon = turf.polygon([coordinates]);

  // Check if the point is inside the polygon
  return turf.booleanPointInPolygon(point, polygon);
}


/// Sends an OTP to the given phoneNumber
async function submitPhoneNumber(phoneNumber) {
  //if (onboardingScreenIndex != 3) return;
  //Cache.set("phoneNumber", phoneNumber);
  const url = endpoints["/verifypn/sendotp"];
  const qstring = { phoneNumber };
  const response = await AxiosSigned.get(url, undefined, qstring);
  return response.data.success;
}

/// submits an otp returns true if its accepted, else returns false
async function submitOTP(phoneNumber,otp) {
  //if (onboardingScreenIndex != 3) return;
  //if (!phoneNumber) phoneNumber = Cache.getString("phoneNumber");
  const url = endpoints["/verifypn/verifyotp"];
  const qstring = { otp, phoneNumber };
  const response = await AxiosSigned.get(url, null, qstring);
  if (response.data.success || response.data.verified) {
   // Cache.set("otp", otp);
   // onboardingScreenIndex++;
   // Cache.set("onboardingScreenIndex", onboardingScreenIndex);
    return true;
  } else {
    return false;
  }
}

/// Invoke by the user to check if their phone number is already verified
async function verifyStatus(phoneNumber,otp) {
  if (onboardingScreenIndex != 4) return;
  //var phoneNumber = Cache.get("phoneNumber");
  const url = endpoints["/verifypn/fetchStatus"];
  const qString = { phoneNumber, otp: otp };
  const response = await AxiosSigned.get(url, null, qstring);
  if (response.data.success) {
    onboardingScreenIndex++;
   // Cache.set("onboardingScreenIndex", onboardingScreenIndex);
  }
  return response.data.success;
}


async function submitGender(gender,username,firstname,lastname,phonenumber,highschool,age,otp) {
  //if (onboardingScreenIndex != 8) return;
  //isOnboarding = false;
 // Cache.set("isOnboarding", isOnboarding);
  //Cache.set("gender", gender);
  onboardingScreenIndex++;
 // Cache.set("onboardingScreenIndex", onboardingScreenIndex);
  const url = endpoints["/submitProfile"];
  const qstring = {
    username: username,
    firstName: firstname,
    lastName: lastname,
    phoneNumber: phonenumber,
    highschool: highschool,
    gender: gender,
    age: age,
    //school: Cache.get("school"),
    otp: otp,
    platform: Platform.OS,
  };
  const response = await AxiosSigned.get(url, null, qstring);
  if (response.data.alreadySubmitted) {
    /// skip submittal
    //onboardingScreenIndex++;
    //Cache.set("onboardingScreenIndex", onboardingScreenIndex);
  }
  const topicName = response.data.transactionId;
  Alby.setupAlbyWithChannel(topicName, handleSubmitProfileResponseAlby);
}

async function checkSubmitProfile(phoneNumber) {
  //if (onboardingScreenIndex != 8) return;
  const url = endpoints["/submitProfile/fetchStatus"];
  const response = await AxiosSigned.get(url);
  if (response.data.resolved) {
    //onboardingScreenIndex++;
    //Cache.set("onboardingScreenIndex", onboardingScreenIndex);
  }
  return response.data.resolved;
}

async function handleSubmitProfileResponseAlby(data) {
  if (onboardingScreenIndex != 8) return;
  if (data.success) {
    onboardingScreenIndex++;
    Cache.set("onboardingScreenIndex", onboardingScreenIndex);
    login(Cache.get("username"), Cache.get("otp"));
  }
}


/// invoked by the client to submit his pfp given local path to an img
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

async function fetchAddFriendsOnboarding(pagenumber = 1) {
  if (onboardingScreenIndex != 10) return;
  onboardingScreenIndex++;
  Cache.set("onboardingScreenIndex", onboardingScreenIndex);

  const jwt = Cache.get("jwt");
  const url = endpoints["/onboarding/addfriends"];
  const response = await AxiosSigned.get(url, jwt, { pagenumber });
  if (response.success) {
    Cache.set("addFriendsOnboarding", JSON.stringify(response.data));
    Cache.set("addFriendsOnboardingNextPage", response.nextPage);
    return response.data;
  }
}

// auto page
async function fetchAllAddFriendsOnboardingPages() {
  let pagenumber = 1;
  let data = [];

  while (true) {
    const pageData = await fetchAddFriendsOnboarding(pagenumber);

    if (!pageData || pageData.length === 0) {
      break;
    }

    data = data.concat(pageData);
    pagenumber = Cache.get("addFriendsOnboardingNextPage");
  }
  return data;
}

//Example
//const contactsList = [{ Fname: 'John', Lname: 'Doe', favorite: true, pfp: 'C:/Users/Daxx/Downloads/mummy.png', }];
async function uploadUserContacts(username, contactsList) {
  const url = endpoints["/uploadUserContacts"];
  try {
    const form = new FormData();

    // Add username and contacts without profile pictures to the form data
    form.append("username", username);
    form.append(
      "contactsList",
      JSON.stringify(contactsList.map(({ pfp, ...rest }) => rest))
    );

    // Add profile pictures to the form data
    contactsList.forEach((contact, index) => {
      if (contact.pfp) {
        form.append(`profilePicture${index}`, fs.createReadStream(contact.pfp));
      }
    });

    const response = await axios.put(url, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    console.log("Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending contact list:", error.message);
  }
}

export {
 // isOnboarding,
  submitPFP,
  fetchAddFriendsOnboarding,
  verifyStatus,
  isGeofenced,
  fetchSchools,
  fetchAllAddFriendsOnboardingPages,
  submitPhoneNumber,
  submitOTP,
  submitGender,
  checkSubmitProfile,
  uploadUserContacts,
};
