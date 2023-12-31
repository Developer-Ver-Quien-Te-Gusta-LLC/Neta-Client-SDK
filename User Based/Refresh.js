import {FetchEndpointsFromKV} from "../utils/Endpoints.js";
import * as Alby from "../utils/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";
import * as Login from "./LoginToFirebase.js";

var endpoints,refreshEndpoint;
async function InitializeEndpoints() {
  endpoints = await FetchEndpointsFromKV();
  refreshEndpoint = endpoints["/refresh"];
}

InitializeEndpoints();

var page_FriendsOfFriends=1
var page_SchoolUsers=1
var page_Contacts = 1

//TO DO 
async function RefreshAll(jwt,platform,page_LimitInbox){
  const requestedScreen = "all";
  const qString = {requestedScreen:requestedScreen,platform:platform,page_LimitInbox:page_LimitInbox,page_FriendsOfFriends:page_FriendsOfFriends,page_SchoolUsers:page_SchoolUsers,page_Contacts:page_Contacts};
  const res = await AxiosSigned.post(refreshEndpoint,jwt,qString,null);
  return res;
}



// pass in friendRequstsPage as undefined for 0 , pagekey for next page
async function RefreshAdd(jwt,platform,highschool,grade, page_FriendsOfFriends,page_SchoolUsers,page_Contacts,username){
  const requestedScreen = "add";
  var qString;
  if(username != undefined) {
    qString = {requestedScreen:requestedScreen,platform:platform,page_FriendsOfFriends:page_FriendsOfFriends,page_SchoolUsers:page_SchoolUsers,page_Contacts:page_Contacts,highschool:highschool,grade:grade,name:username};
  }
  else{
    qString = {requestedScreen:requestedScreen,platform:platform,page_FriendsOfFriends:page_FriendsOfFriends,page_SchoolUsers:page_SchoolUsers,page_Contacts:page_Contacts,highschool:highschool,grade:grade};

  }
  const res = await AxiosSigned.post(refreshEndpoint,jwt,qString,null);
  console.log(res);
 

return res;
}


async function RefreshInbox(jwt,platform,page){
  const requestedScreen = "inbox";
  const qString = {requestedScreen:requestedScreen,platform:platform,page:page};

  const res = await AxiosSigned.post(refreshEndpoint,jwt,qString,null);
return res;
}

async function RefreshProfile(jwt,platform,requestedProfile){
  const requestedScreen = "profile";
  const qString = {requestedScreen:requestedScreen,platform:platform,requestedProfile:requestedProfile};

  const res = await AxiosSigned.post(refreshEndpoint,jwt,qString,null);
  console.log(res);
return res;
}

async function RefreshInvite(jwt,platform){
  const requestedScreen = "invite";
  const qString = {requestedScreen:requestedScreen,platform:platform};
  const res = await AxiosSigned.post(refreshEndpoint,jwt,qString,null);
return res;
}

//TO DO 
async function RefreshActivity(jwt,platform,page){
  const requestedScreen = "activity";
  const qString = {requestedScreen:requestedScreen,platform:platform,page:page};
  const res = await AxiosSigned.post(refreshEndpoint,jwt,qString,null);
return res;

}
export{RefreshAdd,RefreshAll,RefreshInbox,RefreshInvite,RefreshActivity,RefreshProfile}