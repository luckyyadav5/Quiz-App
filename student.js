async function loadQuiz(){
    const res = await fetch("/getQuiz")
    const data = await res.json();

    const container = document.getElementById("questions");

    data.questions.forEach((q, index) => {
        container.innerHTML += `
        <div> 
        <h3>${q.question}</h3>

        <input>
            type="text"
            id="ans-${index}"
            placeholder="ENTER YOUR NAME"
        </input>
        </div>
        `;
    });
}

loadQuiz();

document.getElementById("quizForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const answers = [];

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
        answers.push(input.value);
    });

    const response = await fetch("/submitQuiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ answers })
    });

    const result = await response.json();

    document.getElementById("result").innerText =
        `Marks: ${result.marks}/${result.total}`;

});