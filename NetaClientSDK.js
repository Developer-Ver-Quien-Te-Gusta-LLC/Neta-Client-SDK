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
