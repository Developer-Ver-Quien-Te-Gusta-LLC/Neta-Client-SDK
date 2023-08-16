import * as  KV from "./KV.js";

async function FetchEndpointsFromKV() { 
    try{
    const endpoints = JSON.parse(await KV._fetch("endpoints").data.value);
    return  endpoints;
    }
    catch(err){
        return []
    }
}


export{FetchEndpointsFromKV };
