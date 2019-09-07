//Display question and choices in browser

//initial values
let counter = 10;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

function nextQuestion() {
    const isQuestionOver = (quizQuestions.length -1) === currentQuestion;
    if (isQuestionOver) {
        console.log('game over');

    } else {
        currentQuestion++;
        loadQuestion();
    }

}

    //Make timer
    function timeUp() {
        clearInterval(timer);

        lost++;

        nextQuestion();
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

    loadQuestion();







