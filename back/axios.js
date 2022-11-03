const axios = require('axios');

async function callAxios (method, url) {
    const data = await axios({
        method: method,
        url: url
    });
    return data.data.MRData;
//         .then((data)=>{const list = []
//             console.log(d.data.MRData.CircuitTable.Circuits)
//             d.data.MRData.CircuitTable.Circuits.map((i)=>{
//                 list.push(i.circuitName)
//             });
//             console.log(list);
//         })
//         .catch((e)=>{
//             console.log('nah')
//         })
}

module.exports = callAxios;