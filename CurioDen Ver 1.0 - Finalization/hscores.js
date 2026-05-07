//reference to html
const hScoresList = document.getElementById('hScoresList')
//hisghscore from local
const hScores = JSON.parse(localStorage.getItem('hScores')) || [];

//Add scores to unordered list
hScoresList.innerHTML = hScores.map ( score =>{
    return`<li class="highScore">${score.name} - ${score.score}</li>`;
}).join("");