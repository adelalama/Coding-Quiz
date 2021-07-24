var currentQuestionNumber = 0;
var time = questions.length * 10;
var timerId;
var questionsElement = document.getElementById("questions");
var timerElement = document.getElementById("time");
var choicesElement = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsElement = document.getElementById("initials");
var feedbackElement = document.getElementById("feedback");

//This function will hide the start-screen element, start the quiz timer and call the getQuestion function
function startQuiz() {

  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsElement.removeAttribute("class");
  timerId = setInterval(clockTick, 1000);
  timerElement.textContent = time;

  getQuestion();
}

//This function will extract the first question from our questions array and display them
function getQuestion() {
  
  var currentQuestion = questions[currentQuestionNumber];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choicesElement.innerHTML = "";

  // this will loop through "choices" for possible answers, creating a selectable button for each one 
  currentQuestion.choices.forEach(function(choice, i) {

    var choiceNode = document.createElement("button");

    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = "- " + choice;

    choiceNode.onclick = questionClick;
    choicesElement.appendChild(choiceNode);
  });
}


//this function will validate the users input and subtract time if the answer is incorrect. It will also message the user with a Wrong or Correct feedback
function questionClick() {
  
  if (this.value !== questions[currentQuestionNumber].answer) {
    
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    timerElement.textContent = time;

    feedbackElement.textContent = "Wrong!";
  } else {
    

    feedbackElement.textContent = "Correct!";
  }

  feedbackElement.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackElement.setAttribute("class", "feedback hide");
  }, 1000);

  //Sends user to next question if there are any available 
  currentQuestionNumber++;
  if (currentQuestionNumber === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

//this function will be used when there are no more questions, bringing up the end-screen element and saving your final score
function quizEnd() {
 
  clearInterval(timerId);

  
  var endScreenElement = document.getElementById("end-screen");
  endScreenElement.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  questionsElement.setAttribute("class", "hide");
}

//function to end the game if timer hits 0
function clockTick() {
  time--;
  timerElement.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

//this will save the users high score
function saveHighscore() {

  var initials = initialsElement.value.trim();
//if initials are not void, save a new highscore for the user and make it visible to user
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: time,
      initials: initials
    };

    // save high score to local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}


submitBtn.onclick = saveHighscore;


startBtn.onclick = startQuiz;

initialsElement.onkeyup = checkForEnter;
