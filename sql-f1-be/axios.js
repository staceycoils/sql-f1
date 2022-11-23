const axios = require('axios');

async function callAxios (method, url) {
    const data = await axios({
        method: method,
        url: url
    });
    return data.data.MRData;
}

module.exports = callAxios;