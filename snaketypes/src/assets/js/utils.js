

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

// colors the wordDiv until the last correct character (this keeps track of what is being typed)
export function correctColoring(wordDiv_arr, trackIdx){
    
    let charElement = null;
    // black color up to tIdx (the last correct character)
    for(let c = 0; c < trackIdx; c++){
        charElement = wordDiv_arr[c];            
        charElement.style.color = "black";
    }

    // the rest should remain gray (we are using a loop to avoid black-gray-black patterns)
    for(let c = trackIdx; c < wordDiv_arr.length; c++){
        charElement = wordDiv_arr[c];
        charElement.style.color = "gray";
    }
} // end correctColoring

// return a spanned format of a word
export function spanWord(word){
    if(!word){return '';}

    let html = "";
    for(let c = 0; c < word.length; c++){
        html += `<span class="word-char" style="font-size: xxx-large; color: gray; letter-spacing: 3px;">${word[c]}</span>\n`
    }
    return html;
}

// filter excess elements, childNodes returns unnecessary `#text` elements so they have to be removed
export function filterChildNodes(wordDiv, word){
    let temp = [];
    for(let c = 0; c < word.length; c++){
        temp.push(wordDiv[c*2])
    }
    return temp;
}