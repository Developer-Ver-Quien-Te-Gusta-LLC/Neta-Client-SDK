//import * as crypto from 'crypto';
import {FetchEndpointsFromKV, FetchedEndpoints} from "../utils/Endpoints.js";
import * as Alby from "../utils/InAppNotifsHandler.js";
import * as AxiosSigned from "../utils/AxiosSigned.js";



import * as loginToFirebase from "./LoginToFirebase.js";

var endpoints = FetchedEndpoints


async function login(platform,jwt,highschool,grade) {
    const url = endpoints["/login"];
    var response = await AxiosSigned.post(url,jwt,{platform:platform,highschool:highschool,grade:grade},null);
    if(response?.polls?.forEach != undefined){
    response.polls.forEach(item => {
      if (typeof item.users === 'string') {
          item.users = JSON.parse(item.users);
      }
  });
}

    return response;
}

async function logout(jwt) {
    const res = await AxiosSigned.post(endpoints["/logout"],jwt,null,null);
    return res
}



export {login, logout}