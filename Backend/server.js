const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productRouter = require("./routes/productRouter.js");
const userRouter = require("./routes/userRouter.js");

app.use("/products", productRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`server is running onn port ${PORT}`);
});
