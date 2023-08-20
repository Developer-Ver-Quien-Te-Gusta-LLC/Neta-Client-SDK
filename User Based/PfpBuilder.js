function GetPFPSmallUri(url) {
    if (!url || typeof url !== 'string') {
        throw new Error('Invalid URL provided');
    }
    
    return url.replace(/\.jpeg$/, 'Small.jpeg');
}

function GetPFPMediumUri(url){
    if (!url || typeof url !== 'string') {
        throw new Error('Invalid URL provided');
    }
    
    return url.replace(/\.jpeg$/, 'Medium.jpeg');
}

