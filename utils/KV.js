const AxiosSigned = require("./AxiosSigned.js");
const endpoint = "https://localhost:3000/getKV"

async function _fetch(key) {
    var params = undefined
    if (!key.isArray()) {
        params = {"key":key}
    } else {
        params = {"keys":key}
    }
    return await AxiosSigned.get({uri : endpoint, queryString : params})
} 

export{ _fetch };