import { _fetch } from "./KV.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

var FetchedEndpoints;

const setEndpoints = async (endpoints) => {
  FetchedEndpoints = endpoints;
  // Store the endpoints in AsyncStorage for global access
  await AsyncStorage.setItem('endpoints', JSON.stringify(endpoints));
}


const FetchEndpointsFromKV = async () => {
  // If FetchedEndpoints is not defined, try to get it from AsyncStorage
  if (!FetchedEndpoints) {
    FetchedEndpoints = JSON.parse(await AsyncStorage.getItem('endpoints'));
  }
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