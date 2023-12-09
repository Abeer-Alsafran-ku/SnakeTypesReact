

export function getRandomWords(wordsArray, numberOfWords, without = []) {
    const shuffledWords = wordsArray.sort(() => Math.random() - 0.5);
    return shuffledWords.slice(0, numberOfWords);
  }

// generic function that handles fetching.
export async function fetchObj(obj, url='http://localhost:5000', options={}){
    
    return fetch(url + `/${obj}`, options )
    .then( async (httpResponse) => {
        if(!httpResponse.ok){
            throw httpResponse.status
        }
        return await httpResponse.json()
    })
    .then(async (jsonData) => {
        // console.log('inside fetchObj: ', jsonData)
        return await jsonData;
    })
    .catch(fetchError => {
        console.log('Fetch Error: ', fetchError)
        return null;
    })
}