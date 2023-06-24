// Quiz Questions
var questions = [
  {
    question: "What is the correct way to declare a JavaScript variable?",
    choices: [
      "var myVariable;",
      "let myVariable;",
      "const myVariable;",
      "All of the above",
    ],
    answer: 3,
  },
  {
    question: "Which function is used to output data in JavaScript?",
    choices: ["alert()", "console.log()", "document.write()", "print()"],
    answer: 1,
  },
  {
    question: "What is the result of the following expression: 2 + '2'?",
    choices: ["4", "22", "NaN", "TypeError"],
    answer: 1,
  },
];

// Elements
var questionContainer = document.getElementById("question-container");
var choicesContainer = document.getElementById("choices-container");
var startButton = document.getElementById("start-button");
var endQuizContainer = document.getElementById("end-quiz-container");
var initialsInput = document.getElementById("initials-input");
var saveButton = document.getElementById("save-button");
var timerContainer = document.getElementById("timer-container");
var scoreContainer = document.getElementById("score-container");
var timerElement = document.getElementById("timer");
var scoreElement = document.getElementById("score");
var feedbackContainer = document.getElementById("feedback-container");
var feedbackMessage = document.getElementById("feedback-message");
var nextButton = document.getElementById("next-button");

// Variables
var currentQuestionIndex = 0;
var score = 0;
var time = 60;
var timerInterval;

// Start Quiz
function startQuiz() {
  startButton.style.display = "none";
  questionContainer.style.display = "block";
  choicesContainer.style.display = "block";
  timerContainer.classList.remove("hidden");
  scoreContainer.classList.remove("hidden");
  timerInterval = setInterval(updateTimer, 1000);
  displayQuestion();
  updateTimer();
}

// Display Question
function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;
  choicesContainer.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, index) {
    var choiceButton = createChoiceButton(choice, index);
    choicesContainer.appendChild(choiceButton);
  });

  scoreElement.textContent = score;
  addChoiceButtonListeners();
}

// Create Choice Button
function createChoiceButton(choice, index) {
  var choiceButton = document.createElement("button");
  choiceButton.textContent = choice;
  choiceButton.classList.add("choice-button");
  choiceButton.setAttribute("data-index", index);
  return choiceButton;
}

// Add Choice Button Listeners
function addChoiceButtonListeners() {
  var choiceButtons = document.querySelectorAll(".choice-button");
  choiceButtons.forEach(function (choiceButton) {
    choiceButton.addEventListener("click", checkAnswer);
  });
}

// Check Answer
function checkAnswer(event) {
  var selectedChoice = event.target;
  var selectedAnswer = selectedChoice.getAttribute("data-index");
  var currentQuestion = questions[currentQuestionIndex];
  var correctAnswer = currentQuestion.answer;

  if (selectedAnswer == correctAnswer) {
    score += 100;
    scoreElement.textContent = score;
    showFeedback("Correct");
  } else {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    showFeedback("Incorrect");
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length || time === 0) {
    endQuiz();
  } else {
    displayQuestion();
  }
}

// Show Feedback
function showFeedback(message) {
  feedbackMessage.textContent = message;
  feedbackContainer.classList.remove("hidden");
  setTimeout(hideFeedback, 2000);
}

// Hide Feedback
function hideFeedback() {
  feedbackContainer.classList.add("hidden");
}

// End Quiz
function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.style.display = "none";
  choicesContainer.style.display = "none";
  endQuizContainer.style.display = "block";
  document.querySelector("header").classList.add("hidden");
  scoreElement.textContent = score;
}

// Update Timer
function updateTimer() {
  time--;
  if (time <= 0) {
    time = 0;
    endQuiz();
  }
  timerElement.textContent = time;
}

// Save High Score
function saveHighScore() {
  var initials = initialsInput.value.trim();

  if (initials !== "") {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var highScore = { initials: initials, score: score };
    highScores.push(highScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscore.html";
  } else {
    alert("Please enter your initials.");
  }
}

// Event Listeners
startButton.addEventListener("click", startQuiz);
saveButton.addEventListener("click", saveHighScore);
nextButton.addEventListener("click", function () {
  hideFeedback();
  if (currentQuestionIndex === questions.length || time === 0) {
    endQuiz();
  } else {
    displayQuestion();
  }
});

// Event Listener for Play Again button
document
  .getElementById("highscore-button")
  .addEventListener("click", function () {
    window.location.href = "index.html";
  });
