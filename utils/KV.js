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
 
const FetchEndpointsFromKV = () => {
  return FetchedEndpoints;
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