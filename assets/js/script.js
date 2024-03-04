let titleScreenElem = document.getElementById("title-screen");

let quizScreenElem = document.getElementById("question-screen");
let timeLeftElem = document.getElementById("time-left");
let timeLeftCurrent = document.getElementById("time-left-current");
let questionElem = document.getElementById("question-bubble");
let allAnswerElems = document.getElementById("all-answer-options");

let quizTimerLoop; // Reserves variable name for the timed quiz loop

let scoresScreenElem = document.getElementById("high-scores-screen");

// TODO: DELETE THIS COMMENT, just keep it around till there's a getItem somewhere.
//  localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
let highScores = JSON.parse(localStorage.getItem("highScores"));
let isQuizRunning = false;
let timeLeft = 0.0;
let currentScore = 0;
let newScore = 0;
let playerName = "";
let shuffledQAs; // Current shuffled array of the QA's

// TODO: move this to a JSON object somewhere else

let questionsAndAnswers = [];
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
        console.log(questionsAndAnswers);
    })
    .catch((error) =>
        console.error("Unable to fetch data:", error));


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
// Method that stops the quiz, called either by time <= 0 or running out of questions
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
function PopulateQuestionAndAnswers() {
    var nextQA = shuffledQAs.shift()
    if (nextQA === undefined) {
        isQuizRunning = false;
        return;
    }
    console.log("nextQA: " + nextQA)
    questionElem.textContent = nextQA["question"];
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
function SelectAnswerInQuiz(answerElem) {
    if (answerElem.classList.contains("right")) {
        currentScore += 1;
        console.log("CORRECT! Score: " + currentScore);
    }
    else {
        timeLeft -= 3.0;
        console.log("WRONGGGGG")
    }
    PopulateQuestionAndAnswers();
}
// Activates the timer
function StartTheQuiz() {
    isQuizRunning = true;
    timeLeft = 30.0;
    currentScore = 0;
    newScore = 0;
    playerName = "";

    // Quickly shuffle the array in place
    shuffledQAs = FisherYatesShuffle(questionsAndAnswers);

    PopulateQuestionAndAnswers()


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



