var Analytics = require("./utils/User Based/Analytics");
var AuthenticatedUserActions = require("./utils/User Based/authenticatedUserActions.js");
var FriendSystem = require("./utils/User Based/friendSystem.js");
var loginLogout = require("./utils/User Based/loginLogout.js");
var LoginToCognito = require("./utils/User Based/LoginToCognito.js");
var registrationFlow = require("./utils/User Based/registrationFlow.js");
var refresh = require("./utils/User Based/refresh.js").fetch;
var InAppNotifsHandler = require("./utils/Notifications/In-App/InAppNotifsHandler.js");
var fetchFromKV = require("./utils/KV.js")._fetch;
var MixpanelLib = require("./react-native-mixpanel/index.js");

const mixpanelInstance = new MixpanelLib.MixpanelInstance();

// Export 'track' from MixpanelInstance
const track = (event, properties) => {
  return mixpanelInstance.track(event, properties);
};

// Local cache for API values
const apiCache = {
  mixpanelToken: null,
  webhookEvents: null,
  webhookUri: null,
};

// Fetch and cache a given key
const fetchAndCache = (key) => {
  if (apiCache[key] !== null) {
    // Return the cached value as a Promise
    return Promise.resolve(apiCache[key]);
  }

  // If not cached, fetch it
  return fetchFromKV(key).then((value) => {
    apiCache[key] = value; // Cache the value
    return value; // Return the fetched value
  });
};

// Section for API calls to fetch one-time values and store
const initializeConfigs = () => {
  return Promise.all([
    fetchAndCache("mixpanelToken"),
    fetchAndCache("webhook_events"),
    fetchAndCache("webhook_uri"),
  ])
    .then(([token, webhookEvents, webhookUri]) => {
      // Initialize Mixpanel with the fetched token
      mixpanelInstance.initialize(token);

      // Assuming 'webhookEvents' is a string that we need to parse
      mixpanelInstance.webhook_events = JSON.parse(webhookEvents);
      mixpanelInstance.webhook_uri = webhookUri;
    })
    .catch((error) => {
      console.error("Failed to fetch data from KV store:", error);
    });
};

// Call to initialize the configs when the module is loaded
initializeConfigs();

module.exports = {
  SendAnalytics: Analytics.SendAnalytics,
  inviteUser: AuthenticatedUserActions.inviteUser,
  OnPollReveal: AuthenticatedUserActions.OnPollReveal,
  ReadInbox: AuthenticatedUserActions.ReadInbox,
  DispatchVote: AuthenticatedUserActions.DispatchVote,
  FetchPollsNow: AuthenticatedUserActions.FetchPollsNow,
  fetchInvite: AuthenticatedUserActions.fetchInvite,
  DisableDeletion: AuthenticatedUserActions.DisableDeletion,
  RequestDeletion: AuthenticatedUserActions.RequestDeletion,
  OnFriendRequest: FriendSystem.OnFriendRequest,
  AcceptFriendRequest: FriendSystem.AcceptFriendRequest,
  HideFriendRequestfriendPN: FriendSystem.HideFriendRequestfriendPN,
  AddFriend: FriendSystem.AddFriend,
  RemoveFriend: FriendSystem.RemoveFriend,
  BlockFriend: FriendSystem.BlockFriend,
  ResetBlockList: FriendSystem.ResetBlockList,
  loginUtil: loginLogout.login,
  logout: loginLogout.logout,
  logoutAndDelete: loginLogout.logoutAndDelete,
  addRealtimeListener: loginLogout.addRealtimeListener,
  removeRealtimeListener: loginLogout.removeRealtimeListener,
  loginToCognito: LoginToCognito.loginToCognito,
  isOnboarding: registrationFlow.isOnboarding,
  submitPFP: registrationFlow.submitPFP,
  fetchAddFriendsOnboarding: registrationFlow.fetchAddFriendsOnboarding,
  verifyStatus: registrationFlow.verifyStatus,
  submitAge: registrationFlow.submitAge,
  submitGrade: registrationFlow.submitGrade,
  fetchSchools: registrationFlow.fetchSchools,
  submitSchool: registrationFlow.submitSchool,
  fetchAllAddFriendsOnboardingPages: registrationFlow.fetchAllAddFriendsOnboardingPages,
  submitPhoneNumber: registrationFlow.submitPhoneNumber,
  submitOTP: registrationFlow.submitOTP,
  submitFirstName: registrationFlow.submitFirstName,
  submitLastName: registrationFlow.submitLastName,
  submitUsername: registrationFlow.submitUsername,
  submitGender: registrationFlow.submitGender,
  checkSubmitProfile: registrationFlow.checkSubmitProfile,
  back: registrationFlow.back,
  uploadUserContacts: registrationFlow.uploadUserContacts,
  fetch: refresh,
  setupInAppNotifications: InAppNotifsHandler.setupInAppNotifications,
  tearDownInAppNotifications: InAppNotifsHandler.tearDownInAppNotifications,
  removeListener: InAppNotifsHandler.removeListener,
  fetchFromKV: fetchFromKV,
  track: track,
};
