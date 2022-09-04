const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const userRouter = require("./routers/user");
app.use("/user", userRouter);

const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

module.exports = app;