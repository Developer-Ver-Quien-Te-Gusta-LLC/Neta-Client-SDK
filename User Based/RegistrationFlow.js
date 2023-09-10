// Importing necessary modules and functions
import {FetchEndpointsFromKV} from "../utils/Endpoints.js";
import * as Alby from "../utils/Notifications/In-App/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";
import * as KV from "../utils/KV.js";
import * as geohash from "latlon-geohash";
import * as path from 'path';
import * as mime from 'mime-types';

// Variable to store endpoints
var endpoints;

// Function to initialize endpoints
async function InitializeEndpoints() {
  // Fetching endpoints from KV
  endpoints = await FetchEndpointsFromKV();
}
// Calling the function to initialize endpoints
InitializeEndpoints();

// Function to fetch schools based on geolocation and optional school name
async function fetchSchools(schoolName = undefined, latitude, longitude) {
  // Encoding latitude and longitude to geohash
  const geohashValue = geohash.encode(latitude, longitude);

  // Fetching the URL for the endpoint to fetch schools
  const url = endpoints["/registration/fetchSchools"];
  // Creating query string with client location
  const qstring = { clientlocation: geohashValue };
  // If school name is provided, add it to the query string
  if (schoolName != undefined) qString["queryname"] = schoolName;
  // Making a GET request to the endpoint with the query string
  const response = await AxiosSigned.get(url, undefined, qstring);

  // Returning the data received from the response
  return response.data.rows;
}

// Function to check if a location is geofenced
async function isGeofenced(latitude, longitude) {
  // Fetching geohash polygon from KV
  var geohashPolygon = await KV._fetch("geohashPolygon");
  // Parsing the geohash polygon string to an array
  geohashPolygon = parseStringToArray(geohashPolygon);

  // Creating a point with the provided latitude and longitude
  const point = turf.point([longitude, latitude]);
  // Decoding geohashes of the polygon to latitude/longitude
  const coordinates = geohashPolygon.map((gh) => {
    // Decoding each geohash to coordinates
    const decodedCoord = ngeohash.decode(gh);
    // Returning the coordinates as an array
    return [decodedCoord.longitude, decodedCoord.latitude];
  });

  // Closing the polygon by adding the first point at the end
  coordinates.push(coordinates[0]);

  // Creating a polygon with the coordinates
  const polygon = turf.polygon([coordinates]);

  // Checking if the point is inside the polygon
  return turf.booleanPointInPolygon(point, polygon);
}

// Function to send OTP to a phone number
async function submitPhoneNumber(phoneNumber) {
  // Fetching the URL for the endpoint to send OTP
  const url = endpoints["/verifypn/sendotp"];
  // Creating query string with phone number
  const qstring = { phoneNumber:phoneNumber };
  // Making a POST request to the endpoint with the query string
  const response = await AxiosSigned._post({uri:url,queryString:qstring});
  // Returning the success status from the response
  return response.data.success;
}

// Function to submit OTP and check if it's accepted
async function submitOTP(phoneNumber,otp) {
  // Fetching the URL for the endpoint to verify OTP
  const url = endpoints["/verifypn/verifyotp"];
  // Creating query string with OTP and phone number
  const qstring = { otp:otp, phoneNumber:phoneNumber };
  // Making a POST request to the endpoint with the query string
  const response = await AxiosSigned._post({uri:url,queryString:qstring});
  // If the response is successful or verified, return true, else return false
  if (response.success || response.verified) {
    return true;
  } else {
    return false;
  }
}

// Function to check if a phone number is already verified
async function verifyStatus(phoneNumber,otp) {
  // Fetching the URL for the endpoint to fetch verification status
  const url = endpoints["/verifypn/fetchStatus"];
  // Creating query string with phone number and OTP
  const qString = { phoneNumber, otp: otp };
  // Making a POST request to the endpoint with the query string
  const response = await AxiosSigned._post({uri:url,queryString:qString});
  // Returning the success status from the response
  return response.success;
}

// Function to submit user profile
async function SubmitProfile(gender,username,firstname,lastname,phonenumber,highschool,age,otp,grade) {
  // Fetching the URL for the endpoint to submit profile
  const url = endpoints["/submitProfile"];
  // Creating query string with user details
  const qstring = {
    username: username,
    firstName: firstname,
    lastName: lastname,
    phoneNumber: phonenumber,
    highschool: highschool,
    gender: gender,
    age: age,
    otp: otp,
    platform: Platform.OS,
    grade:grade
  };
  // Making a POST request to the endpoint with the query string
  const response = await AxiosSigned._post({uri:url,queryString:qstring});
  // If the profile is already submitted, do nothing
  if (response.data.alreadySubmitted) {
    
  }
  // Getting the transaction ID from the response
  const topicName = response.data.transactionId;
  // Setting up Alby with the transaction ID and the function to handle profile submission response
  Alby.setupAlbyWithChannel(topicName, handleSubmitProfileResponseAlby);
}

// Function to check the status of profile submission
async function checkSubmitProfile(phoneNumber) {
  // Fetching the URL for the endpoint to fetch profile submission status
  const url = endpoints["/submitProfile/fetchStatus"];
  // Creating query string with phone number
  const qstring = {phoneNumber:phoneNumber};
  // Making a POST request to the endpoint with the query string
  const response = await AxiosSigned._post({uri:url,queryString:qstring});
  // If the profile submission is resolved, get the user ID from the response
  if (response.data.resolved) {
    const uid = response.data.uid
  }
  // Returning the resolved status from the response
  return response.data.resolved;
}

// Function to handle profile submission response from Alby
async function handleSubmitProfileResponseAlby(data) {
  // If the onboarding screen index is not 8, do nothing
  if (onboardingScreenIndex != 8) return;
  // If the response is successful, increment the onboarding screen index and login
  if (data.success) {
    onboardingScreenIndex++;
    Cache.set("onboardingScreenIndex", onboardingScreenIndex);
    login(Cache.get("username"), Cache.get("otp"));
  }
}

// Function to submit profile picture
async function submitPFP(filePath,jwt) {
  try {
    // Reading the file as base64
    const file = await fs.readFile(filePath, { encoding: "base64" });
    // Converting the base64 file to buffer
    const buffer = Buffer.from(file, "base64");
    // Getting the filename with extension
    const filename = path.basename(filePath);
    // Getting the MIME type of the file
    const mimetype = mime.lookup(filePath);

    // Creating form data
    const data = new FormData();
    // Appending the file to the form data
    data.append("file", buffer, {
      filename: filename, // provide actual file name
      contentType: mimetype || "application/octet-stream", // provide actual file type or default to 'application/octet-stream'
    });

    // Making a POST request to the endpoint to upload profile picture with the form data and JWT
    const response = await axios({
      method: "POST",
      url: endpoints["/uploadpfp"],
      data: data,
      headers: {
        ...data.getHeaders(), // append form-data specific headers
        Authorization: jwt
      },
    });

    // Logging the success message
    console.log("File uploaded successfully: ", response.data);
  } catch (error) {
    // Logging the error message
    console.error("Error uploading file: ", error);
  }
}

// Function to fetch friends during onboarding
async function fetchAddFriendsOnboarding(pagenumber = 1,jwt) {
  // Fetching the URL for the endpoint to add friends during onboarding
  const url = endpoints["/onboarding/addfriends"];
  // Making a POST request to the endpoint with JWT and page number
  const response = await AxiosSigned.post(url,jwt,{pagenumber},null);
  // If the response is successful, return the data, else return null
  if (response.success) {
    return response.data;
  }
  else{
    return null;
  }
}

// Function to fetch all pages of friends during onboarding
async function fetchAllAddFriendsOnboardingPages(jwt) {
  // Initializing page number to 1
  let pagenumber = 1;
  // Initializing data to an empty array
  let data = [];

  // Loop to fetch all pages
  while (true) {
    // Fetching data for the current page
    const pageData = await fetchAddFriendsOnboarding(pagenumber,jwt);

    // If there is no data or the data length is 0, break the loop
    if (!pageData || pageData.length === 0) {
      break;
    }

    // Concatenating the page data to the main data
    data = data.concat(pageData);
  }
  // Returning the data
  return data;
}

// Function to upload user contacts
async function uploadUserContacts(username, contactsList) {
  // Fetching the URL for the endpoint to upload user contacts
  // This is the URL where we will send the user's contacts
  const url = endpoints["/uploadUserContacts"];
  try {
    // Creating form data
    // This is a multipart form data object, which allows us to send files and text data in the same request
    const form = new FormData();

    // Adding username and contacts without profile pictures to the form data
    // The username is added as a simple text field
    // The contacts are added as a JSON string, after removing the profile picture (pfp) field from each contact
    form.append("username", username);
    form.append(
      "contactsList",
      JSON.stringify(contactsList.map(({ pfp, ...rest }) => rest))
    );

    // Add profile pictures to the form data
    // For each contact that has a profile picture, we add the picture as a file field to the form data
    // The field name is "profilePicture" followed by the index of the contact in the list
    contactsList.forEach((contact, index) => {
      if (contact.pfp) {
        form.append(`profilePicture${index}`, fs.createReadStream(contact.pfp));
      }
    });

    // Sending the form data to the server using a PUT request
    // The headers of the request are automatically set by the form data object
    const response = await axios.put(url, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    // Logging the server response to the console
    // This can be useful for debugging
    console.log("Server response:", response.data);
    // Returning the server response
    // This can be used by the function caller to handle the result of the upload
    return response.data;
  } catch (error) {
    // If an error occurs, we log the error message to the console
    // This can be useful for debugging
    console.error("Error sending contact list:", error.message);
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
};

