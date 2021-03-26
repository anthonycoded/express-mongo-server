let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
require("dotenv").config();
const errorHandler = require("./middleware/error");

const app = express();

// Express Route
app.use(express.json());
app.use(cors());

//connect to MongoDB Atlas
const mongoUri = process.env.MONGODB_URI;
const connectDB = async () => {
  await mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch(() => {
      console.log("Unable to connect to MongoDB Atlas!");
    });
};

connectDB();

//Error Handler last middleware
app.use(errorHandler);

//start server
const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on ${port}`));
