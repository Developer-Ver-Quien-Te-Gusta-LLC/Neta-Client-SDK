import { _fetch } from "./KV.js";
 
var FetchedEndpoints = {
  "/verifypn/sendotp":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/sendOtp",
  "/verifypn/verifyotp":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/verifyOTP",
  "/verifypn/fetchStatus":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/fetchStatus",
  "/registration/fetchSchools":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/fetchschools",
  "/submitProfile":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/submitProfile",
  "/onboarding/addfriends":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/addfriends",
  "/uploadUserContacts":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/uploadUserContacts",
  "/setToken":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/setToken",
  "/generateNewCustomToken":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/generateNewCustomToken",
  "/uploadpfp":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/uploadpfp",
  "/checkLocationStatus":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/checkLocationStatus",
  "/requestDeletion":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/requestDeletion",
  "/disableDeletion":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/disableDeletion",
  "/recordEventNaive":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/recordEventNaive",
  "/checkUsername":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/checkUsername",
  "/friends/request":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/friends/request",
  "/friends/accept":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/friends/accept",
  "/friends/hide":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/friends/hide",
  "/friends/remove":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/friends/remove",
  "/friends/block":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/friends/block",
  "/friends/report":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/friends/report",
  "/friends/resetBlockList":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/friends/resetBlockList",
  "/friends/resetHideList":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/friends/resetHideList",
  "/submitProfileChange":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/submit-profile-change",
  "/login":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/login",
  "/refresh":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/Refresh",
  "/readInbox":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/readInbox",
  "/forceFetchPolls":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/forceFetchPolls",
  "/dispatchVote":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/dispatchVote",
  "/purchase":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/purchase",
  "/OnPollRevealed":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/revealPoll",
  "/hideActivity":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/hideActivity",
  "/invitations/request":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/invitations/request",
  "/invitations/fetch":"https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/invitations/fetch"
};
var LocalEndpoints = {
  "/verifypn/sendotp":"http://localhost:3000/sendOtp",
  "/verifypn/verifyotp":"http://localhost:3000/verifyOTP",
  "/verifypn/fetchStatus":"http://localhost:3000/fetchStatus",
  "/registration/fetchSchools":"http://localhost:3000/fetchschools",
  "/submitProfile":"http://localhost:3000/submitProfile",
  "/onboarding/addfriends":"http://localhost:3000/addfriends",
  "/uploadUserContacts":"http://localhost:3000/uploadUserContacts",
  "/setToken":"http://localhost:3000/setToken",
  "/generateNewCustomToken":"http://localhost:3000/generateNewCustomToken",
  "/uploadpfp":"http://localhost:3000/uploadpfp",
  "/checkLocationStatus":"http://localhost:3000/checkLocationStatus",
  "/requestDeletion":"http://localhost:3000/requestDeletion",
  "/disableDeletion":"http://localhost:3000/disableDeletion",
  "/recordEventNaive":"http://localhost:3000/recordEventNaive",
  "/checkUsername":"http://localhost:3000/checkUsername",
  "/friends/request":"http://localhost:3000/friends/request",
  "/friends/accept":"http://localhost:3000/friends/accept",
  "/friends/hide":"http://localhost:3000/friends/hide",
  "/friends/remove":"http://localhost:3000/friends/remove",
  "/friends/block":"http://localhost:3000/friends/block",
  "/friends/report":"http://localhost:3000/friends/report",
  "/friends/resetBlockList":"http://localhost:3000/friends/resetBlockList",
  "/friends/resetHideList":"http://localhost:3000/friends/resetHideList",
  "/submitProfileChange":"http://localhost:3000/submit-profile-change",
  "/login":"http://localhost:3000/login",
  "/refresh":"http://localhost:3000/Refresh",
  "/readInbox":"http://localhost:3000/readInbox",
  "/forceFetchPolls":"http://localhost:3000/forceFetchPolls",
  "/dispatchVote":"http://localhost:3000/dispatchVote",
  "/purchase":"http://localhost:3000/purchase",
  "/OnPollRevealed":"http://localhost:3000/revealPoll",
  "/hideActivity":"http://localhost:3000/hideActivity",
  "/invitations/request":"http://localhost:3000/invitations/request",
  "/invitations/fetch":"http://localhost:3000/invitations/fetch"
}

var isLocal = false;

const FetchEndpointsFromKV = () => {
  if(!isLocal)return FetchedEndpoints;
  else return LocalEndpoints;

}
 
var Callbacks = [];
 
async function onEndpointsFetched(Callback){
  if(FetchedEndpoints != undefined){
    Callback(true);
  }
  else{
    Callbacks.push(Callback);
  }
}
 
export { onEndpointsFetched, FetchEndpointsFromKV };