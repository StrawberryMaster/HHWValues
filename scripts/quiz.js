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

// Question initialization
initQuestion();

function initQuestion() {
    $("#question-text").html(questionsObject[questionsOrder[qn]].question);
    $("#question-number").html(
        `Question ${qn + 1} of ${questionsOrder.length}`
    );

    if (Object.keys(answers).length === 0) {
        $("#back_button").hide();
        $("#back_button_off").show();
    } else {
        $("#back_button").show();
        $("#back_button_off").hide();
    }
}

// Next question
function nextQuestion(answer) {
    if (qn === questionsOrder.length) {
        return;
    }

    answers[questionsOrder[qn]] = answer;
    qn++;

    if (qn < questionsOrder.length) {
        initQuestion();
    } else {
        results();
    }
}

// Previous question
function prevQuestion() {
    if (Object.keys(answers).length === 0) {
        $("#back_button").hide();
        $("#back_button_off").show();
        return;
    }
    qn--;

    delete answers[questionsOrder[qn]];

    initQuestion();
}

// RESULTS
function results() {
    // Store the user's answers in session storage
    window.sessionStorage.answers = JSON.stringify(answers);

    // Calculate the final results
    const pct = percentageCalculation();
    // Store the final results in session storage
    window.sessionStorage.percentages = JSON.stringify(pct);

    // Prepare the arguments for the next page
    let args = '?';
    const keys = Object.keys(pct);
    for (let i = 0; i < keys.length; i++) {
        const effectName = keys[i];
        args += `${effectName}=${pct[effectName]}`;
        if (i !== keys.length - 1) {
            args += '&';
        }
    }

    // Redirect to the next page
    const hostname = window.location.hostname;
    const nextPage = hostname === "strawberrymaster.github.io/HHWValues" ? "feedback.html" : "results.html";
    location.href = nextPage + args;
}

// Calculate percentage
function percentageCalculation() {
    // calc max
    const max = {}; // Max possible scores
    const score = {}; // User scores
    const pct = {}; // Percentages/Score

    // prepare
    Object.keys(answers).forEach((id) => {
        Object.keys(questionsObject[id].effects).forEach((effectName) => {
            max[effectName] = 0;
            score[effectName] = 0;
        });
    });

    // get max & scores
    Object.keys(answers).forEach((id) => {
        // dismiss "don't know"
        if (answers[id] !== null) {
            Object.keys(questionsObject[id].effects).forEach((effectName) => {
                max[effectName] += Math.abs(questionsObject[id].effects[effectName]);
                score[effectName] += answers[id] * questionsObject[id].effects[effectName];
            });
        }
    });

    // calc score
    Object.keys(max).forEach((effectName) => {
        pct[effectName] = (max[effectName] > 0 ? (score[effectName] * 10 / max[effectName]).toFixed(2) : 0);
    });

    return pct;
}