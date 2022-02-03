// Utility Logic

function noInputtedWord(word, text) {
  for (let i=0; i <arguments.length; i++) {
    console.log(arguments[i]);
    if (arguments[i].trim().length === 0){
      return true;
    }
  }
  return false;
}


// Business Logic

function wordCounter(text) {
  if (noInputtedWord(text)) {
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
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++
    }
  });
  return wordCount;
}

function numberOfWordRepeats(text) {
  let count = [];
  let countedWords = [];
  const wordArray = text.toLowerCase().split(" ");
  wordArray.forEach(function(word) {
    let num = numberOfOccurrencesInText(word, text);
    if (!countedWords.includes(word)) {
      countedWords.push(word);
      count.push(num + " " + word);
    }
  })
  let initialOutput = count.sort();
  let finalOutput = initialOutput.reverse();
  let finalOutputArray = (finalOutput[0] + " " + finalOutput[1] + " " + finalOutput[2]);
  let strings = finalOutputArray.split(" ");

  console.log(strings);
  console.log(finalOutputArray);
  let mostCommonWord = strings[1] + " : " + strings[0]
  let secondMostCommon = strings[3] + " : " + strings[2]
  let thirdMostCommon = strings[5] + " : " + strings[4]
  let commonWordsArray = [mostCommonWord , secondMostCommon , thirdMostCommon];
  return commonWordsArray;
} 

function firstInstanceOfWord(word, text) {
  const textArray = text.split(" ");
  for (let i = 0; i < textArray.length; i++) {
    console.log(i);
    if (word === textArray[i]) {
      return i;
    }
  }
  return -1;
}

// UI Logic

function boldPassage(word,text) {
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
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

function arrayToList(text) {
  let htmlString = "";
  text.forEach(function(element) {
    htmlString = htmlString.concat("<li>" + element + "</li>");
  })
  return htmlString;
}

$(document).ready(function() {
  $("form#word-counter").submit(function(event) {
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    const commonWords = numberOfWordRepeats(passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word,passage));
    $("#common-words").html(arrayToList(commonWords));
  });
});