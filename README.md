# Neta Client SDK

## What is this package?

* This folder contains all the client side code for Ver-Quien-Te-Gusta-LLC (Neta app)


## What does it include?

### Analytics.js
- SendAnalytics - Call this function when sending an event for analytics from the client side

### AuthenticatedUserActions.js
- queryProfile(uid,jwt) - Call this function to query a user's profile data 
- RequestDeletion(jwt) - Call this function to request the deletion of a user's profile 
- DisableDeletion(jwt) - Call thsi function to disable the user deletion request if the request has been made and the id has still not been deleted
- FetchPollsNow(jwt) - After all the polls have been answered, the user can forcefully fetch polls using FetchPollsNow 
- HideActivity(jwt) - Call this function to hide th current user's Activity 
- UpdateFCMNotificationToken(jwt,FcmToken) - Call this function once fcm returns a token 
- submitPFP(fileBuffer,filename,jwt) - Call this function to update a user's pfp
- submitProfileChange(jwt,gender, fname, lname, username, reduceNotifications, hideTopStars, takeBreak, nameInpolls, anonymousMode) - Call this function to apply any edits made to the user profile
- DispatchVote(Answer,asset, question,pollid, jwt = null) - call this function once the user has tapped on an answer for the vote
- ReadInbox - To set the unread count to 0
- OnPollReveal - To Reveal the poll from inbox