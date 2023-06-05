require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const home = require("./routes/home");
const errorHandler = require("./routes/errorHandler");
const unknownRoute = require("./routes/unknownRoute");
const register = require("./routes/register");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("---Connected to database---");
  } catch (error) {
    console.log(error);
    console.log("--Error connecting to database");
  }
};

connectToDb();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/", home);
app.use("/register", register);

app.use(unknownRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`---Server running at port ${PORT}`);
});
