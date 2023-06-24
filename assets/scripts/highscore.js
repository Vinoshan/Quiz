// Elements
var highscoreContainer = document.getElementById("highscore-container");
var clearButton = document.getElementById("clear-button");

// Display High Scores
function displayHighScores() {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var sortedHighScores = highScores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscoreContainer.innerHTML = "";

  sortedHighScores.forEach(function (highScore) {
    var highScoreItem = document.createElement("div");
    highScoreItem.textContent = highScore.initials + " - " + highScore.score;
    highscoreContainer.appendChild(highScoreItem);
  });
}

// Clear High Scores
function clearHighScores() {
  localStorage.removeItem("highScores");
  displayHighScores();
}

// Event Listeners
clearButton.addEventListener("click", clearHighScores);

// Call displayHighScores initially to show any existing high scores
displayHighScores();

// Event Listener for Play Again button
document
  .getElementById("play-again-button")
  .addEventListener("click", function () {
    window.location.href = "index.html";
  });
