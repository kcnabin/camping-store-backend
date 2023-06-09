require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const home = require("./routes/home");
const errorHandler = require("./middleware/errorHandler");
const unknownRoute = require("./routes/unknownRoute");
const register = require("./routes/register");
const login = require("./routes/login");
const adminAuth = require("./routes/adminAuth");
const userAuth = require("./routes/userAuth");
const userInfo = require("./routes/userInfo");
const category = require("./routes/category");
const uploadPhotos = require("./routes/uploadPhotos");
const products = require("./routes/products");
const similarProducts = require("./routes/similarProducts");
const order = require("./routes/order");
const userOrders = require("./routes/userOrders");
const changePassword = require("./routes/changePassword");
const categoryProducts = require("./routes/categoryProducts");
const search = require("./routes/search");
const path = require("path");

const connectToDb = async () => {
  // const dbUrl = process.env.MONGO_ATLAS_URL;
  const dbUrl = process.env.MONGO_URL;

  try {
    await mongoose.connect(dbUrl);
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
app.use(express.static(path.join(__dirname, "./build")));

// app.use("/", home);

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/admin-auth", adminAuth);
app.use("/api/user-auth", userAuth);
app.use("/api/user-info", userInfo);
app.use("/api/category", category);
app.use("/api/category-products", categoryProducts);
app.use("/api/products", products);
app.use("/api/similar-products", similarProducts);
app.use("/api/upload-photos", uploadPhotos);
app.use("/api/order", order);
app.use("/api/user-orders", userOrders);
app.use("/api/change-password", changePassword);
app.use("/api/search", search);

app.use("/uploads/products", express.static(__dirname + "/uploads/products"));

app.use(unknownRoute);
app.use(errorHandler);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(PORT, () => {
  console.log(`---Server running at port ${PORT}---`);
});
