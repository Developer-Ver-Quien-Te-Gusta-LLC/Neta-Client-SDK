import * as AxiosSigned from "./AxiosSigned.js";
const endpoint = "https://localhost:3000/getKV"

async function _fetch(key) {
    var params = undefined
    if (!Array.isArray(key)) {
        params = {"key":key}
    } else {
        params = {"keys":key}
    }

    try{
        const res = await AxiosSigned.get({uri : endpoint, queryString : params});
        return res
    }
    catch(err){
        console.log("Error fetching KV");
        return []
    }
} 

export{ _fetch };