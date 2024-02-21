var titleScreenElem = document.getElementById("title-screen");
var quizScreenElem = document.getElementById("question-screen");
var scoresScreenElem = document.getElementById("high-scores-screen");


function IsHidden(element) {
    return element.getAttribute("hidden");
}

function Hide(element) {
    element.setAttribute("hidden", "hidden");
}

function UnHide(element) {
    element.removeAttribute("hidden");
}

function GoToTitle() {
    Hide(quizScreenElem);
    Hide(scoresScreenElem);
    UnHide(titleScreenElem);
}

function StartQuiz() {
    Hide(titleScreenElem);
    Hide(scoresScreenElem);
    UnHide(quizScreenElem);

}

function GoToHighScores() {
    Hide(quizScreenElem);
    Hide(titleScreenElem);
    UnHide(scoresScreenElem);

}