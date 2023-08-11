const AxiosSigned = require("../AxiosSigned.js");
const Cache = require("../Cache.js");
const Endpoints = require("../Endpoints.js");
var endpoints;

// Fetching the endpoints
async function fetchEndpoints() {
    // Fetch and store endpoints 
    endpoints = await Endpoints.fetch();
}
// Call the function to fetch endpoints
fetchEndpoints()

const secondsBetweenDispatching = [5, 20]
const pushMax = 10; // if there are more than this many than batch instantly

let eventQueue = []; // initialize an empty event queue
let isDispatching = false; // a flag to track if a dispatch is currently happening

// Function to send analytics
async function SendAnalytics(event) {
    // Store locally in a queue 
    eventQueue.push(event);

    // If we hit the maximum number of events, or the app is foregrounded, dispatch instantly
    if (eventQueue.length >= pushMax || document.visibilityState === 'visible') {
        await dispatchEvents();
    } else if (!isDispatching) { // Else dispatch randomly within 'secondsBetweenDispatching'
        const delay = Math.random() * (secondsBetweenDispatching[1] - secondsBetweenDispatching[0]) + secondsBetweenDispatching[0];
        isDispatching = true;
        setTimeout(async () => {
            await dispatchEvents();
            isDispatching = false;
        }, delay * 1000);
    }
}

// Function to dispatch the events
async function dispatchEvents() {
    // clone the queue and clear the original one
    const events = [...eventQueue];
    eventQueue = [];

    // send events to the API
    await SendAnalyticsAPI(events);
}

async function forceDispatch() {
    isDispatching = true;
        setTimeout(async () => {
            await dispatchEvents();
            isDispatching = false;
        }, delay * 1000);
}

//#region Analytics 
// Function to send analytics to API
// events = [{ event: "Ni", phoneNumber: "734873487348", value: "ahshshs" }, ... ]
async function SendAnalyticsAPI(events) {
    if (!events.isArray()) throw ('SendAnalytics events take the form of: events = [{ event: "Ni", phoneNumber: "734873487348", value: "ahshshs" }, ... ]')
    // Get endpoint and jwt
    const endpoint = endpoints["/RecordEvent"];
    const jwt = Cache.getString("jwt");

    // Send a get request to the endpoint with events as body and get the response
    const res = await AxiosSigned.get(endpoint, jwt, null, JSON.stringify(events)); /// last param is body
    return res;
}

//#endregion

export {SendAnalytics, forceDispatch};
