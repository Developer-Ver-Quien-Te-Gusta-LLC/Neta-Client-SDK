import * as Ably from "ably";
import * as KV from "../../KV.js";
import { setStorage, getStorage } from "../../AsyncStorage.js";

let timer;

var realtime;
var channel;

async function SetupAbly(){
    const AblyKey = await KV.fetch("AblyAPIClientKey");
    realtime = new Ably.Realtime(AblyKey);
}

//SetupAbly();

import * as decryption from "../../../utils/Decryption.js";

// Keep track of subscribed channels
const subscribedChannels = new Set();

let inboxReceivedListener, friendEventReceievedListener, modalReceievedListener;

async function setupInAppNotifications(transactionID, encryptionKey) {
    // Cancel any pending disconnection
    if (timer) clearTimeout(timer);

    // If the connection is not already established, connect to Ably and set up the subscription
    if (
        realtime.connection.state !== 'connected' &&
        realtime.connection.state !== 'connecting'
    ) {
        if (!subscribedChannels.has(transactionID)) {
            const channel = realtime.channels.get(transactionID);
            channel.subscribe(async (message) => {
                const data = await decryption.decrypt(message.data, encryptionKey);
                try {
                    const parsedData = JSON.parse(data);
                    if (parsedData.inbox != null) {
                        /// CASE: poll sent to this user
                      // Get current cache data
                      let inboxData = await getStorage("inboxData") || [];
                      
                      // Combine the old data with the new data
                      inboxData = inboxData.concat(parsedData.inbox);
                      
                      // Sort the data in descending order by pushedTime
                      inboxData.sort((a, b) => b.pushedTime - a.pushedTime);
                      
                      // Store the sorted data back in cache
                     setStorage("inboxData", inboxData);
                    
                      var unreadCount;
                     setStorage("unreadCount", unreadCount = (parseInt(await getStorage("unreadCount") + 1).toString())) /// another line of code from a paranoid react native programmer

                      inboxReceivedListener(unreadCount, inboxData)
                    } else if (parsedData.friends != undefined) {
                        /// case: event from friends for this user
                        var event = parsedData.friends.event; /// add, request, remove, accept
                        var friend = parsedData.friends.friend
                        var message = parsedData.friends.message // display this msg

                        friendEventReceievedListener(event, friend, message)

                    } else if (parsedData.uri != undefined) {
                        /// case: modal is pushed to this user in RT
                        modalReceievedListener(uri)
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
    }
}


async function removeListener(){
    channel.unsubscribe();
}

async function tearDownInAppNotifications() {
    // Set up a timer to disconnect from Ably after 60 seconds
    timer = setTimeout(() => {
        // Close the connection
        realtime.connection.close();
    }, 60000);
}

export {setupInAppNotifications,tearDownInAppNotifications,removeListener};