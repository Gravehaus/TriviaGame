//Display question and choices in browser

//initial values
let counter = 10;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

function nextQuestion() {
    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        console.log('game over');
        displayResult();

    } else {
        currentQuestion++;
        loadQuestion();
    }

}

//Make timer
function timeUp() {
    clearInterval(timer);

    lost++;
    preLoadImage('lost.');
    setTimeout(nextQuestion, 3 * 1000);
    
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);
    if (counter === 0) {
        timeUp();
    }

}

function loadQuestion() {

    counter = 10;
    timer = setInterval(countDown, 1000);




    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;
    $('#time').html('Timer ' + counter);
    $('#game').html(`
    <h4>${question}</h4>
    ${loadChoices(choices)}
    ${loadRemainingQuestion()}
        
    `);

}

function loadChoices(choices) {
    let result = '';
    for (let i = 0; i < choices.length; i++) {
        result += `<p class = "choice" data-answer="${choices[i]}">${choices[i]}></p>`;

    }
    return result;
}

//go to next question whether right or wrong


$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log('wins');
        preLoadImage('win.');
        setTimeout(nextQuestion, 3 * 1000);
        

    } else {
        lost++;
        preLoadImage('lost');
        setTimeout(nextQuestion, 3 * 1000);
       
    }

});

function displayResult() {
    const result = `
        <p>Correct ${score} questions(s)</p>
        <p>Incorrect ${lost} questions(s)</p>
        <p>Total ${quizQuestions.length} questions(s)</p>
        <button class= btn btn-dark bg-light id="reset">Reset Game</button>
        `;
    $('#game').html(result);
}
$(document).on('click', '#reset', function () {
     counter = 10;
     currentQuestion = 0;
     score = 0;
     lost = 0;
     timer = null;
    console.log('test');

    loadQuestion();
});

function loadRemainingQuestion(){
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;
    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}


////

function preLoadImage(status){
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if(status === 'win'){
        //
        $('#game').html(`
        <p class = "preload-image ">Correct.</p>
        <p class = "preload-image ">the correct answer is ${correctAnswer}</p>
        
        `);
        
    } else{
        //
        $('#game').html(`
        <p class = "preload-image ">Incorrect. Answer was ${correctAnswer}</p>
        <p class = "preload-image ">You are better than this.</p>
        `);
    }
}

loadQuestion();








