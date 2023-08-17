import * as Analytics from "./User Based/Analytics.js";
import * as AuthenticatedUserActions from "./User Based/AuthenticatedUserActions.js";
import * as FriendSystem from "./User Based/FriendSystem.js";
import * as loginLogout from  "./User Based/LoginLogout.js";
import * as registrationFlow from "./User Based/RegistrationFlow.js";
import * as refresh from "./User Based/Refresh.js";
import * as InAppNotifsHandler from "./utils/Notifications/In-App/InAppNotifsHandler.js";
import * as fetchFromKV from "./utils/KV.js"
//import * as MixpanelLib from "";

//const mixpanelInstance = new MixpanelLib.MixpanelInstance();

// Export 'track' from MixpanelInstance
/*const track = (event, properties) => {
  return mixpanelInstance.track(event, properties);
};*/

// Local cache for API values
/*const apiCache = {
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
initializeConfigs();*/

export {
  Analytics,
  AuthenticatedUserActions,
  FriendSystem,
  loginLogout,
  registrationFlow,
  refresh,
  InAppNotifsHandler,
  fetchFromKV
};
