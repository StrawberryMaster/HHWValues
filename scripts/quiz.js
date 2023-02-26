// variables
let answers = {}; // Store user's answers
let qn = 0; // Current question order

// Populate questionsObject
const questionsObject = {}; // Question objects with ID keys
questions.forEach(value => {
    questionsObject[value.id] = value;
});

// Populate & shuffle questionsOrder
let questionsOrder = Object.keys(questionsObject); // Array of shuffled question IDs

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("shuffle") === "true") {
    questionsOrder.sort(() => Math.random() - 0.5);
}

// Cache DOM element references
const questionTextElement = document.getElementById("question-text");
const questionNumberElement = document.getElementById("question-number");
const backButtonElement = document.getElementById("back_button");
const backButtonOffElement = document.getElementById("back_button_off");

// Initialize the first question
initQuestion();

function initQuestion() {
    // Use cached element references and textContent property
    questionTextElement.textContent = questionsObject[questionsOrder[qn]].question;
    questionNumberElement.textContent = `Question ${qn + 1} of ${questionsOrder.length}`;

    if (Object.keys(answers).length === 0) {
        backButtonElement.style.display = "none";
        backButtonOffElement.style.display = "block";
    } else {
        backButtonElement.style.display = "block";
        backButtonOffElement.style.display = "none";
    }
}

// Next question
const nextQuestion = answer => {
    if (qn >= questionsOrder.length) {
        return;
    }

    answers[questionsOrder[qn]] = answer;
    qn++;

    if (qn < questionsOrder.length) {
        initQuestion();
    } else {
        results();
    }
};

// Previous question
const prevQuestion = () => {
    if (Object.keys(answers).length === 0) {
        backButtonElement.style.display = 'none';
        backButtonOffElement.style.display = 'block';
        return;
    }

    qn--;
    delete answers[questionsOrder[qn]];
    initQuestion();
};

// RESULTS
function results() {
    // Store the user's answers in session storage
    window.sessionStorage.answers = JSON.stringify(answers);

    // Calculate the final results
    const pct = percentageCalculation();
    // Store the final results in session storage
    window.sessionStorage.percentages = JSON.stringify(pct);

    // Prepare the arguments for the next page
    const args = new URLSearchParams();

    for (const [effectName, value] of Object.entries(pct)) {
        args.append(effectName, value);
    }

    const nextPage = "results.html";

    window.location.href = nextPage + "?" + args.toString();
}

// Calculate percentage
function percentageCalculation() {
    // calc max
    const max = {}; // Max possible scores
    const score = {}; // User scores
    const pct = {}; // Percentages/Score

    // get max & scores
    Object.keys(answers).forEach((id) => {
        // dismiss "don't know"
        if (answers[id] !== null) {
            Object.keys(questionsObject[id].effects).forEach((effectName) => {
                max[effectName] = (max[effectName] || 0) + Math.abs(questionsObject[id].effects[effectName]);
                score[effectName] = (score[effectName] || 0) + answers[id] * questionsObject[id].effects[effectName];
            });
        }
    });

    // calc score
    Object.keys(max).forEach((effectName) => {
        pct[effectName] = (max[effectName] > 0 ? (score[effectName] / max[effectName] * 10).toFixed(2) : 0);
    });

    return pct;
}