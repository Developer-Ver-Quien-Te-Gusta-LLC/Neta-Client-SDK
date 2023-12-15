//import * as crypto from 'crypto';
import {FetchEndpointsFromKV, FetchedEndpoints} from "../utils/Endpoints.js";
import * as Alby from "../utils/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";



import * as loginToFirebase from "./LoginToFirebase.js";

var endpoints = FetchedEndpoints


async function InviteProfile(jwt) {
    const endpoint = endpoints["/invite"];
    const res = await AxiosSigned.post('https://invitations-jhfmfvn6oa-ue.a.run.app/invitations/request', jwt, {screen:"profile"});
    return res;
}

async function InviteInbox(messageID,jwt = null) {
    const QueryString = { screen:"inbox",messageuid:messageID};
    const endpoint = endpoints["/invite"];
    const res = await AxiosSigned.post('https://invitations-jhfmfvn6oa-ue.a.run.app/invitations/request', jwt, QueryString, null);
    return res;
}

async function InviteContact(ContactName, ContactNumber, jwt) {
    const QueryString = { screen:"contact",invitedname:ContactName,ContactNumber:ContactNumber};
    const endpoint = endpoints["/invite"];
    const res = await AxiosSigned.post('https://invitations-jhfmfvn6oa-ue.a.run.app/invitations/request', jwt, QueryString, null);
    return res;
}

async function UploadInvite(filebuffer,jwt){
    try {
        const data = {
            file: filebuffer
        };

        const response = await AxiosSigned.post("https://invitations-jhfmfvn6oa-ue.a.run.app/uploadinvites", jwt, null, data);

        console.log("File uploaded successfully: ", response.data);
    } catch (error) {
        console.error("Error uploading file: ", error);
    }
}

/// response.link


export{InviteContact,InviteInbox,InviteProfile,UploadInvite};