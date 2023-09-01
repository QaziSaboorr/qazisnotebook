const mongoose = require("mongoose"); //using mongoose module which we installed when we used npm innit "reffer to harry video of you forget"
const env = require("dotenv");

mongoose.set("strictQuery", true); // this was just to avoid warning
const connectToMongo = async () => {
  mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectToMongo; //exporting the function so it can be used in other files
