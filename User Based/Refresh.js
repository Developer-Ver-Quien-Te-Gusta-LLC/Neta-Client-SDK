import {FetchEndpointsFromKV} from "../utils/Endpoints.js";
import * as Alby from "../utils/Notifications/In-App/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";
import * as LoginToCognito from "./LoginToCognito.js";
import { setStorage, getStorage } from "../utils/AsyncStorage.js";

var endpoints;
async function InitializeEndpoints() {
  endpoints = await FetchEndpointsFromKV();
}

InitializeEndpoints();

/// TODO: LoginToCognito resets inboxData.pageKey and pageKey and addPageKey 

/// invoked by the user to refresh with either
/// home, all, add, inbox, profile, invite
/// page is for 'add' only and is stored in cache 'nextPageKey'
async function RefreshScreen(screen = "home") {
  await LoginToCognito();
  const jwt = await getStorage("jwt");
  const url = endpoints["/refresh"];
  var qStrng = {
    jwt,
    requestedScreen: screen,
  }
  if (screen == "inbox" && await getStorage("pageKey") != undefined) {
    qStrng.page = await getStorage("pageKey")
  } else if (screen == "add" && await getStorage("addPageKey") != undefined) {
    qStrng.page = await getStorage("addPageKey")
  }
  const response = await AxiosSigned.get(url, qStrng);;

  // Cache and setup Alby
  setStorage("albyChannelId", response.data.albyChannelId);
  setStorage("albyDecryptionKey", response.data.albyDecryptionKey);
  Alby.setupAlbyWithChannel(response.data.albyChannelId, handleAlbyData);

  // Return the data based on the requested screen
  if (screen === "all") {
    const {
      home,
      add,
      inbox,
      profile,
      invite,
      albyChannelId,
      albyDecryptionKey,
    } = response.data;
    // Cache data
   setStorage("homeData", home);
   setStorage("addData", add);
   setStorage("inboxData", inbox);
   setStorage("profileData", { [response.requestedProfile]: profile });
   setStorage("inviteData", invite);
   setStorage("FriendRequests", response.data.profile.friendRequests.count);
    return {
      home,
      add,
      inbox,
      profile,
      invite,
      albyChannelId,
      albyDecryptionKey,
      FriendRequestsCount: response.data.profile.friendRequests.count,
    };
  } else if (screen === "home") {
    // Cache data
   setStorage("homeData", response.data.data);
    return response.data.data;
  } else if (screen === "add") {
    // Cache data
    const addData = response.data.data;
   setStorage("addData", addData);
    if (response.data.nextPage)setStorage("addPageKey", response.data.nextPage);
    return addData;
} else if (screen === "inbox") {
    // Cache data
   setStorage("inboxData", response.data.data);
    if (response.data.nextPageKey)setStorage("pageKey", response.data.nextPageKey);
   setStorage("unreadCount", response.data.unreadCount)
    return {inboxData: response.data.inbox, unreadCount: response.data.unreadCount};
  } else if (screen === "profile") {
    if (req.query.requestedProfile == undefined) {
      // Cache data
     setStorage("profileData", {
        [response.requestedProfile]: response.data.userData,
      });
      return response.data.userData;
    }
    // Cache data
   setStorage("profileData", {
      [response.requestedProfile]: response.data.data,
    });
    return response.data.data;
  } else if (screen === "invite") {
    // Cache data
   setStorage("inviteData", response.data.data);
    return response.data.data;
  }
}

export{RefreshScreen}