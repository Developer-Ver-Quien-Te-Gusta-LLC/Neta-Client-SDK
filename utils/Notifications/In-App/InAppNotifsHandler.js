import Ably from "ably";

import * as KV from "../../KV.js";
import { parse } from "path";

var realtime;
var channel;

// Keep track of subscribed channels
const subscribedChannels = new Set();

async function SetupAbly() {
  const AblyKey = await KV._fetch("AblyAPIClientKey");
  realtime = new Ably.Realtime({ key: AblyKey.data });
  realtime.connection.on("connected", function () {
    console.log("Connected to Ably");
  });
}

SetupAbly();

let inboxReceivedListener, friendEventReceievedListener, modalReceievedListener,TokenReceivedListener;

function setupInAppNotifications(transactionID) {
  // If the connection is not already established, connect to Ably and set up the subscription
  if (realtime.connection.state == "connected") {
    if (!subscribedChannels.has(transactionID)) {
      channel = realtime.channels.get(transactionID);
      channel.subscribe(async (message) => {
        const data = message.data;
        console.log(data);
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.inbox != null) {
            inboxReceivedListener(unreadCount, inboxData);
          } else if (parsedData.friends != undefined) {
            friendEventReceievedListener(event, friend, message);
          } else if (parsedData.uri != undefined) {
            /// case: modal is pushed to this user in RT
            modalReceievedListener(uri);
          }
          else if(parsedData.token !=null){
            TokenReceivedListener(parsedData.token);
          }
          // Do something with the data
        } catch (error) {
          console.error("Error parsing the received data:", error);
        }
      });

      // Mark the channel as subscribed
      subscribedChannels.add(transactionID);
    } else {
      console.warn("Already subscribed to channel with ID:", transactionID);
      return;
    }
  } else {
    console.log("Ably Not Connected");
  }
}

function removeListener() {
  channel.unsubscribe();
}

export { setupInAppNotifications, removeListener,inboxReceivedListener, friendEventReceievedListener, modalReceievedListener,TokenReceivedListener };
