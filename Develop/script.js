var words = ["africa","atlas","asia","border","country","cartographer","continent","earth","europe","equator","geography","global","gp","hemisphere","island","key","kilometers","legend","latitude","landform","longitude","map","meridian","mountain","nation","north","northeast","northwest","ocean","pole","peak","parallel","region","river","scale","south","sea","territory","tropics","topography","west","world"];
var wordBlank = document.querySelector(".words");
var win = document.querySelector(".win");
var lose = document.querySelector(".loss");
var timerEl = document.querySelector(".timer-count")
var startBtn = document.querySelector("#start")

var chosenWord = "";
var numBlank = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
var blanksLetters = [];

// The init function is called when the page loads 
function init() {
    getWins();
    getlosses();
  }

// the actual game
function startGame(){
    isWin = false;
    timerCount = 20;
    // cant click start btn when a game is being played
    startBtn.disabled = true;
    renderBlanks();
    startTimer();
}

// win's score
function winGame() {
    wordBlank.textContent = "YOU WON!!!🏆 ";
    winCounter++;
    startBtn.disabled = false;
    setWins();
  }
// lose score
function loseGame() {
    wordBlank.textContent = "GAME OVER";
    loseCounter++;
    startBtn.disabled = false;
    setLosses();
  }

// start and stop the timer
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  }

// Creates blanks on screen
function renderBlanks() {
    // Randomly picks word from words array
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;
    blanksLetters = []
    // Uses loop to push blanks to blankLetters array
    for (var i = 0; i < numBlanks; i++) {
      blanksLetters.push("_");
    }
    // Converts blankLetters array into a string and renders it on the screen
    wordBlank.textContent = blanksLetters.join(" ")
  }

// updates win count on screen and sets win count to client storage
function setWins() {
    win.textContent = winCounter;
    localStorage.setItem("winCount", winCounter);
  }
// updates lose count on screen and sets lose count to client storage
function setLosses() {
    lose.textContent = loseCounter;
    localStorage.setItem("loseCount", loseCounter);
  }
  function getWins() {
    // Get stored value from client storage, if it exists
    var storedWins = localStorage.getItem("winCount");
    // If stored value doesn't exist, set counter to 0
    if (storedWins === null) {
      winCounter = 0;
    } else {
      // If a value is retrieved from client storage set the winCounter to that value
      winCounter = storedWins;
    }
    //Render win count to page
    win.textContent = winCounter;
  }
  function getlosses() {
    var storedLosses = localStorage.getItem("loseCount");
    if (storedLosses === null) {
      loseCounter = 0;
    } else {
      loseCounter = storedLosses;
    }
    lose.textContent = loseCounter;
  }

  function checkWin() {
    // If the word equals the blankLetters array when converted to string, set isWin to true
    if (chosenWord === blanksLetters.join("")) {
      // This value is used in the timer function to test if win condition is met
      isWin = true;
    }
  }

// checking the letters to match the words
function checkLetters(letter) {
    var letterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
      if (chosenWord[i] === letter) {
        letterInWord = true;
      }
    }
    if (letterInWord) {
      for (var j = 0; j < numBlanks; j++) {
        if (chosenWord[j] === letter) {
          blanksLetters[j] = letter;
        }
      }
      wordBlank.textContent = blanksLetters.join(" ");
    }
  }

// word guessing
document.addEventListener("keydown", function(event) {
    // If the count is zero, exit function
    if (timerCount === 0) {
      return;
    }
    // Convert all keys to lower case
    var key = event.key.toLowerCase();
    var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
    // Test if key pushed is letter
    if (alphabetNumericCharacters.includes(key)) {
      var letterGuessed = event.key;
      checkLetters(letterGuessed)
      checkWin();
    }
  });

// button to start the game
startBtn.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// reseting the game
var resetBtn = document.querySelector("#reset")

function resetGame() {
    // Resets win and loss counts
    winCounter = 0;
    loseCounter = 0;
    // Renders win and loss counts and sets them into client storage
    setWins()
    setLosses()
  }

// button to restart the game
resetBtn.addEventListener("click", resetGame);