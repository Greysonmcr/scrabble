  let timeLeft = 30;
  let interval;
  let randomString = "";
  let answerKey = new Set();
  let previousCorrectAnswers = new Set();
  let totalScore = 0;

  const scoreMap = {
    'A': 1,
    'B': 3,
    'C': 3,
    'D': 2,
    'E': 1,
    'F': 4,
    'G': 2,
    'H': 4,
    'I': 1,
    'J': 8,
    'K': 5,
    'L': 1,
    'M': 3,
    'N': 1,
    'O': 1,
    'P': 3,
    'Q': 10,
    'R': 1,
    'S': 1,
    'T': 1,
    'U': 1,
    'V': 4,
    'W': 4,
    'X': 8,
    'Y': 4,
    'Z': 10
  };

  import dictionary from './dictionary.js';

  const timerElement = document.getElementById("time");
  const scoreElement = document.getElementById("score");
  const startButton = document.getElementById("begin");
  const feedBackElement = document.getElementById("feedback");
  const textInput = document.getElementById("input-1");
  const image1Element = document.getElementById("image1");
  const image2Element = document.getElementById("image2");
  const image3Element = document.getElementById("image3");
  const image4Element = document.getElementById("image4");
  const image5Element = document.getElementById("image5");
  const image6Element = document.getElementById("image6");
  const image7Element = document.getElementById("image7");

  textInput.disabled = true;

  function updateTimer() {

    if (timeLeft < 10) {
        timerElement.textContent = '0' + timeLeft;
    } else {
        timerElement.textContent = timeLeft;
    }
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(interval);
      feedBackElement.textContent = "Time's up! You're final score was " + totalScore + "!";
      startButton.textContent = "Play Again";
      startButton.disabled = false;
      textInput.disabled = true;
      textInput.value = "";
      randomString = "";
      answerKey.clear();
      previousCorrectAnswers.clear();
    }
  }

  startButton.addEventListener("click", function() {
    startButton.textContent = "Begin Timer";
    startButton.disabled = true; // Disable the button after starting
    textInput.disabled = false;
    generateRandomLetters();
    changeImages(randomString);
    let randomStringMap = getCharCountMap(randomString);
    scoreElement.textContent = "000";
    totalScore = 0;

    for (const word of dictionary) {
      let wordMap = getCharCountMap(word);
      let canMakeCurrentWord = true;
      for (const char of Object.keys(wordMap)) {
        let currentWordCharCount = wordMap[char];
        let randomStringCharCount = (char in randomStringMap) ? randomStringMap[char] : 0;
        if (currentWordCharCount > randomStringCharCount) {
            canMakeCurrentWord = false;
            break;
        }
      }
      if (canMakeCurrentWord) {
        answerKey.add(word);
      }
    }

    textInput.addEventListener("keypress", function(event) {
          // Check if the pressed key is the Enter key (key code 13)
          if (event.keyCode === 13) {
            const userInput = (textInput.value).trim().toUpperCase();
            if (userInput !== "") {
                if (answerKey.has(userInput)) {
                    if (!previousCorrectAnswers.has(userInput)) {
                        previousCorrectAnswers.add(userInput);
                        let wordPoints = wordScoreCalculation(userInput);
                        totalScore += wordPoints;
                        feedBackElement.textContent = "Correct! " + userInput + " is worth "
                        + wordPoints + " points!";
                        if (totalScore < 10) {
                            scoreElement.textContent = '00' + totalScore;
                        } else if (totalScore < 100) {
                            scoreElement.textContent = '0' + totalScore;
                        } else {
                            scoreElement.textContent = '' + totalScore;
                        }
                    } else {
                        feedBackElement.textContent = "You've already used the word, " + userInput + "!";
                    }
                } else {
                    feedBackElement.textContent = userInput + " is not a valid word!";
                }
            }
            textInput.value = ""; // Clear the input field
          }
        });

    feedBackElement.textContent = "-";
    timeLeft = 30;
    updateTimer();
    interval = setInterval(updateTimer, 1000); // Start the interval
  });

  function generateRandomLetters() {
    const array = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
    'B', 'B',
    'C', 'C',
    'D', 'D', 'D', 'D',
    'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
    'F', 'F',
    'G', 'G', 'G',
    'H', 'H',
    'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
    'J',
    'K',
    'L', 'L', 'L', 'L',
    'M', 'M',
    'N', 'N', 'N', 'N', 'N', 'N',
    'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
    'P', 'P',
    'Q',
    'R', 'R', 'R', 'R', 'R', 'R',
    'S', 'S', 'S', 'S',
    'T', 'T', 'T', 'T', 'T', 'T',
    'U', 'U', 'U', 'U',
    'V', 'V',
    'W', 'W',
    'X',
    'Y', 'Y',
    'Z'];
    while (randomString.length < 7) {
        let randomInt = Math.floor(Math.random() * (98));
        if (array[randomInt] !== null) {
            randomString += array[randomInt];
            array[randomInt] = null;
        }
    }
  }

    function changeImages(inputString) {
        image1.src = `img/raw${inputString[0]}.png`;
        image2.src = `img/raw${inputString[1]}.png`;
        image3.src = `img/raw${inputString[2]}.png`;
        image4.src = `img/raw${inputString[3]}.png`;
        image5.src = `img/raw${inputString[4]}.png`;
        image6.src = `img/raw${inputString[5]}.png`;
        image7.src = `img/raw${inputString[6]}.png`;
    }

    function getCharCountMap(inputString) {
        let charCountMap = {};
        for (const char of inputString) {
            let count = (char in charCountMap) ? charCountMap[char] : 0;
            count++;
            charCountMap[char] = count;
        }
        return charCountMap;
    }

    function wordScoreCalculation(inputString) {
        let wordScore = 0;
        for (const char of inputString) {
            wordScore += scoreMap[char];
        }
        return wordScore;
    }