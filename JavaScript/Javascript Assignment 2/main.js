let selectedDifficulty;
let selectedCategory;
let nameOfPlayer;
let yourScore = 0;
let currentQuestionNumber = 0;
let questions = [];
let timerInterval;
let answered = false;

const API_BASE_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

// Select elements
let startGamePage = document.getElementById("entry-point");
let inputName = document.getElementById("name-input");
let startButton = document.getElementById("start-button");
let gamePage = document.getElementById("game-page");
let selectedCategoryDisplay = document.getElementById("category-selected");
let categoryOptions = document.getElementById("category-options");
let selectedDifficultyDisplay = document.getElementById("difficulty-selected");
let difficultyOptions = document.querySelectorAll(".difficulty-option");
let questionNumber = document.getElementById("question-number");
let questionPrompt = document.getElementById("question-prompt");
let nextButton = document.getElementById("next-question");
let currentPoints = document.getElementById("points");
let timerDisplay = document.getElementById("timer");
let endGamePage = document.getElementById("end-point");
let finalScoreDisplay = document.getElementById("score-points");
let restartButton = document.getElementById("restart");
let answerOptions = document.querySelectorAll(".answer");    // Answer options


difficultyOptions.forEach(button => {
    button.addEventListener('click', function() {
        selectedDifficulty = button.value.toLowerCase();
        button.classList.add("selected");
        difficultyOptions.forEach(b => {
            if (b !== button) b.disabled = true;
        });
    });
});

// Start game
function startGame() {
    nameOfPlayer = inputName.value.trim() || "Player";
    selectedCategory = categoryOptions.value;
    
    if (!selectedCategory || !selectedDifficulty) {
        alert("Please select a category and difficulty level!");
        return;
    }

    selectedCategoryDisplay.textContent = `${selectedCategory}: `;
    selectedDifficultyDisplay.textContent = `${selectedDifficulty}`;

    startGamePage.style.display = "none";
    gamePage.classList.remove("hidden");
    
    questionPrompt.innerHTML = "Just wait!";

    fetchQuestions();
}

// Fetch questions from API
async function fetchQuestions() {
    let categoryMap = {
        "Art": 25,
        "Entertainment": 11,
        "General Knowledge" : 9,
        "Science": 17,
        "Sports": 21,
        "Technology": 18
    };

    let categoryId = categoryMap[selectedCategory];
    let url = `${API_BASE_URL}&category=${categoryId}&difficulty=${selectedDifficulty}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        questions = data.results;
        currentQuestionNumber = 0;
        loadQuestion();
    } 
    catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to load questions. Please try again!");
    }
}

// Load question
function loadQuestion() {
    if (currentQuestionNumber >= questions.length) {
        return endGame();
    }

    let questionData = questions[currentQuestionNumber];
    questionNumber.textContent = `${currentQuestionNumber + 1}`;
    questionPrompt.innerHTML = questionData.question;
    answered = false;
    nextButton.disabled = true;

    let answers = [...questionData.incorrect_answers, questionData.correct_answer];
    answers.sort(() => Math.random() - 0.5); // Shuffle answers

    answerOptions.forEach((option, index) => {
        option.textContent = answers[index];
        option.classList.remove("correct", "wrong", "active", "rightAnswer");
        option.onclick = () => checkAnswer(option, answers[index], questionData.correct_answer);
    });
    startTimer();
}

// Check answer with animation
function checkAnswer(selectedOption, selected, correct) {
    if (answered) return; // Prevent multiple selections

    clearInterval(timerInterval);
    answered = true;

    if (selected === correct) {
        selectedOption.classList.add("correct"); 
        setTimeout(() => {
            yourScore++; 
            currentPoints.textContent = yourScore;
        }, 2500);
    } else {
        selectedOption.classList.add("wrong"); 
    }

    setTimeout(() => {
        answerOptions.forEach(option => {
            option.classList.remove("active", "wrong", "correct", "rightAnswer"); 
            if (option.textContent === correct) {
                option.classList.add("rightAnswer"); 
            }
        });
    }, 3000); // Delay to allow animation

    setTimeout(() => {
        nextButton.disabled = false;
    }, 3000);
}

// Start Timer
function startTimer() {
    let timerDuration = 15;
    timerDisplay.textContent = timerDuration;

    timerInterval = setInterval(() => {
        timerDuration--;
        timerDisplay.textContent = timerDuration;

        if (timerDuration <= 0) {
            clearInterval(timerInterval);
            showCorrectAnswer();
        }
    }, 1000);
}

// Show correct answer if time runs out
function showCorrectAnswer() {
    if (answered) return;
    answered = true;
    
    let correctAnswer = questions[currentQuestionNumber].correct_answer;

    answerOptions.forEach(option => {
        option.classList.remove("active", "wrong", "correct"); 
        if (option.textContent === correctAnswer) {
            option.classList.add("rightAnswer"); 
        }
    });

    setTimeout(() => {
        nextButton.disabled = false;
    }, 4000);
}

// Load next question when "Next" is clicked
function loadNextQuestion() {
    if (!answered) return; 

    currentQuestionNumber++;
    loadQuestion();
}

// End game
function endGame() {
    gamePage.classList.add("hidden");
    endGamePage.classList.remove("hidden");

    let message;
    if (yourScore >= 8) message = "Excellent job,";
    else if (yourScore >= 4) message = "Good job,";
    else message = "You can do better,";

    document.getElementById("message-display").textContent = message;
    document.getElementById("player-name-message").textContent = nameOfPlayer;
    finalScoreDisplay.textContent = `${yourScore}`;
}

// Event Listeners
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", loadNextQuestion);
restartButton.addEventListener("click", () => window.location.reload());
document.getElementById("exitButton").addEventListener("click", () => window.location.reload());