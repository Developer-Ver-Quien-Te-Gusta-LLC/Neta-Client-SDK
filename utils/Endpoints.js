import { _fetch } from "./KV.js";

async function FetchEndpointsFromKV() {
  try {
    const response = await _fetch("endpoints");
    const endpoints = JSON.parse(response.data);
    return endpoints;
  } catch (err) {
    console.log(err);
    return [];
  }
}

FetchEndpointsFromKV();
export { FetchEndpointsFromKV };
