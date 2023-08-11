import { SendAnalytics } from "./utils/User Based/Analytics.js";
import {
    inviteUser,
    OnPollReveal,
    ReadInbox,
    DispatchVote,
    FetchPollsNow,
    fetchInvite,
    DisableDeletion,
    RequestDeletion
} from "./utils/User Based/authenticatedUserActions.js";
import {
    OnFriendRequest,
    AcceptFriendRequest,
    HideFriendRequestfriendPN,
    AddFriend,
    RemoveFriend,
    BlockFriend,
    ResetBlockList,
    

} from "./utils/User Based/friendSystem.js";
import {
    login as loginUtil,
    logout,
    logoutAndDelete,
    addRealtimeListener,
    removeRealtimeListener,
} from "./utils/User Based/loginLogout.js";
import { loginToCognito } from "./utils/User Based/LoginToCognito.js";
import {
    isOnboarding,
    submitPFP,
    fetchAddFriendsOnboarding,
    verifyStatus,
    submitAge,
    submitGrade,
    fetchSchools,
    submitSchool,
    fetchAllAddFriendsOnboardingPages,
    submitPhoneNumber,
    submitOTP,
    submitFirstName,
    submitLastName,
    submitUsername,
    submitGender,
    checkSubmitProfile,
    back,
    uploadUserContacts,
} from "./utils/User Based/registrationFlow.js";
import { fetch } from "./utils/User Based/refresh.js";

export {
    SendAnalytics,
    inviteUser,
    OnPollReveal,
    ReadInbox,
    DispatchVote,
    FetchPollsNow,
    OnFriendRequest,
    AcceptFriendRequest,
    HideFriendRequestfriendPN,
    AddFriend,
    RemoveFriend,
    BlockFriend,
    ResetBlockList,
    loginUtil,
    logout,
    logoutAndDelete,
    addRealtimeListener,
    removeRealtimeListener,
    loginToCognito,
    isOnboarding,
    submitPFP,
    fetchAddFriendsOnboarding,
    verifyStatus,
    submitAge,
    submitGrade,
    fetchSchools,
    submitSchool,
    fetchAllAddFriendsOnboardingPages,
    submitPhoneNumber,
    submitOTP,
    submitFirstName,
    submitLastName,
    submitUsername,
    submitGender,
    checkSubmitProfile,
    back,
    uploadUserContacts,
    fetch,
    fetchInvite
};

import {
    setupInAppNotifications,
    tearDownInAppNotifications,
    removeListener,
} from "./utils/Notifications/In-App/InAppNotifsHandler.js"

export {
    setupInAppNotifications,
    tearDownInAppNotifications,
    removeListener,
    
};

import {_fetch} from "./utils/KV.js"
export {_fetch as fetchFromKV}

import MixpanelLib from './react-native-mixpanel/index.js';

const mixpanelInstance = new MixpanelLib.MixpanelInstance();

// Export 'track' from MixpanelInstance
export const track = (event, properties) => {
  return mixpanelInstance.track(event, properties);
};

// Local cache for API values
const apiCache = {
  mixpanelToken: null,
  webhookEvents: null,
  webhookUri: null
};

// Fetch and cache a given key
const fetchAndCache = (key) => {
  if (apiCache[key] !== null) {
    // Return the cached value as a Promise
    return Promise.resolve(apiCache[key]);
  }

  // If not cached, fetch it
  return fetchFromKV(key).then(value => {
    apiCache[key] = value;  // Cache the value
    return value;  // Return the fetched value
  });
};

// Section for API calls to fetch one-time values and store
const initializeConfigs = () => {
  return Promise.all([
    fetchAndCache('mixpanelToken'),
    fetchAndCache('webhook_events'),
    fetchAndCache('webhook_uri')
  ])
  .then(([token, webhookEvents, webhookUri]) => {
    // Initialize Mixpanel with the fetched token
    mixpanelInstance.initialize(token);

    // Assuming 'webhookEvents' is a string that we need to parse
    mixpanelInstance.webhook_events = JSON.parse(webhookEvents);
    mixpanelInstance.webhook_uri = webhookUri;
  })
  .catch(error => {
    console.error('Failed to fetch data from KV store:', error);
  });
};

// Call to initialize the configs when the module is loaded
initializeConfigs();
