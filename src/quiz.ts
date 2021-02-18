import { allQuestions } from "../src/questions";
console.log("Project started");

const quizArea = document.getElementById("quiz");
const resultArea = document.getElementById("results");
let submitButton, nextButton;
const startButton = document.getElementById("start-button");
let allCorrectAnswers: String[] = [];
let score: number = 0;
let userAns, currAns;
let isSubmit: boolean = false;
let questionIndex: number = 0;
let totalNumberofQuestion: number = allQuestions.length;

startButton.addEventListener("click", loadPage);

function loadPage() {
  const information = document.getElementsByClassName("card")[0];
  information.remove();
  removeStartButton();
  timer();
  buildQuiz(questionIndex);
  createNextButton();
  createSubmitButton();
}
function removeStartButton() {
  startButton.remove();
}

function createNextButton() {
  let buttonElement = document.createElement("button");
  let textElement = document.createTextNode("Next");
  buttonElement.appendChild(textElement);
  buttonElement.setAttribute("class", "btn btn-primary");
  buttonElement.setAttribute("id", "next-button");
  quizArea.appendChild(buttonElement);
  nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", nextQuestion);
}

function nextQuestion() {
  if (questionIndex == totalNumberofQuestion - 1) {
    nextButton.setAttribute("class", "btn btn-success disabled");
    return;
  }
  questionIndex += 1;
  buildQuiz(questionIndex);
}

function createSubmitButton() {
  let buttonElement = document.createElement("button");
  let textElement = document.createTextNode("Submit");
  buttonElement.appendChild(textElement);
  buttonElement.setAttribute("class", "btn btn-success");
  buttonElement.setAttribute("id", "submit");
  quizArea.appendChild(buttonElement);
  submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", showResults);
}

function buildQuiz(questionIndex) {
  let currentQuestion = allQuestions[questionIndex];
  currAns = currentQuestion.correctAnswer;
  const answers = [];
  for (let option in currentQuestion.answers) {
    answers.push(`<input type="radio" class="ques" name="question${questionIndex}" value="${option}">
        ${option}: ${currentQuestion.answers[option]}`);
  }
  allCorrectAnswers.push(currentQuestion.correctAnswer);
  const textEle = document.createTextNode(
    `${questionIndex + 1}.${currentQuestion.question}`
  );
  document.getElementsByClassName("question")[0].innerHTML = textEle.data;
  const ansEle = document.createTextNode(`${answers.join("<br>")}`);
  document.getElementsByClassName("answers")[0].innerHTML = ansEle.data;
  document
    .getElementsByClassName("answers")[0]
    .addEventListener("click", verifyAnswer);
}

function verifyAnswer() {
  let arr: String[] = ["a", "b", "c", "d"];
  for (let i = 0; i < 4; i++) {
    const ele = document.getElementsByClassName("ques")[i] as HTMLInputElement;
    //console.log(ele.checked);
    if (ele.checked) {
      userAns = arr[i];
      if (currAns === userAns) score += 1;
      break;
    }
  }
}

function showResults() {
  isSubmit = true;
  disableSubmitButton();
  resultArea.setAttribute("class", "card");
  resultArea.innerHTML = `${score} Out of ${allQuestions.length}`;
}

function disableSubmitButton() {
  submitButton.setAttribute("class", "btn btn-success disabled");
}

function timer() {
  let sec = 59,
    min = 1;
  const fun = setInterval(function () {
    sec -= 1;
    document.getElementById("timer").innerHTML =
      min.toString() + "min:" + sec.toString() + "sec";
    if ((min === 0 && sec === 0) || isSubmit) {
      clearInterval(fun);
      document.getElementById("timer").innerHTML = "Time Up";
      showResults();
    }
    if (sec == 0) {
      sec = 60;
      min -= 1;
    }
  }, 1000);
}
