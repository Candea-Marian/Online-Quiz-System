import { scienceQuestions } from "./questions.js";

var currentQuestionIndex = 0;
var score = 0;
var userAnswers = [];

// randomize array using Durstenfeld shuffle algorithm
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function populateChoiceButtons(choicesContainer, question) {
  // clear previous choices
  choicesContainer.innerHTML = "";

  question.choices.forEach((choice, index) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.className = "btn-check";
    input.name = "btnradio";
    input.id = `btnradio${index + 1}`;
    input.autocomplete = "off";

    const label = document.createElement("label");
    label.className = "btn btn-outline-primary border-custom";
    label.htmlFor = `btnradio${index + 1}`;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);

    // event listener for radio button click
    input.addEventListener("click", function () {
      submitAnswer(choice);
    });
  });
}

function renderQuestion(question) {
  const questionElement = document.getElementById("question");
  const choicesContainer = document.querySelector(".btn-group-vertical");

  questionElement.textContent = question.questionText;

  populateChoiceButtons(choicesContainer, question);
}

function submitAnswer(selectedAnswer) {
  const correctAnswer = scienceQuestions[currentQuestionIndex].correctAnswer;

  if (selectedAnswer === correctAnswer) {
    score++;
  }

  if (selectedAnswer) {
    userAnswers.push({
      question: scienceQuestions[currentQuestionIndex].questionText,
      correctAnswer: correctAnswer,
      userAnswer: selectedAnswer,
    });
  }

  goToTheNextStep();
}

function goToTheNextStep() {
  // move to the next question or finish the quiz
  if (currentQuestionIndex < scienceQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion(scienceQuestions[currentQuestionIndex]);
  } else {
    // remove the main block contents to make space for the score and answer table
    clearTheMainElement();
    // display the results
    displayResults();
  }
}

function clearTheMainElement() {
  const questionBlock = document.getElementById("question");
  const choicesBlock = document.querySelector(".btn-group-vertical");
  questionBlock.parentNode.removeChild(questionBlock);
  choicesBlock.parentNode.removeChild(choicesBlock);
}

function populateResultTable(resultTable) {
  //resultTable.border = "1"; --> it seems that this practice is deprecated, ill do it in css
  resultTable.classList.add("custom-table");

  //table header
  const headerRow = resultTable.createTHead().insertRow();
  ["Question", "Correct Answer", "Your Answer"].forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  //table body
  const resultTableBody = resultTable.createTBody();
  userAnswers.forEach((answer) => {
    const row = resultTableBody.insertRow();
    ["question", "correctAnswer", "userAnswer"].forEach((questionElement) => {
      const cell = row.insertCell();
      cell.textContent = answer[questionElement]; // like scienceQuestion[question] or scienceQuestion[correctAnswer]

      if (questionElement === "userAnswer") {
        //color based on correctness
        cell.style.color = answer.userAnswer !== answer.correctAnswer ? "red" : "green";
      }
    });
  });

  resultTable.style.margin = "auto";
  resultTable.style.textAlign = "center";
}

function displayResults() {
  const scoreText = document.createElement("h3");
  scoreText.textContent = `Score: ${score} out of ${scienceQuestions.length}`;

  const resultTable = document.createElement("table");
  populateResultTable(resultTable);

  //append the table and score to the main block
  const questionContainer = document.getElementById("question-container");
  questionContainer.appendChild(scoreText);
  questionContainer.appendChild(resultTable);

  //this is just for the container to be scrollable
  questionContainer.style.overflow = "auto";
  questionContainer.style.maxHeight = "600px";
}

shuffleArray(scienceQuestions);
renderQuestion(scienceQuestions[0]);
