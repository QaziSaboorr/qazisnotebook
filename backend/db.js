const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017";
mongoose.set("strictQuery", true);
const connectToMongo = async () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to moongo hogaya succesfully");
  });
};

module.exports = connectToMongo;
