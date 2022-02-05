// Utility logic
function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}
// Business Logic

function wordCounter(text) {
  if (text.trim().length  === 0){
    return 0;
  }  
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if (!Number(element)) {
    wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)){
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase() === (word.toLowerCase())) {
      wordCount++
    }
  });
  return wordCount;
}

function mostCommonWords(text) {
  const wordArray = text.split(" ")
  let wordCount = [];
  let wordCountTwo = [];
  let repeatWords = wordArray.filter(function(word, index){
    return wordArray.indexOf(word) !== index;
   });
   repeatWords.forEach(function (element){
    wordCount.push(numberOfOccurrencesInText(element,text) + " " + element);
   });
   wordCount.forEach(function(string){
    if (!wordCountTwo.includes(string)) {
      wordCountTwo.push(string);
    }
   });
    let sortedWords = wordCountTwo.sort().reverse();
    let displayWords = []
    displayWords.push(sortedWords[0].split(" ").reverse().join(": "),sortedWords[1].split(" ").reverse().join(": "),sortedWords[2].split(" ").reverse().join(": "));
   return displayWords;
}

// UI Logic

function boldPassage(word, text) {
  if (noInputtedWord(word, text)) {
    return "";
  }
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (word === element) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1 )) {
    htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

$(document).ready(function(){
  $("form#word-counter").submit(function(event){
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    //const mostCommonWords = mostCommonWords(passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    $("#most-common-word").html("<br>"+mostCommonWords(passage)[0]+"<br>"+mostCommonWords(passage)[1]+"<br>"+mostCommonWords(passage)[2]);
  });
});
