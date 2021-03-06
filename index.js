const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const setupContactRoutes = require("./app/routes/contact.routes");
const { BadRequestError } = require("./app/helpers/errors");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

setupContactRoutes(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application."});
});
app.use((req, res ,next) => {
    next(new BadRequestError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});


const PORT = config.app.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(express.urlencoded({ extended: true}));

const db = require("./app/models");

db.mongoose.connect(config.db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.log("Cannot connect to tha database!", error);
    process.exit();
  });