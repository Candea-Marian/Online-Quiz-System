import { scienceQuestions } from "./scripts/questions.js";

var currentQuestionIndex = 0;
var score = 0;
var userAnswers = [];

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// Function to render a question
function renderQuestion(question) {
  const questionElement = document.getElementById("question");
  const choicesContainer = document.querySelector(".btn-group-vertical");

  // Check if the element with ID "question" exists
  if (!questionElement) {
    console.error('Element with ID "question" not found');
    return;
  }

  // Clear previous content
  questionElement.textContent = question.question;
  choicesContainer.innerHTML = "";

  // Populate choices
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

    // Add event listener for radio button click
    input.addEventListener("click", function () {
      submitAnswer(choice);
    });
  });
}

function submitAnswer(selectedAnswer) {
  const correctAnswer = scienceQuestions[currentQuestionIndex].correctAnswer;

  // Check if the selected answer is correct
  if (selectedAnswer === correctAnswer) {
    score++;
  }

  if (selectedAnswer) {
    userAnswers.push({
      question: scienceQuestions[currentQuestionIndex].question,
      correctAnswer: correctAnswer,
      userAnswer: selectedAnswer,
    });
  }

  // Move to the next question or finish the quiz
  if (currentQuestionIndex < scienceQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion(scienceQuestions[currentQuestionIndex]);
  } else {
    // Remove the 'main' element
    const questionBlock = document.getElementById("question");
    const choicesBlock = document.querySelector(".btn-group-vertical");
    questionBlock.parentNode.removeChild(questionBlock);
    choicesBlock.parentNode.removeChild(choicesBlock);

    // Display final score
    alert(`Quiz complete! Your score: ${score}/${scienceQuestions.length}`);
    displayResultTable();
  }
}

function displayResultTable() {
  // Create a table element
  const resultTable = document.createElement("table");
  resultTable.border = "1";

  // Create table header
  const headerRow = resultTable.createTHead().insertRow();
  ["Question", "Correct Answer", "User Answer"].forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  // Create table body
  const resultTableBody = resultTable.createTBody();
  userAnswers.forEach((answer) => {
    const row = resultTableBody.insertRow();
    ["question", "correctAnswer", "userAnswer"].forEach((prop) => {
      const cell = row.insertCell();
      cell.textContent = answer[prop];
    });
  });

  // Apply styles to center the table
  resultTable.style.margin = "auto";
  resultTable.style.textAlign = "center";

  // Append the table to the document body (or another target element)
  const questionContainer = document.getElementById("question-container");
  questionContainer.appendChild(resultTable);
}

shuffleArray(scienceQuestions);
renderQuestion(scienceQuestions[0]);
