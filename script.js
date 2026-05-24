
document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data =  {
        question1: document.getElementById("q-1").value,
        question2: document.getElementById("q-2").value,
        question3: document.getElementById("q-3").value,
        question4: document.getElementById("q-4").value,
        question5: document.getElementById("q-5").value,
        question6: document.getElementById("q-6").value,
    };

    await fetch("/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
  alert("Saved!");
});