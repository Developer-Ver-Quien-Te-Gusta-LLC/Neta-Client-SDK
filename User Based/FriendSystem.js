import * as AxiosSigned from "../utils/AxiosSigned.js";
import {FetchEndpointsFromKV} from "../utils/Endpoints.js";

var endpoints;
// Fetching the endpoints
async function InitializeEndpoints() {
  endpoints = await FetchEndpointsFromKV();
}
InitializeEndpoints();


//#region Friend System
async function OnFriendRequest(friendPN) {
  const QueryString = { friend: friendPN };
  const endpoint = endpoints["/friends/request"];
  const jwt = Cache.getString("jwt");

  const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
  return res;
}

async function AcceptFriendRequest(friendPN) {
  const endpoint = endpoints["/friends/accept"];
  const QueryString = { friend: friendPN };

  const jwt = Cache.getString("jwt");

  const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
  return res;
}

async function HideFriendRequestfriendPN(friendPN) {
  const endpoint = endpoints["/friends/hide"];
  const QueryString = { friend: friendPN };

  const jwt = Cache.getString("jwt");

  const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
  return res;
}

async function AddFriend(friendPN) {
  const endpoint = endpoints["/friends/add"];
  const QueryString = { friend: friendPN };

  const jwt = Cache.getString("jwt");

  const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
  return res;
}

async function RemoveFriend(friendPN) {
  const endpoint = endpoints["/friends/remove"];
  const QueryString = { friend: friendPN };

  const jwt = Cache.getString("jwt");

  const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
  return res;
}
async function BlockFriend(friendPN) {
  const endpoint = endpoints["/friends/remove"];
  const QueryString = { friend: friendPN };

  const jwt = Cache.getString("jwt");

  const res = await AxiosSigned.post(endpoint, jwt, QueryString, null);
  return res;
}

async function ResetBlockList() {
  const endpoint = endpoints["/friends/resetBlockList"];
  const jwt = Cache.getString("jwt");

  const res = await AxiosSigned.post(endpoint, jwt, null, null);
  return res;
}

async function ResetHideList() {
  const endpoint = endpoints["/friends/resetHideList"];
  const jwt = Cache.getString("jwt");

  const res = await AxiosSigned.post(endpoint, jwt, null, null);
  return res;
}

// #endregion

export {
  OnFriendRequest,
  AcceptFriendRequest,
  HideFriendRequestfriendPN,
  AddFriend,
  RemoveFriend,
  BlockFriend,
  ResetBlockList,
  ResetHideList
};
