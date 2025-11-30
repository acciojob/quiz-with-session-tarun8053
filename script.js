window.onload = function () {

  // Load saved progress if available
  let savedProgress = sessionStorage.getItem("progress");
  let userAnswers = savedProgress ? JSON.parse(savedProgress) : {};

  const questionsElement = document.getElementById("questions");
  const submitBtn = document.getElementById("submit");
  const scoreElement = document.getElementById("score");

  // Show stored score from localStorage (if any)
  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    scoreElement.textContent = `Your score is ${storedScore} out of 5.`;
  }

  // Save user's selected answer
  function saveProgress(qIndex, answer) {
    userAnswers[qIndex] = answer;
    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }

  // Render questions
  function renderQuestions() {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const questionElement = document.createElement("div");
      const questionText = document.createTextNode(question.question);
      questionElement.appendChild(questionText);

      for (let j = 0; j < question.choices.length; j++) {
        const choice = question.choices[j];

        const choiceElement = document.createElement("input");
        choiceElement.type = "radio";
        choiceElement.name = `question-${i}`;
        choiceElement.value = choice;

        if (userAnswers[i] === choice) {
          choiceElement.checked = true;
        }

        // Save progress when selected
        choiceElement.addEventListener("change", () => {
          saveProgress(i, choice);
        });

        const choiceText = document.createTextNode(choice);
        questionElement.appendChild(choiceElement);
        questionElement.appendChild(choiceText);
      }

      questionsElement.appendChild(questionElement);
    }
  }

  renderQuestions();

  // Submit
  submitBtn.addEventListener("click", () => {
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].answer) {
        score++;
      }
    }

    scoreElement.textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score);
  });

};


// DO NOT MODIFY — PROVIDED QUESTIONS
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];
