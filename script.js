document.getElementById("form").addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        questions: [
            {
                question: document.getElementById("q1").value,
                answer: document.getElementById("a1").value
            },
            {
                question: document.getElementById("q2").value,
                answer: document.getElementById("a2").value
            },
            {
                question: document.getElementById("q3").value,
                answer: document.getElementById("a3").value
            }
        ]
    };

    await fetch("/saveQuiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    alert("Quiz Saved");
});