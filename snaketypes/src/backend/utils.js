// general function that handles fetching.
async function fetchObj(obj, options={}, url='http://localhost:5003'){
    
    return fetch(url + `/${obj}`, options )
    .then( async (httpResponse) => {
        if(!httpResponse.ok){
            throw {status: httpResponse.status, statusText: httpResponse.statusText}
        }
        return await httpResponse.json()
    })
    .then(async (jsonData) => {
        // console.log('inside fetchObj: ', jsonData)
        return await jsonData;
    })
    // .catch(fetchError => {
    //     console.log('Fetch Error: ', fetchError)
    //     return fetchError;
    // })
}

module.exports = {
    fetchObj
}