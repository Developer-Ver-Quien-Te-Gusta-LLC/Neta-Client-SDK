import Ably from "ably";

import * as KV from "./KV.js";
import { parse } from "path";

import AsyncStorage from '@react-native-async-storage/async-storage';

var realtime;
var channel;

// Keep track of subscribed channels
const subscribedChannels = new Set();

async function SetupAbly() {
  var cachedAblyKey = await AsyncStorage.getItem("AblyAPIClientKey")
  //var AblyKey = !cachedAblyKey ? (await KV._fetch("AblyAPIClientKey")) : await AsyncStorage.getItem('AblyAPIClientKey')

  //console.log("ABLY KEY -------------------->",AblyKey);
  //if (!cachedAblyKey) await AsyncStorage.setItem('AblyAPIClientKey', AblyKey)
  realtime = new Ably.Realtime({ key:  "8zqj4w.nBBRpA:nCTI0fVqgPsN-GNDCz8Z7vKbcAD-jjqRP1ZFfsgVdmo" });
  realtime.connection.on('connected', function() {
    console.log("Connected to Ably");
  });
  realtime.connection.on('error', function(error) {
    console.error('Ably connection error:', error);
  });
}

SetupAbly();


function setupInAppNotifications(transactionID,inboxReceivedCallback,
  friendEventReceivedCallback,
  modalReceivedCallback,
  tokenReceivedCallback,
 ) {// add values like 10m , 30m for a limited number of minutes to rewind to
  // If the connection is not already established, connect to Ably and set up the subscription
  if (realtime.connection.state == "connected") {
    if (!subscribedChannels.has(transactionID)) {
      channel = realtime.channels.get(String(transactionID),{params:{rewind:'1'}});
      channel.on('attached', function() {
        console.log('Successfully attached to channel' + transactionID);
        
        
      });

      channel.on('error', function(error) {
        console.error('Channel error:', error);
      });
      channel.subscribe("event", async (message) => {
        console.log("message");
        const data = message.data;
        
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.inbox != null) {
            if(inboxReceivedCallback!=null)inboxReceivedCallback(parsedData.inbox);
          } else if (parsedData.friend != undefined) {
            if(friendEventReceivedCallback!=null)friendEventReceivedCallback(parsedData.friends);
          } else if (parsedData.uri != undefined) {
            /// case: modal is pushed to this user in RT
            if(modalReceivedCallback!=null)modalReceivedCallback(parsedData.uri);
          }
          else if(parsedData.token !=null){
            console.log("Token Received , make sure listeners are subscribed to");
            console.log(parsedData);
            if(tokenReceivedCallback!=null)tokenReceivedCallback(parsedData.token);
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

export { setupInAppNotifications, removeListener };
