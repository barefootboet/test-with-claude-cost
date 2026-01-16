const questions = [
    {
        question: "How often do you play golf?",
        options: [
            { text: "Never played before or less than once a year", points: 0 },
            { text: "A few times a year", points: 1 },
            { text: "Once or twice a month", points: 2 },
            { text: "Weekly or more", points: 3 }
        ]
    },
    {
        question: "What's your approximate handicap or average score?",
        options: [
            { text: "I don't know / Never completed 18 holes", points: 0 },
            { text: "Over 110 or no official handicap", points: 1 },
            { text: "90-110 (handicap 20-36)", points: 2 },
            { text: "Under 90 (handicap under 20)", points: 3 }
        ]
    },
    {
        question: "How long have you been playing golf?",
        options: [
            { text: "Never or less than 6 months", points: 0 },
            { text: "6 months to 2 years", points: 1 },
            { text: "2-5 years", points: 2 },
            { text: "More than 5 years", points: 3 }
        ]
    },
    {
        question: "How comfortable are you with using different clubs?",
        options: [
            { text: "I don't know the difference between clubs", points: 0 },
            { text: "I know some clubs but struggle with most", points: 1 },
            { text: "Comfortable with most clubs, still learning some", points: 2 },
            { text: "Confident with all clubs in my bag", points: 3 }
        ]
    },
    {
        question: "Have you taken professional golf lessons?",
        options: [
            { text: "No, I've never taken lessons", points: 0 },
            { text: "One or two introductory lessons", points: 1 },
            { text: "Several lessons over a few months", points: 2 },
            { text: "Regular lessons or long-term coaching", points: 3 }
        ]
    }
];

const experienceLevels = [
    {
        name: "Beginner",
        minScore: 0,
        maxScore: 4,
        description: "You're just starting your golf journey! This is an exciting time to learn the basics, understand the rules, and develop your swing. Consider taking some introductory lessons and playing at practice ranges to build your foundation."
    },
    {
        name: "Intermediate",
        minScore: 5,
        maxScore: 9,
        description: "You've got a solid foundation and are developing your skills! You understand the game and can play a full round. Focus on consistency, course management, and refining your technique to take your game to the next level."
    },
    {
        name: "Advanced",
        minScore: 10,
        maxScore: 12,
        description: "You're an experienced golfer with well-developed skills! You play regularly, have good course management, and are comfortable in most situations. Keep working on the finer details to lower your scores even more."
    },
    {
        name: "Expert",
        minScore: 13,
        maxScore: 15,
        description: "You're a highly skilled golfer with extensive experience! You have excellent command of all aspects of the game, play regularly, and maintain a low handicap. Your dedication to golf shows in your consistent performance on the course."
    }
];

let currentQuestion = 0;
let answers = [];

const questionContainer = document.getElementById('question-container');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress');
const restartBtn = document.getElementById('restart-btn');

function renderQuestion() {
    const q = questions[currentQuestion];

    questionContainer.innerHTML = `
        <div class="question">
            <h3><span class="question-number">Question ${currentQuestion + 1} of ${questions.length}</span><br>${q.question}</h3>
            <div class="options">
                ${q.options.map((option, index) => `
                    <div class="option" data-index="${index}" onclick="selectOption(${index})">
                        ${option.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    if (answers[currentQuestion] !== undefined) {
        const selectedOption = questionContainer.querySelector(`[data-index="${answers[currentQuestion]}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
    }

    updateButtons();
    updateProgress();
}

function selectOption(index) {
    answers[currentQuestion] = index;

    const options = questionContainer.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');

    updateButtons();
}

function updateButtons() {
    prevBtn.disabled = currentQuestion === 0;

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = 'See Results';
    } else {
        nextBtn.textContent = 'Next';
    }

    nextBtn.disabled = answers[currentQuestion] === undefined;
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function calculateScore() {
    let totalScore = 0;
    answers.forEach((answerIndex, questionIndex) => {
        totalScore += questions[questionIndex].options[answerIndex].points;
    });
    return totalScore;
}

function showResults() {
    const score = calculateScore();
    const level = experienceLevels.find(lvl => score >= lvl.minScore && score <= lvl.maxScore);

    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    document.getElementById('result-level').textContent = level.name;
    document.getElementById('result-description').textContent = level.description;
}

function restartQuiz() {
    currentQuestion = 0;
    answers = [];
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    renderQuestion();
}

prevBtn.addEventListener('click', previousQuestion);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

renderQuestion();
