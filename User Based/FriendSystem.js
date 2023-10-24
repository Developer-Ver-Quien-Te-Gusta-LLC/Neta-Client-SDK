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
  //const jwt = Cache.getString("jwt");

  const res = await AxiosSigned._post({uri:endpoint,queryString:QueryString,jwt:jwt});
  return res;
}

async function AcceptFriendRequest(friendUID,jwt) {
  const endpoint = endpoints["/friends/accept"];
  const QueryString = { friend: friendUID };

  //const jwt = Cache.getString("jwt");

  const res = await AxiosSigned._post({uri:endpoint,queryString:QueryString,jwt:jwt});
  return res;
}

async function HideFriendRequestfriendUID(friendUID,jwt) {
  const endpoint = endpoints["/friends/hide"];
  const QueryString = { friend: friendUID };

 // const jwt = Cache.getString("jwt");

 const res = await AxiosSigned._post({uri:endpoint,queryString:QueryString,jwt:jwt});
  return res;
}
async function RemoveFriend(friendUID,jwt) {
  const endpoint = endpoints["/friends/remove"];
  const QueryString = { friend: friendUID };

  //const jwt = Cache.getString("jwt");

  const res = await AxiosSigned._post({uri:endpoint,queryString:QueryString,jwt:jwt});
  return res;
}
async function BlockFriend(friendUID,jwt) {
  const endpoint = endpoints["/friends/block"];
  const QueryString = { friend: friendUID };

  //const jwt = Cache.getString("jwt");

  const res = await AxiosSigned._post({uri:endpoint,queryString:QueryString,jwt:jwt});
  return res;
}

async function ResetBlockList(jwt) {
  const endpoint = endpoints["/friends/resetBlockList"];
 // const jwt = Cache.getString("jwt");

 const res = await AxiosSigned._post({uri:endpoint,queryString:QueryString,jwt:jwt});
  return res;
}

async function ResetHideList(jwt) {
  const endpoint = endpoints["/friends/resetHideList"];
  //const jwt = Cache.getString("jwt");

  const res = await AxiosSigned._post({uri:endpoint,queryString:QueryString,jwt:jwt});
  return res;
}

// #endregion

export {
  OnFriendRequest,
  AcceptFriendRequest,
  HideFriendRequestfriendUID,
  RemoveFriend,
  BlockFriend,
  ResetBlockList,
  ResetHideList,
};
