# Cool Coding Cuiz

## Description
Answer questions about JavaScript and win fabulous prizes! (The prize is knowledge and a spot on a scoreboard.)

## The Result
[Click here!](DEPLOYED_URL_HERE)

![Screenshot of the deployed project.](SCREENSHOT_OF_PROJECT_IN_ASSETS)

## Credits
- [Josh Comeau's CSS reset](https://www.joshwcomeau.com/css/custom-css-reset/)
- [The Fisher-Yates shuffle algorithm](https://bost.ocks.org/mike/shuffle/)


## TODO
- [x] Display a Start button, Current High Scores Button
- [x] When Start is pressed, start the quiz
    - [x] Make a set of Q/A objects (Question, Option1, Option2, Option3, Option4, CorrectOptionNumber)
    - [x] Start a timer, display its current time.
    - [x] If incorrect answer, subtract from time
    - [ ] If time >= 0, STOP and display score.
- [ ] Make a High Scores display
    - [ ] If arriving from finished quiz, offer to collect name for score
    - [ ] Include button to Start Again!



## User Story
AS a coding boot camp student,
I WANT to take a timed quiz on JavaScript fundamental that stores high scores,
SO THAT I can gauge my progress compared to my peers.

## Acceptance Criteria
GIVEN I am taking a code quiz...

WHEN I click the start button,
THEN a timer starts and I am presented with a question.

WHEN I answer a question,
THEN I am presented with another question.

WHEN I answer a question incorrectly,
THEN time is subtracted from the clock.

WHEN all questions are answered or the timer reaches 0,
THEN the game is over.

WHEN the game is over,
THEN I can save my initials and score