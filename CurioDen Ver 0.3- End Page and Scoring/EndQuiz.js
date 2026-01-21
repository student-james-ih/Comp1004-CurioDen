//references to html
const username = document.getElementById('username');
const saveBtn = document.getElementById('saveBtn');
const endScore = document.getElementById('endScore')

// take newest score form storage
const newestScore = localStorage.getItem('newestScore');

//Get highscores from storage or empty arrray
const hScores = JSON.parse(localStorage.getItem("hScores")) || [];

//Update score text on final page'
endScore.innerText = newestScore

const NumberOfhScores = 5;

// event listen for when keystroke ended, enables submit button
username.addEventListener('keyup', () =>{
    saveBtn.disabled = !username.value
})

//Saves score storage against username to local array
saveHscore = (e) =>{
    //Prevents form from subbmiting to current url
    e.preventDefault();

    //score obeject
    const score = {
        score : Math.floor(Math.random()* 100),
        name: username.value

    };
    hScores.push(score);
    //stores the 5 highest scores in order
    hScores.sort((a, b) => b.score - a.score);
    hScores.splice(5);

    // store High Scores as JSON string(Cant store regular arrays)
    localStorage.setItem('hScores', JSON.stringify(hScores));
    //Back to home page
    window/location.assign('/main.html')
};