// checkm if js is working correctly
//console.log("Helllo quiz");

// Get all of the questions and the text in them
const question =document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choiceText"));
//reference for Quiz Info
const qCounterText = document.getElementById('qCounter');
const scoreText = document.getElementById('score');
// Creation of global variables
let currentQuestion ={};
let gettingAnswers= false;
let score = 0;
let qCounter = 0;
let newQuestions = [];

//CRITICAL POINT: Hard coded questions, need to change to API 
let questions = [
    {
        question: "Which keyword is used in C# to define a class?",
        choice1: "<struct>",
        choice2: "<define>",
        choice3: "<class--->",
        choice4: "<object>",
        answer: 3

    },

    {
        question: "What is the correct way to declare an integer variable in C#?",
        choice1: "<int number = '10';>",
        choice2: "<integer number = 10;>",
        choice3: "<var number = 'ten';>",
        choice4: "<int number = 10;--->",
        answer: 4

    },

    {
        question: "Which of the following types is a value type in C#?",
        choice1: "<string>",
        choice2: "<int--->",
        choice3: "<array>",
        choice4: "<class>",
        answer: 2

    },

    {
        question: "What does the static keyword mean when applied to a method?",
        choice1: "<The method belongs to the class, not to an instance of the class--->",
        choice2: "<The method can only be called once>",
        choice3: "<The method cannot return a value>",
        choice4: "<The method runs automatically at program startup>",
        answer: 1

    }
]
const CorrectScore = 5;
const NumberOfQuestions = 4;

// Loads questions into array and resets counter and score
startQuiz = () => {
    // Initializing variables to 0
    qCounter = 0;
    score = 0;
    // CRITICAL POINT: putting hard coded qustions into new array
    newQuestions = [...questions];
    getNewQuestions();
};

//Increments question counter and randomizes the next question and answers
getNewQuestions = () =>{

    // Checks if there's anymore questions to show
    if(newQuestions.length === 0 || qCounter >= NumberOfQuestions){
        // Go to the complete quiz page
        return window.location.assign("/EndQuiz.html");
    }
    qCounter++;
    //update quiz info text
    qCounterText.innerText = `${qCounter}/${NumberOfQuestions}`;

    const qIndex = Math.floor(Math.random() * newQuestions.length);
    currentQuestion = newQuestions[qIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    // removes the question that was just used from the array
    newQuestions.splice(qIndex, 1);

    gettingAnswers = true;

};
// checks if selected answer is correct and calls getNewQuestions
choices.forEach(choice =>{
    choice.addEventListener("click", e => {
        if(!gettingAnswers) return;

        gettingAnswers = false;

        // creation of local variables
        const selectedAns = e.target;
        const selectedAnswer = selectedAns.dataset["number"];
        // Ternary operator, if selected answer is correct applies correct class, if not applies incorect class
        const applyClass = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        selectedAns.parentElement.classList.add(applyClass)
        //calls addScore function if coorect answer is selected, increasing it by 'CorrectScore'
        if(applyClass === 'correct'){
            addScore(CorrectScore);
        }

        // removes correct/incorrect class and gets next question after pause
        setTimeout(() => {
            selectedAns.parentElement.classList.remove(applyClass)
            getNewQuestions();
        },1000);

    });
});
//Increases score for every correct question and updates html
addScore = num => {
    score +=num;
    scoreText.innerText = score;
}
startQuiz(); 