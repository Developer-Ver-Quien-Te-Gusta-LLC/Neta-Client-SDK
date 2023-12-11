import { _fetch } from "./KV.js";
 
var FetchedEndpoints = {
  "/verifypn/sendotp": "https://onboarding-jhfmfvn6oa-ue.a.run.app/sendOtp",
  "/verifypn/verifyotp": "https://onboarding-jhfmfvn6oa-ue.a.run.app/verifyOTP",
  "/verifypn/fetchStatus": "https://onboarding-jhfmfvn6oa-ue.a.run.app/fetchStatus",
  "/registration/fetchSchools": "https://onboarding-jhfmfvn6oa-ue.a.run.app/fetchschools",
  "/submitProfile": "https://onboarding-jhfmfvn6oa-ue.a.run.app/submitProfile",
  "/onboarding/addfriends": "https://onboarding-jhfmfvn6oa-ue.a.run.app/addfriends",
  "/uploadUserContacts": "https://contactsync-jhfmfvn6oa-ue.a.run.app/uploadUserContacts",
  "/setToken": "https://account-jhfmfvn6oa-ue.a.run.app/setToken",
  "/uploadpfp": "https://account-jhfmfvn6oa-ue.a.run.app/uploadpfp",
  "/checkLocationStatus": "https://account-jhfmfvn6oa-ue.a.run.app/checkLocationStatus",
  "/requestDeletion": "https://account-jhfmfvn6oa-ue.a.run.app/requestDeletion",
  "/disableDeletion": "https://account-jhfmfvn6oa-ue.a.run.app/disableDeletion",
  "/recordEventNaive": "https://account-jhfmfvn6oa-ue.a.run.app/recordEventNaive",
  "/checkUsername": "https://account-jhfmfvn6oa-ue.a.run.app/checkUsername",
  "/friends/request": "https://friends-jhfmfvn6oa-ue.a.run.app/friends/request",
  "/friends/accept": "https://friends-jhfmfvn6oa-ue.a.run.app/friends/accept",
  "/friends/hide": "https://friends-jhfmfvn6oa-ue.a.run.app/friends/hide",
  "/friends/remove": "https://friends-jhfmfvn6oa-ue.a.run.app/friends/remove",
  "/friends/block": "https://friends-jhfmfvn6oa-ue.a.run.app/friends/block",
  "/friends/report": "https://friends-jhfmfvn6oa-ue.a.run.app/friends/report",
  "/friends/resetBlockList": "https://friends-jhfmfvn6oa-ue.a.run.app/friends/resetBlockList",
  "/friends/resetHideList": "https://friends-jhfmfvn6oa-ue.a.run.app/friends/resetHideList",
  "/submitProfileChange": "https://submitprofilechange-jhfmfvn6oa-ue.a.run.app/submit-profile-change",
  "/login": "https://social-graph-jhfmfvn6oa-ue.a.run.app/login",
  "/refresh": "https://social-graph-jhfmfvn6oa-ue.a.run.app/Refresh",
  "/readInbox": "https://social-graph-jhfmfvn6oa-ue.a.run.app/readInbox",
  "/forceFetchPolls": "https://social-graph-jhfmfvn6oa-ue.a.run.app/forceFetchPolls",
  "/dispatchVote": "https://social-graph-jhfmfvn6oa-ue.a.run.app/dispatchVote",
  "/purchase": "https://social-graph-jhfmfvn6oa-ue.a.run.app/purchase",
  "/OnPollRevealed": "https://social-graph-jhfmfvn6oa-ue.a.run.app/revealPoll",
  "/hideActivity": "https://social-graph-jhfmfvn6oa-ue.a.run.app/hideActivity",
  "/invitations/request": "https://0ioa1u4p5b.execute-api.us-east-1.amazonaws.com/invitations/request",
  "/invitations/fetch": "https://0ioa1u4p5b.execute-api.us-east-1.amazonaws.com/invitations/fetch",
  "/invite":"https://invite-website-jhfmfvn6oa-ue.a.run.app/invitations/request"
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