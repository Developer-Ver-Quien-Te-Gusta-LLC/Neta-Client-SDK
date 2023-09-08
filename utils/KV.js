import { get } from "./AxiosSigned.js";
const { TitleMicroservice: endpoint } = require("../config.json");

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
