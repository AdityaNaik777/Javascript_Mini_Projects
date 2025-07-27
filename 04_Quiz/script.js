document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  // Questions for Quiz stored in a container
  const questions = [
    {
      question: "What is the time complexity of Binary Search?",
      choices: ["O(log n)", "O(n)", "O(n2)", "O(n3)"],
      answer: "O(log n)",
    },
    {
      question:
        "Which data structure uses FIFO (First In First Out) principle?",
      choices: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
    },
    {
      question:
        "What is the time complexity of accessing an element in an array by index?",
      choices: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: "O(1)",
    },
    {
      question: "Which of the following is not a linear data structure?",
      choices: ["Array", "Linked List", "Stack", "Tree"],
      answer: "Tree",
    },
    {
      question: "Which operation takes O(1) time in a stack?",
      choices: ["Insert at bottom", "Push", "Search", "Traverse"],
      answer: "Push",
    },

    // Medium (3 questions)

    {
      question: "What is the worst-case time complexity of Quick Sort?",
      choices: ["O(n log n)", "O(n)", "O(n2)", "O(log n)"],
      answer: "O(n2)",
    },
    {
      question:
        "Which of the following traversals is used to get the sorted elements of a Binary Search Tree?",
      choices: ["Preorder", "Postorder", "Inorder", "Level Order"],
      answer: "Inorder",
    },
    {
      question:
        "Which data structure is used for implementing recursion internally?",
      choices: ["Queue", "Stack", "Linked List", "Array"],
      answer: "Stack",
    },

    // Hard (2 questions)

    {
      question:
        "Which of the following graph algorithms can be used to detect cycles in a directed graph?",
      choices: [
        "BFS",
        "DFS with back edge detection",
        "Dijkstra’s Algorithm",
        "Kruskal’s Algorithm",
      ],
      answer: "DFS with back edge detection",
    },
    {
      question:
        "What is the amortized time complexity of the push operation in a dynamic array (vector) when resizing is considered?",
      choices: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: "O(1)",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) showQuestion();
    else showResult();
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
      li.addEventListener("click", () => {
        selectAnswer(choice), li.classList.add("selected");
      });
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (choice === correctAnswer) score++;

    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }

  // Clear previous selection before setting a new one
  choicesList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      // Remove 'selected' class from all options
      const options = choicesList.querySelectorAll("li");
      options.forEach((option) => option.classList.remove("selected"));

      // Add 'selected' class to clicked option
      e.target.classList.add("selected");
    }
  });
});
