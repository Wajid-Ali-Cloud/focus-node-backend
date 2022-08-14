const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const DB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5001;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json({ extended: true })); 
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.json("Server Running Successfully");
});

app.use("/api", require("./routes/contactForm"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/products"));
app.use("/api", require("./routes/order"));
app.use("/api", require("./routes/comments"));
app.use("/api", require("./routes/blogs"));

DB();
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
