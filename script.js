window.onload = function () {

  // Load saved progress if available
  let savedProgress = sessionStorage.getItem("progress");
  let userAnswers = savedProgress ? JSON.parse(savedProgress) : {};

  const questionsElement = document.getElementById("questions");
  const submitBtn = document.getElementById("submit");
  const scoreElement = document.getElementById("score");

  // Show stored score if present
  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    scoreElement.textContent = `Your score is ${storedScore} out of 5.`;
  }

  // Save answer to sessionStorage
  function saveProgress(qIndex, answer) {
    userAnswers[qIndex] = answer;
    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
  }

  // Render questions to DOM
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

        // Restore saved selection
        if (userAnswers[i] === choice) {
          choiceElement.checked = true;
          choiceElement.setAttribute("checked", "true"); // REQUIRED BY CYPRESS
        }

        // Save choice on click
        choiceElement.addEventListener("change", () => {
          saveProgress(i, choice);

          // Remove old checked attribute from all radios in this question
          document
            .querySelectorAll(`input[name="question-${i}"]`)
            .forEach(radio => radio.removeAttribute("checked"));

          // Set the new checked="true" attribute for Cypress detection
          choiceElement.setAttribute("checked", "true");
        });

        const choiceText = document.createTextNode(choice);
        questionElement.appendChild(choiceElement);
        questionElement.appendChild(choiceText);
      }

      questionsElement.appendChild(questionElement);
    }
  }

  renderQuestions();

  // Submit quiz and calculate score
  submitBtn.addEventListener("click", () => {
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].answer) {
        score++;
      }
    }

    scoreElement.textContent = `Your score is ${score} out of 5.`;

    // Save score to localStorage
    localStorage.setItem("score", score.toString());
  });
};


// DO NOT CHANGE BELOW — Provided Data
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
