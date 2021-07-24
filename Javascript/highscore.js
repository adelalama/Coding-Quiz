function printHighscores() {
    // look for any high scores on local storage
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    //create a list with all high scores and display them
    highscores.forEach(function(score) {

      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  printHighscores();
  