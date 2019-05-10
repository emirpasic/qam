// Structures are optimized for storage as not to hold duplicate words in memory and work only with indexes.

// Contains all unique words added so far.
// e.g. [ "a", "b", "c", "d" ]
const dictionary = [];

// Contains the index in the dictionary for each word.
// e.g. { "a": 0, "b": 1", "c": 2, "d": 3 }
const indexes = {};

// Contains synonyms mapping by indexes.
// e.g.
//      {
//          0: < 1, 2 >,
//          1: < 0, 2 >,
//          2: < 0, 1 >,
//          3: < >
// }
// Sets noted as "<...>" above.
const synonyms = {};

const addSynonyms = words => {
    words.forEach(word => {
        const wordIndex = getIndex(word, true);
        synonyms[wordIndex] = synonyms[wordIndex] || new Set();

        words.forEach(synonym => {
            if (word !== synonym) {
                const synonymIndex = getIndex(synonym, true);
                synonyms[wordIndex].add(synonymIndex);
            }
        });
    });
};

const getSynonyms = word => {
    const wordIndex = getIndex(word);

    if (wordIndex === undefined) return [];

    const synonymsIndexes = synonyms[wordIndex];

    const result = [];

    for (let synonymIndex of synonymsIndexes) {
        const synonym = dictionary[synonymIndex];
        result.push(synonym);
    }

    return result;
};

// Returns the word index in the dictionary or undefined if word is not found in the dictionary.
// Optional flag to add the word to the dictionary if it's missing in the dictionary.
const getIndex = (word, addIfMissing = false) => {
    let index = indexes[word];
    if (index === undefined && addIfMissing) {
        index = dictionary.length;
        indexes[word] = index;
        dictionary.push(word);
    }
    return index;
};

module.exports.addSynonyms = addSynonyms;
module.exports.getSynonyms = getSynonyms;
