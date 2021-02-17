import {allQuestions} from '../src/questions'; 
console.log("Project started");

const quizArea = document.getElementById('quiz');
const resultArea = document.getElementById('results')
let submitButton;
const startButton = document.getElementById('start-button')
let allAnswers:String[]=[];
let isSubmit:boolean = false;

startButton.addEventListener('click',loadPage);



function loadPage(){
    removeStartButton();
    timer();
    buildQuiz();
    createSubmitButton();
}
function removeStartButton(){
    startButton.remove();
}

function createSubmitButton(){
    let buttonElement = document.createElement('button');
    let textElement = document.createTextNode("Submit");
    buttonElement.appendChild(textElement);
    buttonElement.setAttribute('class','btn btn-success');
    buttonElement.setAttribute('id','submit');
    quizArea.appendChild(buttonElement);
    submitButton = document.getElementById('submit');
    submitButton.addEventListener('click',showResults);
}

function buildQuiz(){
    const output = [];
    allQuestions.forEach((currentQuestion, questionNumber) =>{
        const answers = [];
        for(let option in currentQuestion.answers){
            answers.push(
                `<input type="radio" name="question${questionNumber}" value="${option}">
                  ${option}: ${currentQuestion.answers[option]}`
              );
              allAnswers.push(currentQuestion.correctAnswer);
        }
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('<br>')} </div><br>`
        );
    });

    quizArea.innerHTML = output.join('');

}

function showResults(){
    isSubmit = true;
    const answerArea = quizArea.querySelectorAll('.answers');
    let userCorrectAnswers = 0;
    allQuestions.forEach( (currentQuestion, questionNumber) =>{
        const answerContainer = answerArea[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {});
        if(userAnswer['value'] === currentQuestion.correctAnswer){
            userCorrectAnswers+=1;
        }
    });
    resultArea.innerHTML = `${userCorrectAnswers} out of ${allQuestions.length}`;
}

function timer(){
    let sec = 0,min=0;
    const fun = setInterval(function(){
        sec+=1;
        if(sec == 60){
            sec = 0;
            min+=1;
        }
        document.getElementById('timer').innerHTML = min.toString()+"min:"+sec.toString()+"sec";
        if(sec ===10 || isSubmit){
            clearInterval(fun);
            document.getElementById('timer').innerHTML = "Time Up";
            showResults();
        }
    },1000);
}

