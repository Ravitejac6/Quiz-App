import {allQuestions} from '../src/questions'; 
console.log("Project started");

const quizArea = document.getElementById('quiz');
const resultArea = document.getElementById('results')
let submitButton,nextButton;
const startButton = document.getElementById('start-button')
let allCorrectAnswers:String[]=[];
let score:number = 0;
let userAns,currAns;
let isSubmit:boolean = false;
let questionIndex:number = 0;

startButton.addEventListener('click',loadPage);


function loadPage(){
    const information = document.getElementById("info");
    information.remove();
    removeStartButton();
    timer();
    buildQuiz(questionIndex);
    createNextButton();
    createSubmitButton();
}
function removeStartButton(){
    startButton.remove();
}

function createNextButton(){
    let buttonElement = document.createElement('button');
    let textElement = document.createTextNode('Next');
    buttonElement.appendChild(textElement);
    buttonElement.setAttribute('class','btn btn-primary');
    buttonElement.setAttribute('id','next-button');
    quizArea.appendChild(buttonElement);
    nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click',nextQuestion);
}

function nextQuestion(){
    questionIndex+=1;
    buildQuiz(questionIndex);
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

function buildQuiz(questionIndex){
    const output = [];
    let currentQuestion = allQuestions[questionIndex];
    currAns = currentQuestion.correctAnswer;
    const answers = [];
    for(let option in currentQuestion.answers){
        answers.push(`<input type="radio" class="ques" name="question${questionIndex}" value="${option}">
        ${option}: ${currentQuestion.answers[option]}`);
    }
    allCorrectAnswers.push(currentQuestion.correctAnswer);
    const textEle = document.createTextNode(`${questionIndex+1}.${currentQuestion.question}`);
    document.getElementsByClassName('question')[0].innerHTML = textEle.data;
    const ansEle = document.createTextNode(`${answers.join('<br>')}`);
    document.getElementsByClassName('answers')[0].innerHTML = ansEle.data;

    document.getElementsByClassName('answers')[0].addEventListener('click',see);

}



function see(){
    let arr:String[] = ['a','b','c','d'];
    for(let i=0;i<3;i++){
        const ele = document.getElementsByClassName("ques")[i] as HTMLInputElement;
        //console.log(ele.checked);
        if(ele.checked){
            userAns = arr[i];
            if(currAns === userAns)
                score+=1;
            break;
        }
    }
}



function showResults(){
    isSubmit = true;
    disableSubmitButton();
    resultArea.innerHTML = `${score} Out of ${allQuestions.length}`;
}

function disableSubmitButton(){
    submitButton.setAttribute('class','btn btn-success disabled');
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
        if(sec ===60 || isSubmit){
            clearInterval(fun);
            document.getElementById('timer').innerHTML = "Time Up";
            showResults();
        }
    },1000);
}