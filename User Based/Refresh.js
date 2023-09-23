import {FetchEndpointsFromKV} from "../utils/Endpoints.js";
import * as Alby from "../utils/Notifications/In-App/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";
import * as Login from "./LoginToFirebase.js";

var endpoints,refreshEndpoint;
async function InitializeEndpoints() {
  endpoints = await FetchEndpointsFromKV();
  refreshEndpoint = endpoints["/refresh"];
}

InitializeEndpoints();

//TO DO 
async function RefreshAll(jwt,platform,page_LimitInbox,page_FriendsOfFriends,page_SchoolUsers,page_Contacts,highschool,grade){
  const requestedScreen = "all";
  const qString = {requestedScreen:requestedScreen,platform:platform,page_LimitInbox:page_LimitInbox,page_FriendsOfFriends:page_FriendsOfFriends,page_SchoolUsers:page_SchoolUsers,page_Contacts:page_Contacts,highschool:highschool,grade:grade};

  const res = await AxiosSigned.post(refreshEndpoint,jwt,qString,null);
  return res;
}
async function RefreshHome(jwt,platform){
const requestedScreen = "home";
const qString = {requestedScreen:requestedScreen,platform:platform};
const res = await AxiosSigned.post(refreshEndpoint,jwt,qString,null);


return res;
}

var page_FriendsOfFriends,page_SchoolUsers,page_Contacts = 0;


async function RefreshAdd(jwt,platform,highschool,grade){
  const requestedScreen = "add";
  const qString = {requestedScreen:requestedScreen,platform:platform,page_FriendsOfFriends:page_FriendsOfFriends,page_SchoolUsers:page_SchoolUsers,page_Contacts:page_Contacts,highschool:highschool,grade:grade};

  const res = await AxiosSigned.post(refreshEndpoint,jwt,qString,null);
  console.log(res);
  page_FriendsOfFriends++;
  page_SchoolUsers++;
  page_Contacts++;
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
async function RefreshActivity(jwt,platform){
  const requestedScreen = "activity";
  const qString = {requestedScreen:requestedScreen,platform:platform};
  const res = await AxiosSigned.post(refreshEndpoint,jwt,qString,null);
return res;

}
export{RefreshAdd,RefreshAll,RefreshHome,RefreshInbox,RefreshInvite,RefreshActivity,RefreshProfile}