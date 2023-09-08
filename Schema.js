//For Upload pfp,requestDeletion,disableDeletion,submitProfileChange

const ResponseForUploadPFP = { Success: true };//or false
const ResponseFordeletion = { Success: true };//or false
const ResponseFordisabledeletion = { Success: true };//or false
const ResponseForSubmitProfileChange = { Success: true };//or false

//For addTopPollsAndFriends
const ResponseaddTopPollsAndFriends= { Success: true };//or false

//For ContactSync
const ResponsesyncContacts = {Success:true};//or false and Error:err

//For friends/request,accept,hide,add,remove,block,resetBlocklist,resetHidelist
const SendRequestResponse = {Success:true,message:"message"} // or false and Error:error
const AcceptRequestResponse = {Success:true,message:"message"} // or false and Error:error
const HideFriendResponse = {Success:true,message:"message"} // or false and Error:error
const AddFriendResponse = {Success:true,message:"message"} // or false and Error:error
const RemoveFriendResponse = {Success:true,message:"message"} // or false and Error:error
const BlockUserResponse = {Success:true,message:"message"} // or false and Error:error


//invitation fetch,request,requestdirect
const FetchAllInvitations = {
    data: [
      {
        "uid": "user1",
        "link": "https://example.com/invite/123",
        "timestamp": 1633594934000,
        "timelimit": 600,
        "expired": false
      },
      {
        "uid": "user1",
        "link": "https://example.com/invite/456",
        "timestamp": 1633594934000,
        "timelimit": 600,
        "expired": true
      },
    ]
  }
const handleInvitationRequestDirect = {Success:true,message:"message"};//or false and Error:error
const requestInvite = {inviteeData:[],inviterData:[],linkSchemaData:[],link:"",sms:""};

//Onboarding SendOtp VerifyOtp fetchStatus SubmitProfile SubmitProfile/FetchStatus FetchSchools AddFriends
const sendOtp = {success:true,message:"message"};//or false and Error:error
const verifyOTP = {success:true,message:"message"};//or false and Error:error
const fetchstatus = { success: true, message: "User is verified"};//or false and Error:error
const SubmitProfile = { success: true,albyTopicid:"topicid",alreadySubmitted:true||false, message: "User is verified"};//or false and Error:error
const SubmitProfileFetchStatus = {success:true,resolved:true};//or false and Error:error
const FetchSchool = {Success:true,rows:[],nextPageToken:"token"};//or false and Error:error
const AddFriendsOnboarding = {Success:true,data:[],nextpage:"token"} // or false and Error:error

//Onboarding Create User
const CreateUserRes = {Success:true||false};

//RecordEvent
const RecordEventRes = {Success:true||false};

//Social Graph
const dispatchEventRes = {success:true,message:"message"};//or false and Error:error
const forcefetchquestions = {Success:true||false};
const HideActivityRes = {success:true,message:"message"};//or false and Error:error
const loginRes = {
  success: true || false,
  deleted: false || true,
  message: "Message",
  albyChannelId: "token",
  albyDecryptionKey: "key",
  unreadCount: 0,
  polls: [],
  waiting: true || false,
  secondsRemaining: 10,
};

const purchaseres = {success:true,message:"message"};//or false and Error:error

const readinboxres = {success:true,unreadCount:0};//or false and Error:error


const refreshresAllScreens = {
    "success": true, 
    "data": {
      "home": {},
      "add": {},
      "inbox": {},
      "profile": {},
      "invite": {},
      "activity": {}
    }, 
    "page": 1, 
    "albyChannelId": "someId",
    "albyDecryptionKey": "someKey"
  };

  const refreshresHomeScreen = {
    "success": true, 
    "data": {}, 
    "page": 1, 
    "albyChannelId": "someId",
    "albyDecryptionKey": "someKey"
  }
  
  const refreshresaddscreen = {
    "success": true, 
    "data": {
      "friendsList": [],
      "udata": {}
    }, 
    "page": 1, 
    "albyChannelId": "someId",
    "albyDecryptionKey": "someKey"
  }
  
  const refreshresinboxscreen = {
    "success": true, 
    "data": {
      "inbox": {},
      "unreadCount": {}
    }, 
    "page": 1, 
    "albyChannelId": "someId",
    "albyDecryptionKey": "someKey"
  }

  const refreshresprofilescreen = {
    "success": true, 
    "data": {}, 
    "page": 1, 
    "albyChannelId": "someId",
    "albyDecryptionKey": "someKey"
  }
  
  const refreshresainvitescreen = {
    "success": true, 
    "data": {}, 
    "page": 1, 
    "albyChannelId": "someId",
    "albyDecryptionKey": "someKey"
  }

  const refreshresactivityscreen = {
    "success": true, 
    "data": {}, 
    "page": 1,
    "nextPage": "nextPageState"
  }


  
  
const revealpollres = {success:true,asked:"name",error:false};

const getKV = {success:true,data:[]};
  