import { _fetch } from "./KV.js";

async function FetchEndpointsFromKV() {
  try {
    const response = await _fetch("endpoints");
    console.log(response);
    const endpoints = JSON.parse(response);
    return endpoints;
  } catch (err) {
    console.log(err);
    return [];
  }
}

FetchEndpointsFromKV();
export { FetchEndpointsFromKV };
