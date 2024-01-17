import { _fetch } from "./KV.js";

var FetchedEndpoints;

const setEndpoints = (endpoints) => {
  FetchedEndpoints = endpoints
}


const FetchEndpointsFromKV = () => {
   return FetchedEndpoints;
}
 
var Callbacks = [];
 
async function onEndpointsFetched(Callback){
  if(FetchedEndpoints != undefined){
    Callback(true);
  }
  else{
    Callbacks.push(Callback);
  }
}
 
export { onEndpointsFetched, FetchEndpointsFromKV,FetchedEndpoints, setEndpoints};