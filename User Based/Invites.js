async function InviteProfile(jwt) {
    const endpoint = endpoints["/invite"];
    const res = await AxiosSigned.post(endpoint, jwt, {screen:"profile"});
    return res;
}

async function InviteInbox(messageID,jwt = null) {
    const QueryString = { screen:"inbox",messageuid:messageID};
    const endpoint = endpoints["/invite"];
    const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
    return res;
}

async function InviteContact(ContactName, ContactNumber, jwt) {
    const QueryString = { screen:"contact",ContactName:ContactName,ContactNumber:ContactNumber};
    const endpoint = endpoints["/invite"];
    const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
    return res;
}


export{InviteContact,InviteInbox,InviteProfile};