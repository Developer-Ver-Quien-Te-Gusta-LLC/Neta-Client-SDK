import { _fetch } from "./KV.js";

var FetchedEndpoints = undefined;

var Callbacks = [];

async function FetchEndpointsFromKV() {
  if ((FetchedEndpoints == undefined)) {
    try {
      const response = await _fetch("endpoints");
      const endpoints = JSON.parse(response.data);
      FetchedEndpoints = endpoints;
      Callbacks.forEach(callback => callback(true));
      return endpoints;
    } catch (err) {
      Callbacks.forEach(callback => callback(false));
      console.log(err);
      return [];
    }
  } 
  else {
    return FetchedEndpoints;
  }
}

async function onEndpointsFetched(Callback){
  if(FetchedEndpoints != undefined){
    Callback(true);
  }
  else{
    Callbacks.push(Callback);
  }

}

FetchEndpointsFromKV();
export { FetchEndpointsFromKV ,onEndpointsFetched};
