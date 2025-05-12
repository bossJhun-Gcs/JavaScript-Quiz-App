const quizData = [
  {
    question: "What does DOM stand for?",
    options: [
      "Document Order Model",
      "Document Object Model",
      "Data Object Method",
      "Direct Object Management",
    ],
    correct: 1,
  },
  {
    question: "Which method selects by ID?",
    options: [
      "getElementById()",
      "querySelectorAll()",
      "getElement()",
      "getElementsByClassName()",
    ],
    correct: 0,
  },
  {
    question: "Which event fires on input change?",
    options: ["click", "submit", "change", "keydown"],
    correct: 2,
  },
  {
    question: "What is used to declare a variable in JavaScript?",
    options: ["int", "string", "let", "define"],
    correct: 2,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "##", "<!--", "**"],
    correct: 0,
  },
  {
    question: "What does `===` mean in JavaScript?",
    options: [
      "Assignment",
      "Strict equality",
      "Loose equality",
      "None of the above",
    ],
    correct: 1,
  },
  {
    question: "How do you write 'Hello' in an alert box?",
    options: [
      "msg('Hello')",
      "alertBox('Hello')",
      "alert('Hello')",
      "show('Hello')",
    ],
    correct: 2,
  },
  {
    question: "What is the result of `typeof []`?",
    options: ["array", "object", "list", "undefined"],
    correct: 1,
  },
  {
    question: "What keyword stops a loop?",
    options: ["stop", "exit", "end", "break"],
    correct: 3,
  },
  {
    question: "Which operator is used to add numbers?",
    options: ["+", "&", "*", "="],
    correct: 0,
  },
  {
    question: "What is the default value of a declared variable?",
    options: ["0", "null", "undefined", "empty"],
    correct: 2,
  },
  {
    question: "Which one is a JavaScript data type?",
    options: ["float", "char", "boolean", "decimal"],
    correct: 2,
  },
  {
    question: "How do you start a function in JavaScript?",
    options: [
      "function myFunction()",
      "def myFunction()",
      "start myFunction()",
      "create myFunction()",
    ],
    correct: 0,
  },
  {
    question: "Which one is NOT a loop in JavaScript?",
    options: ["for", "while", "repeat", "do...while"],
    correct: 2,
  },
  {
    question: "What is `NaN` in JavaScript?",
    options: [
      "A type of variable",
      "A syntax error",
      "Not a Number",
      "Null and None",
    ],
    correct: 2,
  },
  {
    question: "What does `push()` do in arrays?",
    options: [
      "Removes an item",
      "Adds an item to the end",
      "Sorts the array",
      "Reverses the array",
    ],
    correct: 1,
  },
  {
    question: "What will `console.log(2 + '2')` print?",
    options: ["4", "22", "undefined", "NaN"],
    correct: 1,
  },
  {
    question: "Which method turns JSON into a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.objectify()",
      "JSON.convert()",
    ],
    correct: 0,
  },
  {
    question: "What is the purpose of `return` in a function?",
    options: [
      "Exit the script",
      "Output to the console",
      "Give a value back",
      "Pause the code",
    ],
    correct: 2,
  },
  {
    question: "What does `const` mean?",
    options: [
      "You can change the value",
      "It’s a constant – can’t change",
      "It’s a type of loop",
      "It creates a class",
    ],
    correct: 1,
  },
];

let questions = [...quizData].sort(() => Math.random() - 0.5);
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimer();
  timer = setInterval(countdown, 1000);

  const q = questions[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1}. ${q.question}`;
  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(index, true));
    optionsEl.appendChild(btn);
  });
  nextBtn.style.display = "none";
}

function countdown() {
  timeLeft--;
  updateTimer();
  if (timeLeft === 0) {
    clearInterval(timer);
    selectAnswer(questions[currentQuestion]?.correct, false);
  }
}

function updateTimer() {
  timerEl.textContent = `⏱️ ${timeLeft}`;
}

function selectAnswer(index, shouldScore) {
  clearInterval(timer);
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn) => (btn.disabled = true));

  if (index === q.correct) {
    shouldScore && score++;
    buttons[index].classList.add("correct");
  } else {
    buttons[index].classList.add("wrong");
    buttons[q.correct].classList.add("correct");
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  nextBtn.style.display = "none";
  const highScore = localStorage.getItem("quizHighScore") || 0;

  const isNew = score > highScore;

  if (isNew) {
    localStorage.setItem("quizHighScore", score);
  }

  resultEl.innerHTML = `
      <h2>Hurray!!! Quiz Completed</h2>
      <p>You have scored ${score} out of ${questions.length} questions</p>
      <p>Highest Score: ${Math.max(score, highScore)}</P>
      ${isNew ? "<p>Hey, New High Score!</p>" : ""}
      <button onclick="location.reload()">Restart Quiz</button>
  `;
}

loadQuestion();
