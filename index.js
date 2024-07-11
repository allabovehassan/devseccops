const express = require("express");
const app = express();
const { connection } = require("./config/db");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { counterRouter } = require("./routes/counterRoutes");


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/api/counter", counterRouter);


app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected To DataBase`);
  } catch (error) {
    console.log({ Error: error.message });
  }
  console.log(
    `server is running at ${process.env.port}`
  );
});
