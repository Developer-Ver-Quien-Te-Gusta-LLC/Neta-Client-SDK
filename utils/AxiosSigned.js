import axios from 'axios';
async function _get(data) {
    const {uri, jwt, body, queryString, queryStr, params} = data;
    if (queryString != undefined) {
        queryStr = queryString;
        params = queryString;
    }
    if (queryStr != undefined) {
        queryString = queryStr;
        params = queryStr;
    }
    if (params != undefined) {
        queryStr = params;
        queryString = params;
    }
    return await get(uri, jwt, queryStr, body)
}
async function get(uri, jwt = null, qString = null, body = null) {
    let options = {
        method: 'GET',
        url: uri,
        params: qString,  // query string in the form of JSON
        data: body,  // body data
    };

    // Add authorization header if jwt token is provided
    if (jwt) {
        options.headers = {
            'Authorization': jwt
        };
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(`Error in GET request: ${error}`);
        throw error;
    }
}

async function _post(data) {
    var {uri, jwt, body, queryString, params} = data;
    if (queryString != undefined) {
        params = queryString;
    }
  
    if (params != undefined) {
        queryString = params;
    }
    return await post(uri, jwt, queryString, body)
}

async function post(uri, jwt = null, qString = null, body = null) {
    // If qString is provided, append it to the uri
    if (qString) {
        const queryString = Object.keys(qString).map(key => key + '=' + qString[key]).join('&');
        uri += '?' + queryString;
    }

    let options = {
        method: 'POST',
        url: uri,
        data: body,  // body data
    };
    console.log(uri);

    // Add authorization header if jwt token is provided
    if (jwt) {
        options.headers = {
            'Authorization': jwt
        };
    }

    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        console.error(`Error in POST request: ${error}`);
        throw error;
    }
}

async function _put(data) {
    const {uri, jwt, body, queryString, queryStr, params} = data;
    if (queryString != undefined) {
        queryStr = queryString;
        params = queryString;
    }
    if (queryStr != undefined) {
        queryString = queryStr;
        params = queryStr;
    }
    if (params != undefined) {
        queryStr = params;
        queryString = params;
    }
    return await put(uri, jwt, queryStr, body)
}

async function put(uri, jwt = null, qString = null, body = null) {
    let options = {
        method: 'PUT',
        url: uri,
        params: qString,  // query string
        data: body,  // body data
    };

    // Add authorization header if jwt token is provided
    if (jwt) {
        options.headers = {
            'Authorization': jwt
        };
    }

    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        console.error(`Error in PUT request: ${error}`);
        throw error;
    }
}


export {get, post, put,_post,_put,_get}
