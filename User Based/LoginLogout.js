//import * as crypto from 'crypto';
import {FetchEndpointsFromKV} from "../utils/Endpoints.js";
import * as Alby from "../utils/Notifications/In-App/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";



import * as loginToFirebase from "./LoginToFirebase.js";

var endpoints;

async function InitializeEndpoints() {
  endpoints = await FetchEndpointsFromKV();
}

InitializeEndpoints();


async function login(platform,jwt) {
    const url = endpoints["/login"];
    const response = await AxiosSigned.post(url,jwt,{platform:platform},null);
    console.log(response);
    return response;
}

async function logout(jwt) {
    const res = await AxiosSigned.post(endpoints["/logout"],jwt,null,null);
    return res
}



export {login, logout}