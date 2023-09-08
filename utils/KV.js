import { _post } from "./AxiosSigned.js";
import config from "../config.json" assert { type: "json" };
const { TitleMicroservice: endpoint } = config;

async function _fetch(key) {
    let params = {}
    if (!Array.isArray(key)) {
        params = {"key":key}
    } else {
        params = {"keys":key}
    }

    try{
        const res = await _post({uri : endpoint, queryString : params});
        return res
    }
    catch(err){
        console.log("Error fetching KV");
        return []
    }
} 

export  { _fetch };
