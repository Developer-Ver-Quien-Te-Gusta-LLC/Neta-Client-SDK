import * as AxiosSigned from "../utils/AxiosSigned.js";
import {FetchEndpointsFromKV} from "../utils/Endpoints.js";

var endpoints;
// Fetching the endpoints
async function InitializeEndpoints() {
  endpoints = await FetchEndpointsFromKV();
}
InitializeEndpoints();


//#region Friend System
async function OnFriendRequest(friendUID,jwt) {
  const QueryString = { friend: friendUID };
  const endpoint = endpoints["/friends/request"];

  const res = await AxiosSigned._post({uri:endpoint,queryString:QueryString,jwt:jwt});
  return res;
}

async function RemoveFriend(friendUID,jwt) {
  const endpoint = endpoints["/friends/remove"];
  const QueryString = { friend: friendUID };

  const res = await AxiosSigned._post({uri:endpoint,queryString:QueryString,jwt:jwt});
  return res;
}


// #endregion

export {
  OnFriendRequest,
  RemoveFriend,
};
