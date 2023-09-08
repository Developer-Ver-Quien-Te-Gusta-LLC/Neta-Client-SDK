import { get } from "./AxiosSigned.js";
import config from "../config.json" assert { type: "json" };
const { TitleMicroservice: endpoint } = config;

async function _fetch(key) {
    let params = undefined
    if (!Array.isArray(key)) {
        params = {"key":key}
    } else {
        params = {"keys":key}
    }

    try{
        const res = await get({uri : endpoint, qString : params});
        return res
    }
    catch(err){
        console.log("Error fetching KV");
        return []
    }
} 

export default { _fetch };
