var titleScreenElem = document.getElementById("title-screen");
var quizScreenElem = document.getElementById("question-screen");
var scoresScreenElem = document.getElementById("high-scores-screen");


function IsHidden(element) {
    return element.getAttribute("hidden");
}

function Hide(element) {
    element.classList.add("hidden");
}

function UnHide(element) {
    element.classList.remove("hidden");
}

function GoToTitle() {
    console.log("GO TO TITLE!");
    Hide(quizScreenElem);
    Hide(scoresScreenElem);
    UnHide(titleScreenElem);
}

function StartQuiz() {
    console.log("START THE QUIZ!");
    Hide(titleScreenElem);
    Hide(scoresScreenElem);
    UnHide(quizScreenElem);

}

function GoToHighScores() {
    console.log("CHECKING HIGH SCORES!");
    Hide(quizScreenElem);
    Hide(titleScreenElem);
    UnHide(scoresScreenElem);

}