document.addEventListener('DOMContentLoaded', function () {
    const questions = {
        distractibility: {
            D: [
                "Concentration is a delicate balance. Any little thing can end the study session.",
                "If someone talks in the room, do you need to read the paragraph again?",
                "Are you unable to work if the AC or fan is making a tapping sound?"
            ],
            P: [
                "Would you say your distractability makes you more creative?",
                "Does letting your mind wander lead to new soltuions?",
                "Are you more productive because you bounce from task to task?"
            ]
        },
        hyperactivity: {
            I: [
                "Is your mind never quiet?",
                "Do you have a dozen thoughts running in your head all the time?",
                "Are you constantly daydreaming when you should be working?"
            ],
            E: [
                "Sitting still is torture, right?",
                "Fidgeting is the only way to survive meetings.",
                "Do people often scold you to sit still?"
            ]
        },
        impulsivity: {
            C: [
                "Self control takes a little effort, but not much.",
                "Do you think about others before taking the last cookie?",
                "Do you have a foolproof system for self control?"
            ],
            U: [
                "Do you often get scolded for not thinking before you do things?",
                "All the self-help guides in the world don't seem to help with self control, right?",
                "Have you eaten an entire plate of cookies while dinner was in the oven?"
            ]
        },
        energy: {
            H: [
                "Do you have like a million pieces of art and projects and crafts around?",
                "When something isn't working, is your mind flooded with solutions?",
                "Does your ideal life involve creating things? Art, cabins, robots, poems?"
            ],
            X: [
                "Does staying inside all day make you feel like you are dying?",
                "There is nothing more comfortable than being uncomfortable.",
                "Hiking, biking, and running - but always somewhere new, right?"
            ]
        }
    };

    const selectedQuestions = [];

    function getRandomQuestion(category) {
        const keys = Object.keys(questions[category]);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const questionList = questions[category][randomKey];
        const randomQuestion = questionList.splice(Math.floor(Math.random() * questionList.length), 1)[0];
        return { question: randomQuestion, type: randomKey };
    }

    function populateQuestions() {
        const categories = ['distractibility', 'hyperactivity', 'impulsivity', 'energy'];
        categories.forEach(category => {
            const { question, type } = getRandomQuestion(category);
            selectedQuestions.push({ question, type, category });
        });

        const questionContainer = document.getElementById('questionContainer');
        selectedQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('form-group');
            questionDiv.innerHTML = `
                <label>${q.question}</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-outline-secondary">
                        <input type="radio" name="q${index + 1}" value="yes" required> Definitely
                    </label>
                    <label class="btn btn-outline-secondary">
                        <input type="radio" name="q${index + 1}" value="no"> Not so much
                    </label>
                </div>
            `;
            questionContainer.appendChild(questionDiv);
        });
    }

    function calculatePersonalityType(answers) {
        const traits = { D: 0, P: 0, I: 0, E: 0, C: 0, U: 0, H: 0, X: 0 };
        const personalityCode = { distractibility: '', hyperactivity: '', impulsivity: '', energy: '' };

        answers.forEach((answer, index) => {
            const questionCategory = selectedQuestions[index].category;
            const questionType = selectedQuestions[index].type;

            if (answer === 'yes') {
                traits[questionType]++;
            } else if (answer === 'no') {
                traits[questionType === 'D' ? 'P' : questionType === 'P' ? 'D' : 
                       questionType === 'I' ? 'E' : questionType === 'E' ? 'I' : 
                       questionType === 'C' ? 'U' : questionType === 'U' ? 'C' : 
                       questionType === 'H' ? 'X' : 'H']++;
            }
        });

        personalityCode.distractibility = traits.D >= traits.P ? 'D' : 'P';
        personalityCode.hyperactivity = traits.I >= traits.E ? 'I' : 'E';
        personalityCode.impulsivity = traits.C >= traits.U ? 'C' : 'U';
        personalityCode.energy = traits.H >= traits.X ? 'H' : 'X';

        return (
            personalityCode.distractibility +
            personalityCode.hyperactivity +
            personalityCode.impulsivity +
            personalityCode.energy
        );
    }

    document.getElementById('quizForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const answers = [];
        for (let i = 1; i <= selectedQuestions.length; i++) {
            const value = document.querySelector(`input[name="q${i}"]:checked`).value;
            answers.push(value);
        }

        const result = calculatePersonalityType(answers);
        window.location.href = `personality_${result.toLowerCase()}.html`;
    });

    populateQuestions();
});
