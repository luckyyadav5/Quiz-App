const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect("mongodb://dbUser:dbuser123@ac-wa6qfag-shard-00-00.op4tdeb.mongodb.net:27017,ac-wa6qfag-shard-00-01.op4tdeb.mongodb.net:27017,ac-wa6qfag-shard-00-02.op4tdeb.mongodb.net:27017/testDB?ssl=true&replicaSet=atlas-4qtcdc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("mongoDB Connected"))
.catch(err => console.log("Error: ", err))

const QuizSchema = new mongoose.Schema({
  questions : [
    {
      question: String,
      answer: String
    }
  ]
});

const Quiz = mongoose.model("Quiz", QuizSchema);

app.post("/savequiz", async (req, res) => {
  await Quiz.deleteMany();
  await Quiz.create(req.body);
  res.send("Quiz Saved!");
});

app.get("/getQuiz", async(req,res) => {
  const quiz = await Quiz.findOne();
  res.send(quiz);
})

app.post("/submitQuiz", async (req, res) => {

  const quiz = await Quiz.findOne();

  const studentAnswers = req.body.answers;

  let marks = 0;

  quiz.questions.forEach((q, index) => {

    if (
      q.answer.toLowerCase().trim() ===
      studentAnswers[index].toLowerCase().trim()
    ) {
      marks++;
    }

  });

  res.send({
    marks: marks,
    total: quiz.questions.length
  });

});
app.listen(3000, () => {
  console.log("Running");
});