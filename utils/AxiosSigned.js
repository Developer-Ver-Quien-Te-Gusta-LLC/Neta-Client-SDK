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
    return await retryFunction(() => get(uri, jwt, queryStr, body));
}
async function get(uri, jwt = null, qString = null, body = null) {
    return await retryFunction(async () => {
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

        const response = await axios.request(options);
        return response.data;
    });
}

async function _post(data) {
    var {uri, jwt, body, queryString, params} = data;
    if (queryString != undefined) {
        params = queryString;
    }
  
    if (params != undefined) {
        queryString = params;
    }
    return await retryFunction(() => post(uri, jwt, queryString, body));
}

async function post(uri, jwt = null, qString = null, body = null,retry = true) {
    // If qString is provided, append it to the uri
    let appendedUri = uri;
    if (qString) {
        const queryString = Object.keys(qString).map(key => key + '=' + qString[key]).join('&');
        appendedUri += '?' + queryString;
    }

    let options = {
        method: 'POST',
        url: appendedUri,
        data: body,  // body data
    };

    // Add authorization header if jwt token is provided
    if (jwt) {
        options.headers = {
            'Authorization': jwt
        };
    }
    console.log(options);

    if (retry) {
        return await retryFunction(async () => {
            const response = await axios(options);
            return response.data;
        });
    } else {
        const response = await axios(options);
        return response.data;
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
    return await retryFunction(() => put(uri, jwt, queryStr, body));
}

async function put(uri, jwt = null, qString = null, body = null) {
    return await retryFunction(async () => {
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

        const response = await axios(options);
        return response.data;
    });
}

async function retryFunction(fn, retries = 3) {
    try {
        return await fn();
    } catch (error) {
        if (retries > 1) {
            return await retryFunction(fn, retries - 1);
        } else {
            console.error(`Error after ${retries} attempts: ${error}`);
            throw error;
        }
    }
}

export {get, post, put,_post,_put,_get,axios}

