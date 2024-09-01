const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { apiRouter } = require("./routes/index");
const { connectDB } = require("./config/db");
const cookieParser = require("cookie-parser");

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())
app.use(express.json())

app.use("/api", apiRouter);

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
