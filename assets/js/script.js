/* -------------- */
/* HELPER METHODS */
/* -------------- */
// Adds the hidden class
function Hide(element) {
    element.classList.add("hidden");
}
// Removes the hidden class
function UnHide(element) {
    element.classList.remove("hidden");
}

/* -------------- */
/*   NAVIGATION   */
/* -------------- */
let titleScreenElem = document.getElementById("title-screen");
let quizScreenElem = document.getElementById("question-screen");
let scoresScreenElem = document.getElementById("high-scores-screen");
var newScoreModal = document.getElementById("new-score-modal");
var closeableSpan = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
closeableSpan.onclick = function () {
    newScoreModal.style.display = "none";
}

// Reveals the title screen and hides everything else
function GoToTitle() {
    //console.log("GO TO TITLE!");
    Hide(quizScreenElem);
    newScoreModal.style.display = "none";
    Hide(scoresScreenElem);
    UnHide(titleScreenElem);
}
// Reveals the Quiz and hides everything else
function GoToQuiz() {
    //console.log("GO TO THE QUIZ!");
    Hide(titleScreenElem);
    newScoreModal.style.display = "none";
    Hide(scoresScreenElem);
    UnHide(quizScreenElem);
    // Now start the quiz that starts the timer!
    StartTheQuiz();
}
// Reveals the scoreboard and hides everything else
function GoToHighScores() {
    //console.log("CHECKING HIGH SCORES!");
    Hide(quizScreenElem);
    Hide(titleScreenElem);
    RepopulateDisplayedHighScores();
    newScoreModal.style.display = "none";
    UnHide(scoresScreenElem);
}
// Reveals the scoreboard AND a new score modal, hiding everything else
function NewHighScore() {
    //console.log("NEW SCORE!");
    Hide(quizScreenElem);
    Hide(titleScreenElem);
    RepopulateDisplayedHighScores();
    newScoreModal.style.display = "block";
    UnHide(scoresScreenElem);
}


/* -------------- */
/*    THE QUIZ    */
/* -------------- */
let isQuizRunning = false;
let timeLeft = 0.0;
let currentScore = 0;
let newScore = 0;
let playerName = "";
let shuffledQAs; // Current shuffled array of the QA's
let questionsAndAnswers = [];
// This fetch grabs the questions/answers from data.json
fetch("./assets/js/data.json")
    .then((res) => {
        if (!res.ok) {
            throw new Error
                (`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        questionsAndAnswers = data["data"];
        //console.log(questionsAndAnswers);
    })
    .catch((error) =>
        console.error("Unable to fetch data:", error));

// Algorithm that shuffles an array in O(n) time by back-filling from random positions.
function FisherYatesShuffle(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
// Puts new questions for answering.
function PopulateQuestionAndAnswers() {
    var nextQA = shuffledQAs.shift()
    if (nextQA === undefined) {
        //console.log("RAN OUTTA SHUFFLED QUESTIONS!!")
        isQuizRunning = false;
        return;
    }
    document.getElementById("question-bubble").textContent = nextQA["question"];
    var allAnswerElems = document.getElementById("all-answer-options");
    allAnswerElems.innerHTML = ""; // Removes the old answer buttons
    var newAnswerElems = [
        "<button class='bubble black-on-blue answer-option right' onclick='SelectAnswerInQuiz(this);'>" + nextQA["answer"] + "</button>",
        "<button class='bubble black-on-blue answer-option wrong' onclick='SelectAnswerInQuiz(this);'>" + nextQA["fake1"] + "</button>",
        "<button class='bubble black-on-blue answer-option wrong' onclick='SelectAnswerInQuiz(this);'>" + nextQA["fake2"] + "</button>",
        "<button class='bubble black-on-blue answer-option wrong' onclick='SelectAnswerInQuiz(this);'>" + nextQA["fake3"] + "</button>"
    ];

    newAnswerElems = FisherYatesShuffle(newAnswerElems);
    allAnswerElems.innerHTML = newAnswerElems.join("");
}
// Answer buttons call this and either increase score or decrease time.
// Personal opinion, I don't like this, and think that correct answers 
// should provide extra time, penalties just add stress to a timed 
// learning activity.
function SelectAnswerInQuiz(answerElem) {
    if (answerElem.classList.contains("right")) {
        currentScore += 1;
        //console.log("CORRECT! Score: " + currentScore);
    }
    else {
        timeLeft -= 3.0;
        //console.log("WRONGGGGG")
    }
    PopulateQuestionAndAnswers();
}

// Interval timer variable.
let quizLoop = null;

// Activates the timer
function StartTheQuiz() {
    isQuizRunning = true;
    timeLeft = 60.0;
    currentScore = 0;
    newScore = 0;
    playerName = "";
    // Quickly shuffle the array in place
    var qnaCopy = questionsAndAnswers.slice();
    shuffledQAs = FisherYatesShuffle(qnaCopy);
    PopulateQuestionAndAnswers()
    // Every 100 ms, decrease a timer. When it hits 0, stop.
    quizLoop = setInterval(function () {
        timeLeft -= 0.1;
        document.getElementById("time-left-current").textContent = timeLeft.toFixed(1);
        if (timeLeft <= 0 || !isQuizRunning) {
            isQuizRunning = false;
            //console.log("AUGH, QUIZLOOP HAS BEEN SLAIN!!!")
            EndTheQuiz();
            clearInterval(quizLoop);
            quizLoop = null;
        }
    }, 100);
}
// Method that stops the quiz, called either by time <= 0 or running out of questions
function EndTheQuiz() {
    //console.log("Ending the quiz with these DEBUG values: ")
    //console.log("  score: " + currentScore)
    //console.log("  timeLeft: " + timeLeft)
    isQuizRunning = false;
    newScore = currentScore;
    currentScore = 0;
    timeLeft = 0;
    if (newScore > 0) {
        NewHighScore();
    }
    else {
        GoToTitle();
    }
}

// ----------------//
/* NEW HIGH SCORES */
// ----------------//
// Current high scores from localStorage are saved to this variable
let highScores = JSON.parse(localStorage.getItem("highScores"));
if (highScores == null) {
    highScores = [];
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
// Clears the scoreboard and displays saved scores.
// NOTE: ASSUMES THE LIST IS ALREADY SORTED BY SCORE
function RepopulateDisplayedHighScores() {
    var topScoresListElem = document.getElementById("top-scores");
    topScoresListElem.innerHTML = "";
    var newHTML = "";
    // CHECK CURRENT HIGH SCORE LIST
    highScores = JSON.parse(localStorage.getItem("highScores"));
    if (highScores == null) {
        return;
    }
    for (var i = 0; i < highScores.length; i++) {
        element = "<li class='bubble black-on-white score'>" + highScores[i]["score"] + ": " + highScores[i]["name"] + "</li>";
        newHTML += element;
    }
    topScoresListElem.innerHTML = newHTML;
}

// Updates localstorage
function SubmitHighScore() {
    // IS THERE A NAME? REQUIRE A NAME
    playerName = document.getElementById("new-score-name").value;
    //console.log("player name: " + playerName)
    // CHECK CURRENT HIGH SCORE LIST
    highScores = JSON.parse(localStorage.getItem("highScores"));
    if (highScores == null) {
        highScores = [];
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }
    // Add submitted name and score to highScores variable
    highScores.push({ "name": playerName, "score": newScore })
    // Sort the list by high score
    function compareByScore(a, b) {
        return b.score - a.score;
    }
    highScores.sort(compareByScore);
    // Update the localStorage of highScores
    localStorage.setItem("highScores", JSON.stringify(highScores));
    RepopulateDisplayedHighScores();
    newScoreModal.style.display = "none";
}