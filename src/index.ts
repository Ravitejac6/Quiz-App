import {allQuestions} from '../src/questions'; 
console.log("Project started");

const quizArea = document.getElementById('quiz');
const resultArea = document.getElementById('results')
const submitButton = document.getElementById('submit')
const startButton = document.getElementById('start-button')

function buildQuiz(){
    const output = [];
    allQuestions.forEach((currentQuestion, questionNumber) =>{
        const answers = [];
        for(let option in currentQuestion.answers){
            answers.push(
                `<input type="radio" name="question${questionNumber}" value="${option}">
                  ${option}: ${currentQuestion.answers[option]}`
              );
        }
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('<br>')} </div><br>`
        );
    });

    quizArea.innerHTML = output.join('');

}

function showResults(){
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
        if(sec ===10){
            clearInterval(fun);
            document.getElementById('timer').innerHTML = "Time Up";
            showResults();
        }
    },1000);
}

buildQuiz();

startButton.addEventListener('click',timer);
submitButton.addEventListener('click',showResults);

