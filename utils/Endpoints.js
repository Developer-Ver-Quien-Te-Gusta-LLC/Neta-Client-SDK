import { _fetch } from "./KV.js";
  const  FetchedEndpoints = {
    "/invite" : "https://invite-website-jhfmfvn6oa-ue.a.run.app/invitations/request",
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
  "/logout":"https://social-graph-jhfmfvn6oa-ue.a.run.app/logout",
  "/refresh": "https://social-graph-jhfmfvn6oa-ue.a.run.app/Refresh",
  "/readInbox": "https://social-graph-jhfmfvn6oa-ue.a.run.app/readInbox",
  "/forceFetchPolls": "https://social-graph-jhfmfvn6oa-ue.a.run.app/forceFetchPolls",
  "/dispatchVote": "https://social-graph-jhfmfvn6oa-ue.a.run.app/dispatchVote",
  "/purchase": "https://social-graph-jhfmfvn6oa-ue.a.run.app/purchase",
  "/OnPollRevealed": "https://social-graph-jhfmfvn6oa-ue.a.run.app/revealPoll",
  "/hideActivity": "https://social-graph-jhfmfvn6oa-ue.a.run.app/hideActivity",
  "/invitations/request": "https://0ioa1u4p5b.execute-api.us-east-1.amazonaws.com/invitations/request",
  "/invitations/fetch": "https://0ioa1u4p5b.execute-api.us-east-1.amazonaws.com/invitations/fetch",
  "/invite":"https://invite-website-jhfmfvn6oa-ue.a.run.app"
};

const FetchEndpointsFromKV = () => {
   return LocalEndpoints;
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
 
export { onEndpointsFetched, FetchEndpointsFromKV, FetchedEndpoints };