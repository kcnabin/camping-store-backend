require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const home = require("./routes/home");
const errorHandler = require("./routes/errorHandler");
const unknownRoute = require("./routes/unknownRoute");

const PORT = process.env.PORT;
app.use(cors());
app.use(morgan("dev"));

app.use("/", home);

app.use(unknownRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`---Server running at port ${PORT}`);
});
