document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");

  const questionContainer = document.getElementById("question-container"); // Fixed spelling
  const questionText = document.getElementById("question-text"); // Fixed spelling
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who painted the Mona Lisa?",
      choices: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      answer: "Leonardo da Vinci",
    },
    {
      question: "What is the largest mammal in the world?",
      choices: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      answer: "Blue Whale",
    },
    {
      question: "Which language is primarily used for web development?",
      choices: ["Python", "Java", "JavaScript", "C++"],
      answer: "JavaScript",
    },
    {
      question: "What is the chemical symbol for gold?",
      choices: ["Go", "Gd", "Au", "Ag"],
      answer: "Au",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";

    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      choicesList.appendChild(li);
      li.addEventListener("click", () => selectAnswer(choice));
    });
  }

  function selectAnswer(choice) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (choice === correctAnswer) {
      score++;
    }
    nextBtn.classList.remove("hidden");
  }
  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }
});
