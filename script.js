"use strict";

const guessBtn = document.querySelector(".btn-check");
const userInput = document.querySelector(".guess");
const playAgain = document.querySelector(".reset");

let number = document.querySelector(".number");
let bodyBackground = document.querySelector("body");
let score = 20;
let highScore = 0;
let hideGif = document.querySelector(".gif");
// random number variable
let answer = Math.floor(Math.random() * 20 + 1);

// function to show winning gif
const showWinGif = () => {
  document.querySelector(".gif").src =
    "https://media1.giphy.com/media/5VKbvrjxpVJCM/200w.gif?cid=6c09b952rtwg7yzyec4ojmgcwws85dxwzhrzx458y480wmu9&rid=200w.gif&ct=g";
};

const showLoseGif = () => {
  document.querySelector(".gif").src =
    "https://www.icegif.com/wp-content/uploads/icegif-76.gif";
};

const handleEmptyGif = () => {
  document.querySelector(".gif").src =
    "https://novellivesdotcom.files.wordpress.com/2019/07/tenor.gif?resize=426%2C218";
  setTimeout(() => {
    (document.querySelector(".gif").src = ""), 3000;
  });
};

// function that takes in a "message", and handles different DOM messages
function handleMessage(message) {
  document.querySelector(".message").textContent = message;
}

// event on the Guess-Button
guessBtn.addEventListener("click", () => {
  // 'Number' converts to number because usually when we get things from user a UI field (input),
  //   values usually return a string
  let userGuess = Number(userInput.value);

  //   When there's no input
  if (!userGuess) {
    handleMessage("🧐 Input a number!"), handleEmptyGif();
    handleEmptyGif();
  }
  //   When player wins
  else if (userGuess === answer) {
    showWinGif();
    handleMessage("🎉 That's right!");
    bodyBackground.style.backgroundColor = "#60b347";
    number.textContent = answer;
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  }

  // when guess is wrong
  else if (userGuess !== answer) {
    if (score > 1) {
      handleMessage(userGuess > answer ? "📉 lower!" : "📈 higher!");
      score--;
      document.querySelector(".score").textContent = score;
      console.log(score, "before");
    } else {
      showLoseGif();
      handleMessage("💥 You lost the game, try again!");
      document.querySelector(".score").textContent = 0;
      console.log(score, "after");
    }
  }
});

playAgain.addEventListener("click", () => {
  answer = Math.floor(Math.random() * 20 + 1);
  hideGif.src = "";
  score = 20;
  handleMessage("Start guessing...");
  document.querySelector(".score").textContent = score;
  userInput.value = "";
  number.textContent = "?";
  bodyBackground.style.backgroundColor = "#222";
});
