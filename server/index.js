const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { apiRouter } = require("./routes/index");
const { connectDB } = require("./config/db");
const cookieParser = require("cookie-parser");
const { handleError } = require("./utils/error");

const origin=process.env.ORIGIN?process.env.ORIGIN:true

app.use(cors({ origin: origin, credentials: true }));
app.use(cookieParser())
app.use((req, res, next) => {
  if (req.originalUrl === '/api/v1/payment/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use("/api", apiRouter);

app.use(handleError)

app.use("*", (req, res) => {
  res.status(404).json({message:"End point does not exist"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
connectDB()
  .then(() => console.log("connected to database"))
  .catch((error) =>
    console.error(
      "Failed to start the server due to database connection error:",
      error.message
    )
  );
