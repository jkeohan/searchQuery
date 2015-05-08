//Given a page of content with alphanumeric words, and a search phrase of N words, 
//write an algorithm that will return the shortest snippet of content that contains all N words in any order.

//Example: The George Washington Bridge in New York City is one of the oldest bridges ever constructed.
//It is now being remodeled because the bridge is a landmark. City officials say that the landmark bridge 
//effort will create a lot of new jobs in the city.

//Search Terms: Landmark City Bridge

//Result: bridge is a landmark. City

var example = "The George Washington Bridge in New York City is one of the oldest bridges ever constructed. It is now being remodeled because the bridge is a landmark. City officials say that the landmark bridge effort will create a lot of new jobs in the city. Landmark is a bridge city"
var exampleArray1 = example.replace(/\./g,'').split(" ")
var exampleArray2 = example.split(" ")

var search = "Landmark City Bridge"
var keywords = search.split(" ")

var matchArray = [];//final match with the lowest index value
var compareArray = [];//temp array used to collect all mathcing combinations
var tempArray = [];//temp array used to collect word name for quick comparison
var results = [];//words and their indexes 
var resultsLength;//used in while loop
var phraseArray = [];//contains all matching strings as there maybe more than one match with equal distances
var tempindex = 0;//temp index used for comparison of current distance and then reset to 0
var index = 0;//stores the distance of matches
var matchingString = "";

var initialfind = matchingKeywords(exampleArray1,keywords);
var match = findmatch(initialfind,keywords);
console.log(match);

//function will find all keyword matches and store in array along with index
function matchingKeywords(data,keywords) {
    //loop through each word in provided text
    for ( x = 0; x < data.length; x++) {
        //loop through each search keyword for corresponding match
        for ( j = 0; j < keywords.length; j++) {
            //store current word converted to lowercase
            var word = data[x].toLowerCase();
            var keyword = new RegExp ( "^" + keywords[j].toLowerCase() + "$" );
             if ( word.match(keyword) ) {
                results.push( { word: data[x].toLowerCase(), index: x } );
            };
        };
    };
    resultsLength = results.length;
    //console.log(results)
    return results;
}
//function will iterate through all matches and build determine ones with the lowest distance
function findmatch(array,keywords) {
    var i = 0;
    //loop used to iterate through each item in the results array and build matching strings
    while(i < resultsLength) {
        for(var j = 0; j < array.length; j++) {
            var currentword = array[j].word
            if( keywords.indexOf(currentword) &&  tempArray.indexOf(currentword) === -1) { 
                tempArray.push(array[j].word)
                compareArray.push(array[j])        
            };
        };//end for loop
        //detemine the current distance between first and last keyword match
        tempindex = compareArray[compareArray.length-1].index - compareArray[0].index
        //build the sequence of strings found in the match
        var phrase = (exampleArray2.slice(compareArray[0].index, compareArray[compareArray.length-1].index+1)).join(" ")  
        //comparisons against index\tempindex to determine if distance is lowever than previous matches distance
        if( index === 0 ) { index = tempindex } 
        else if ( tempindex === index && compareArray.length === keywords.length) {
             index = tempindex
             phraseArray.push(phrase)
             //add distance and phrase to object
             compareArray.push( { distance: tempindex }, { phrase: phrase}) 
             matchArray.push(compareArray)
            }
        else if ( tempindex < index && compareArray.length === keywords.length) {          
            index = tempindex
            compareArray.push( { distance: tempindex }, { phrase: phrase}) 
            //resets array so that it contains the current lowest valued match
            matchArray = []
            matchArray.push(compareArray)
            //resets array so that it contains phrase for current lowest valued match
            phraseArray = []
            phraseArray.push(phrase)
        };//end if/else if
        //resets array for next while loop
        compareArray = []
        tempArray = []
        //remove the first object in array
        array.shift()  
        i++
    }
    //puts all matching phrases into a string for console output
    phraseArray.forEach(function(item) {
        matchingString += '\n'
        matchingString += item 
        matchingString += '\n'
        })
    return matchingString 
}






