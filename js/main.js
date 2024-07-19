document.addEventListener('DOMContentLoaded', function () {
    const questions = {
        distractibility: {
            D: [
                "Do you often find it difficult to complete tasks because you get easily distracted?",
                "Do you frequently lose focus on what you're doing due to outside interruptions?",
                "Do you struggle to stay on task when there are many things happening around you?"
            ],
            P: [
                "Do you often come up with new ideas when you're distracted from your main task?",
                "Do you find that distractions sometimes lead to creative solutions you hadn't considered before?",
                "Do you feel that your productivity benefits from being able to shift focus between different tasks or ideas?"
            ]
        },
        hyperactivity: {
            I: [
                "Do you often feel mentally restless with a constant flow of thoughts?",
                "Do you find it hard to calm your mind and stop thinking about multiple things at once?",
                "Do you frequently get lost in your own thoughts, even when you're supposed to be focused on something else?"
            ],
            E: [
                "Do you often feel the need to move around, even when it's not appropriate?",
                "Do you find it difficult to sit still for long periods of time?",
                "Do you engage in physical activities to release excess energy?"
            ]
        },
        impulsivity: {
            C: [
                "Do you generally find it easy to control your impulses and think before you act?",
                "Do you usually consider the consequences of your actions before making a decision?",
                "Do you rarely act on a whim without thinking it through first?"
            ],
            U: [
                "Do you often act on impulse without considering the consequences?",
                "Do you find it challenging to resist the urge to do something immediately, even if it's not the best choice?",
                "Do you frequently make spontaneous decisions that you later regret?"
            ]
        },
        energy: {
            H: [
                "Do you frequently come up with new and innovative ideas?",
                "Do you find yourself thinking of creative solutions to problems, even when you're not trying to?",
                "Do you enjoy brainstorming and coming up with new concepts?"
            ],
            X: [
                "Do you prefer seeking out new experiences over creating something new?",
                "Do you often look for opportunities to explore and try new things?",
                "Do you find that you're more motivated by experiencing new places and activities than by creating something?"
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
                <div>
                    <input type="radio" name="q${index + 1}" value="yes" required> Yes
                    <input type="radio" name="q${index + 1}" value="no"> No
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
