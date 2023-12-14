
// general function that handles fetching.
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

// returns randomized array given specific size
export function getRandomWords(wordsArray, numberOfWords, without = []) {
    const shuffledWords = wordsArray.sort(() => Math.random() - 0.5);
    return shuffledWords.slice(0, numberOfWords);
  }

// colors the wordDiv until the last correct character (this keeps track of what is being typed)
export function correctColoring(wordDiv_arr, trackIdx){
    let charElement = null;
    
    if(trackIdx < 0){return}

    // black coloring up to trackIdx (the last correct character)
    for(let c = 0; c < trackIdx; c++){
        charElement = wordDiv_arr[c];            
        charElement.style.color = "black";
    }

    // gray coloring the rest; which should remain gray (we are using a loop to avoid black-gray-black patterns)
    for(let c = trackIdx; c < wordDiv_arr.length; c++){
        charElement = wordDiv_arr[c];
        charElement.style.color = "gray";
    }
} // end correctColoring

// return a spanned format of a word
export function spanWord(word){
    if(!word){return ''}

    let html = "";
    for(let c = 0; c < word.length; c++){
        html += `<span class="word-char" style="font-size: xxx-large; color: gray; letter-spacing: 3px;">${word[c]}</span>\n`
    }
    return html;
}

// filter excess elements, since childNodes returns unnecessary `#text` elements so they have to be removed
export function filterChildNodes(wordDiv, word){
    let temp = [];
    for(let c = 0; c < word.length; c++){
        temp.push(wordDiv[c*2])
    }
    return temp;
}

// returns maximum trackIdx
export function getMaxTrackIdx(arr) {
    if (arr.length === 0) {
      return undefined;
    }
  
    let max = arr[0];
  
    for(let c = 1; c < arr.length; c++) {
      if (arr[c] > max) {
        max = arr[c];
      }
    }
  
    return max;
  }
  
  // returns words that prefix with the user's input
  export function matchedWords(prefix, wordDivPair) {
    let matched = [];
    for(let c = 0; c < wordDivPair.length; c++){
        if(wordDivPair[c].word.startsWith(prefix)){
            matched.push(wordDivPair[c])
        }
    }
    return matched;
  }
  