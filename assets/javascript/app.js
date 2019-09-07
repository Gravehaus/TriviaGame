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


    $(document).on('click', '.choice', function(){
        clearInterval(timer);
        const selectedAnswer =  $(this).attr('data-answer');
        const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

        if (correctAnswer ===selectedAnswer){
                score ++;
                nextQuestion();
                console.log('wins');

        } else{
            lost ++;
            nextQuestion();
            console.log('loss');
        }
           
    });

    function displayResult(){
        const result = `
        <p>Your score ${score} questions(s)</p>
        <p>Your score ${lost} questions(s)</p>
        <p>Total ${quizQuestions.length} questions(s)</p>
        <button>Reset Game</button>
        `;
        $('#game').html(result);
    }

    loadQuestion();







