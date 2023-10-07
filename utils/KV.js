import { _post } from "./AxiosSigned.js";


async function _fetch(key) {
    let params = {}
    if (!Array.isArray(key)) {
        params = {"key":key}
    } else {
        params = {"keys":key}
    }

    try{
        const res = await _post({uri : "https://f6du6bvzz2.execute-api.us-east-1.amazonaws.com/getKV", queryString : params});
        return res
    }
    catch(err){
        console.log("Error fetching KV");
        return []
    }
} 

export  { _fetch };
