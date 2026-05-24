required(dotenv).config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("mongoDB Connected"))
.catch(err => console.log("Error: ", err))

  const formData = mongoose.model("formData", {
        question1: String,
        question2: String,
        question3: String,
        question4: String,
        question5: String,
        question6: String,
  });
app.post("/save", async (req, res) => {
  console.log(req.body);
  await formData.create(req.body);
  res.send("saved");
});

app.listen(3000, () => {
    console.log("running");
})