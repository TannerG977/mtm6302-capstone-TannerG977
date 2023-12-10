const $quizpopupeasy = document.getElementById('quizpopupeasy');
const $diffEasy = document.querySelectorAll('.diffbtneasy');
const $exitbtn = document.querySelectorAll('.exitbtn');
const $submitbtneasy = document.getElementById('submitbtneasy');
const $correct = document.getElementById('correctPopup');
const $incorrect = document.getElementById('incorrectPopup');
const $quizpopupmedium = document.getElementById('quizpopupmedium');
const $diffMedium = document.querySelectorAll('.diffbtnmedium');
const $submitbtnmedium = document.getElementById('submitbtnmedium');
const $diffAdvanced = document.querySelectorAll('.diffbtnadvanced');
const $quizpopupadvanced = document.getElementById('quizpopupadvanced');
const $submitbtnadvanced = document.getElementById('submitbtnadvanced');
const $answersRight = document.getElementById('answersRight');
const $answersWrong = document.getElementById('answersWrong');
const $resetbtn = document.getElementById('resetbtn');

let currentCorrectAnswers = null;

$diffEasy.forEach(diffEasy => {
    diffEasy.addEventListener('click', () => {
        $correct.style.display = 'none';
        $quizpopupeasy.style.display = 'flex';
        $quizpopupmedium.style.display = 'none';
        $quizpopupadvanced.style.display = 'none';
        fetch('https://quizapi.io/api/v1/questions?apiKey=MMGsykhM9AOAIMy5OEKPPwgos9HKG1OqQGkCxfuY&category=code&difficulty=Easy&limit=1')
            .then(response => response.json())
            .then(data => {
                data.forEach(quest => {
                    currentCorrectAnswers = quest.correct_answers;
                    console.log('currentCorrectAnswers:', currentCorrectAnswers);
                    const getQuestion = `${quest.question}`;
                    document.getElementById('question').textContent = getQuestion;

                    const answersdiv = document.getElementById('answers');

                    const answers = Object.entries(quest.answers);

                    const answeritems = [];

                    for (const [key, answer] of answers) {
                        if (answer !== null) {
                            answeritems.push(`<label class="answerstyle">
                                <input type="radio" name="answer" data-key="${key}" value="${answer}">
                                ${answer}
                            </label><br>`);
                        }
                    }
                    answersdiv.innerHTML = answeritems.join('');
                });
            });
    });
});

$diffMedium.forEach(diffMedium => {
    diffMedium.addEventListener('click', () => {
        $correct.style.display = 'none';
        $quizpopupeasy.style.display = 'none';
        $quizpopupmedium.style.display = 'flex';
        $quizpopupadvanced.style.display = 'none';
        fetch('https://quizapi.io/api/v1/questions?apiKey=MMGsykhM9AOAIMy5OEKPPwgos9HKG1OqQGkCxfuY&category=code&difficulty=Medium&limit=1')
            .then(response => response.json())
            .then(data => {
                data.forEach(quest => {
                    currentCorrectAnswers = quest.correct_answers;
                    console.log('currentCorrectAnswers:', currentCorrectAnswers);
                    const getQuestion = `${quest.question}`;
                    document.getElementById('mediumquestion').textContent = getQuestion;

                    const answersdiv = document.getElementById('mediumanswers');

                    const answers = Object.entries(quest.answers);

                    const answeritems = [];

                    for (const [key, answer] of answers) {
                        if (answer !== null) {
                            answeritems.push(`<label class="answerstyle">
                                <input type="radio" name="answer" data-key="${key}" value="${answer}">
                                ${answer}
                            </label><br>`);
                        }
                    }
                    answersdiv.innerHTML = answeritems.join('');
                });
            });
    });
});

$diffAdvanced.forEach(diffAdvanced => {
    diffAdvanced.addEventListener('click', () => {
        $correct.style.display = 'none';
        $quizpopupeasy.style.display = 'none';
        $quizpopupmedium.style.display = 'none';
        $quizpopupadvanced.style.display = 'flex';
        fetch('https://quizapi.io/api/v1/questions?apiKey=MMGsykhM9AOAIMy5OEKPPwgos9HKG1OqQGkCxfuY&category=code&difficulty=Hard&limit=1')
            .then(response => response.json())
            .then(data => {
                data.forEach(quest => {
                    currentCorrectAnswers = quest.correct_answers;
                    console.log('currentCorrectAnswers:', currentCorrectAnswers);
                    const getQuestion = `${quest.question}`;
                    document.getElementById('advancedquestion').textContent = getQuestion;

                    const answersdiv = document.getElementById('advancedanswers');

                    const answers = Object.entries(quest.answers);

                    const answeritems = [];

                    for (const [key, answer] of answers) {
                        if (answer !== null) {
                            answeritems.push(`<label class="answerstyle">
                                <input type="radio" name="answer" data-key="${key}" value="${answer}">
                                ${answer}
                            </label><br>`);
                        }
                    }
                    answersdiv.innerHTML = answeritems.join('');
                });
            });
    });
});

$exitbtn.forEach(exitbtn => {
    exitbtn.addEventListener('click', () => {
        $quizpopupeasy.style.display = 'none';
        $correct.style.display = 'none';
        $incorrect.style.display = 'none';
        $quizpopupmedium.style.display = 'none';
        $quizpopupadvanced.style.display = 'none';
    });
});

let correctlog = parseInt(localStorage.getItem('right')) || 0;
let incorrectlog = parseInt(localStorage.getItem('wrong')) || 0;

$answersRight.textContent = correctlog;
$answersWrong.textContent = incorrectlog;

$resetbtn.addEventListener('click', () => {
    localStorage.removeItem('right');
    localStorage.removeItem('wrong');
    correctlog = 0;
    incorrectlog = 0; 
    $answersRight.textContent = correctlog;
    $answersWrong.textContent = incorrectlog;
});

function rightAnswerCount () {
    correctlog++;
    $answersRight.textContent = correctlog;
    localStorage.setItem('right', correctlog);
};

function wrongAnswerCount () {
    incorrectlog++;
    $answersWrong.textContent = incorrectlog;
    localStorage.setItem('wrong', incorrectlog);
};

function selectedAnswer(isCorrect) {
    if (isCorrect) {
        $correct.style.display = 'flex';
        rightAnswerCount ();
    } else {
        $incorrect.style.display = 'flex';
        wrongAnswerCount ();
    }
    $quizpopupeasy.style.display = 'none';
    $quizpopupmedium.style.display = 'none';
    $quizpopupadvanced.style.display = 'none';
};

$submitbtneasy.addEventListener('click', () => {
    const selectedRadio = document.querySelector('input[name="answer"]:checked');
    if (selectedRadio) {
        let selectedKey = selectedRadio.dataset.key;
        let isCorrect = currentCorrectAnswers[selectedKey + '_correct'] === 'true';
        selectedAnswer(isCorrect);
    }
});

$submitbtnmedium.addEventListener('click', () => {
    const selectedRadio = document.querySelector('input[name="answer"]:checked');
    if (selectedRadio) {
        let selectedKey = selectedRadio.dataset.key;
        let isCorrect = currentCorrectAnswers[selectedKey + '_correct'] === 'true';
        selectedAnswer(isCorrect);
    }
});

$submitbtnadvanced.addEventListener('click', () => {
    const selectedRadio = document.querySelector('input[name="answer"]:checked');
    if (selectedRadio) {
        let selectedKey = selectedRadio.dataset.key;
        let isCorrect = currentCorrectAnswers[selectedKey + '_correct'] === 'true';
        selectedAnswer(isCorrect);
    }
});

    



















