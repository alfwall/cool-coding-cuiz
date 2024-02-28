var titleScreenElem = document.getElementById("title-screen");


var quizScreenElem = document.getElementById("question-screen");
var timeLeftElem = document.getElementById("time-left");
var timeLeftCurrent = document.getElementById("time-left-current");
let quizLoop; // Reserves variable name for the timed quiz loop

var scoresScreenElem = document.getElementById("high-scores-screen");

// TODO: DELETE THIS COMMENT, just keep it around till there's a getItem somewhere.
//  localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
var highScores = JSON.parse(localStorage.getItem("highScores"));
var isQuizRunning = false;
var timeLeft = 0.0;
var currentScore = 0;
var newScore = 0;
var playerName = "";

// TODO: move this to a JSON object somewhere else
var questionsAndAnswers = {
    "question1": {
        "question": "1111111111",
        "answer": "YEAH",
        "fakes": {
            "fake1": "NAH1",
            "fake2": "NAH2",
            "fake3": "NAH3"
        }
    },
    "question2": {
        "question": "22222222",
        "answer": "YEAH",
        "fakes": {
            "fake1": "NAH1",
            "fake2": "NAH2",
            "fake3": "NAH3"
        }
    },
    "question3": {
        "question": "333333333",
        "answer": "YEAH",
        "fakes": {
            "fake1": "NAH1",
            "fake2": "NAH2",
            "fake3": "NAH3"
        }
    },
    "question4": {
        "question": "444444444444",
        "answer": "YEAH",
        "fakes": {
            "fake1": "NAH1",
            "fake2": "NAH2",
            "fake3": "NAH3"
        }
    },
};


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
// Reveals the title screen and hides everything else
function GoToTitle() {
    console.log("GO TO TITLE!");

    // TODO: if the quiz was still running, END IT
    if (isQuizRunning) {
        EndTheQuiz();
    }

    Hide(quizScreenElem);
    Hide(scoresScreenElem);
    UnHide(titleScreenElem);
}
// Reveals the Quiz and hides everything else
function GoToQuiz() {
    console.log("GO TO THE QUIZ!");
    Hide(titleScreenElem);
    Hide(scoresScreenElem);
    UnHide(quizScreenElem);
    // Now start the quiz that starts the timer!
    StartTheQuiz()
}
// Reveals the scoreboard and hides everything else
function GoToHighScores() {
    console.log("CHECKING HIGH SCORES!");
    Hide(quizScreenElem);
    Hide(titleScreenElem);
    UnHide(scoresScreenElem);
}


/* -------------- */
/*    THE QUIZ    */
/* -------------- */
function EndTheQuiz() {
    console.log("Ending the quiz with these DEBUG values: ")
    console.log("  score: " + currentScore)
    console.log("  timeLeft: " + timeLeft)
    isQuizRunning = false;
    newScore = currentScore;
    currentScore = 0;
    timeLeft = 0;
    
    GoToHighScores();
}
// Activates the timer
function StartTheQuiz() {
    isQuizRunning = true;
    timeLeft = 30.0;
    currentScore = 0;
    newScore = 0;
    playerName = "";
    var quizLoop = setInterval(function () {
        timeLeft -= 0.1;
        document.getElementById("time-left-current").textContent = timeLeft.toFixed(1);

        if (timeLeft <= 0 || !isQuizRunning) {
            EndTheQuiz();
            // TODO: GO TO HIGH SCORES SCREEN WITH SCORE ENTRY
            clearInterval(quizLoop);
        }
    }, 100);
}



