const questions = [
{
image:"images/hammer.png",
question:"What is this tool?",
answers:["Hammer","Saw","Drill","Bucket"],
correct:0
},

{
image:"images/brick.png",
question:"What material is this?",
answers:["Wood","Glass","Steel","Brick"],
correct:3
},

{
image:"images/saw.jpeg",
question:"Which tool is used to cut wood?",
answers:["Hammer","Saw","Helmet","Concrete"],
correct:1
},

{
image:"images/tape measure.png",
question:"Which tool is used to measure?",
answers:["Roof","Brick","Tape Measure","Door"],
correct:2
},

{
image:"images/ladder.png",
question:"What is this?",
answers:["Helmet","Ladder","Window","Floor"],
correct:1
},

{
image:"images/worker building.png",
question:"What is the worker doing?",
answers:["Sleeping","Driving","Swimming","Building"],
correct:3
},

{
image:"images/worker painting.png",
question:"The worker is __ the wall.",
answers:["Eating","Painting","Reading","Jumping"],
correct:1
},

{
image:"images/worker drilling.png",
question:"The worker is __ the wall.",
answers:["Cooking","Drilling","Sleeping","Running"],
correct:1
},

{
image:"images/bucket.png",
question:"Workers carry concrete with a...",
answers:["Bucket","Window","Roof","Chair"],
correct:0
},

{
image:"images/house under construction.png",
question:"What are they building?",
answers:["A bridge","A Bicyle","A boat","A house"],
correct:3
},

{
image:"images/wall.png",
question:"Bricks are used to build...",
answers:["Clouds","Water","Walls","Cars"],
correct:2
},

{
image:"images/safety helmet.png",
question:"Workers wear this for safety.",
answers:["Helmet","Spoon","Book","Bottle"],
correct:0
},

{
image:"images/safety boots.png",
question:"Safety __ protect workers' feet.",
answers:["Windows","Boots","Bricks","Doors"],
correct:1
},

{
image:"images/safety vest.png",
question:"What is this safety equipment?",
answers:["Hammer","Table","Roof","Safety Vest"],
correct:3
},

{
image:"images/finished house.png",
question:"Congratulations! You built a...",
answers:["House","Car","Plane","Ship"],
correct:0
}
];

let currentQuestion = 0;
let score = 0;
let time = 15;
let timer;

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("startBtn");
const playerName = document.getElementById("playerName");

const welcome = document.getElementById("welcome");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

const image = document.getElementById("image");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const house = document.getElementById("house")
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const applauseSound = new Audio("sounds/applause.mp3");
startBtn.addEventListener("click", () => {
    const name = playerName.value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    welcome.textContent = `Welcome, ${name}!`;
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    loadQuestion();
});

function loadQuestion() {

    clearInterval(timer);

    time = 15;
    timerText.textContent = time;

    timer = setInterval(() => {
        time--;
        timerText.textContent = time;

        if (time <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);

    const q = questions[currentQuestion];

    image.src = q.image;
    question.textContent = q.question;

    answers.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const btn = document.createElement("button");

        btn.textContent = answer;

        btn.onclick = () => checkAnswer(index);

        answers.appendChild(btn);

    });

    progressBar.style.width = (currentQuestion / questions.length) * 100 + "%";
}

function checkAnswer(index) {

    clearInterval(timer);

    const q = questions[currentQuestion];

    Array.from(answers.children).forEach(btn => btn.disabled = true);

    if (index === q.correct) {
        correctSound.play();
        score += Math.round(100 / questions.length);
        scoreText.textContent = score;
        house.textContent = q.house;
    }
    else {
        wrongSound.play();
    }
}

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        finishGame();

    }

}

function finishGame() {
    applauseSound.play();

    clearInterval(timer);

    gameScreen.innerHTML = `
        <div class="card">
            <h1>🏆 Congratulations!</h1>
            <h2>${playerName.value}</h2>
            <h2>Score: ${score}/100</h2>
            <h3>${score >= 80 ? "🥇 Construction Master" : score >= 60 ? "🥈 Skilled Builder" : "🥉 Beginner Builder"}</h3>
            <h1>🏠</h1>
            <button onclick="location.reload()">Play Again</button>
        </div>
    `;
}