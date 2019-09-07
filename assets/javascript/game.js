//initial values
let counter = 10;
let currentQuestion = 0;
let score =0;
let lost = 0;
let timer;

//Display question and choices in browser


function loadQuestion(){
    const question= quizQuestions[currentQuestion].question;
    const choices= quizQuestions[currentQuestion].choices;

    $('#game').html('<h4>' + question + '</h4>');

}

loadQuestion();