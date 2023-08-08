import { SendAnalytics } from "./utils/userBased/analytics";
import {
    inviteUser,
    OnPollReveal,
    OnPollRevealedPartial,
    ReadInbox,
    RegisterPolls,
    FetchPollsNow,
    fetchInvite
} from "./utils/userBased/authenticatedUserActions";
import {
    OnFriendRequest,
    AcceptFriendRequest,
    HideFriendRequestfriendPN,
    AddFriend,
    RemoveFriend,
    BlockFriend,
    ResetBlockList,
    DisableDeletion,
    RequestDeletion

} from "./utils/userBased/friendSystem";
import {
    login as loginUtil,
    logout,
    logoutAndDelete,
    addRealtimeListener,
    removeRealtimeListener,
} from "./utils/userBased/loginLogout";
import { loginToCognito } from "./utils/userBased/loginToCognito";
import {
    fetchCache,
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
    handleSubmittalSuccess,
    back,
    login as loginRegistration,
    uploadEmojiContacts,
    uploadUserContacts,
} from "./utils/userBased/registrationFlow";
import { fetch } from "./utils/userBased/refresh";

export {
    SendAnalytics,
    inviteUser,
    OnPollReveal,
    OnPollRevealedPartial,
    ReadInbox,
    RegisterPolls,
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
    fetchCache,
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
    handleSubmittalSuccess,
    back,
    loginRegistration,
    uploadEmojiContacts,
    uploadUserContacts,
    fetch,
    fetchInvite
};

import {
    setupInAppNotifications,
    tearDownInAppNotifications,
    removeListener,
    inboxReceivedListener,
    friendEventReceivedListener,
    modalReceivedListener
} from "./utils/notifications/inApp/inAppNotifsHandler";

export {
    setupInAppNotifications,
    tearDownInAppNotifications,
    removeListener,
    inboxReceivedListener,
    friendEventReceivedListener,
    modalReceivedListener
};

import {fetch} from "./utils/KV"
export {fetch as fetchFromKV}

import MixpanelLib from 'react-native-mixpanel';

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
