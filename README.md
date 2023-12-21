# Quiz Application README

## Problem Statement

This project involves creating a web-based quiz application that covers various topics such as Science, History, and Math. The application should dynamically generate questions, present them to the user, and calculate their score based on correct answers. The key requirements include question generation, a user-friendly quiz interface, a scoring system, and an algorithm to handle question randomization.

## Logical Design

1. **Question Structure:**
   - Each question should have a unique ID, the question text, multiple choices (4 options), and the correct answer.
   - Questions can be organized in a pool to facilitate random selection without repetition.

2. **User Progress:**
   - Maintain user progress by keeping track of the current question index and the user's score.
   - Ensure that questions are presented in a random order, and each question is answered only once.

3. **Algorithm for Question Randomization:**
   - Utilize an algorithm to shuffle the question pool initially.
   - After presenting a question, remove it from the pool to prevent repetition.
   - If the user completes all questions, consider reshuffling the pool for a new round.

## Algorithm Implementation (Partial Code)

- See the provided JavaScript code for functions that handle question randomization, user input, scoring, and interface rendering.
- The `shuffleArray` function uses the Durstenfeld shuffle algorithm to randomize the order of questions.

```javascript
// randomize array using Durstenfeld shuffle algorithm
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

## Class and Database Representation (Explanation Only)



### Class Diagram

![Class Diagram](assets/images/classDiagramQuiz.png)

#### Question Class:


#### User Class:


### Database Schema

![database](assets/images/databaseSchemaQuiz.png)

#### Table: Questions


#### Table: UserProgress


### Relationships
.

## Usage

1. Open `index.html` in a web browser.
2. Answer each question by selecting a choice.
3. The app will display the score and a table summarizing your answers at the end of the quiz.

